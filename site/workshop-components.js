/* Original educational geometry. Internal logical zones are conceptual, not die photographs. */
(function(root){
'use strict';
const D=root.PC_WORKSHOP_DATA;
Object.assign(D.text,{
 cpu:['Procesador','Processor','处理器'],storage:['Almacenamiento','Storage','存储'],motherboard:['Placa base','Motherboard','主板'],psu:['Fuente de alimentación','Power supply','电源'],cooler:['Refrigeración','Cooling','散热'],case:['Gabinete','Case','机箱'],
 substrate:['Sustrato del encapsulado','Package substrate','封装基板'],substrateDesc:['Conecta el silicio con los contactos. Las zonas de cálculo dibujadas son un mapa didáctico, no la distribución exacta del chip.','Connects silicon to package contacts. The compute zones are a teaching map, not an exact chip layout.','连接硅片与触点。图中计算区域是教学示意，不代表真实芯片布局。'],
 cpuDie:['Silicio del procesador','Processor silicon','处理器硅片'],cpuDieDesc:['Contiene circuitos de cálculo y comunicación. Un procesador puede usar un die o varios chiplets; este mapa simplifica ambos casos.','Contains compute and communication circuits. A processor may use one die or several chiplets; this map simplifies both.','包含计算与通信电路。处理器可使用单个裸片或多个芯粒；此图将两者简化。'],
 cpuCores:['Zona de núcleos · esquema','Core region · schematic','核心区域 · 示意'],cpuCoresDesc:['Los núcleos ejecutan instrucciones. Los bloques coloreados representan la función, no el tamaño, tipo o número real de núcleos.','Cores execute instructions. Colored blocks represent function, not the actual core size, type or count.','核心执行指令。彩色方块表示功能，并非真实核心的大小、类型或数量。'],
 cache:['Caché · esquema','Cache · schematic','缓存 · 示意'],cacheDesc:['Guarda datos e instrucciones de acceso rápido para reducir esperas. Los niveles y capacidades reales figuran en la ficha.','Keeps frequently used data and instructions close to the cores. Actual levels and capacities are listed in the specifications.','将常用数据和指令保留在核心附近。实际层级与容量见规格。'],
 igpu:['Gráficos integrados · esquema','Integrated graphics · schematic','集成显卡 · 示意'],igpuDesc:['Motor gráfico integrado en el procesador. Normalmente comparte memoria del sistema; no equivale a una tarjeta gráfica independiente.','A graphics engine integrated into the processor. It generally shares system memory and is not a separate graphics card.','处理器内置图形引擎。通常共享系统内存，并非独立显卡。'],
 npu:['NPU · esquema','NPU · schematic','NPU · 示意'],npuDesc:['Acelera tareas de IA compatibles. No sustituye a la CPU ni aumenta automáticamente los FPS de un juego.','Accelerates supported AI tasks. It does not replace the CPU or automatically raise game frame rates.','加速支持的 AI 任务。不替代 CPU，也不会自动提高游戏帧率。'],
 lid:['Difusor térmico (IHS)','Integrated heat spreader (IHS)','顶盖（IHS）'],lidDesc:['Transfiere calor hacia el refrigerador. Se separa aquí para mostrar el silicio; no es una pieza de desmontaje cotidiano.','Transfers heat to the cooler. It is lifted here to reveal the silicon, not as a normal service operation.','将热量传到散热器。这里抬起仅为展示硅片，并非常规拆卸步骤。'],
 cpuContacts:['Contactos del encapsulado','Package contacts','封装触点'],cpuContactsDesc:['PGA usa pines, LGA usa superficies de contacto y BGA usa bolas de soldadura. El número dibujado es ilustrativo.','PGA uses pins, LGA uses contact pads and BGA uses solder balls. The illustrated count is not exact.','PGA 使用针脚，LGA 使用触点，BGA 使用焊球。图示数量并非准确数量。'],
 cover:['Cubierta exterior','Outer cover','外壳'],coverDesc:['Protege el conjunto. La forma y las fijaciones dependen del producto; la apertura mostrada es virtual.','Protects the assembly. Shape and fasteners depend on the product; this opening is virtual.','保护组件。形状与固定件取决于产品；此处为虚拟开启。'],
 controller:['Controlador','Controller','控制器'],controllerDesc:['Gestiona órdenes y transferencias entre el equipo y el medio de almacenamiento.','Manages commands and transfers between the computer and storage medium.','管理计算机与存储介质之间的指令和传输。'],
 nand:['Memoria flash NAND','NAND flash memory','NAND 闪存'],nandDesc:['Conserva los datos sin alimentación. Sus celdas tienen límites de escritura; la distribución depende del SSD.','Retains data without power. Cells have write limits; layout depends on the SSD.','断电后保留数据。存储单元有写入寿命；布局取决于 SSD。'],
 platters:['Platos magnéticos','Magnetic platters','磁性盘片'],plattersDesc:['Giran y almacenan datos magnéticamente. Se muestran de forma esquemática; no se deben abrir discos reales para observarlos.','Rotate and store data magnetically. This is schematic; do not open a real drive to observe them.','旋转并以磁性存储数据。此图为示意；请勿打开真实硬盘观察。'],
 actuator:['Brazo y cabezales','Actuator arm and heads','磁头臂与磁头'],actuatorDesc:['Posicionan los cabezales sobre las pistas del disco para leer y escribir.','Position the heads over disk tracks for reading and writing.','将磁头定位在磁道上以读写数据。'],
 motor:['Motor del husillo','Spindle motor','主轴电机'],motorDesc:['Hace girar los platos. Un SSD no necesita motor ni piezas mecánicas móviles.','Spins the platters. An SSD needs neither a motor nor moving mechanical parts.','带动盘片旋转。SSD 不需要电机或机械运动部件。'],
 socket:['Socket del procesador','Processor socket','处理器插槽'],socketDesc:['Conecta y sujeta una CPU compatible. Compartir dimensiones o socket no garantiza soporte de BIOS o chipset.','Connects and holds a supported CPU. Matching dimensions or socket does not guarantee BIOS or chipset support.','连接并固定兼容 CPU。尺寸或插槽相同不保证 BIOS 或芯片组支持。'],
 slots:['Ranuras de expansión y RAM','Expansion and RAM slots','扩展与内存插槽'],slotsDesc:['Conectan módulos de RAM y tarjetas. Cada generación, formato y enlace tiene requisitos propios.','Connect memory modules and expansion cards. Each generation, form factor and link has its own requirements.','连接内存模块和扩展卡。各代际、规格和链路有不同要求。'],
 chipset:['Chipset','Chipset','芯片组'],chipsetDesc:['Gestiona parte de las conexiones de entrada y salida. Otras líneas pueden conectar directamente con la CPU.','Manages some input/output connections. Other lanes may connect directly to the CPU.','管理部分输入输出接口。其他通道可能直接连接 CPU。'],
 transformer:['Transformador · esquema','Transformer · schematic','变压器 · 示意'],transformerDesc:['En una fuente conmutada transfiere energía con aislamiento. El circuito mostrado simplifica una topología real.','In a switching supply it transfers energy with isolation. The drawing simplifies a real topology.','在开关电源中通过隔离传递能量。此图简化了实际拓扑。'],
 rectifier:['Rectificación y conmutación','Rectification and switching','整流与开关电路'],rectifierDesc:['La fuente convierte la entrada de corriente alterna y regula salidas de corriente continua.','The supply converts AC input and regulates DC outputs.','电源转换交流输入并调节直流输出。'],
 capacitors:['Condensadores y filtrado','Capacitors and filtering','电容与滤波'],capacitorsDesc:['Suavizan la alimentación y almacenan energía. Una fuente real puede retener tensiones peligrosas incluso desconectada.','Smooth the supply and store energy. A real PSU can retain dangerous voltages even when unplugged.','平滑电源并储存能量。真实电源断电后仍可能保留危险电压。'],
 fan:['Ventilador','Fan','风扇'],fanDesc:['Mueve aire para transportar calor. La animación no representa RPM medidas ni una prueba térmica.','Moves air to carry heat away. The animation is not measured RPM or a thermal test.','推动空气带走热量。动画不代表实测转速或散热测试。'],
 coldplate:['Base de contacto','Contact base','接触底座'],coldplateDesc:['Recibe calor del procesador mediante la interfaz térmica.','Receives processor heat through the thermal interface.','通过导热介质接收处理器热量。'],
 radiator:['Radiador o aletas','Radiator or fins','冷排或鳍片'],radiatorDesc:['Aumentan la superficie que intercambia calor con el aire.','Increase the area that exchanges heat with the air.','增加与空气交换热量的面积。'],
 loop:['Bomba y circuito sellado','Pump and sealed loop','水泵与密闭回路'],loopDesc:['La bomba hace circular refrigerante entre bloque y radiador. Los tubos se muestran unidos: un AIO es un circuito sellado.','The pump circulates coolant between block and radiator. Tubes stay connected: an AIO is a sealed circuit.','水泵使冷却液在冷头和冷排间循环。管路保持连接：一体水冷为密闭回路。'],
 frame:['Estructura','Frame','框架'],frameDesc:['Sostiene las piezas y define el espacio disponible para placa, gráfica, fuente y refrigeración.','Supports the parts and defines clearance for the board, GPU, PSU and cooling.','支撑部件并决定主板、显卡、电源和散热器的可用空间。'],
 panel:['Panel lateral','Side panel','侧板'],panelDesc:['Permite acceder al interior. Aquí puedes retirarlo, girar el modelo y volver a colocarlo.','Provides interior access. Remove it, rotate the model and put it back.','提供内部访问。可将其移开、旋转模型并装回。'],
 frontPanel:['Panel frontal','Front panel','前面板'],frontPanelDesc:['Organiza la entrada de aire y protege la zona frontal. El patrón de ventilación es ilustrativo.','Organizes air intake and protects the front. The ventilation pattern is illustrative.','组织进气并保护正面。通风图案为示意。'],
 cage:['Bahías de almacenamiento','Drive bays','硬盘架'],cageDesc:['Sujetarán unidades del formato admitido por el gabinete.','Hold drives in the form factors supported by the case.','固定机箱支持规格的硬盘。']
});
function profile(item,category){
 const parts=[],steps=[];const add=(id,key,desc,offset=[0,0,0],step=0)=>{parts.push({id,key,desc,offset,step});if(step&&!steps[step-1])steps[step-1]=id};
 const fixed=(id,key=id)=>add(id,key,key+'Desc');
 if(category==='cpu'){
  fixed('pcb','substrate');fixed('contacts','cpuContacts');fixed('die','cpuDie');fixed('cores','cpuCores');fixed('cache');
  if(item.igpu&&item.igpu!=='No')fixed('igpu');if(item.npu)fixed('npu');
  if(item.packaging!=='Soldado'){add('lid','lid','lidDesc',[0,1.8,0],1);add('thermal','thermal','thermalDesc',[0,.9,0],2)}
 }else if(category==='storage'){
  fixed('pcb');fixed('connectors');fixed('controller');
  if(item.type==='HDD'){fixed('platters');fixed('actuator');fixed('motor');add('cover','cover','coverDesc',[0,1.8,0],1)}
  else {fixed('nand');if(item.form!=='M.2 2280')add('cover','cover','coverDesc',[0,1.8,0],1)}
 }else if(category==='motherboard'){
  for(const id of ['pcb','socket','slots','chipset','vrm','connectors'])fixed(id);
  add('heatsink','heatsink','heatsinkDesc',[0,1.5,0],1);
 }else if(category==='psu'){
  for(const id of ['pcb','rectifier','transformer','capacitors','connectors'])fixed(id);
  add('cover','cover','coverDesc',[0,2.8,0],1);add('fan','fan','fanDesc',[0,1.5,0],2);
 }else if(category==='cooler'){
  fixed('pcb','coldplate');fixed('heatsink','radiator');fixed(item.type==='AIO'?'loop':'heatpipes',item.type==='AIO'?'loop':'heatsink');
  add('fan','fan','fanDesc',[0,1.8,0],1);
 }else if(category==='case'){
  fixed('pcb','frame');fixed('cage');add('panel','panel','panelDesc',[2.3,0,0],1);add('front','frontPanel','frontPanelDesc',[0,0,1.8],2);add('fan','fan','fanDesc',[0,0,1],3);
 }else throw Error('Unsupported workshop component');
 return {category,item,parts,steps,max:steps.length,source:item.source};
}
function create(k){
 const {T,parts:p,mat,box,cylinder,bevel,instances,coolingFan,traces,decal,item,profile,fans,spinners}=k,cat=profile.category;
 const B=(part,size,pos,color,metal=.5)=>box(p[part],size,pos,color,metal);
 const C=(part,r,h,pos,color,segments=32)=>cylinder(p[part],r,h,pos,color,segments);
 const label=(part,text,w,pos)=>decal(p[part],text,w,.15,pos,[-Math.PI/2,0,0]);
 function ports(parent,positions){instances(parent,[.14,.04,.19],positions,0xc9b073,.8)}
 if(cat==='cpu'){
  const mobile=item.packaging==='Soldado',w=mobile?3.8:3.4,d=mobile?2.6:3.4;
  B('pcb',[w,.12,d],[0,0,0],0x164536);traces(p.pcb,w,d,.064);
  const contacts=[];for(let x=0;x<18;x++)for(let z=0;z<18;z++)if(x<6||x>11||z<6||z>11)contacts.push([-(w-.35)/2+x*(w-.35)/17,-.105,-(d-.35)/2+z*(d-.35)/17]);
  if(mobile){const mesh=new T.InstancedMesh(new T.SphereGeometry(.048,8,6),mat(0xc6c7c4,.9),contacts.length),dummy=new T.Object3D();contacts.forEach((a,i)=>{dummy.position.set(...a);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});p.contacts.add(mesh)}
  else instances(p.contacts,[.065,/^(AM[34]|Socket)/.test(item.socket)?.25:.012,.065],contacts,0xcbb568,.85);
  B('die',[2.1,.12,1.6],[0,.14,0],0x748597,.88);
  const zones=[];for(let x=0;x<4;x++)for(let z=0;z<2;z++)zones.push([-.75+x*.34,.214,-.49+z*.4]);
  instances(p.cores,[.28,.018,.31],zones,0x6bc3bc,.5);
  B('cache',[1.35,.019,.22],[-.24,.216,.45],0xba965e);
  label('cache','CACHE',1,[-.24,.23,.45]);
  if(p.igpu){B('igpu',[.38,.024,.6],[.78,.22,-.24],0x7391ce);label('igpu','GPU',.35,[.78,.235,-.24])}
  if(p.npu){B('npu',[.38,.026,.39],[.78,.22,.35],0xd08a9b);label('npu','NPU',.35,[.78,.238,.35])}
  if(p.lid){const lid=bevel(p.lid,w-.25,d-.25,.18,[0,.41,0],0x9ca6ac);lid.rotation.x=-Math.PI/2;label('lid',item.brand,1.6,[0,.515,0]);B('thermal',[2.1,.018,1.6],[0,.28,0],0xb5b6b4)}
 }else if(cat==='storage'){
  const m2=/M\.2/.test(item.form),hdd=item.type==='HDD',w=m2?1.5:3.6,d=m2?5.0:4.8;
  B('pcb',[w,.08,d],[0,0,0],0x194b3c);traces(p.pcb,w,d,.047);
  B('controller',[.85,.12,.72],[0,.1,-d*.25],0x243043);label('controller','CTRL',.65,[0,.164,-d*.25]);
  const pins=[];for(let i=0;i<20;i++)pins.push([-w*.42+i*w*.84/19,.01,d/2+.1]);ports(p.connectors,pins);
  if(hdd){
   C('platters',1.5,.09,[0,.32,.42],0xb7c3ca,64);C('platters',1.5,.07,[0,.49,.42],0xa9b3c4,64);C('motor',.3,.28,[0,.59,.42],0x767f8c);
   for(const r of [.45,.72,1,1.28,1.43]){const ring=new T.Mesh(new T.TorusGeometry(r,.005,3,64),mat(0x616b78,.85));ring.rotation.x=-Math.PI/2;ring.position.set(0,.53,.42);p.platters.add(ring)}
   const arm=B('actuator',[1.5,.07,.19],[.65,.6,-.83],0xa5b0b8);arm.rotation.y=.65;C('actuator',.23,.28,[1.22,.49,-1.24],0x656e7c);const rotor=new T.Group();rotor.position.z=.42;for(const mesh of [...p.platters.children]){mesh.position.z-=.42;rotor.add(mesh)}p.platters.add(rotor);spinners.push({node:rotor,axis:'y'});
  }else {const chips=[];for(let i=0;i<(m2?3:6);i++)chips.push([m2?0:(i%2?-.88:.88),.11,m2?-.25+i*1.1:Math.floor(i/2)*1.12-.35]);instances(p.nand,[m2?1.02:1.22,.12,.86],chips,0x232d36);for(const a of chips)label('nand','NAND',.65,[a[0],.174,a[2]])}
  if(p.cover){B('cover',[w+.15,.1,d+.15],[0,hdd?.82:.38,0],0x5e6d7b);label('cover',hdd?'HDD':item.iface+' SSD',2,[0,hdd?.875:.435,0])}
 }else if(cat==='motherboard'){
  const itx=item.form==='ITX',w=itx?4:5.2,d=itx?4:6.1;
  B('pcb',[w,.075,d],[0,0,0],0x163c34);traces(p.pcb,w,d,.046);
  B('socket',[1.6,.18,1.6],[-.65,.12,-1.05],0x929ea4);B('socket',[1.35,.025,1.35],[-.65,.22,-1.05],0x292e35);
  const pins=[];for(let i=0;i<80;i++)pins.push([-.65-.56+(i%10)*.125,.24,-1.05-.47+Math.floor(i/10)*.13]);instances(p.socket,[.045,.025,.045],pins,0xc6ad72,.8);
  for(let i=0;i<Math.min(item.dimms,4);i++){B('slots',[.16,.19,2.4],[w/2-.35-i*.28,.16,-.78],0x45484c);B('slots',[.04,.014,2.25],[w/2-.35-i*.28,.261,-.78],0x121b23)}
  for(let i=0;i<(itx?1:3);i++){B('slots',[2.6,.18,.15],[-.45,.13,.77+i*.55],item.gpuSlot==='AGP'?0x9b743d:0x5a6875);B('slots',[2.4,.017,.038],[-.45,.23,.77+i*.55],0x15242c)}
  B('chipset',[.8,.1,.7],[1,.12,1.43],0x485462);
  for(let i=0;i<6;i++){B('vrm',[.22,.23,.23],[-1.76,.16,-1.8+i*.28],0x6e7c88);C('vrm',.075,.23,[-2.05,.16,-1.8+i*.28],0xb0b9bf,16)}
  for(let i=0;i<5;i++){B('connectors',[.48,.4,.42],[-w/2+.15,.25,-d/2+.42+i*.52],0x8a969e);B('connectors',[.02,.18,.27],[-w/2-.101,.27,-d/2+.42+i*.52],0x131b27)}
  B('heatsink',[.68,.23,1.88],[-1.8,.45,-1.09],0x445466);B('heatsink',[.99,.15,.95],[1,.3,1.43],0x657780);
  label('pcb',item.socket,1.5,[0,.049,d/2-.3]);
 }else if(cat==='psu'){
  B('pcb',[4.2,.1,3.5],[0,0,0],0x28613f);
  B('rectifier',[.8,.7,.35],[-1.4,.4,-.85],0x8b979c);
  for(let i=0;i<5;i++)B('rectifier',[.08,.72,.64],[-1.75+i*.16,.42,-.82],0x81949f);
  B('transformer',[1.1,.8,.9],[0,.47,0],0xcbb24c);B('transformer',[.7,.87,.38],[0,.47,0],0x424946);
  for(const a of [[-1,.53,.8],[-1.6,.53,.8],[1,.32,.5],[1.45,.32,.5]])C('capacitors',a[0]<0?.23:.16,a[1]*1.8,a,0x344353);
  B('connectors',[3.5,.6,.18],[0,.33,1.8],0x242b35);for(let i=0;i<5;i++)B('connectors',[.48,.28,.03],[-1.25+i*.63,.39,1.901],0x101b21);
  for(const x of [-2.19,2.19])B('cover',[.09,1.52,3.75],[x,.69,0],0x394652);
  for(const z of [-1.86,1.86])B('cover',[4.4,1.52,.075],[0,.69,z],0x394652);
  const frame=new T.Mesh(new T.TorusGeometry(1.42,.1,8,64),mat(0x6c7a87,.7));frame.rotation.x=-Math.PI/2;frame.position.y=1.57;p.cover.add(frame);
  coolingFan(p.fan,0,1.32,0,1.28);
 }else if(cat==='cooler'){
  B('pcb',[1.45,.18,1.45],[-.95,.02,0],0xb57b53,.85);
  const aio=item.type==='AIO',x=aio?1.2:-.9,w=aio?1.6:2.3,d=aio?Math.min(5.2,item.radiator/80):2.25;
  const fins=[];for(let i=0;i<50;i++)fins.push([x,.6,-d/2+.1+i*(d-.2)/49]);instances(p.heatsink,[w,aio?.3:1.1,.025],fins,0x95a6ac,.85);
  if(aio){C('loop',.58,.42,[-.95,.37,0],0x475763);for(const sign of [-1,1]){const curve=new T.CatmullRomCurve3([new T.Vector3(-.95,.45,sign*.42),new T.Vector3(-2,.8,sign*1.4),new T.Vector3(-.5,1.05,sign*(d/2+.4)),new T.Vector3(x,.7,sign*d/2)]);p.loop.add(new T.Mesh(new T.TubeGeometry(curve,32,.085,12,false),mat(0x273640)))} }
  else for(const z of [-.64,0,.64]){const curve=new T.CatmullRomCurve3([new T.Vector3(-1.7,.5,z),new T.Vector3(-.95,.13,z),new T.Vector3(-.16,.5,z)]);p.heatpipes.add(new T.Mesh(new T.TubeGeometry(curve,20,.09,12,false),mat(0xb98056,.85)))}
  const count=aio?(item.radiator>=360?3:item.radiator>=240?2:1):1;
  for(let i=0;i<count;i++)coolingFan(p.fan,x,aio?.92:1.25,-d/2+d*(i+.5)/count,Math.min(w*.46,d/count*.44));
 }else if(cat==='case'){
  const w=3.4,d=4,h=5;
  for(const y of [-h/2,h/2])B('pcb',[w,.1,d],[0,y,0],0x465561);
  for(const x of [-w/2,w/2])for(const z of [-d/2,d/2])B('pcb',[.1,h,.1],[x,0,z],0x65727c);
  B('pcb',[.08,h,d],[-w/2,0,0],0x293744);
  B('cage',[w-.2,.1,1.2],[0,-1.1,-1.15],0x63707b);for(const y of [-2,-1.6])B('cage',[1.6,.08,1.5],[.7,y,1],0x526575);
  const panel=new T.Mesh(new T.BoxGeometry(.055,h-.2,d-.15),new T.MeshPhysicalMaterial({color:0x71979c,transparent:true,opacity:.22,roughness:.14,metalness:.1,depthWrite:false}));panel.position.x=w/2;p.panel.add(panel);
  for(const x of [-1.66,1.66])B('front',[.1,h,.08],[x,0,d/2+.1],0x6c777f);
  const slats=[];for(let i=0;i<30;i++)slats.push([0,-2.4+i*.164,d/2+.1]);instances(p.front,[w,.045,.05],slats,0x60727e);
  for(const y of [-1.45,0,1.45]){const g=new T.Group();g.position.set(0,y,1.83);g.rotation.x=Math.PI/2;p.fan.add(g);coolingFan(g,0,0,0,.64)}
 }
}
root.PC_WORKSHOP_COMPONENTS={profile,create};
})(typeof window!=='undefined'?window:globalThis);
