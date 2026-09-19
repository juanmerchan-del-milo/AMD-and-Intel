const assert = require('node:assert/strict');
require('../catalog.js');
require('../cpus.js');
require('../catalog-extended.js');
require('../engine.js');

const E = PC_ENGINE;
const D = PC_CATALOG;
const id = (category, name) => {
  const item = D[category].find(row => row.name === name);
  assert.ok(item, `Missing fixture: ${name}`);
  return item.id;
};
const base = {
  cpu:id('cpu','Ryzen 5 7600'), gpu:id('gpu','GeForce RTX 5070 FE'),
  ram:id('ram','DDR5-6000 · 32 GB (2 × 16) · CL30'),
  storage:[id('storage','990 PRO · 2 TB')],
  motherboard:id('motherboard','MAG B650 TOMAHAWK WIFI'),
  psu:id('psu','ATX · 850 W'), cooler:id('cooler','Dual tower · 160 mm'),
  case:id('case','Airflow mid tower')
};
let passed = 0;
function test(name, fn) { fn(); passed += 1; console.log('PASS ' + name); }
const check = changes => E.check({...base, ...changes});

test('catalog records and ids are unique', () => {
  const all = Object.values(D).flat();
  assert.equal(all.length, 378);
  assert.equal(new Set(all.map(item => item.id)).size, all.length);
});
test('all records have an HTTPS source and finite reference power', () => {
  Object.values(D).flat().forEach(item => {
    assert.match(item.source, /^https:\/\//);
    assert.ok(Number.isFinite(item.watts) && item.watts >= 0, item.name);
  });
});
test('balanced build has no known conflict', () => assert.equal(check({}).ok, true));
test('GT 1030 DDR4 and GDDR5 remain separate', () => {
  const ddr4 = E.byId(id('gpu','GeForce GT 1030 DDR4'));
  const gddr5 = E.byId(id('gpu','GeForce GT 1030 GDDR5'));
  assert.notEqual(ddr4.memory, gddr5.memory);
});
test('DDR/DDR1 historical build matches', () => {
  const retro = {
    ...base,
    cpu:id('cpu','AMD Athlon 64 3200+ (Socket 939)'),
    ram:id('ram','UDIMM · DDR (DDR1)-400 · 2 GB (2 × 1) · CL3'),
    motherboard:id('motherboard','nForce4 Socket 939 · DDR (DDR1)'),
    cooler:id('cooler','Legacy universal tower · 155 mm')
  };
  const result = E.check(retro);
  assert.ok(!result.errors.includes('socketBad'));
  assert.ok(!result.errors.includes('ramBad'));
  assert.ok(!result.errors.includes('coolerSocket'));
});
test('mobile BGA processor is reference-only', () => {
  const mobile = D.cpu.find(item => item.name === 'Ryzen AI 9 HX 370');
  assert.equal(mobile.buildable, false);
  assert.ok(check({cpu:mobile.id}).errors.includes('mobileCpu'));
  assert.equal(E.compatibleCandidate(base, 'cpu', mobile), false);
});
test('mobile/NPU metadata is explicit', () => {
  assert.equal(D.cpu.filter(item => item.platform === 'mobile').length, 24);
  assert.equal(D.cpu.filter(item => item.platform === 'embedded').length, 1);
  assert.equal(D.cpu.filter(item => item.npu).length, 30);
});
test('RAM catalog spans DDR/DDR1 through DDR5', () => {
  assert.deepEqual(new Set(D.ram.map(item => item.memory)), new Set(['DDR (DDR1)','DDR2','DDR3','DDR4','DDR5']));
});
test('storage profiles span PCIe 1.0 through 5.0', () => {
  const generations = new Set(D.storage.map(item => item.pcie).filter(Boolean));
  assert.deepEqual(generations, new Set([1,2,3,4,5]));
});
test('AIC SSD is not counted as M.2', () => {
  const result = check({storage:[id('storage','Perfil SSD PCIe 5.0 ×4 · 2 TB · AIC')]});
  assert.ok(!result.errors.includes('m2Bad'));
  assert.ok(result.warnings.includes('storageAicReview'));
});
test('socket, RAM, form and capacity conflicts are detected', () => {
  assert.ok(check({cpu:id('cpu','Core i7-14700K')}).errors.includes('socketBad'));
  assert.ok(check({ram:id('ram','DDR4-3200 · 32 GB (2 × 16) · CL16')}).errors.includes('ramBad'));
  assert.ok(check({ram:id('ram','SO-DIMM DDR5 · 32 GB (2 × 16)')}).errors.includes('formBad'));
  assert.ok(check({motherboard:id('motherboard','B650 Mini-ITX'),ram:id('ram','DDR5-5600 · 256 GB (4 × 64) · CL46')}).errors.includes('ramSlots'));
});
test('power, cooling, video and case conflicts are detected', () => {
  assert.ok(check({psu:id('psu','ATX · 300 W')}).errors.includes('psuBad'));
  assert.ok(check({case:id('case','Compact SFX'),gpu:id('gpu','GeForce RTX 5090 FE')}).errors.includes('gpuBad'));
  assert.ok(check({gpu:null,cpu:id('cpu','Core i3-12100F')}).errors.includes('videoBad'));
  assert.ok(check({case:id('case','Mini tower'),cooler:id('cooler','AIO · 420 mm')}).errors.includes('radiatorBad'));
});
test('import validation rejects foreign and oversized data', () => {
  assert.throws(() => E.validateBuild({...base,gpu:'not-a-gpu'}));
  assert.throws(() => E.validateBuild({...base,storage:Array(13).fill(base.storage[0])}));
});

console.log(JSON.stringify({passed,catalog:Object.fromEntries(Object.entries(D).map(([key,rows])=>[key,rows.length]))}));
