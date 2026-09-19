/* Educational component anatomy, not a manufacturer-specific repair manual. */
(function(root){
  'use strict';
  const text={
    workshop:['Taller 3D','3D workshop','3D 工作台'],
    inside:['Ver por dentro','Explore inside','探索内部'],
    kicker:['02 / ASÍ ESTÁ CONSTRUIDO','02 / HOW IT IS BUILT','02 / 内部构造'],
    title:['Desmonta. Descubre. Vuelve a montar.','Disassemble. Discover. Reassemble.','拆解 · 探索 · 重新组装'],
    subtitle:['Explora las capas de una gráfica o un módulo de RAM sin cambiar tu configuración.','Explore the layers of a graphics card or RAM module without changing your build.','探索显卡或内存模块的分层结构，不会更改装机配置。'],
    model:['Modelo de referencia','Reference model','参考型号'],
    category:['Componente','Component','组件'],
    gpu:['Tarjeta gráfica','Graphics card','显卡'],
    ram:['Memoria RAM','RAM','内存'],
    assemble:['Montar todo','Reassemble all','全部装回'],
    disassemble:['Desmontar todo','Disassemble all','全部拆开'],
    previous:['Montar una capa','Reassemble one layer','装回一层'],
    next:['Desmontar una capa','Remove one layer','拆开一层'],
    layers:['Capas separadas','Separated layers','已分离层数'],
    parts:['Partes del componente','Component parts','组件部件'],
    focus:['Aislar pieza','Isolate part','单独查看'],
    showAll:['Mostrar conjunto','Show assembly','显示整体'],
    reset:['Restablecer vista','Reset view','重置视角'],
    rotate:['Giro automático','Auto rotate','自动旋转'],
    low:['Ahorro gráfico','Low-power graphics','低功耗渲染'],
    zoomIn:['Acercar','Zoom in','放大'],
    zoomOut:['Alejar','Zoom out','缩小'],
    front:['Vista superior','Top view','顶视图'],
    rear:['Vista inferior','Bottom view','底视图'],
    use:['Usar en mi PC','Use in my PC','用于我的配置'],
    back:['Volver al constructor','Back to builder','返回装机'],
    complete:['Componente montado','Component assembled','组件已组装'],
    open:['Interior al descubierto','Interior exposed','内部已展开'],
    progress:['Capa','Layer','层'],
    gesture:['Arrastra para girar · pellizca o usa +/− para ampliar · toca una pieza','Drag to rotate · pinch or use +/− to zoom · tap a part','拖动旋转 · 双指或 +/− 缩放 · 点击部件'],
    note:['Modelo didáctico por familia: geometría, chips, tornillos y ventiladores ilustrativos; no es una réplica exacta del SKU ni una guía de reparación.','Family-level teaching model: geometry, chips, screws and fans are illustrative; not an exact SKU replica or repair guide.','按类别制作的教学模型：形状、芯片、螺钉和风扇为示意，并非具体型号的精确复刻或维修指南。'],
    safety:['Simulación virtual. Los chips están soldados y no se desmontan a mano. No abras hardware real siguiendo esta animación.','Virtual simulation. Chips are soldered and cannot be removed by hand. Do not use this animation to open real hardware.','虚拟演示。芯片通过焊接固定，不能用手拆下。请勿依据此动画拆解真实硬件。'],
    bare:['Módulo sin cubierta: sus chips ya están a la vista. Selecciona una pieza para inspeccionarla.','Bare module: its chips are already visible. Select a part to inspect it.','无散热外壳模块：芯片已可见。选择部件以查看详情。'],
    kit:['Se muestra un módulo del kit; el número y la distribución de chips son ilustrativos.','One module from the kit is shown; chip count and layout are illustrative.','展示套装中的一个模块；芯片数量与布局为示意。'],
    family:['Diseño educativo por familia','Family-level teaching design','类别教学模型'],
    reference:['Ficha del fabricante','Manufacturer specifications','厂商规格'],
    source:['Lectura técnica complementaria','Related technical reading','相关技术阅读'],
    fallback:['El visor 3D no está disponible. Las piezas, explicaciones y controles por pasos siguen funcionando.','3D rendering is unavailable. Parts, explanations and step controls still work.','3D 渲染不可用，部件说明与分步控制仍可使用。'],
    coverOption:['Cubierta ilustrativa','Illustrative heat spreader','示意散热外壳'],
    screws:['Tornillos de sujeción','Fastening screws','固定螺钉'],
    screwsDesc:['Fijan el conjunto. Cantidad y posición varían por ensamblador; aquí se apartan como un grupo.','Secure the assembly. Count and position vary by manufacturer; shown here as a group.','固定组件。数量和位置因厂商而异，此处按一组展示。'],
    shroud:['Carcasa y ventiladores','Shroud and fans','外壳与风扇'],
    shroudDesc:['Guían el aire a través del disipador. El número de ventiladores no mide la potencia de la GPU.','Guide air through the heatsink. Fan count does not measure GPU performance.','引导气流通过散热器。风扇数量不代表 GPU 性能。'],
    heatsink:['Disipador y tubos de calor','Heatsink and heat pipes','散热器与热管'],
    heatsinkDesc:['La base recoge calor; los tubos lo reparten entre las aletas. Algunos diseños usan cámara de vapor.','The base absorbs heat; pipes distribute it to the fins. Some designs use a vapor chamber.','底座吸收热量，热管将热量传到鳍片。部分设计使用均热板。'],
    thermal:['Interfaz térmica','Thermal interface','导热介质'],
    thermalDesc:['La pasta y las almohadillas rellenan pequeños huecos para transferir calor. El grosor depende del diseño real.','Paste and pads fill small gaps to transfer heat. Pad thickness depends on the actual design.','导热膏和导热垫填充间隙以传递热量，厚度取决于实际设计。'],
    backplate:['Placa posterior','Backplate','背板'],
    backplateDesc:['Refuerza o protege el conjunto; no todas las tarjetas incluyen una. Su función térmica depende del diseño.','Stiffens or protects the assembly; not every card has one. Its thermal role depends on the design.','用于加固或保护，并非所有显卡都配备背板，导热作用取决于设计。'],
    pcb:['Placa de circuito impreso (PCB)','Printed circuit board (PCB)','印刷电路板（PCB）'],
    pcbDesc:['Sus capas de cobre conectan señales y alimentación. Las pistas dibujadas aquí son ilustrativas.','Copper layers route signals and power. The traces shown here are illustrative.','铜层传递信号和电源，此处走线为示意。'],
    die:['Chip gráfico (GPU)','Graphics processor (GPU)','图形处理器（GPU）'],
    dieDesc:['Ejecuta operaciones gráficas y de cómputo. Está unido a un encapsulado soldado; no es una pieza extraíble.','Performs graphics and compute work. It is bonded to a soldered package, not a removable part.','执行图形和计算任务，封装通过焊接固定，不能直接拔出。'],
    vram:['Memoria de vídeo (VRAM)','Video memory (VRAM)','显存（VRAM）'],
    vramDesc:['Almacena datos de trabajo de la GPU. Los chips mostrados no representan una capacidad por chip ni una distribución exacta.','Stores GPU working data. The shown chips do not imply a per-chip capacity or exact layout.','存储 GPU 工作数据。示意芯片不代表每颗芯片的容量或准确布局。'],
    hbm:['Memoria HBM e interposer','HBM memory and interposer','HBM 显存与中介层'],
    hbmDesc:['Los apilamientos HBM comparten un interposer con la GPU, en lugar de distribuirse como GDDR por la tarjeta.','HBM stacks share an interposer with the GPU instead of being distributed around the board like GDDR.','HBM 堆叠与 GPU 共享中介层，而不像 GDDR 那样分布在板上。'],
    vrm:['Regulación de voltaje (VRM)','Voltage regulation (VRM)','供电电路（VRM）'],
    vrmDesc:['Convierte y estabiliza la alimentación para los chips. Las fases y los componentes varían entre tarjetas.','Converts and stabilizes power for the chips. Phases and components vary between boards.','为芯片转换并稳定电源，供电相数和元件因板卡而异。'],
    connectors:['Conectores y contactos','Connectors and contacts','接口与触点'],
    connectorsDesc:['El borde PCIe conecta la tarjeta con la placa. Salidas de vídeo y alimentación auxiliar dependen del modelo.','The PCIe edge connects the card to the motherboard. Video outputs and auxiliary power depend on the model.','PCIe 金手指连接主板，视频和辅助供电接口取决于型号。'],
    dram:['Chips de memoria DRAM','DRAM memory chips','DRAM 内存芯片'],
    dramDesc:['Guardan temporalmente los datos. Permanecen soldados al PCB durante la exploración; no equivalen a módulos extraíbles.','Temporarily store data. They remain soldered to the PCB during exploration, not individually removable modules.','暂时保存数据，探索时仍焊接在 PCB 上，并非可单独拔出的模块。'],
    spd:['Chip SPD','SPD chip','SPD 芯片'],
    spd5:['Concentrador SPD','SPD hub','SPD 集线器'],
    spdDesc:['Guarda datos de identificación y parámetros del módulo para que el sistema pueda configurarlo.','Stores module identification and timing information used by the system for configuration.','存储模块标识与时序参数，供系统配置使用。'],
    pmic:['Gestión de energía (PMIC)','Power management (PMIC)','电源管理（PMIC）'],
    pmicDesc:['En DDR5, el módulo integra regulación de alimentación. No se añade este chip a las vistas DDR1–DDR4.','DDR5 includes on-module power management. This chip is not added to the DDR1–DDR4 views.','DDR5 模块集成电源管理；DDR1–DDR4 视图不添加此芯片。'],
    register:['Registro de señales (RDIMM)','Signal register (RDIMM)','信号寄存器（RDIMM）'],
    registerDesc:['El registro de un RDIMM amortigua señales de control. RDIMM no se intercambia con UDIMM por tener la misma generación DDR.','An RDIMM register buffers control signals. Sharing a DDR generation does not make RDIMM interchangeable with UDIMM.','RDIMM 寄存器缓冲控制信号。同代 DDR 不意味着 RDIMM 和 UDIMM 可互换。'],
    contacts:['Contactos y muesca','Contacts and key notch','金手指与防呆缺口'],
    contactsDesc:['La muesca ayuda a evitar inserciones incompatibles. La ubicación y el número de contactos dependen de la generación y el formato.','The notch helps prevent incompatible insertion. Its position and contact count depend on generation and form factor.','防呆缺口用于避免错误插入，其位置与触点数量取决于代际和规格。'],
    spreaderFront:['Disipador frontal ilustrativo','Illustrative front heat spreader','示意正面散热片'],
    spreaderBack:['Disipador trasero ilustrativo','Illustrative rear heat spreader','示意背面散热片'],
    spreaderDesc:['Cubierta opcional del modelo educativo; no se afirma que este perfil genérico la incluya.','Optional teaching-model cover; this generic profile is not claimed to include it.','教学模型的可选外壳，不表示此通用配置必然配备。'],
    strip:['Barra superior ilustrativa','Illustrative top light bar','示意顶部灯条'],
    stripDesc:['Elemento visual opcional. La iluminación no aumenta la capacidad ni la velocidad de la memoria.','Optional visual element. Lighting does not increase memory capacity or speed.','可选视觉元素，灯光不会增加内存容量或速度。']
  };
  const tr=(key,lang='es')=>(text[key]||[key,key,key])[{es:0,en:1,zh:2}[lang]||0];
  const sources={ram:'https://www.kingston.com/en/blog/pc-performance/ddr5-overview',gpu:'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/'};
  function profile(item,category,covered=true){
    if(!item||!['gpu','ram'].includes(category))throw Error('Unsupported workshop component');
    const parts=[],steps=[];
    const add=(id,key,desc,offset=[0,0,0],step=0)=>{parts.push({id,key,desc,offset,step});return id};
    if(category==='gpu'){
      add('pcb','pcb','pcbDesc');add('die','die','dieDesc');
      add('vram',item.memory==='HBM2'?'hbm':'vram',item.memory==='HBM2'?'hbmDesc':'vramDesc');
      add('vrm','vrm','vrmDesc');add('connectors','connectors','connectorsDesc');
      steps.push(add('screws','screws','screwsDesc',[1.4,2.6,0],1));
      steps.push(add('shroud','shroud','shroudDesc',[0,2.3,0],2));
      steps.push(add('heatsink','heatsink','heatsinkDesc',[0,1.4,0],3));
      add('thermal','thermal','thermalDesc',[0,.7,0],3);
      steps.push(add('backplate','backplate','backplateDesc',[0,-1.05,0],4));
    }else{
      add('pcb','pcb','pcbDesc');add('dram','dram','dramDesc');add('contacts','contacts','contactsDesc');
      add('spd',item.memory==='DDR5'?'spd5':'spd','spdDesc');
      if(item.memory==='DDR5')add('pmic','pmic','pmicDesc');
      if(item.form==='RDIMM')add('register','register','registerDesc');
      if(covered&&item.form==='UDIMM'&&['DDR4','DDR5'].includes(item.memory)){
        steps.push(add('strip','strip','stripDesc',[0,1.7,0],1));
        steps.push(add('spreaderFront','spreaderFront','spreaderDesc',[0,-1.6,1],2));
        steps.push(add('spreaderBack','spreaderBack','spreaderDesc',[0,0,-1.5],3));
      }
    }
    return {category,item,parts,steps,max:steps.length,source:sources[category]};
  }
  function offset(part,progress){
    const amount=part.step?Math.max(0,Math.min(1,progress-part.step+1)):0;
    const eased=amount*amount*(3-2*amount);
    return part.offset.map(value=>eased?value*eased:0);
  }
  root.PC_WORKSHOP_DATA={text,tr,profile,offset};
})(typeof window!=='undefined'?window:globalThis);
