const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const T=require('../vendor/three.min.js');
require('../catalog.js');require('../cpus.js');require('../catalog-extended.js');
require('../hardware.js');require('../workshop-data.js');require('../workshop-components.js');require('../workshop-lessons.js');require('../workshop-models.js');
const D=PC_CATALOG,W=PC_WORKSHOP_DATA,F=PC_FORMAT;
const root=path.join(__dirname,'..');

test('all catalog records generate finite selectable 3D geometry',()=>{
  let count=0;
  for(const category of Object.keys(D))for(const item of D[category]){
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
  assert.equal(count,Object.values(D).flat().length);
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
  assert.ok(W.profile(D.cpu[0],'cpu').parts.some(p=>p.id==='cores'));
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
  for(const file of ['catalog.js','cpus.js','catalog-extended.js','i18n.js','hardware.js','glossary.js','engine.js','viewer.js','workshop-data.js','workshop-components.js','workshop-lessons.js','workshop-models.js','app.js','workshop.js'])win.eval(fs.readFileSync(path.join(root,file),'utf8'));
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
  const {dom,win,$,click,change,errors}=application();
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
  click('workshopOperation');change('workshopRate','2');click('workshopPlay');
  await new Promise(resolve=>setTimeout(resolve,2300));assert.ok(win.PC_WORKSHOP.getState().lessonIndex>0);click('workshopPlay');
  for(const cat of Object.keys(win.PC_CATALOG)){change('workshopCategory',cat);for(const channel of win.PC_WORKSHOP_LESSONS.channels(cat)){change('workshopChannel',channel);click('workshopLessonNext')}click('workshopDisassemble');click('workshopXray')}
  click('workshopAnatomy');
  win.PC_APP.setView('builder');const paused=renders;
  await new Promise(resolve=>setTimeout(resolve,60));assert.equal(renders,paused);
  win.PC_APP.setView('workshop');assert.equal(contexts.length,1);
  const canvas=contexts[0].domElement;
  canvas.dispatchEvent(new win.Event('webglcontextlost',{cancelable:true}));assert.equal($('workshopFallback').hidden,false);
  canvas.dispatchEvent(new win.Event('webglcontextrestored'));assert.equal($('workshopFallback').hidden,true);
  assert.deepEqual(errors,[]);win.PC_WORKSHOP.leave();dom.window.close();
});

test('every CPU can be chosen through desktop or explicit educational selection',()=>{
 const {dom,win,$,click,change,errors}=application(),initial=win.PC_APP.getBuild();
 for(const cpu of win.PC_CATALOG.cpu){
  win.PC_APP.setBuild(initial);win.PC_APP.selectComponent('cpu',cpu.id);
  if(cpu.buildable===false){
   assert.equal($('modal').hidden,false,cpu.name);assert.notEqual(win.PC_APP.getBuild().cpu,cpu.id);
   assert.ok($('chooseStudy'));click('chooseStudy');
   assert.equal(win.PC_APP.getBuild().mode,'study');assert.equal(win.PC_APP.getChecks().ok,false);
   assert.match($('compatStatus').textContent,/Maqueta educativa/);assert.equal($('fitFilter').disabled,true);
  }else assert.equal(win.PC_APP.getBuild().mode,'desktop');
  assert.equal(win.PC_APP.getBuild().cpu,cpu.id,cpu.name);
 }
 change('assemblyMode','desktop');assert.equal($('fitFilter').disabled,false);
 assert.deepEqual(errors,[]);dom.window.close();
});

test('filters explain hidden CPUs and can be cleared without changing the build',()=>{
 const {dom,win,$,click,errors}=application();
 win.document.querySelector('[data-cat="cpu"]').click();
 $('fitFilter').checked=true;$('fitFilter').dispatchEvent(new win.Event('change'));
 assert.equal($('filterNotice').hidden,false);const restricted=win.document.querySelectorAll('[data-select]').length;
 click('showEveryModel');assert.equal($('fitFilter').checked,false);assert.ok(win.document.querySelectorAll('[data-select]').length>restricted);
 assert.ok([...win.document.querySelectorAll('[data-select]')].every(b=>!b.disabled));
 assert.deepEqual(errors,[]);dom.window.close();
});

test('mobile CPU details and workshop keep the same selection path',()=>{
 const {dom,win,$,click,change,errors}=application();const cpu=win.PC_CATALOG.cpu.find(x=>x.buildable===false);
 win.document.querySelector('[data-cat="cpu"]').click();win.document.querySelector(`[data-details="${cpu.id}"]`).click();click('detailSelect');
 assert.equal($('modal').hidden,false);assert.ok($('chooseStudy'));click('studyInspect');
 assert.equal(win.PC_WORKSHOP.getState().category,'cpu');assert.equal(win.PC_WORKSHOP.getState().id,cpu.id);
 click('workshopUse');assert.ok($('chooseStudy'));click('chooseStudy');assert.equal(win.PC_APP.getBuild().cpu,cpu.id);
 assert.deepEqual(errors,[]);dom.window.close();
});

test('educational mode survives export/import validation and old builds remain desktop',()=>{
 const {dom,win}=application(),E=win.PC_ENGINE,base=win.PC_APP.getBuild();
 const old=JSON.parse(JSON.stringify(base));delete old.mode;assert.equal(E.validateBuild(old).mode,'desktop');
 assert.equal(E.validateBuild({...base,mode:'study'}).mode,'study');assert.throws(()=>E.validateBuild({...base,mode:'invalid'}));
 assert.equal(E.compatibleCandidate({...base,mode:'study'},'cpu',win.PC_CATALOG.cpu.find(x=>x.buildable===false)),true);
 dom.window.close();
});

test('conceptual separation exposes bare RAM and CPU parts only when explicitly enabled',()=>{
 for(const category of Object.keys(D))for(const item of D[category]){
  const p=W.profile(item,category),m=PC_WORKSHOP_MODELS.create(T,p);
  for(const part of p.parts){
   assert.deepEqual(W.offset(part,0,true),[0,0,0]);
   const pos=W.offset(part,p.max+1,true,2);assert.ok(pos.every(Number.isFinite));m.parts[part.id].position.set(...pos);
   if(!part.step)assert.deepEqual(W.offset(part,p.max+1,false),[0,0,0]);
  }
  const box=new T.Box3().setFromObject(m.group);assert.ok(box.getSize(new T.Vector3()).length()<35,item.name);
  PC_WORKSHOP_MODELS.dispose(m.group);
 }
 const {dom,win,$,click,change}=application();const ram=win.PC_CATALOG.ram.find(x=>x.memory==='DDR (DDR1)');win.PC_WORKSHOP.open(ram.id);
 assert.equal($('workshopDisassemble').disabled,true);$('workshopConceptual').checked=true;$('workshopConceptual').dispatchEvent(new win.Event('change'));
 assert.equal($('workshopDisassemble').disabled,false);click('workshopDisassemble');assert.equal(win.PC_WORKSHOP.getState().progress,1);
 $('workshopRange').value='.4';$('workshopRange').dispatchEvent(new win.Event('input'));assert.equal(win.PC_WORKSHOP.getState().progress,.4);
 $('workshopConceptual').checked=false;$('workshopConceptual').dispatchEvent(new win.Event('change'));assert.equal(win.PC_WORKSHOP.getState().progress,0);
 dom.window.close();
});

test('functional paths only refer to real model parts and explain every category in three languages',()=>{
 for(const category of Object.keys(D))for(const item of D[category]){
  const p=W.profile(item,category),ids=new Set(p.parts.map(x=>x.id));
  for(const channel of PC_WORKSHOP_LESSONS.channels(category)){
   const lesson=PC_WORKSHOP_LESSONS.get(p,channel);assert.ok(lesson.length>0,category+' '+channel);
   for(const step of lesson){assert.ok(ids.has(step.from),step.from);assert.ok(ids.has(step.to),step.to);for(const text of [step.title,step.body])assert.ok(text.length===3&&text.every(t=>t.length>0));}
  }
 }
 const {dom,win,$,click,change,errors}=application();win.PC_APP.setView('workshop');const before=JSON.stringify(win.PC_APP.getBuild());
 click('workshopOperation');assert.equal($('workshopFunction').hidden,false);assert.match($('workshopLessonTitle').textContent,/Órdenes/);
 click('workshopLessonNext');assert.equal(win.PC_WORKSHOP.getState().lessonIndex,1);
 change('workshopChannel','power');assert.equal(win.PC_WORKSHOP.getState().lessonIndex,0);assert.match($('workshopLessonTitle').textContent,/alimentación/);
 change('language','en');assert.match($('workshopLessonTitle').textContent,/Regulate/);
 for(const category of Object.keys(D)){change('workshopCategory',category);assert.ok($('workshopLessonBody').textContent.length>15);click('workshopLessonNext')}
 assert.equal(JSON.stringify(win.PC_APP.getBuild()),before);assert.deepEqual(errors,[]);dom.window.close();
});

test('deep link from CPU Lab chooses a desktop CPU without discarding the other build parts',()=>{
 const {dom,win,$,errors}=application(),cpu=win.PC_CATALOG.cpu.find(x=>x.name==='Core i7-14700K'),before=win.PC_APP.getBuild();
 win.history.replaceState(null,'','#'+new win.URLSearchParams({cpu:cpu.id,action:'choose',lang:'en'}));win.dispatchEvent(new win.Event('hashchange'));
 assert.equal(win.PC_APP.getBuild().cpu,cpu.id);assert.equal(win.PC_APP.getBuild().gpu,before.gpu);assert.equal(win.document.documentElement.lang,'en');
 win.history.replaceState(null,'','#'+new win.URLSearchParams({cpu:cpu.id,action:'inspect'}));win.dispatchEvent(new win.Event('hashchange'));
 assert.equal(win.PC_WORKSHOP.getState().id,cpu.id);assert.equal($('workshopView').hidden,false);assert.deepEqual(errors,[]);dom.window.close();
});
