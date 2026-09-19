(function(){
'use strict';
window.createPCViewer=function(host,onSelect,onFailure){
 if(!window.THREE||!THREE.OrbitControls){onFailure();return null}
 const T=THREE;let renderer;
 try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'})}catch(e){onFailure();return null}
 const coarse=matchMedia('(pointer:coarse)').matches||innerWidth<760;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 let low=coarse,active=true,visible=true,dirty=true,raf=0,inFrame=false,auto=false,glassOn=false,explode=0,shownExplode=0,lastTime=0,model=null,groups={},fans=[],glass=null;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.1,100);camera.position.set(8.6,5.1,9.4);
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio||1,coarse?1.15:1.5));renderer.setClearColor(0x000000,0);host.prepend(renderer.domElement);
 const controls=new T.OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=true;controls.dampingFactor=.1;controls.zoomSpeed=coarse?2.2:1.8;controls.rotateSpeed=coarse?.85:.72;controls.zoomToCursor=true;controls.enablePan=false;controls.minDistance=5.2;controls.maxDistance=25;controls.maxPolarAngle=Math.PI*.88;controls.update();
 scene.add(new T.HemisphereLight(0xd6ecff,0x142126,2.2));const key=new T.DirectionalLight(0xffffff,3.2);key.position.set(4,7,5);scene.add(key);const rim=new T.DirectionalLight(0x7aafff,2);rim.position.set(-4,2,-3);scene.add(rim);
 const floor=new T.Mesh(new T.CircleGeometry(5.9,64),new T.MeshBasicMaterial({color:0x0d1520,transparent:true,opacity:.7}));floor.rotation.x=-Math.PI/2;floor.position.y=-2.72;scene.add(floor);
 const grid=new T.GridHelper(12,24,0x354b56,0x243340);grid.position.y=-2.7;grid.material.transparent=true;grid.material.opacity=.35;scene.add(grid);
 const ray=new T.Raycaster(),pointer=new T.Vector2();let down=null;
 const mat=(color,metal=.3,rough=.55)=>new T.MeshStandardMaterial({color,metalness:metal,roughness:rough});
 function box(parent,w,h,d,x,y,z,color=0x242e3c,material){const m=new T.Mesh(new T.BoxGeometry(w,h,d),material||mat(color));m.position.set(x,y,z);parent.add(m);return m}
 function label(parent,text,w,h,x,y,z,rotY=0,color='#b1c4d4'){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=96;const c=canvas.getContext('2d');c.fillStyle='#172131';c.fillRect(0,0,512,96);c.fillStyle=color;c.font='600 31px sans-serif';c.textBaseline='middle';c.fillText(text.slice(0,29),17,49,480);
  const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;const mesh=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tex,side:T.DoubleSide}));mesh.position.set(x,y,z);mesh.rotation.y=rotY;parent.add(mesh);
 }
 function fan(parent,x,y,z,r=.5,rotX=0,rotY=0){const g=new T.Group();g.position.set(x,y,z);g.rotation.set(rotX,rotY,0);parent.add(g);
  box(g,r*2.2,r*2.2,.09,0,0,0,0x101b27);
  const ring=new T.Mesh(new T.TorusGeometry(r,.025,6,42),new T.MeshBasicMaterial({color:0x83f2d3}));ring.position.z=.075;g.add(ring);
  const inner=new T.Mesh(new T.TorusGeometry(r*.87,.014,5,40),new T.MeshBasicMaterial({color:0x548b95}));inner.position.z=.07;g.add(inner);
  const spinner=new T.Group();spinner.position.z=.08;g.add(spinner);for(let i=0;i<7;i++){const blade=box(spinner,r*.65,r*.19,.025,r*.43,0,0,0x3c5363);const pivot=new T.Group();spinner.remove(blade);pivot.add(blade);pivot.rotation.z=i*Math.PI*2/7;blade.rotation.z=.4;spinner.add(pivot)}
  const hub=new T.Mesh(new T.CylinderGeometry(r*.19,r*.19,.08,16),mat(0x192c3a));hub.rotation.x=Math.PI/2;hub.position.z=.1;g.add(hub);fans.push(spinner);return g;
 }
 function cable(parent,points,color=0x26364a,r=.035){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const tube=new T.Mesh(new T.TubeGeometry(curve,24,r,5,false),mat(color));parent.add(tube)}
 function component(cat){const group=new T.Group();group.userData.category=cat;group.userData.origin=new T.Vector3();groups[cat]=group;model.add(group);return group}
 function dispose(root){const geometries=new Set(),materials=new Set(),textures=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{materials.add(m);if(m.map)textures.add(m.map)})});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose())}
 function rebuild(build){
  if(model){scene.remove(model);dispose(model)}model=new T.Group();scene.add(model);groups={};fans=[];glass=null;
  const b=PC_ENGINE.resolve(build);
  if(b.case){const g=component('case');box(g,2.9,.13,4.2,0,-2.48,0,0x273140);box(g,2.9,.11,4.2,0,2.48,0,0x273140);box(g,.07,4.9,4.2,-1.43,0,0,0x18232d);
   for(const x of [-1.42,1.42])for(const z of [-2.04,2.04])box(g,.12,5,.12,x,0,z,0x3b4652);
   box(g,2.9,.8,.1,0,-2.05,2.04,0x27313f);box(g,2.9,.18,.1,0,2.34,2.04,0x27313f);
   for(const x of [-1,1])for(const z of [-1.6,1.6])box(g,.38,.19,.45,x,-2.61,z,0x1e2b38);
   for(const y of [-1.03,.25,1.53])fan(g,.07,y,1.98,.49);
   box(g,.035,3.85,.035,1.34,.35,2.085,0x83f2d3,new T.MeshBasicMaterial({color:0x83f2d3}));
   glass=box(g,.02,4.7,4.02,1.44,0,0,0xa1e5f5,new T.MeshPhysicalMaterial({color:0x5d8d9d,transparent:true,opacity:.13,roughness:.1,metalness:.15,depthWrite:false,side:T.DoubleSide}));glass.visible=glassOn;
   label(g,'PC / LAB',.62,.12,.7,-2.15,2.1,0,'#89e7d3');
  }
  if(b.motherboard){const g=component('motherboard');const boardHeight=b.motherboard.form==='ITX'?2.1:3.36,boardDepth=b.motherboard.form==='ITX'?2.1:3.32;box(g,.085,boardHeight,boardDepth,-1.21,.44,-.2,0x16302d);
   for(let i=0;i<12;i++)box(g,.008,.012,1.2+(i%3)*.2,-1.16,-.8+i*.21,-.35+i%2*.5,0x41634f);
   box(g,.23,.73,.28,-1.06,1.36,-1.54,0x525c69);box(g,.23,.24,1.4,-1.03,1.91,-.42,0x3c4c5f);
   for(let i=0;i<7;i++)box(g,.1,.022,1.4,-.89,1.82+i*.031,-.42,0x657486);
   box(g,.09,.1,2.3,-1.08,-.51,-.1,0x759284);box(g,.11,.1,1.8,-1.08,-.85,-.3,0x253e3c);
   label(g,b.motherboard.name,1.6,.15,-1.095,-1.01,.05,Math.PI/2);
  }
  if(b.cpu){const g=component('cpu');box(g,.11,.68,.68,-1.06,1.1,-.65,0x3d454a);box(g,.025,.52,.52,-.988,1.1,-.65,0xa2b3b8);label(g,b.cpu.brand,.42,.1,-.97,1.1,-.65,Math.PI/2)}
  if(b.ram){const g=component('ram');for(let i=0;i<Math.min(b.ram.modules,4);i++){box(g,.48,1.38,.085,-.93,1.1,.35+i*.23,0x29333f);box(g,.52,1.43,.035,-.91,1.1,.402+i*.23,0x87f5d0,new T.MeshBasicMaterial({color:i%2?0x83bbf5:0x9bffe2}));for(let j=0;j<5;j++)box(g,.01,.16,.05,-.68,.6+j*.24,.35+i*.23,0x55606e)}}
  if(b.gpu){const g=component('gpu');const length=b.gpu.length?Math.min(3.55,Math.max(1.5,b.gpu.length/100)):b.gpu.watts<80?1.65:b.gpu.watts<180?2.4:3.25;const depth=b.gpu.watts<80?.68:1.67;
   box(g,depth,.37,length,-.15,-.6,-.16,0x26333f);box(g,depth+.035,.055,length+.02,-.15,-.38,-.16,0x626e7b);
   const fanCount=b.gpu.watts<80?1:b.gpu.watts<180?2:3;for(let i=0;i<fanCount;i++)fan(g,-.15,-.807,-.16-length/2+length*(i+.5)/fanCount,Math.min(.42,depth*.38),Math.PI/2,0);
   label(g,b.gpu.name,length*.84,.21,depth/2-.14,-.59,-.16,Math.PI/2,'#a2f0d8');
   box(g,.015,.035,length*.9,depth/2-.135,-.71,-.16,0x92f6d3,new T.MeshBasicMaterial({color:0x92f6d3}));
   for(let i=0;i<4;i++)cable(g,[[depth/2-.1,-.51,.75+i*.05],[1.1,-.4,.75+i*.05],[1.08,-1.6,.4+i*.05],[.65,-1.75,.4+i*.05]],0x334655,.017);
  }
  if(b.psu){const g=component('psu');box(g,2.2,.78,1.75,-.15,-1.92,-1.02,0x222c39);label(g,b.psu.capacity+' W / POWER',1.35,.24,.962,-1.95,-1,Math.PI/2);for(let i=0;i<10;i++)box(g,.01,.38,.045,.955,-1.82,-1.74+i*.14,0x5b6c7c)}
  if(b.storage.length){const g=component('storage');b.storage.slice(0,8).forEach((d,i)=>{if(d.iface==='NVMe'){box(g,.07,.25,.84,-1.03,-.13+i*.24,.15,0x353e4d);label(g,'NVMe',.53,.12,-.988,-.13+i*.24,.15,Math.PI/2)}else if(d.iface!=='USB'){box(g,1.15,.13,.9,.5,-1.46-i*.14,1.12,0x647686)}})}
  if(b.cooler){const g=component('cooler');if(b.cooler.type==='AIO'){
    const pump=new T.Mesh(new T.CylinderGeometry(.35,.35,.27,28),mat(0x273e50));pump.rotation.z=Math.PI/2;pump.position.set(-.76,1.1,-.65);g.add(pump);const ring=new T.Mesh(new T.TorusGeometry(.29,.025,6,32),new T.MeshBasicMaterial({color:0x8eebd2}));ring.rotation.y=Math.PI/2;ring.position.set(-.615,1.1,-.65);g.add(ring);
    const rlen=b.cooler.radiator/100;box(g,1.25,.2,Math.min(3.7,rlen),.13,2.07,-.15,0x242e3f);const n=b.cooler.radiator>=360?3:b.cooler.radiator>=240?2:1;for(let i=0;i<n;i++)fan(g,.13,1.89,-.15-rlen/2+rlen*(i+.5)/n,.44,Math.PI/2,0);
    cable(g,[[-.64,1.1,-.9],[.24,1.2,-1.2],[.6,1.73,-1.55],[.3,2,-1.6]],0x304354,.063);cable(g,[[-.6,1.06,-.4],[.45,.94,-.6],[.87,1.75,-1.3],[.53,2,-1.6]],0x273b48,.063);
   }else{const high=b.cooler.height/165;box(g,1.12*high,1.14,1.07,-.45,1.1,-.65,0x636f7a);for(let i=0;i<13;i++)box(g,1.15*high,.025,1.12,-.45,.58+i*.085,-.65,0xa0acb1);fan(g,.15,1.1,-.65,.49,0,Math.PI/2)}
  }
  model.traverse(o=>{if(o.isMesh)o.frustumCulled=true});shownExplode=0;setExplode(explode*100);invalidate();
 }
 const offsets={cpu:[2.9,1.7,-.2],gpu:[2.3,-.1,1.2],ram:[1.5,2.2,1.1],storage:[1.5,-.7,1.3],motherboard:[-.8,.3,-.3],psu:[.8,-1.1,-1.6],cooler:[2.6,1.8,-1.4],case:[0,0,0]};
 function invalidate(){dirty=true;if(!raf&&!inFrame&&active&&visible&&!document.hidden)raf=requestAnimationFrame(frame)}
 function frame(time){raf=0;if(!active||!visible||document.hidden)return;inFrame=true;const dt=Math.min((time-lastTime)/1000||.016,.05);lastTime=time;const moving=Math.abs(shownExplode-explode)>.001;
  if(moving){shownExplode=reduce?explode:shownExplode+(explode-shownExplode)*Math.min(1,dt*14);Object.keys(groups).forEach(k=>groups[k].position.set(...offsets[k].map(v=>v*shownExplode)));dirty=true}
  if(auto&&!reduce){controls.autoRotate=true;controls.autoRotateSpeed=1.2;dirty=true}else controls.autoRotate=false;
  if(auto&&!low&&!reduce)fans.forEach(f=>f.rotation.z-=dt*1.5);
  const changed=controls.update();if(dirty||changed||auto||moving){renderer.render(scene,camera);dirty=false}
  inFrame=false;if((auto&&!reduce)||moving||changed)invalidate();
 }
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);invalidate()}
 function setExplode(value){explode=Math.max(0,Math.min(1,value/100));invalidate()}
 controls.addEventListener('change',invalidate);controls.addEventListener('start',invalidate);
 const touches=new Set();
 renderer.domElement.addEventListener('pointerdown',e=>{touches.add(e.pointerId);down=touches.size===1?{id:e.pointerId,x:e.clientX,y:e.clientY,t:performance.now()}:null});
 renderer.domElement.addEventListener('pointercancel',e=>{touches.delete(e.pointerId);down=null});
 renderer.domElement.addEventListener('pointerup',e=>{touches.delete(e.pointerId);if(!down||down.id!==e.pointerId||Math.hypot(e.clientX-down.x,e.clientY-down.y)>8||performance.now()-down.t>700){down=null;return}down=null;const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hits=ray.intersectObjects(model?.children||[],true);for(const hit of hits){if(hit.object===glass)continue;let o=hit.object;while(o&&!o.userData.category)o=o.parent;if(o?.userData.category){onSelect(o.userData.category);break}}});
 if(window.ResizeObserver)new ResizeObserver(resize).observe(host);else addEventListener('resize',resize);
 if(window.IntersectionObserver)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)invalidate()}).observe(host);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0}else invalidate()});
 document.addEventListener('desktopPerformanceProfile',event=>{const profile=event.detail?.profile;if(profile==='performance'){low=false;renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5))}else if(profile==='balanced'){renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.25))}else if(profile==='quality'){low=false;renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75))}resize()});resize();
 return {rebuild,setExplode,reset(){camera.position.set(8.6,5.1,9.4);controls.target.set(0,0,0);controls.update();invalidate()},setAuto(v){auto=v;invalidate()},setGlass(v){glassOn=v;if(glass)glass.visible=v;invalidate()},setLow(v){low=v;renderer.setPixelRatio(Math.min(devicePixelRatio||1,v?1:coarse?1.15:1.5));resize()},setActive(v){active=v;if(!v&&raf){cancelAnimationFrame(raf);raf=0}if(v){resize();invalidate()}},get low(){return low},get renderer(){return renderer},get scene(){return scene},get camera(){return camera}};
};
})();
