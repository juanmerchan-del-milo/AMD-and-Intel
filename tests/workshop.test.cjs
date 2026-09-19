const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const T=require('../vendor/three.min.js');
require('../catalog.js');require('../cpus.js');require('../catalog-extended.js');
require('../hardware.js');require('../workshop-data.js');require('../workshop-models.js');
const D=PC_CATALOG,W=PC_WORKSHOP_DATA,F=PC_FORMAT;
const root=path.join(__dirname,'..');

test('all GPU and RAM records generate finite selectable 3D geometry',()=>{
  let count=0;
  for(const category of ['gpu','ram'])for(const item of D[category]){
    const profile=W.profile(item,category),model=PC_WORKSHOP_MODELS.create(T,profile);
    assert.deepEqual(Object.keys(model.parts),profile.parts.map(p=>p.id));
    model.group.updateMatrixWorld(true);
    const bounds=new T.Box3().setFromObject(model.group);
    for(const value of [...bounds.min.toArray(),...bounds.max.toArray()])assert.ok(Number.isFinite(value),item.name);
    assert.ok(!bounds.isEmpty(),item.name);
    for(const part of profile.parts){
      assert.ok(model.parts[part.id].children.length,`${item.name}: empty ${part.id}`);
      assert.deepEqual(W.offset(part,0),[0,0,0]);
      assert.deepEqual(W.offset(part,profile.max),part.offset);
      assert.ok(part.offset.every(Number.isFinite));
    }
    let triangles=0,drawables=0;
    model.group.traverse(obj=>{if(obj.isMesh){drawables++;triangles+=(obj.geometry.index?.count||obj.geometry.attributes.position.count)/3*(obj.isInstancedMesh?obj.count:1)}});
    assert.ok(drawables<220,`${item.name}: draw budget ${drawables}`);
    assert.ok(triangles<60000,`${item.name}: polygon budget ${triangles}`);
    PC_WORKSHOP_MODELS.dispose(model.group);count++;
  }
  assert.equal(count,D.gpu.length+D.ram.length);
});

test('soldered GPU and DRAM parts never detach',()=>{
  for(const category of ['gpu','ram'])for(const item of D[category]){
    const p=W.profile(item,category);
    for(const part of p.parts.filter(x=>['pcb','die','vram','vrm','dram','pmic','spd','register','contacts','connectors'].includes(x.id))){
      assert.equal(part.step,0);assert.deepEqual(W.offset(part,100),[0,0,0]);
    }
  }
});

test('DDR5 PMIC, RDIMM register, HBM and optional covers follow component types',()=>{
  for(const item of D.ram){
    const parts=W.profile(item,'ram').parts.map(x=>x.id);
    assert.equal(parts.includes('pmic'),item.memory==='DDR5');
    assert.equal(parts.includes('register'),item.form==='RDIMM');
    assert.equal(parts.includes('spreaderFront'),item.form==='UDIMM'&&['DDR4','DDR5'].includes(item.memory));
    assert.equal(W.profile(item,'ram',false).max,0);
  }
  assert.equal(W.profile(D.gpu.find(x=>x.memory==='HBM2'),'gpu').parts.find(x=>x.id==='vram').key,'hbm');
  assert.throws(()=>W.profile(D.cpu[0],'cpu'));
});

test('labels distinguish units, FE and profiles in all languages without changing IDs',()=>{
  const item=D.gpu.find(x=>/3450/.test(x.name)),id=item.id;
  assert.match(F.name(item),/512 MB/);assert.equal(F.capacity(.5),'512 MB');
  assert.match(F.name(D.gpu.find(x=>/5090/.test(x.name))),/Founders Edition/);
  assert.equal(F.capacity(2000,'storage'),'2 TB');
  assert.equal(F.name(item,'en').includes('512MB'),false);assert.equal(item.id,id);
  const legacy=D.ram.find(x=>x.capacity===.5);
  assert.match(F.name(legacy,'es'),/2 × 256 MB/);
  const ssd=D.storage.find(x=>x.name.startsWith('Perfil '));
  assert.match(F.name(ssd,'en'),/^Profile /);assert.match(F.name(ssd,'zh'),/^配置 /);
  for(const [key,values] of Object.entries(W.text))assert.ok(values.length===3&&values.every(v=>typeof v==='string'&&v.length),key);
});

function application(){
  const errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://pc-lab.test/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
  const win=dom.window;win.matchMedia=()=>({matches:false,addEventListener(){}});win.HTMLElement.prototype.scrollIntoView=function(){};
  for(const file of ['catalog.js','cpus.js','catalog-extended.js','i18n.js','hardware.js','glossary.js','engine.js','viewer.js','workshop-data.js','workshop-models.js','app.js','workshop.js'])win.eval(fs.readFileSync(path.join(root,file),'utf8'));
  const click=id=>win.document.getElementById(id).click();
  const change=(id,value)=>{const el=win.document.getElementById(id);el.value=value;el.dispatchEvent(new win.Event('change',{bubbles:true}))};
  return {dom,win,errors,click,change,$:id=>win.document.getElementById(id)};
}

