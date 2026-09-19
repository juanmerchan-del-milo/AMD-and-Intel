(function(){
'use strict';
const $=id=>document.getElementById(id),D=PC_WORKSHOP_DATA,F=PC_FORMAT,L=PC_WORKSHOP_LESSONS;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lang=()=>document.documentElement.lang||'es',t=key=>D.tr(key,lang()),lt=value=>L.value(value,lang());
let category='gpu',item=null,profile=null,progress=0,selected='pcb',isolated=false,covered=true,active=false,viewer=null,attempted=false;
let conceptual=false,spacing=1,mode='anatomy',channel='data',lessonIndex=0,playing=false,rate=1,phase=0,labels=false,xray=false,expanded=false;
let quality='high';try{quality=localStorage.getItem('pc-lab-workshop-quality')||'high'}catch{}if(!['high','balanced','low'].includes(quality))quality='high';
const maxLayers=()=>profile?profile.max+(conceptual?1:0):0;
const lessons=()=>profile?L.get(profile,channel):[];
function createViewer(){
 const host=$('workshopViewport');if(!window.THREE||!THREE.OrbitControls)return null;
 const T=THREE,scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.04,240);let renderer;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'})}catch{return null}
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
 const canvas=renderer.domElement;canvas.setAttribute('aria-hidden','true');host.prepend(canvas);
 let model=null,shown=0,target=0,raf=0,last=0,insideFrame=false,enabled=false,onscreen=true,auto=false,lost=false,highlight=null,flow=null,flowCurve=null;
 const originalMaterials=new Set(),anchors={},reduce=matchMedia('(prefers-reduced-motion:reduce)');
 const controls=new T.OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.17;controls.enablePan=true;controls.screenSpacePanning=true;controls.rotateSpeed=.8;controls.zoomSpeed=2.25;controls.minDistance=.5;controls.maxDistance=70;
 scene.add(new T.HemisphereLight(0xe4f4ff,0x303640,2.1));
 for(const [color,intensity,pos] of [[0xffffff,3.1,[3,8,6]],[0x8ccbd4,1.5,[-5,2,2]],[0xaac0ff,2,[1,3,-5]]]){const light=new T.DirectionalLight(color,intensity);light.position.set(...pos);scene.add(light)}
 const grid=new T.GridHelper(24,48,0x3e5664,0x20343e);grid.position.y=-3;grid.material.transparent=true;grid.material.opacity=.2;scene.add(grid);
 function invalidate(){if(!raf&&!insideFrame&&enabled&&onscreen&&!document.hidden&&!lost)raf=requestAnimationFrame(frame)}
 function positionOf(id){return anchors[id].clone().add(model.parts[id].position)}
 function clearFlow(){if(flow){scene.remove(flow);PC_WORKSHOP_MODELS.dispose(flow);flow=null;flowCurve=null}}
 function path(){
  clearFlow();if(!model||mode!=='operation'||isolated)return;
  const step=lessons()[lessonIndex];if(!step||!model.parts[step.from]||!model.parts[step.to])return;
  const a=positionOf(step.from),b=positionOf(step.to),middle=a.clone().lerp(b,.5);middle.y+=Math.max(.5,a.distanceTo(b)*.22);
  flowCurve=new T.CatmullRomCurve3([a,middle,b]);flow=new T.Group();scene.add(flow);
  const color={data:0x87f3dd,power:0xffcd73,heat:0xff9580}[channel],material=new T.MeshBasicMaterial({color,transparent:true,opacity:.7,depthTest:false,depthWrite:false});
  const line=new T.Mesh(new T.TubeGeometry(flowCurve,40,.018,6,false),material);line.renderOrder=8;flow.add(line);
  for(const u of [.34,.68]){const arrow=new T.ArrowHelper(flowCurve.getTangent(u).normalize(),flowCurve.getPoint(u),.22,color,.16,.11);arrow.line.material.depthTest=false;arrow.cone.material.depthTest=false;arrow.renderOrder=9;flow.add(arrow)}
  flow.userData.dots=[];
  for(let n=0;n<4;n++){const dot=new T.Mesh(new T.SphereGeometry(.049,12,8),new T.MeshBasicMaterial({color,depthTest:false,depthWrite:false}));dot.renderOrder=10;flow.add(dot);flow.userData.dots.push(dot)}
  animateFlow();
 }
 function animateFlow(){if(!flowCurve)return;flow.userData.dots.forEach((dot,n)=>dot.position.copy(flowCurve.getPoint((phase*.42+n/4)%1)))}
 function pose(){if(!model)return;profile.parts.forEach(p=>model.parts[p.id].position.set(...D.offset(p,shown,conceptual,spacing)));model.group.updateMatrixWorld(true);highlight?.update();path()}
 function renderLabels(){
  const layer=$('workshopLabels');layer.hidden=!labels;if(!labels||!model)return;
  const w=host.clientWidth,h=host.clientHeight,occupied=[];
  camera.updateMatrixWorld();
  for(const button of layer.children){
   const id=button.dataset.label,part=model.parts[id];if(!part||!part.visible){button.hidden=true;continue}
   const pos=positionOf(id).project(camera),x=(pos.x+1)*w/2,y=(1-pos.y)*h/2;
   const off=pos.z>1||pos.z< -1||x<20||x>w-20||y<14||y>h-14,overlap=occupied.some(a=>Math.abs(a.x-x)<118&&Math.abs(a.y-y)<29);
   button.hidden=off||(overlap&&id!==selected);if(button.hidden)continue;
   button.style.left=x+'px';button.style.top=y+'px';occupied.push({x,y});button.classList.toggle('selected',id===selected);
  }
 }
 function frame(time){
  raf=0;if(!enabled||!onscreen||document.hidden||lost)return;insideFrame=true;
  const dt=Math.min((time-last)/1000||.016,.05);last=time;const moving=Math.abs(shown-target)>.001;
  if(moving){shown=reduce.matches?target:shown+(target-shown)*(1-Math.exp(-17*dt));if(Math.abs(shown-target)<.001)shown=target;pose()}
  const running=mode==='operation'&&playing&&!reduce.matches;
  if(running){phase+=dt*rate;if(phase>=4){phase%=4;setLesson((lessonIndex+1)%lessons().length,false)}animateFlow();if(model){model.fans.forEach(f=>f.rotation.y-=dt*rate*4);model.spinners.forEach(s=>s.node.rotation[s.axis]+=dt*rate*1.6)}}
  controls.autoRotate=auto&&!reduce.matches;controls.autoRotateSpeed=.7;const changed=controls.update();renderLabels();renderer.render(scene,camera);
  insideFrame=false;if(moving||changed||controls.autoRotate||running)invalidate();
 }
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(quality==='high'?Math.min(Math.max(devicePixelRatio||1,1.5),2):Math.min(devicePixelRatio||1,quality==='low'?1:1.4));renderer.setSize(w,h,false);invalidate()}
 function clearHighlight(){if(highlight){scene.remove(highlight);highlight.geometry.dispose();highlight.material.dispose();highlight=null}}
 function focusPart(){if(!model)return;clearHighlight();Object.entries(model.parts).forEach(([id,g])=>g.visible=!isolated||id===selected);if(model.parts[selected]){highlight=new T.BoxHelper(model.parts[selected],0x91efce);highlight.material.transparent=true;highlight.material.opacity=.45;scene.add(highlight)}path();invalidate()}
 function reset(direction='iso'){
  if(!model)return;
  const bounds=new T.Box3();model.group.updateMatrixWorld(true);
  for(const part of profile.parts){if(isolated&&part.id!==selected)continue;const box=new T.Box3().setFromObject(model.parts[part.id]);bounds.union(box);if(!isolated){const delta=new T.Vector3(...D.offset(part,maxLayers(),conceptual,spacing)).sub(model.parts[part.id].position);bounds.union(box.clone().translate(delta))}}
  const size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3()),radius=Math.max(.3,size.length()/2);
  const halfFov=Math.min(camera.fov*Math.PI/360,Math.atan(Math.tan(camera.fov*Math.PI/360)*camera.aspect)),distance=Math.max(2,radius/Math.sin(halfFov)*1.04);
  const vector=direction==='top'?new T.Vector3(.001,1,.001):direction==='bottom'?new T.Vector3(.001,-1,.001):profile.category==='ram'?new T.Vector3(2,1.2,8):new T.Vector3(5,4.5,6.8);
  camera.position.copy(center).addScaledVector(vector.normalize(),Math.min(69,distance));controls.target.copy(center);controls.update();invalidate();
 }
 function applyXray(){
  if(!model)return;
  for(const id of ['shroud','heatsink','backplate','lid','cover','spreaderFront','spreaderBack','strip','panel','front']){
   model.parts[id]?.traverse(node=>{if(!node.material)return;for(const m of Array.isArray(node.material)?node.material:[node.material]){m.transparent=xray||m.userData.originalTransparent;m.opacity=xray?.16:m.userData.originalOpacity;m.depthWrite=xray?false:m.userData.originalDepthWrite;m.needsUpdate=true}});
  }invalidate();
 }
 const ray=new T.Raycaster(),pointer=new T.Vector2(),touches=new Set();let down=null;
 canvas.addEventListener('pointerdown',event=>{touches.add(event.pointerId);down=touches.size===1?{id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now()}:null});
 canvas.addEventListener('pointercancel',event=>{touches.delete(event.pointerId);down=null});
 canvas.addEventListener('pointerup',event=>{
  touches.delete(event.pointerId);const start=down;down=null;if(!start||start.id!==event.pointerId||Math.hypot(event.clientX-start.x,event.clientY-start.y)>7||performance.now()-start.time>600||!model)return;
  const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,1-(event.clientY-r.top)/r.height*2);ray.setFromCamera(pointer,camera);
  for(const hit of ray.intersectObjects(model.group.children,true)){let node=hit.object,part=null,visible=true;while(node){if(!node.visible)visible=false;if(node.userData.part)part=node.userData.part;node=node.parent}if(part&&visible){selectPart(part);break}}
 });
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;$('workshopFallback').hidden=false;if(raf)cancelAnimationFrame(raf);raf=0});
 canvas.addEventListener('webglcontextrestored',()=>{lost=false;$('workshopFallback').hidden=true;resize();invalidate()});
 controls.addEventListener('change',invalidate);controls.addEventListener('start',invalidate);
 if(window.ResizeObserver)new ResizeObserver(resize).observe(host);else addEventListener('resize',resize);
 if(window.IntersectionObserver)new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;if(onscreen){last=0;invalidate()}else if(raf){cancelAnimationFrame(raf);raf=0}}).observe(host);
 document.addEventListener('visibilitychange',()=>{last=0;if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0}else invalidate()});
 reduce.addEventListener?.('change',()=>{if(reduce.matches){playing=false;renderLesson()}invalidate()});
 return {
  load(){clearHighlight();clearFlow();if(model){scene.remove(model.group);PC_WORKSHOP_MODELS.dispose(model.group);originalMaterials.forEach(m=>m.dispose());originalMaterials.clear()}model=PC_WORKSHOP_MODELS.create(T,profile);scene.add(model.group);
   for(const id of Object.keys(anchors))delete anchors[id];
   for(const [id,g]of Object.entries(model.parts)){g.updateWorldMatrix(true,true);anchors[id]=new T.Box3().setFromObject(g).getCenter(new T.Vector3());
    g.traverse(node=>{if(!node.material)return;const clone=old=>{originalMaterials.add(old);const m=old.clone();m.userData={originalOpacity:old.opacity,originalTransparent:old.transparent,originalDepthWrite:old.depthWrite};return m};node.material=Array.isArray(node.material)?node.material.map(clone):clone(node.material)});
   }
   shown=target=progress;pose();resize();focusPart();applyXray();reset();
  },
  progress(value){target=value;invalidate()},pose(){pose();invalidate()},select(){focusPart();if(isolated)reset()},reset,
  zoom(factor){const delta=camera.position.clone().sub(controls.target),d=T.MathUtils.clamp(delta.length()*factor,controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).addScaledVector(delta.normalize(),d);controls.update();invalidate()},
  auto(value){auto=value;invalidate()},quality(){resize()},xray:applyXray,lesson(){path();invalidate()},invalidate,
  active(value){enabled=value;last=0;if(!value&&raf){cancelAnimationFrame(raf);raf=0}if(value){resize();invalidate()}},
  get lowPower(){return quality==='low'}
 };
}
function renderModels(){
 $('workshopCategory').value=category;
 $('workshopModel').innerHTML=PC_CATALOG[category].map(row=>`<option value="${esc(row.id)}">${esc(row.brand==='Profile'?'':row.brand+' ')}${esc(F.name(row,lang()))}</option>`).join('');if(item)$('workshopModel').value=item.id;
}
function renderLesson(){
 $('workshopFunction').hidden=mode!=='operation';$('workshopAnatomy').setAttribute('aria-pressed',String(mode==='anatomy'));$('workshopOperation').setAttribute('aria-pressed',String(mode==='operation'));
 if(!profile)return;
 const rows=lessons();lessonIndex=Math.max(0,Math.min(lessonIndex,rows.length-1));const step=rows[lessonIndex];
 $('workshopChannel').innerHTML=L.channels(category).map(c=>`<option value="${c}">${esc(t(c))}</option>`).join('');$('workshopChannel').value=channel;
 $('workshopLessonSteps').innerHTML=rows.map((s,n)=>`<button data-lesson="${n}" aria-pressed="${n===lessonIndex}" title="${esc(lt(s.title))}">${n+1}</button>`).join('');
 $('workshopLessonTitle').textContent=step?`${lessonIndex+1}. ${lt(step.title)}`:'';$('workshopLessonBody').textContent=step?lt(step.body):'';
 $('workshopPlay').textContent=t(playing?'pause':'play');$('workshopPlay').setAttribute('aria-pressed',String(playing));$('workshopLessonPrev').disabled=lessonIndex===0;$('workshopLessonNext').disabled=lessonIndex===rows.length-1;
 $('workshopIsolatedFlow').hidden=!isolated;
}
function render(){
 if(!profile)return;
 $('workshopName').textContent=F.name(item,lang());
 $('workshopSpecs').textContent=category==='gpu'?`${item.brand} · ${F.capacity(item.vram,'memory',lang())} ${item.memory} · ${item.arch}`:category==='ram'?`${item.form} · ${item.memory} · ${item.speed} MT/s · ${item.modules} × ${F.capacity(item.capacity/item.modules,'memory',lang())}`:category==='cpu'?`${item.brand} · ${item.cores}C / ${item.threads}T · ${item.socket} · ${item.npu||''}`:`${item.brand==='Profile'?t('family'):item.brand} · ${item.form||item.type||item.socket||''}`;
 const max=maxLayers();$('workshopRange').max=max||1;$('workshopRange').value=progress;$('workshopRange').disabled=!max;
 const label=`${F.number(progress,lang())} / ${max}`;$('workshopRange').setAttribute('aria-valuetext',label);$('workshopOutput').textContent=label;
 const part=profile.parts.find(p=>p.id===profile.steps[Math.max(0,Math.ceil(progress)-1)]);
 $('workshopStatus').textContent=conceptual&&progress>profile.max?t('conceptualStep'):progress===0?t(max?'complete':'bare'):progress>=max?t('open'):`${t('progress')} ${Math.ceil(progress)}: ${part?t(part.key):''}`;
 $('workshopPrev').disabled=progress===0;$('workshopNext').disabled=progress>=max;$('workshopAssemble').disabled=progress===0;$('workshopDisassemble').disabled=!max||progress>=max;
 $('workshopIsolate').setAttribute('aria-pressed',String(isolated));$('workshopIsolate').textContent=t(isolated?'showAll':'focus');
 $('workshopConceptual').checked=conceptual;$('workshopConceptualNote').hidden=!conceptual;$('workshopSpacingValue').textContent=F.number(spacing,lang())+'×';
 $('workshopKitNote').hidden=category!=='ram';$('workshopCoverLabel').hidden=category!=='ram'||item.form!=='UDIMM'||!['DDR4','DDR5'].includes(item.memory);
 for(const [id,url]of [['workshopReference',item.source],['workshopSource',profile.source]]){$(id).hidden=!url;if(url)$(id).href=url}
 $('workshopParts').innerHTML=profile.parts.map((p,n)=>`<button type="button" data-part="${p.id}" aria-pressed="${selected===p.id}"><span>${String(n+1).padStart(2,'0')}</span>${esc(t(p.key))}<small>${p.step&&progress>=p.step?'↗':''}</small></button>`).join('');
 const current=profile.parts.find(p=>p.id===selected)||profile.parts[0];$('workshopPartName').textContent=t(current.key);$('workshopPartText').textContent=t(current.desc);
 $('workshopLabels').innerHTML=profile.parts.map(p=>`<button type="button" data-label="${p.id}">${esc(t(p.key))}</button>`).join('');$('workshopLabels').hidden=!labels;
 for(const [id,value] of [['workshopLabelsToggle',labels],['workshopXray',xray],['workshopHD',quality==='high'],['workshopLow',quality==='low']])$(id).setAttribute('aria-pressed',String(value));
 renderLesson();viewer?.invalidate();
}
function selectPart(id){if(!profile.parts.some(p=>p.id===id))return;selected=id;render();viewer?.select()}
function setProgress(value){if(!profile)return;const n=Number(value);if(!Number.isFinite(n))return;progress=Math.max(0,Math.min(maxLayers(),n));isolated=false;render();viewer?.select();viewer?.progress(progress)}
function setLesson(index,restart=true){const rows=lessons();if(!rows.length)return;lessonIndex=Math.max(0,Math.min(rows.length-1,index));if(restart)phase=0;selected=rows[lessonIndex].to;render();viewer?.select();viewer?.lesson()}
function setMode(next){mode=next;if(next==='operation'){isolated=false;xray=true;setLesson(lessonIndex);viewer?.xray()}else{playing=false;xray=false;viewer?.xray();viewer?.lesson()}render()}
function load(id){
 item=PC_CATALOG[category].find(row=>row.id===id)||PC_CATALOG[category][0];profile=D.profile(item,category,covered);progress=0;selected='pcb';isolated=false;phase=0;playing=false;lessonIndex=0;
 const channels=L.channels(category);if(!channels.includes(channel))channel=channels[0];renderModels();render();viewer?.load();
}
function translate(){document.querySelectorAll('[data-w]').forEach(el=>el.textContent=t(el.dataset.w));$('workshopViewport').setAttribute('aria-label',t('workshop'));$('workshopExpand').textContent=t(expanded?'collapse':'expand');renderModels();render()}
function enter(){active=true;let created=false;if(!attempted){attempted=true;viewer=createViewer();created=!!viewer;$('workshopFallback').hidden=!!viewer}if(!item)load(PC_APP.getBuild()[category]);else if(created)viewer.load();viewer?.active(true);translate()}
$('workshopCategory').onchange=()=>{category=$('workshopCategory').value;const selected=PC_APP.getBuild()[category];load(Array.isArray(selected)?selected[0]:selected)};
$('workshopModel').onchange=()=>load($('workshopModel').value);
$('workshopParts').onclick=e=>{const b=e.target.closest('[data-part]');if(b)selectPart(b.dataset.part)};
$('workshopLabels').onclick=e=>{const b=e.target.closest('[data-label]');if(b)selectPart(b.dataset.label)};
$('workshopRange').oninput=e=>setProgress(e.target.value);
$('workshopPrev').onclick=()=>setProgress(Math.ceil(progress)-1);$('workshopNext').onclick=()=>setProgress(Math.floor(progress)+1);
$('workshopAssemble').onclick=()=>setProgress(0);$('workshopDisassemble').onclick=()=>setProgress(maxLayers());
$('workshopConceptual').onchange=e=>{conceptual=e.target.checked;setProgress(Math.min(progress,maxLayers()));viewer?.pose();viewer?.reset()};
$('workshopSpacing').oninput=e=>{spacing=Number(e.target.value);$('workshopSpacingValue').textContent=F.number(spacing,lang())+'×';viewer?.pose()};$('workshopSpacing').onchange=()=>viewer?.reset();
$('workshopIsolate').onclick=()=>{isolated=!isolated;render();viewer?.select();viewer?.reset()};
$('workshopReset').onclick=()=>viewer?.reset();$('workshopTop').onclick=()=>viewer?.reset('top');$('workshopBottom').onclick=()=>viewer?.reset('bottom');
$('workshopZoomIn').onclick=()=>viewer?.zoom(.78);$('workshopZoomOut').onclick=()=>viewer?.zoom(1.28);
$('workshopRotate').onclick=()=>{const v=$('workshopRotate').getAttribute('aria-pressed')!=='true';$('workshopRotate').setAttribute('aria-pressed',String(v));viewer?.auto(v)};
function setQuality(next){quality=next;try{localStorage.setItem('pc-lab-workshop-quality',next)}catch{}render();viewer?.quality()}
$('workshopLow').onclick=()=>setQuality(quality==='low'?'balanced':'low');$('workshopHD').onclick=()=>setQuality(quality==='high'?'balanced':'high');
$('workshopLabelsToggle').onclick=()=>{labels=!labels;render()};$('workshopXray').onclick=()=>{xray=!xray;render();viewer?.xray()};
$('workshopAnatomy').onclick=()=>setMode('anatomy');$('workshopOperation').onclick=()=>setMode('operation');
$('workshopChannel').onchange=e=>{channel=e.target.value;setLesson(0)};
$('workshopLessonSteps').onclick=e=>{const b=e.target.closest('[data-lesson]');if(b)setLesson(Number(b.dataset.lesson))};
$('workshopLessonPrev').onclick=()=>setLesson(lessonIndex-1);$('workshopLessonNext').onclick=()=>setLesson(lessonIndex+1);
$('workshopPlay').onclick=()=>{playing=!playing;if(matchMedia('(prefers-reduced-motion:reduce)').matches){playing=false;setLesson((lessonIndex+1)%lessons().length)}renderLesson();viewer?.invalidate()};
$('workshopRate').onchange=e=>{rate=Number(e.target.value)};
$('workshopExpand').onclick=()=>{expanded=!expanded;$('workshopView').classList.toggle('expanded',expanded);$('workshopExpand').textContent=t(expanded?'collapse':'expand');$('workshopExpand').setAttribute('aria-pressed',String(expanded));requestAnimationFrame(()=>viewer?.reset())};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded)$('workshopExpand').click()});
$('workshopCover').onchange=e=>{covered=e.target.checked;load(item.id)};
$('workshopUse').onclick=()=>{PC_APP.selectComponent(category,item.id);if($('modal').hidden)PC_APP.setView('builder')};
$('workshopBack').onclick=()=>PC_APP.setView('builder');
window.PC_WORKSHOP={enter,translate,leave(){active=false;viewer?.active(false)},open(id){const cat=PC_ENGINE.categories.find(c=>PC_CATALOG[c].some(row=>row.id===id));if(!cat)return;category=cat;PC_APP.setView('workshop');load(id);$('workshopView').scrollIntoView({block:'start',behavior:'auto'})},getState:()=>({category,id:item?.id,progress,selected,isolated,active,parts:profile?.parts.map(p=>p.id),layers:maxLayers(),conceptual,spacing,mode,channel,lessonIndex,lessonCount:lessons().length,playing,quality})};
translate();
})();
