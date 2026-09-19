/* Functional paths are explanatory diagrams, never live measurements or benchmarks. */
(function(root){
'use strict';
const D=root.PC_WORKSHOP_DATA;
Object.assign(D.text,{
 anatomy:['Desmontaje','Disassembly','拆解'],operation:['Cómo funciona','How it works','工作原理'],
 data:['Datos','Data','数据'],power:['Energía','Power','电能'],heat:['Calor y aire','Heat and airflow','热量与气流'],
 play:['Reproducir recorrido','Play walkthrough','播放演示'],pause:['Pausar recorrido','Pause walkthrough','暂停演示'],prevLesson:['Paso anterior','Previous step','上一步'],nextLesson:['Siguiente paso','Next step','下一步'],
 rate:['Velocidad de la animación','Animation speed','动画速度'],flowNote:['Las luces representan recorridos y funciones. No son electrones a escala, temperaturas, FPS ni mediciones; la separación permite ver conexiones que normalmente quedan ocultas.','Lights represent paths and functions. They are not to-scale electrons, temperatures, FPS or measurements; separation exposes normally hidden connections.','光点表示路径与功能，不代表按比例的电子、温度、帧率或测量值。分离视图显示通常被遮挡的连接。'],
 conceptual:['Separar también uniones soldadas · esquema','Separate soldered connections too · schematic','分离焊接连接 · 示意'],conceptualNote:['Despiece conceptual: silicio, soldaduras y circuitos se apartan solo para estudiarlos. No son piezas que se puedan sacar con la mano.','Conceptual exploded view: silicon, solder joints and circuits are separated only for study. They are not parts you can pull out by hand.','概念分解图：硅片、焊点和电路仅为学习而分开，并非可以用手拔出的部件。'],
 conceptualStep:['Separación conceptual de circuitos','Conceptual circuit separation','电路概念分离'],spacing:['Distancia entre piezas','Part spacing','部件间距'],labels:['Nombres sobre el modelo','Labels on model','显示部件名称'],xray:['Cubiertas transparentes','Transparent covers','透明外壳'],hd:['Alta definición','High definition','高清'],expand:['Ampliar taller','Expand workshop','展开工作台'],collapse:['Reducir taller','Collapse workshop','收起工作台'],
 isolatedFlow:['Mostrando una sola pieza. Pulsa «Mostrar conjunto» para ver el recorrido completo.','Showing one part. Select “Show assembly” to see the whole path.','正在显示单个部件。选择“显示整体”查看完整路径。']
});
const step=(from,to,title,body)=>({from,to,title,body});
const S=(...args)=>step(...args);
const L=(p,channel)=>{
 const c=p.category,i=p.item,steps=[];
 if(channel==='data'){
  if(c==='gpu')steps.push(
   S('connectors','die',['Órdenes desde la CPU','Commands from the CPU','来自 CPU 的指令'],['La CPU prepara trabajo y el controlador lo envía a la GPU mediante PCIe. La GPU no decide sola qué dibujar.','The CPU prepares work and the driver submits it to the GPU over PCIe. The GPU does not decide what to draw on its own.','CPU 准备任务，驱动通过 PCIe 提交给 GPU。GPU 不会自行决定绘制内容。']),
   S('die','vram',['Recursos en la VRAM','Resources in VRAM','显存中的资源'],['Texturas, geometría y otros datos de trabajo se guardan en memoria de vídeo. La GPU lee y escribe en ella.','Textures, geometry and other working data are stored in video memory. The GPU reads and writes this memory.','纹理、几何等工作数据存于显存。GPU 对其进行读写。']),
   S('vram','die',['Cálculo de la imagen','Computing the image','计算图像'],['Unidades de la GPU trabajan en paralelo con esos datos. Las etapas exactas dependen del programa y de la arquitectura.','GPU units work on this data in parallel. Exact stages depend on the program and architecture.','GPU 单元并行处理这些数据。具体阶段取决于程序与架构。']),
   S('die','connectors',['Salida hacia la pantalla','Output to the display','输出至显示器'],['El motor de pantalla envía la imagen por una salida compatible. La frecuencia del monitor y el rendimiento de renderizado son cosas distintas.','The display engine sends the image through a supported output. Monitor refresh rate and rendering performance are different things.','显示引擎通过兼容接口发送图像。显示器刷新率与渲染性能是不同概念。'])
  );
  if(c==='cpu'){
   steps.push(S('contacts','cache',['Entrada de datos e instrucciones','Data and instructions arrive','数据与指令输入'],['El sistema trae instrucciones y datos. Las cachés reducen accesos más lentos a la RAM; el mapa simplifica los niveles internos.','The system supplies instructions and data. Caches reduce slower RAM accesses; this map simplifies internal levels.','系统提供指令和数据。缓存减少较慢的内存访问；此图简化了内部层级。']),
    S('cache','cores',['Ejecutar instrucciones','Execute instructions','执行指令'],['Los núcleos decodifican y ejecutan instrucciones. Núcleos e hilos no equivalen directamente a FPS.','Cores decode and execute instructions. Core and thread counts do not translate directly into FPS.','核心解码并执行指令。核心数和线程数不直接等于帧率。']),
    S('cores','contacts',['Compartir resultados','Share results','传回结果'],['Los resultados se comunican con memoria y otros dispositivos mediante controladores e interconexiones.','Results reach memory and other devices through controllers and interconnects.','结果通过控制器和互连传送到内存及其他设备。']));
   if(i.igpu&&i.igpu!=='No')steps.push(S('cache','igpu',['Trabajo gráfico integrado','Integrated graphics work','集成图形任务'],['Si el programa usa la iGPU, esta procesa operaciones gráficas usando memoria compartida del sistema.','When software uses the iGPU, it processes graphics using shared system memory.','程序使用集成显卡时，图形任务会使用共享系统内存。']));
   if(i.npu)steps.push(S('cache','npu',['Una tarea de IA compatible','A supported AI task','兼容的 AI 任务'],['El software puede enviar ciertas operaciones de IA a la NPU. No toda aplicación la usa y no reemplaza el cálculo general.','Software can send certain AI operations to the NPU. Not every app uses it and it does not replace general computation.','软件可将部分 AI 运算交给 NPU。并非所有应用都使用它，也不替代通用计算。']));
  }
  if(c==='ram')steps.push(
   S('contacts','spd',['Identificar el módulo','Identify the module','识别模块'],['Al arrancar, la plataforma consulta SPD para conocer parámetros de la RAM. Esto no es la ruta de cada lectura de memoria.','At startup the platform reads SPD for module parameters. This is not the path of each memory read.','启动时平台读取 SPD 获取模块参数。这并非每次内存读取的路径。']),
   S('contacts',p.parts.some(x=>x.id==='register')?'register':'dram',['Orden del controlador de memoria','Memory controller command','内存控制器指令'],['El controlador envía dirección y órdenes de lectura o escritura. En RDIMM, un registro amortigua señales de control.','The controller sends addresses and read/write commands. In RDIMM a register buffers control signals.','控制器发送地址与读写指令。RDIMM 使用寄存器缓冲控制信号。']),
   S(p.parts.some(x=>x.id==='register')?'register':'contacts','dram',['Acceder a las celdas DRAM','Access DRAM cells','访问 DRAM 单元'],['La DRAM guarda temporalmente datos y necesita refresco. Al cortar la energía no conserva tu sesión como lo hace un SSD con sus archivos.','DRAM temporarily stores data and needs refresh. When power is removed it does not retain the session as an SSD retains files.','DRAM 临时保存数据并需要刷新。断电后无法像 SSD 保存文件那样保留会话。']),
   S('dram','contacts',['Devolver los datos','Return the data','返回数据'],['Los datos viajan de vuelta por el bus de memoria. Capacidad en GB y tasa en MT/s describen características diferentes.','Data returns over the memory bus. Capacity in GB and transfer rate in MT/s describe different properties.','数据通过内存总线返回。GB 容量与 MT/s 传输率表示不同属性。'])
  );
  if(c==='storage'){
   steps.push(S('connectors','controller',['Petición de lectura o escritura','Read or write request','读写请求'],['La interfaz lleva una petición al controlador. SATA, NVMe/PCIe y USB usan enlaces y protocolos distintos.','The interface carries a request to the controller. SATA, NVMe/PCIe and USB use different links and protocols.','接口向控制器传递请求。SATA、NVMe/PCIe 和 USB 使用不同链路与协议。']));
   if(i.type==='HDD')steps.push(S('controller','actuator',['Buscar una pista','Seek a track','寻道'],['El controlador posiciona los cabezales mientras los platos giran. Este movimiento introduce latencia mecánica.','The controller positions the heads while platters spin. This movement adds mechanical latency.','控制器在盘片旋转时定位磁头。机械运动会产生延迟。']),S('actuator','platters',['Leer o escribir magnetismo','Read or write magnetic data','磁性读写'],['Los cabezales leen o cambian el estado magnético de pequeñas regiones. No tocan normalmente la superficie.','Heads read or change magnetic states in small regions. They normally do not touch the surface.','磁头读取或改变小区域的磁状态，正常情况下不接触盘面。']));
   else steps.push(S('controller','nand',['Acceder a la memoria flash','Access flash memory','访问闪存'],['El controlador gestiona páginas, bloques y corrección de errores. Los datos permanecen aunque el equipo esté apagado.','The controller manages pages, blocks and error correction. Data remains when the computer is off.','控制器管理页、块与纠错。关机后数据仍然保留。']));
   steps.push(S('controller','connectors',['Transferir el resultado','Transfer the result','传输结果'],['El resultado vuelve al sistema. La generación PCIe por sí sola no indica la velocidad real de cualquier archivo.','The result returns to the system. PCIe generation alone does not determine real speed for every file.','结果返回系统。PCIe 代际本身不能决定每种文件的实际速度。']));
  }
  if(c==='motherboard')steps.push(
   S('slots','socket',['Memoria y CPU','Memory and CPU','内存与 CPU'],['Las pistas conectan la RAM con el controlador de memoria de la plataforma. El trazado mostrado es ilustrativo.','Traces connect RAM to the platform memory controller. The depicted routing is illustrative.','走线将内存连接到平台内存控制器。图中布线仅为示意。']),
   S('connectors','chipset',['Entrada y salida','Input and output','输入与输出'],['Algunos puertos pasan por el chipset; otros pueden depender directamente de la CPU. Revisa el diagrama de la placa concreta.','Some ports go through the chipset; others may connect directly to the CPU. Check the actual board diagram.','部分接口经过芯片组；其他接口可能直接连接 CPU。请查阅具体主板框图。']),
   S('chipset','socket',['Comunicación de la plataforma','Platform communication','平台通信'],['El chipset se comunica con el procesador por el enlace de la plataforma. El ancho de banda se comparte según el diseño.','The chipset communicates with the processor over the platform link. Bandwidth sharing depends on the design.','芯片组通过平台链路与处理器通信。带宽共享方式取决于设计。'])
  );
 }
 if(channel==='power'){
  if(c==='psu')steps.push(
   S('connectors','rectifier',['Entrada y conversión','Input and conversion','输入与转换'],['La fuente recibe corriente alterna y la prepara para una etapa de conmutación. Es un esquema funcional, no un diagrama de reparación.','The PSU receives AC and prepares it for a switching stage. This is a functional overview, not a repair diagram.','电源接收交流电并为开关级做准备。此图为功能概览，并非维修图。']),
   S('rectifier','transformer',['Transferencia aislada','Isolated transfer','隔离传输'],['El transformador forma parte de la transferencia de energía y del aislamiento entre entrada y salida.','The transformer participates in energy transfer and isolation between input and output.','变压器参与能量传递及输入输出间的隔离。']),
   S('transformer','capacitors',['Rectificar, filtrar y regular','Rectify, filter and regulate','整流、滤波与调节'],['Las etapas de salida producen tensiones continuas reguladas; los condensadores ayudan al filtrado.','Output stages produce regulated DC voltages; capacitors help filter them.','输出级产生稳定直流电压；电容辅助滤波。']),
   S('capacitors','connectors',['Alimentar el equipo','Power the computer','为电脑供电'],['Las salidas alimentan placa, CPU, GPU y unidades. La capacidad nominal no es el consumo constante del equipo.','Outputs power the board, CPU, GPU and drives. Rated capacity is not the computer’s constant power draw.','输出为主板、CPU、GPU 与硬盘供电。额定容量并非电脑持续消耗的功率。'])
  );
  else {
   const input=c==='cpu'?'contacts':c==='ram'?'contacts':'connectors';
   const regulator=c==='gpu'||c==='motherboard'?'vrm':c==='ram'&&i.memory==='DDR5'?'pmic':input;
   const target=c==='gpu'?'die':c==='cpu'?'cores':c==='ram'?'dram':c==='storage'?'controller':'socket';
   if(regulator!==input)steps.push(S(input,regulator,['Ajustar la alimentación','Regulate the supply','调节供电'],['La regulación adapta la energía recibida a las tensiones requeridas por los circuitos.','Regulation adapts incoming power to the voltages required by the circuits.','稳压电路将输入电源调整到电路所需电压。']));
   steps.push(S(regulator,target,['Energía para trabajar','Energy to operate','工作所需电能'],['Los circuitos necesitan alimentación estable. El consumo cambia con la actividad; esta animación no mide vatios.','Circuits require a stable supply. Consumption changes with activity; this animation does not measure watts.','电路需要稳定供电。功耗随活动变化；此动画不测量瓦数。']));
  }
 }
 if(channel==='heat'){
  if(c==='case')steps.push(S('front','fan',['Entrada de aire','Air intake','进气'],['El frente permite el paso del aire hacia los ventiladores. Restricciones y filtros cambian el caudal real.','The front lets air reach the fans. Restrictions and filters affect actual airflow.','正面使空气进入风扇。阻碍与滤网影响实际风量。']),S('fan','pcb',['Recorrer el interior','Through the interior','经过内部'],['El aire recoge calor de las piezas y debe tener una salida. La dirección real depende de cómo montes cada ventilador.','Air picks up heat from parts and needs an exit. Real direction depends on how each fan is installed.','空气带走部件热量并需要出口。实际方向取决于风扇安装方式。']));
  else if(c==='cooler'){
   steps.push(S('pcb',i.type==='AIO'?'loop':'heatpipes',['Recibir y transportar calor','Receive and transport heat','接收并传递热量'],[i.type==='AIO'?'La base recibe calor; el refrigerante lo transporta dentro del circuito sellado.':'La base recibe calor y los tubos lo distribuyen hacia las aletas.',i.type==='AIO'?'The base receives heat; coolant transports it inside the sealed loop.':'The base receives heat and heat pipes distribute it to the fins.',i.type==='AIO'?'底座接收热量；冷却液在密闭回路中传递热量。':'底座接收热量，热管将其分配到鳍片。']),S(i.type==='AIO'?'loop':'heatpipes','heatsink',['Intercambio con el radiador','Transfer to the fins','传至冷排或鳍片'],['La superficie metálica reparte calor sobre una zona mayor para intercambiarlo con el aire.','The metal surface spreads heat over a larger area to exchange it with air.','金属表面将热量分散到较大面积以与空气交换。']),S('heatsink','fan',['El aire se lleva el calor','Air carries heat away','空气带走热量'],['El ventilador impulsa aire entre las aletas. Este recorrido no calcula temperaturas ni capacidad de refrigeración.','The fan moves air through the fins. This path does not calculate temperatures or cooling capacity.','风扇推动空气经过鳍片。此演示不计算温度或散热能力。']));
  }else {
   const source=c==='cpu'?'cores':c==='gpu'?'die':c==='ram'?'dram':c==='storage'?'controller':c==='psu'?'transformer':'vrm';
   const middle=c==='gpu'?'thermal':c==='cpu'&&p.parts.some(x=>x.id==='thermal')?'thermal':c==='ram'&&p.parts.some(x=>x.id==='spreaderFront')?'spreaderFront':c==='psu'?'fan':c==='motherboard'?'heatsink':'pcb';
   steps.push(S(source,middle,['El trabajo genera calor','Work generates heat','工作产生热量'],['Parte de la energía usada por los circuitos se transforma en calor. El contacto térmico ayuda a trasladarlo.','Part of the energy used by circuits becomes heat. Thermal contact helps transfer it.','电路使用的部分能量转为热量。热接触有助于传递热量。']));
   if(c==='gpu')steps.push(S('thermal','heatsink',['Del chip al disipador','From chip to heatsink','芯片至散热器'],['La interfaz térmica llena pequeños huecos; el disipador reparte el calor entre sus aletas.','The thermal interface fills small gaps; the heatsink distributes heat to its fins.','导热介质填补细小间隙；散热器将热量分配至鳍片。']),S('heatsink','shroud',['Ventilación','Airflow','通风'],['El aire que atraviesa las aletas transporta calor al entorno. La forma de las flechas es una simplificación.','Air crossing the fins carries heat into the surroundings. Arrow paths are simplified.','经过鳍片的空气将热量带到环境中。箭头路径已简化。']));
   if(c==='cpu'&&p.parts.some(x=>x.id==='lid'))steps.push(S('thermal','lid',['Hacia el refrigerador','Toward the cooler','传至散热器'],['El difusor térmico entrega calor al refrigerador externo. Ese refrigerador se explora en su propia categoría.','The heat spreader transfers heat to the external cooler, explored in its own category.','顶盖将热量传给外部散热器，可在散热类别单独探索。']));
  }
 }
 return steps;
};
root.PC_WORKSHOP_LESSONS={get:L,channels:category=>category==='psu'?['power','heat']:['cooler','case'].includes(category)?['heat']:['data','power','heat'],value:(texts,lang='es')=>texts[{es:0,en:1,zh:2}[lang]||0]};
})(typeof window!=='undefined'?window:globalThis);