test('workshop opens from catalog, steps both ways, and does not mutate the build',()=>{
  const {dom,win,$,click,errors}=application();
  const before=JSON.stringify(win.PC_APP.getBuild());
  const button=win.document.querySelector('[data-inspect]');assert.ok(button);button.click();
  assert.equal($('workshopView').hidden,false);assert.equal($('builderView').hidden,true);
  assert.equal($('workshopFallback').hidden,false);
  click('workshopNext');assert.equal(win.PC_WORKSHOP.getState().progress,1);
  click('workshopDisassemble');assert.equal(win.PC_WORKSHOP.getState().progress,4);
  assert.equal($('workshopNext').disabled,true);
  click('workshopPrev');assert.equal(win.PC_WORKSHOP.getState().progress,3);
  click('workshopAssemble');assert.equal(win.PC_WORKSHOP.getState().progress,0);
  assert.equal($('workshopPrev').disabled,true);assert.equal(JSON.stringify(win.PC_APP.getBuild()),before);
  win.document.querySelector('[data-part="die"]').click();click('workshopIsolate');
  assert.equal(win.PC_WORKSHOP.getState().selected,'die');assert.equal(win.PC_WORKSHOP.getState().isolated,true);
  click('workshopNext');assert.equal(win.PC_WORKSHOP.getState().isolated,false);
  assert.deepEqual(errors,[]);dom.window.close();
});

test('RAM variants, multilingual names, selection and return navigation work',()=>{
  const {dom,win,$,click,change,errors}=application();
  win.PC_APP.setView('workshop');change('workshopCategory','ram');
  const ddr1=win.PC_CATALOG.ram.find(x=>x.memory==='DDR (DDR1)');change('workshopModel',ddr1.id);
  assert.equal(win.PC_WORKSHOP.getState().layers,0);assert.equal($('workshopDisassemble').disabled,true);
  const ddr5=win.PC_CATALOG.ram.find(x=>x.memory==='DDR5'&&x.form==='UDIMM');change('workshopModel',ddr5.id);
  assert.equal(win.PC_WORKSHOP.getState().layers,3);assert.ok(win.PC_WORKSHOP.getState().parts.includes('pmic'));
  $('workshopCover').checked=false;$('workshopCover').dispatchEvent(new win.Event('change'));
  assert.equal(win.PC_WORKSHOP.getState().layers,0);
  change('language','en');assert.equal($('workshopTitle').textContent,'Disassemble. Discover. Reassemble.');
  change('language','zh');assert.equal($('workshopTitle').textContent,'拆解 · 探索 · 重新组装');
  click('workshopUse');assert.equal(win.PC_APP.getBuild().ram,ddr5.id);assert.equal($('builderView').hidden,false);
  assert.equal(win.PC_WORKSHOP.getState().active,false);
  assert.deepEqual(errors,[]);dom.window.close();
});

test('details link opens workshop without losing saved configurations',()=>{
  const {dom,win,$,click,errors}=application();
  win.document.querySelector('[data-details]').click();assert.equal($('modal').hidden,false);
  click('detailInspect');assert.equal($('modal').hidden,true);assert.equal($('workshopView').hidden,false);
  click('workshopBack');assert.equal($('builderView').hidden,false);
  assert.ok(win.localStorage.getItem('pc-lab-builder-1.24'));
  assert.deepEqual(errors,[]);dom.window.close();
});

test('AGP-only board rejects PCIe GPU/AIC and exposes motherboard graphics',()=>{
  const {dom,win}=application(),E=win.PC_ENGINE,db=win.PC_CATALOG;
  const build=win.PC_APP.getBuild();
  build.cpu=db.cpu.find(x=>x.socket==='Socket 478').id;
  build.motherboard=db.motherboard.find(x=>x.name==='P4i65G').id;
  build.ram=db.ram.find(x=>x.memory==='DDR (DDR1)'&&x.capacity===2).id;
  assert.ok(E.check(build).errors.includes('gpuSlotBad'));
  assert.equal(E.compatibleCandidate(build,'gpu',db.gpu[0]),false);
  build.gpu=null;
  assert.ok(!E.check(build).errors.includes('videoBad'));
  build.storage=[db.storage.find(x=>x.form==='AIC').id];
  assert.ok(E.check(build).errors.includes('storageSlotBad'));
  dom.window.close();
});

test('renderer controller loads geometry, animates and stops on navigation (mock GL)',async()=>{
  const {dom,win,$,click,errors}=application();
  win.eval(fs.readFileSync(path.join(root,'vendor/three.min.js'),'utf8'));
  win.eval(fs.readFileSync(path.join(root,'vendor/OrbitControls.js'),'utf8'));
  let renders=0;const contexts=[];
  win.HTMLCanvasElement.prototype.getContext=function(){return {fillText(){},fillRect(){}}};
  win.THREE.WebGLRenderer=class{
    constructor(){this.domElement=win.document.createElement('canvas');contexts.push(this)}
    setPixelRatio(){} setSize(){} render(){renders++}
  };
  win.ResizeObserver=class{observe(){}};
  Object.defineProperty($('workshopViewport'),'clientWidth',{value:900});
  Object.defineProperty($('workshopViewport'),'clientHeight',{value:480});
  win.PC_APP.setView('workshop');assert.equal(contexts.length,1);
  click('workshopDisassemble');
  await new Promise(resolve=>setTimeout(resolve,900));
  assert.ok(renders>4);assert.equal($('workshopFallback').hidden,true);
  click('workshopZoomIn');click('workshopTop');click('workshopIsolate');click('workshopReset');
  win.PC_APP.setView('builder');const paused=renders;
  await new Promise(resolve=>setTimeout(resolve,60));assert.equal(renders,paused);
  win.PC_APP.setView('workshop');assert.equal(contexts.length,1);
  const canvas=contexts[0].domElement;
  canvas.dispatchEvent(new win.Event('webglcontextlost',{cancelable:true}));assert.equal($('workshopFallback').hidden,false);
  canvas.dispatchEvent(new win.Event('webglcontextrestored'));assert.equal($('workshopFallback').hidden,true);
  assert.deepEqual(errors,[]);win.PC_WORKSHOP.leave();dom.window.close();
});
