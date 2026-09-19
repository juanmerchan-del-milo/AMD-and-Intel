(function(){
  'use strict';
  const $=id=>document.getElementById(id),D=PC_WORKSHOP_DATA,F=PC_FORMAT;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let category='gpu',item=null,profile=null,progress=0,selected='pcb',isolated=false,covered=true,active=false,viewer=null,attempted=false;
  const lang=()=>document.documentElement.lang||'es',t=key=>D.tr(key,lang());
  function createViewer(){
    const host=$('workshopViewport');
    if(!window.THREE||!THREE.OrbitControls)return null;
    const T=THREE,scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.08,100);
    let renderer;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'default'})}catch{return null}
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
    const canvas=renderer.domElement;canvas.setAttribute('aria-hidden','true');host.prepend(canvas);
    let model=null,shown=0,target=0,raf=0,last=0,insideFrame=false,enabled=false,onscreen=true,auto=false,lost=false;
    let low=matchMedia('(pointer:coarse)').matches||innerWidth<760;
    const reduce=matchMedia('(prefers-reduced-motion:reduce)');
    const controls=new T.OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.13;controls.enablePan=false;controls.rotateSpeed=.75;controls.zoomSpeed=1.8;controls.minDistance=1.2;controls.maxDistance=28;
    scene.add(new T.HemisphereLight(0xe4f4ff,0x303640,2.1));
    for(const [color,intensity,pos] of [[0xffffff,3.1,[3,8,6]],[0x8ccbd4,1.5,[-5,2,2]],[0xaac0ff,2,[1,3,-5]]]){const light=new T.DirectionalLight(color,intensity);light.position.set(...pos);scene.add(light)}
    const grid=new T.GridHelper(16,32,0x3e5664,0x20343e);grid.position.y=-1.6;grid.material.transparent=true;grid.material.opacity=.2;scene.add(grid);
    let highlight=null;
    function invalidate(){if(!raf&&!insideFrame&&enabled&&onscreen&&!document.hidden&&!lost)raf=requestAnimationFrame(frame)}
    function pose(){if(!model)return;profile.parts.forEach(p=>model.parts[p.id].position.set(...D.offset(p,shown)));if(highlight)highlight.update()}
    function frame(time){
      raf=0;if(!enabled||!onscreen||document.hidden||lost)return;insideFrame=true;
      const dt=Math.min((time-last)/1000||.016,.05);last=time;
      const moving=Math.abs(shown-target)>.001;
      if(moving){shown=reduce.matches?target:shown+(target-shown)*(1-Math.exp(-14*dt));if(Math.abs(shown-target)<.001)shown=target;pose()}
      controls.autoRotate=auto&&!reduce.matches;controls.autoRotateSpeed=.8;
      const changed=controls.update();renderer.render(scene,camera);
      insideFrame=false;if(moving||changed||controls.autoRotate)invalidate();
    }
    function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,low?1:1.5));renderer.setSize(w,h,false);invalidate()}
    function clearHighlight(){if(highlight){scene.remove(highlight);highlight.geometry.dispose();highlight.material.dispose();highlight=null}}
    function focusPart(){
      if(!model)return;clearHighlight();
      Object.entries(model.parts).forEach(([id,g])=>g.visible=!isolated||id===selected);
      if(selected&&model.parts[selected]){highlight=new T.BoxHelper(model.parts[selected],0x91efce);highlight.material.transparent=true;highlight.material.opacity=.55;scene.add(highlight)}
      invalidate();
    }
    function reset(direction='iso'){
      if(!model)return;
      const object=isolated?model.parts[selected]:model.group;
      object.updateWorldMatrix(true,true);const bounds=new T.Box3().setFromObject(object),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
      // Extra room covers the full exploded envelope and narrow mobile viewports.
      if(!isolated){size.y=Math.max(size.y,profile.category==='gpu'?5:5);size.z=Math.max(size.z,profile.category==='gpu'?3:3.5);center.y=profile.category==='gpu'?1:0}
      const radius=size.length()/2,halfFov=Math.min(camera.fov*Math.PI/360,Math.atan(Math.tan(camera.fov*Math.PI/360)*camera.aspect));
      const distance=Math.max(3,radius/Math.sin(halfFov)*.96),vector=direction==='top'?new T.Vector3(.01,1,.001):direction==='bottom'?new T.Vector3(.01,-1,.001):profile.category==='ram'?new T.Vector3(3,1.2,8):new T.Vector3(5,4.3,6.5);
      camera.position.copy(center).addScaledVector(vector.normalize(),Math.min(27,distance));controls.target.copy(center);controls.update();invalidate();
    }
    const ray=new T.Raycaster(),pointer=new T.Vector2(),touches=new Set();let down=null;
    canvas.addEventListener('pointerdown',event=>{touches.add(event.pointerId);down=touches.size===1?{id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now()}:null});
    canvas.addEventListener('pointercancel',event=>{touches.delete(event.pointerId);down=null});
    canvas.addEventListener('pointerup',event=>{
      touches.delete(event.pointerId);const start=down;down=null;
      if(!start||start.id!==event.pointerId||Math.hypot(event.clientX-start.x,event.clientY-start.y)>7||performance.now()-start.time>600||!model)return;
      const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,1-(event.clientY-r.top)/r.height*2);ray.setFromCamera(pointer,camera);
      for(const hit of ray.intersectObjects(model.group.children,true)){
        let node=hit.object,part=null,isVisible=true;
        while(node){if(!node.visible)isVisible=false;if(node.userData.part)part=node.userData.part;node=node.parent}
        if(part&&isVisible){selectPart(part);break}
      }
    });
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;$('workshopFallback').hidden=false;if(raf)cancelAnimationFrame(raf);raf=0});
    canvas.addEventListener('webglcontextrestored',()=>{lost=false;$('workshopFallback').hidden=true;resize();invalidate()});
    controls.addEventListener('change',invalidate);controls.addEventListener('start',invalidate);
    new ResizeObserver(resize).observe(host);
    if(window.IntersectionObserver)new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;if(onscreen)invalidate();else if(raf){cancelAnimationFrame(raf);raf=0}}).observe(host);
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0}else invalidate()});
    reduce.addEventListener?.('change',invalidate);
    return {
      load(){clearHighlight();if(model){scene.remove(model.group);PC_WORKSHOP_MODELS.dispose(model.group)}model=PC_WORKSHOP_MODELS.create(T,profile);scene.add(model.group);shown=target=progress;pose();resize();focusPart();reset()},
      progress(value){target=value;invalidate()},
      select(){focusPart();if(isolated)reset()},
      reset,
      zoom(factor){const offset=camera.position.clone().sub(controls.target),distance=T.MathUtils.clamp(offset.length()*factor,controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).addScaledVector(offset.normalize(),distance);controls.update();invalidate()},
      auto(value){auto=value;invalidate()},
      low(value){low=value;resize()},
      active(value){enabled=value;if(!value&&raf){cancelAnimationFrame(raf);raf=0}if(value){resize();invalidate()}},
      get lowPower(){return low}
    };
  }
  function renderModels(){
    $('workshopCategory').value=category;
    $('workshopModel').innerHTML=PC_CATALOG[category].map(row=>`<option value="${esc(row.id)}">${esc(row.brand==='Profile'?'':row.brand+' ')}${esc(F.name(row,lang()))}</option>`).join('');
    if(item)$('workshopModel').value=item.id;
  }
  function render(){
    if(!profile)return;
    $('workshopName').textContent=F.name(item,lang());
    $('workshopSpecs').textContent=category==='gpu'?`${item.brand} · ${F.capacity(item.vram,'memory',lang())} ${item.memory} · ${item.arch}`:`${item.form} · ${item.memory} · ${item.speed} MT/s · ${item.modules} × ${F.capacity(item.capacity/item.modules,'memory',lang())}`;
    $('workshopRange').max=profile.max||1;$('workshopRange').value=progress;$('workshopRange').disabled=!profile.max;
    $('workshopRange').setAttribute('aria-valuetext',`${progress} / ${profile.max}`);
    $('workshopOutput').textContent=`${progress} / ${profile.max}`;
    const label=progress===0?(profile.max?'complete':'bare'):progress===profile.max?'open':null;
    $('workshopStatus').textContent=label?t(label):`${t('progress')} ${progress}: ${t(profile.parts.find(p=>p.id===profile.steps[Math.ceil(progress)-1]).key)}`;
    $('workshopPrev').disabled=progress===0;$('workshopNext').disabled=progress===profile.max;
    $('workshopAssemble').disabled=!profile.max||progress===0;$('workshopDisassemble').disabled=!profile.max||progress===profile.max;
    $('workshopIsolate').setAttribute('aria-pressed',String(isolated));$('workshopIsolate').textContent=t(isolated?'showAll':'focus');
    $('workshopKitNote').hidden=category!=='ram';
    $('workshopCoverLabel').hidden=category!=='ram'||item.form!=='UDIMM'||!['DDR4','DDR5'].includes(item.memory);
    $('workshopReference').href=item.source;$('workshopSource').href=profile.source;
    $('workshopParts').innerHTML=profile.parts.map((part,index)=>`<button type="button" data-part="${part.id}" aria-pressed="${selected===part.id}"><span>${String(index+1).padStart(2,'0')}</span>${esc(t(part.key))}<small>${part.step&&progress>=part.step?'↗':''}</small></button>`).join('');
    const part=profile.parts.find(p=>p.id===selected)||profile.parts[0];
    $('workshopPartName').textContent=t(part.key);$('workshopPartText').textContent=t(part.desc);
  }
  function selectPart(id){if(!profile.parts.some(p=>p.id===id))return;selected=id;render();viewer?.select()}
  function setProgress(value){const n=Number(value);if(!Number.isFinite(n))return;progress=Math.max(0,Math.min(profile.max,Math.round(n)));isolated=false;render();viewer?.select();viewer?.progress(progress)}
  function load(id){
    item=PC_CATALOG[category].find(row=>row.id===id)||PC_CATALOG[category][0];
    profile=D.profile(item,category,covered);progress=0;selected='pcb';isolated=false;
    renderModels();render();viewer?.load();
  }
  function translate(){document.querySelectorAll('[data-w]').forEach(el=>el.textContent=t(el.dataset.w));$('workshopViewport').setAttribute('aria-label',t('workshop'));renderModels();render()}
  function enter(){
    active=true;
    if(!attempted){attempted=true;viewer=createViewer();$('workshopFallback').hidden=!!viewer;if(viewer)$('workshopLow').setAttribute('aria-pressed',String(viewer.lowPower));}
    if(!item)load(PC_APP.getBuild().gpu);else if(viewer&&!profile)load(item.id);
    viewer?.active(true);translate();
  }
  $('workshopCategory').onchange=()=>{category=$('workshopCategory').value;load(PC_APP.getBuild()[category])};
  $('workshopModel').onchange=()=>load($('workshopModel').value);
  $('workshopParts').onclick=event=>{const button=event.target.closest('[data-part]');if(button)selectPart(button.dataset.part)};
  $('workshopRange').oninput=event=>setProgress(event.target.value);
  $('workshopPrev').onclick=()=>setProgress(progress-1);$('workshopNext').onclick=()=>setProgress(progress+1);
  $('workshopAssemble').onclick=()=>setProgress(0);$('workshopDisassemble').onclick=()=>setProgress(profile.max);
  $('workshopIsolate').onclick=()=>{isolated=!isolated;render();viewer?.select();viewer?.reset()};
  $('workshopReset').onclick=()=>viewer?.reset();$('workshopTop').onclick=()=>viewer?.reset('top');$('workshopBottom').onclick=()=>viewer?.reset('bottom');
  $('workshopZoomIn').onclick=()=>viewer?.zoom(.8);$('workshopZoomOut').onclick=()=>viewer?.zoom(1.25);
  for(const [id,method] of [['workshopRotate','auto'],['workshopLow','low']])$(id).onclick=()=>{const value=$(id).getAttribute('aria-pressed')!=='true';$(id).setAttribute('aria-pressed',String(value));viewer?.[method](value)};
  $('workshopCover').onchange=event=>{covered=event.target.checked;load(item.id)};
  $('workshopUse').onclick=()=>{const next=PC_APP.getBuild();next[category]=item.id;PC_APP.setBuild(next);PC_APP.setView('builder')};
  $('workshopBack').onclick=()=>PC_APP.setView('builder');
  window.PC_WORKSHOP={
    enter,translate,
    leave(){active=false;viewer?.active(false)},
    open(id){const cat=['gpu','ram'].find(c=>PC_CATALOG[c].some(row=>row.id===id));if(!cat)return;category=cat;PC_APP.setView('workshop');load(id);$('workshopView').scrollIntoView({block:'start',behavior:'auto'})},
    getState:()=>({category,id:item?.id,progress,selected,isolated,active,parts:profile?.parts.map(p=>p.id),layers:profile?.max})
  };
  translate();
})();
