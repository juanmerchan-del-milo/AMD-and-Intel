/* Original procedural geometry: no downloaded models or external textures. */
(function(root){
  'use strict';
  function create(T,profile){
    const group=new T.Group(),parts={},materials=new Map(),fans=[],spinners=[];
    const mat=(color,metal=.25,rough=.55)=>{
      const key=[color,metal,rough].join(':');
      if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color,metalness:metal,roughness:rough}));
      return materials.get(key);
    };
    profile.parts.forEach(part=>{
      const g=new T.Group();g.userData.part=part.id;g.name=part.id;
      group.add(g);parts[part.id]=g;
    });
    function box(parent,size,pos,color,metal=.25,rough=.55){
      const m=new T.Mesh(new T.BoxGeometry(...size),mat(color,metal,rough));m.position.set(...pos);parent.add(m);return m;
    }
    function bevel(parent,w,h,d,pos,color){
      const s=new T.Shape(),r=Math.min(.07,w/5,h/5);s.moveTo(-w/2+r,-h/2);
      s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);
      s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);
      s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);
      s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
      const geo=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.018,bevelThickness:.012,curveSegments:3});geo.translate(0,0,-d/2);
      const m=new T.Mesh(geo,mat(color,.55,.35));m.position.set(...pos);parent.add(m);return m;
    }
    function instances(parent,size,positions,color,metal=.3){
      const mesh=new T.InstancedMesh(new T.BoxGeometry(...size),mat(color,metal),positions.length),dummy=new T.Object3D();
      positions.forEach((p,i)=>{dummy.position.set(...p);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});
      mesh.instanceMatrix.needsUpdate=true;parent.add(mesh);return mesh;
    }
    function cylinder(parent,r,h,pos,color,segments=16){
      const m=new T.Mesh(new T.CylinderGeometry(r,r,h,segments),mat(color,.6,.35));m.position.set(...pos);parent.add(m);return m;
    }
    function traces(parent,w,d,y){
      const points=[];
      for(let i=0;i<34;i++){
        const x=-w/2+.12+(w-.24)*i/33,z=(i%2?1:-1)*(d/2-.12);
        points.push(x,y,z,x,y,z*.62,x,y,z*.62,x*.45,y,z*.4);
      }
      const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(points,3));
      parent.add(new T.LineSegments(geometry,new T.LineBasicMaterial({color:0x467866,transparent:true,opacity:.7})));
    }
    function decal(parent,text,w,h,pos,rot=[0,0,0]){
      if(typeof document==='undefined')return;
      const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;
      const ctx=canvas.getContext('2d');if(!ctx)return;
      ctx.fillStyle='#aeb8b7';ctx.font='500 34px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,64,495);
      const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
      const mesh=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:T.DoubleSide}));
      mesh.position.set(...pos);mesh.rotation.set(...rot);parent.add(mesh);
    }
    function coolingFan(parent,x,y,z,r){
      const ring=new T.Mesh(new T.TorusGeometry(r,.045,8,40),mat(0x5b6670,.7,.32));ring.rotation.x=-Math.PI/2;ring.position.set(x,y,z);parent.add(ring);
      const rotor=new T.Group();rotor.position.set(x,y,z);parent.add(rotor);fans.push(rotor);
      for(let i=0;i<9;i++){
        const pivot=new T.Group();pivot.rotation.y=i*Math.PI*2/9;rotor.add(pivot);
        const blade=bevel(pivot,r*.64,r*.25,.034,[r*.48,0,0],0x242d37);blade.rotation.set(-Math.PI/2,0,.48);
      }
      cylinder(rotor,r*.2,.08,[0,.045,0],0x49535e);
      cylinder(rotor,r*.08,.085,[0,.05,0],0x859399);
    }
    const item=profile.item;
    if(!['gpu','ram'].includes(profile.category)){
      root.PC_WORKSHOP_COMPONENTS.create({T,parts,group,mat,box,cylinder,bevel,instances,coolingFan,traces,decal,item,profile,fans,spinners});
    }else if(profile.category==='gpu'){
      const compact=item.watts<=75,w=compact?4.1:6.25,d=compact?1.75:2.45;
      const g=parts.pcb;box(g,[w,.075,d],[0,0,0],0x143b31);traces(g,w,d,.042);
      const tiny=[];for(let i=0;i<40;i++)tiny.push([-w/2+.25+(i%10)*.11,.082,-d/2+.2+Math.floor(i/10)*.18]);
      instances(g,[.055,.07,.08],tiny,0xaaa489,.5);
      const mounting=[];for(const x of [-w/2+.18,w/2-.18])for(const z of [-d/2+.15,d/2-.15])mounting.push([x,.05,z]);
      for(const p of mounting){const ring=new T.Mesh(new T.TorusGeometry(.065,.018,6,12),mat(0xd3b575,.8));ring.rotation.x=-Math.PI/2;ring.position.set(...p);g.add(ring)}
      const coreX=compact?-.35:-.75,hbm=item.memory==='HBM2';
      box(parts.die,[hbm?1.9:1.05,.06,hbm?1.4:1.05],[coreX,.085,0],0x15524a);
      box(parts.die,[.68,.055,.68],[coreX,.145,0],0x849a9f,.85,.14);
      box(parts.die,[.52,.005,.52],[coreX,.175,0],0x5b698e,.75,.17);
      decal(parts.die,'GPU',.46,.13,[coreX,.18,0],[-Math.PI/2,0,0]);
      if(hbm){
        const stacks=item.name==='Radeon VII'?4:2;
        for(let i=0;i<stacks;i++){
          const x=coreX+(i%2?1:-1)*.68,z=stacks===4?(i<2?-.38:.38):0;
          for(let level=0;level<4;level++)box(parts.vram,[.38,.028,.42],[x,.115+level*.03,z],level%2?0x484452:0x202d3a);
        }
      }else{
        const positions=[];
        for(const z of [-.78,.78])for(const x of [coreX-.58,coreX,coreX+.58])positions.push([x,.115,z]);
        instances(parts.vram,[.36,.11,.28],positions,0x202731);
        for(const p of positions)decal(parts.vram,item.memory,.32,.065,[p[0],.174,p[2]],[-Math.PI/2,0,0]);
      }
      const phases=compact?3:7;
      for(let i=0;i<phases;i++){
        const x=w/2-.75,z=-d/2+.28+i*(d-.56)/(phases-1);
        box(parts.vrm,[.27,.2,.19],[x,.15,z],0x657079,.75,.45);
        box(parts.vrm,[.15,.06,.15],[x-.31,.08,z],0x22272c);
        cylinder(parts.vrm,.067,.17,[x+.26,.14,z],0xb5babc,10);
      }
      const pins=[];for(let i=0;i<48;i++){const x=-w/2+.7+i*.06;if(i!==8&&i!==9)pins.push([x,-.003,d/2+.12])}
      box(parts.connectors,[3.0,.06,.26],[-w/2+2.1,-.01,d/2+.1],0x184c3f);
      instances(parts.connectors,[.035,.07,.22],pins,0xd1b46d,.85);
      box(parts.connectors,[.075,.95,d+.1],[-w/2-.07,.33,0],0x88959b,.85,.32);
      for(const z of [-.65,0,.65].filter(z=>Math.abs(z)<d/2-.1)){
        box(parts.connectors,[.16,.22,.44],[-w/2-.02,.22,z],0x9da9ae,.8);
        box(parts.connectors,[.009,.115,.29],[-w/2-.106,.22,z],0x18202b);
      }
      if(!compact){
        box(parts.connectors,[.55,.22,.32],[w/2-.9,.16,-d/2+.02],0x171c25);
        const socketPins=[];for(let i=0;i<6;i++)socketPins.push([w/2-1.1+i*.08,.18,-d/2-.145]);
        instances(parts.connectors,[.042,.08,.015],socketPins,0xc4b38e,.8);
      }
      const heat=parts.heatsink;
      box(heat,[w-.18,.10,d-.15],[0,.32,0],0x7e8b8d,.85,.3);
      const fins=[];for(let i=0;i<52;i++)fins.push([-w/2+.16+i*(w-.32)/51,.54,0]);
      instances(heat,[.033,.35,d-.16],fins,0x9ba6ab,.8);
      for(const z of [-.68,0,.68].filter(z=>Math.abs(z)<d/2-.1)){
        const path=new T.CatmullRomCurve3([new T.Vector3(-w/2+.15,.28,z),new T.Vector3(coreX,.24,z),new T.Vector3(w/2-.15,.3,z)]);
        heat.add(new T.Mesh(new T.TubeGeometry(path,10,.06,8,false),mat(0xb87c4f,.85,.27)));
      }
      box(parts.thermal,[hbm?1.92:.69,.02,hbm?1.43:.69],[coreX,hbm?.265:.209,0],0xb5c2c4,.2);
      if(!hbm)instances(parts.thermal,[1.55,.025,.33],[[coreX,.204,-.78],[coreX,.204,.78]],0x728c96,.1);
      const cover=parts.shroud,brandColor=item.brand==='NVIDIA'?0xa2be84:item.brand==='Intel'?0x79adcf:0xc58589;
      for(const z of [-d/2,d/2])box(cover,[w+.04,.23,.09],[0,.78,z],0x303c49,.65,.33);
      for(const x of [-w/2,w/2])box(cover,[.1,.23,d],[x,.78,0],0x303c49,.65,.33);
      const count=compact?1:/ FE$/.test(item.name)?2:item.watts<180?2:3,r=Math.min(d*.41,(w/count)*.42);
      const face=new T.Shape();face.moveTo(-w/2,-d/2);face.lineTo(w/2,-d/2);face.lineTo(w/2,d/2);face.lineTo(-w/2,d/2);face.closePath();
      for(let i=0;i<count;i++){const hole=new T.Path();hole.absarc(-w/2+w*(i+.5)/count,0,r+.02,0,Math.PI*2,true);face.holes.push(hole)}
      const faceMesh=new T.Mesh(new T.ExtrudeGeometry(face,{depth:.055,bevelEnabled:false,curveSegments:20}),mat(0x35424e,.6,.35));faceMesh.rotation.x=-Math.PI/2;faceMesh.position.y=.82;cover.add(faceMesh);
      for(let i=0;i<count;i++)coolingFan(cover,-w/2+w*(i+.5)/count,.81,0,r);
      box(cover,[w*.7,.035,.012],[0,.88,d/2+.052],brandColor,.4,.25);
      decal(cover,item.brand+' / '+item.memory,w*.55,.15,[0,.75,d/2+.065]);
      const plate=bevel(parts.backplate,w-.08,d-.08,.045,[0,-.17,0],0x343f48);plate.rotation.x=Math.PI/2;
      const slats=[];for(let i=0;i<14;i++)slats.push([w*.25+i*.055,-.205,0]);
      instances(parts.backplate,[.024,.01,d*.65],slats,0x64747d,.8);
      for(const p of mounting){cylinder(parts.screws,.05,.14,[p[0],.98,p[2]],0x9ea6ad,10);box(parts.screws,[.055,.006,.012],[p[0],1.055,p[2]],0x282b30)}
    }else{
      const compact=item.form==='SO-DIMM',w=compact?3.9:6.0,h=compact?1.65:1.45,generation=item.memory==='DDR (DDR1)'?1:Number(item.memory.slice(-1));
      const notch=({1:-.55,2:-.25,3:.42,4:.16,5:.4})[generation]||.16;
      const shape=new T.Shape();shape.moveTo(-w/2,-h/2);shape.lineTo(notch-.09,-h/2);shape.lineTo(notch-.09,-h/2+.18);shape.lineTo(notch+.09,-h/2+.18);shape.lineTo(notch+.09,-h/2);shape.lineTo(w/2,-h/2);shape.lineTo(w/2,h/2);shape.lineTo(-w/2,h/2);shape.closePath();
      const geometry=new T.ExtrudeGeometry(shape,{depth:.075,bevelEnabled:false,steps:1});geometry.translate(0,0,-.0375);
      parts.pcb.add(new T.Mesh(geometry,mat(generation<4?0x174e39:0x16342d)));
      const traceGroup=new T.Group();traceGroup.rotation.x=Math.PI/2;parts.pcb.add(traceGroup);traces(traceGroup,w,h,-.04);
      const contacts=[];for(let i=0;i<76;i++){const x=-w/2+.12+i*(w-.24)/75;if(Math.abs(x-notch)>.12)for(const z of [-.045,.045])contacts.push([x,-h/2+.12,z])}
      instances(parts.contacts,[.037,.23,.012],contacts,0xd1b575,.85);
      const positions=[];const perRow=compact?4:8;
      for(let i=0;i<perRow;i++){
        let x=-w/2+.45+i*(w-.9)/(perRow-1);
        if(!compact)x+=x<0?-.08:.08;
        positions.push([x,.03,.10]);if(compact)positions.push([x,.45,-.10]);
      }
      instances(parts.dram,[compact?.61:.48,.47,.105],positions,0x202a33);
      for(const p of positions.filter(p=>p[2]>0))decal(parts.dram,generation===1?'DDR':'DDR'+generation,.39,.095,[p[0],p[1],.158]);
      const passives=[];for(let i=0;i<32;i++)passives.push([-w/2+.2+i*(w-.4)/31,.42,.061]);instances(parts.pcb,[.04,.07,.04],passives,0xb7ad84,.45);
      box(parts.spd,[.25,.22,.085],[parts.register?w/2-.35:0,-.33,.092],0x3e4a57);
      if(parts.pmic){const y=parts.register?-.28:.15;box(parts.pmic,[.26,.25,.10],[0,y,.12],0x485965);for(const x of [-.23,.23])box(parts.pmic,[.11,.13,.095],[x,y,.1],0x98a0a2)}
      if(parts.register)box(parts.register,[.45,.32,.12],[0,.23,.105],0x536d7b);
      if(parts.spreaderFront){
        for(const [key,sign] of [['spreaderFront',1],['spreaderBack',-1]]){
          bevel(parts[key],w+.03,h-.17,.045,[0,.10,sign*.23],0x45515f);
          const ribs=[];for(let i=0;i<22;i++)ribs.push([-w/2+.2+i*(w-.4)/21,.1,sign*.265]);
          instances(parts[key],[.045,h-.32,.023],ribs,0x65737c,.7);
        }
        decal(parts.spreaderFront,'PC LAB  /  '+item.memory+'  /  '+item.form,w*.6,.17,[0,.1,.293]);
        bevel(parts.strip,w-.1,.10,.42,[0,h/2+.075,0],0x9edfcf);
      }
    }
    return {group,parts,fans,spinners};
  }
  function dispose(group){
    const geometry=new Set(),materials=new Set(),textures=new Set();
    group.traverse(node=>{
      if(node.geometry)geometry.add(node.geometry);
      if(node.material)(Array.isArray(node.material)?node.material:[node.material]).forEach(m=>{materials.add(m);if(m.map)textures.add(m.map)});
    });
    geometry.forEach(x=>x.dispose());textures.forEach(x=>x.dispose());materials.forEach(x=>x.dispose());
  }
  root.PC_WORKSHOP_MODELS={create,dispose};
})(typeof window!=='undefined'?window:globalThis);
