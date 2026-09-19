/* PC Lab Builder 1.25.0 — historical, mobile and compact-system expansion.
   Mobile/BGA processors are reference records only: they are soldered to a
   laptop or mini-PC board and cannot be selected as desktop build parts. */
(function (root) {
  'use strict';

  const DB = root.PC_CATALOG;
  const slug = root.PC_SLUG;
  if (!DB || !slug) return;

  const has = (category, id) => DB[category].some(item => item.id === id);
  const add = (category, item) => {
    if (!has(category, item.id)) DB[category].push(item);
  };
  const amdProcessors = 'https://www.amd.com/en/products/specifications/processors.html';
  const intelArk = 'https://www.intel.com/content/www/us/en/ark.html';

  /* Every original desktop CPU remains mountable. Add explicit platform/NPU
     metadata so desktop, laptop, mini-PC and AI filters never rely on names. */
  DB.cpu.forEach(cpu => {
    cpu.platform = cpu.platform || 'desktop';
    cpu.buildable = cpu.buildable !== false;
    cpu.miniPc = cpu.miniPc ?? ((cpu.watts || 999) <= 65);
    cpu.npu = cpu.npu || null;
    if (/^Core Ultra /.test(cpu.name)) cpu.npu = 'Intel AI Boost';
    if (cpu.name === 'Ryzen 5 8600G') cpu.npu = 'AMD Ryzen AI (XDNA)';
  });

  const desktopAdditions = [
    {name:'AMD Athlon 64 3200+ (Socket 939)',brand:'AMD',family:'Athlon 64',generation:'K8',cores:1,threads:1,clock:'2.0 GHz',cache:'512 KB L2',watts:67,powerBudget:90,igpu:'No',socket:'Socket 939',memory:['DDR (DDR1)'],source:amdProcessors},
    {name:'Intel Pentium 4 3.0E (Socket 478)',brand:'Intel',family:'Pentium 4',generation:'Prescott',cores:1,threads:2,clock:'3.0 GHz',cache:'1 MB L2',watts:89,powerBudget:110,igpu:'No',socket:'Socket 478',memory:['DDR (DDR1)'],source:intelArk},
    {name:'Ryzen 5 9500F',brand:'AMD',family:'Ryzen 5',generation:'9000',cores:6,threads:12,clock:'3.8 / 5.0 GHz',cache:'38 MB (L2 + L3)',watts:65,powerBudget:91,igpu:'No',socket:'AM5',memory:['DDR5'],source:'https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-5-9500f.html',reviewed:true},
    {name:'Ryzen 5 9600',brand:'AMD',family:'Ryzen 5',generation:'9000',cores:6,threads:12,clock:'3.8 / 5.2 GHz',cache:'38 MB (L2 + L3)',watts:65,powerBudget:91,igpu:'AMD Radeon Graphics',socket:'AM5',memory:['DDR5'],source:'https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-5-9600.html',reviewed:true},
    {name:'Ryzen 7 9850X3D',brand:'AMD',family:'Ryzen X3D',generation:'9000X3D',cores:8,threads:16,clock:'4.7 / 5.6 GHz',cache:'104 MB (L2 + L3)',watts:120,powerBudget:170,igpu:'AMD Radeon Graphics',socket:'AM5',memory:['DDR5'],source:'https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9850x3d.html',reviewed:true}
  ];
  desktopAdditions.forEach(cpu => add('cpu', {
    id:'cpu-'+slug(cpu.name), kind:'reference', platform:'desktop', buildable:true,
    miniPc:cpu.watts <= 65, npu:null, ...cpu
  }));

  const mobileRows = [
    ['AMD','Ryzen AI','Ryzen AI 5 340','AI 300',6,12,'2.0 / 4.8 GHz','22 MB','15–54 W',54,'AMD Radeon 840M','AMD Ryzen AI (XDNA 2)','mobile'],
    ['AMD','Ryzen AI','Ryzen AI 7 350','AI 300',8,16,'2.0 / 5.0 GHz','24 MB','15–54 W',54,'AMD Radeon 860M','AMD Ryzen AI (XDNA 2)','mobile'],
    ['AMD','Ryzen AI','Ryzen AI 9 365','AI 300',10,20,'2.0 / 5.0 GHz','34 MB','15–54 W',54,'AMD Radeon 880M','AMD Ryzen AI (XDNA 2)','mobile'],
    ['AMD','Ryzen AI','Ryzen AI 9 HX 370','AI 300',12,24,'2.0 / 5.1 GHz','36 MB','15–54 W',54,'AMD Radeon 890M','AMD Ryzen AI (XDNA 2)','mobile'],
    ['AMD','Ryzen AI','Ryzen AI 9 HX 375','AI 300',12,24,'2.0 / 5.1 GHz','36 MB','15–54 W',54,'AMD Radeon 890M','AMD Ryzen AI (XDNA 2)','mobile'],
    ['AMD','Ryzen Mobile','Ryzen 7 8845HS','8000 Mobile',8,16,'3.8 / 5.1 GHz','24 MB','45 W',45,'AMD Radeon 780M','AMD Ryzen AI (XDNA)','mobile'],
    ['AMD','Ryzen Mobile','Ryzen 7 7840HS','7000 Mobile',8,16,'3.8 / 5.1 GHz','24 MB','35–54 W',54,'AMD Radeon 780M','AMD Ryzen AI (XDNA)','mobile'],
    ['Intel','Core Ultra','Core Ultra X9 388H','Series 3',16,16,'2.1 / 5.1 GHz','18 MB','25–80 W',80,'Intel Arc B390 GPU','Intel AI Boost','mobile'],
    ['Intel','Core Ultra','Core Ultra 9 386H','Series 3',16,16,'2.1 / 4.9 GHz','18 MB','25–80 W',80,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra','Core Ultra X7 358H','Series 3',16,16,'1.9 / 4.8 GHz','18 MB','25–80 W',80,'Intel Arc B390 GPU','Intel AI Boost','mobile'],
    ['Intel','Core Ultra','Core Ultra 7 366H','Series 3',16,16,'2.0 / 4.8 GHz','18 MB','25–80 W',80,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra','Core Ultra 7 356H','Series 3',16,16,'1.9 / 4.7 GHz','18 MB','25–80 W',80,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra','Core Ultra 5 338H','Series 3',12,12,'1.9 / 4.7 GHz','18 MB','25–65 W',65,'Intel Arc B370 GPU','Intel AI Boost','mobile'],
    ['Intel','Core Ultra','Core Ultra 5 336H','Series 3',12,12,'1.9 / 4.6 GHz','18 MB','25–65 W',65,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra Mobile','Core Ultra 9 285HX','Series 2 Mobile',24,24,'2.8 / 5.5 GHz','36 MB Smart Cache','55–160 W',160,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra Mobile','Core Ultra 7 275HX','Series 2 Mobile',24,24,'2.7 / 5.4 GHz','36 MB Smart Cache','55–160 W',160,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra Mobile','Core Ultra 7 255HX','Series 2 Mobile',20,20,'2.4 / 5.2 GHz','30 MB Smart Cache','55–160 W',160,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra Mobile','Core Ultra 5 245HX','Series 2 Mobile',14,14,'2.6 / 5.1 GHz','24 MB Smart Cache','55–160 W',160,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra Mobile','Core Ultra 9 185H','Series 1 Mobile',16,22,'2.3 / 5.1 GHz','24 MB Smart Cache','28–115 W',115,'Intel Arc Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra Mobile','Core Ultra 7 155H','Series 1 Mobile',16,22,'1.4 / 4.8 GHz','24 MB Smart Cache','28–115 W',115,'Intel Arc Graphics','Intel AI Boost','mobile'],
    ['Intel','Core Ultra Mobile','Core Ultra 5 125H','Series 1 Mobile',14,18,'1.2 / 4.5 GHz','18 MB Smart Cache','28–115 W',115,'Intel Arc Graphics','Intel AI Boost','mobile'],
    ['Intel','Core 3','Core 3 305','Series 3',6,6,'1.5 / 4.3 GHz','6 MB','15–35 W',35,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core 5','Core 5 320','Series 3',6,6,'1.5 / 4.6 GHz','6 MB','15–35 W',35,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core 7','Core 7 360','Series 3',6,6,'1.5 / 4.8 GHz','6 MB','15–35 W',35,'Intel Graphics','Intel AI Boost','mobile'],
    ['Intel','Core 9','Core 9 273PE','Series 2',12,24,'2.3 / 5.7 GHz','36 MB','65 W',65,'Intel UHD Graphics 770',null,'embedded']
  ];
  mobileRows.forEach(([brand,family,name,generation,cores,threads,clock,cache,powerRange,watts,igpu,npu,platform]) => {
    add('cpu', {
      id:'cpu-'+slug(name), name, brand, family, generation, cores, threads,
      clock, cache, powerRange, watts, powerBudget:watts, igpu, npu,
      socket:platform === 'embedded' ? 'LGA1700 (plataforma embebida)' : 'BGA',
      packaging:platform === 'embedded' ? 'Plataforma validada por fabricante' : 'Soldado',
      memory:['DDR5'], platform, miniPc:true, buildable:false, kind:'reference',
      source:brand === 'AMD' ? amdProcessors : intelArk
    });
  });

  /* DDR is also commonly called DDR1. These are clearly labelled generic
     configurations because module density/timings varied greatly by platform. */
  [
    ['DDR (DDR1)',0.5,2,266,2.5,'UDIMM'],
    ['DDR (DDR1)',1,2,333,2.5,'UDIMM'],
    ['DDR (DDR1)',1,2,400,3,'UDIMM'],
    ['DDR (DDR1)',2,2,400,3,'UDIMM'],
    ['DDR (DDR1)',1,2,333,2.5,'SO-DIMM'],
    ['DDR2',4,2,800,6,'SO-DIMM'],
    ['DDR3',16,2,1600,11,'SO-DIMM']
  ].forEach(([memory,capacity,modules,speed,cl,form]) => add('ram', {
    id:'ram-'+slug(form+'-'+memory+'-'+capacity+'-'+speed),
    name:`${form} · ${memory}-${speed} · ${capacity} GB (${modules} × ${capacity/modules}) · CL${cl}`,
    brand:'Profile', memory, capacity, modules, speed, cl, form,
    watts:modules*4, kind:'profile', source:'https://www.kingston.com/en/memory'
  }));

  [
    {name:'nForce4 Socket 939 · DDR (DDR1)',socket:'Socket 939'},
    {name:'i865 Socket 478 · DDR (DDR1)',socket:'Socket 478'}
  ].forEach(board => add('motherboard', {
    id:'mb-'+slug(board.name), name:board.name, brand:'Profile', socket:board.socket,
    memory:'DDR (DDR1)', form:'ATX', dimms:4, maxRam:4, m2:0, sata:4,
    storageGen:0, pcie:1, ramForm:'UDIMM', watts:45, kind:'profile',
    source:'https://www.msi.com/Motherboards'
  }));

  DB.cooler.forEach(cooler => {
    if (cooler.id === 'cooler-legacy') {
      ['Socket 939','Socket 478','LGA775','LGA1151'].forEach(socket => {
        if (!cooler.sockets.includes(socket)) cooler.sockets.push(socket);
      });
    }
  });

  // Preserve the historical ID used in saved builds, but replace incorrect
  // generic PCIe assumptions with a documented Socket 478 / 865G board.
  const legacyBoard=DB.motherboard.find(board=>board.socket==='Socket 478');
  Object.assign(legacyBoard,{
    name:'P4i65G',brand:'ASRock',kind:'reference',reviewed:true,form:'mATX',
    dimms:2,maxRam:2,sata:2,pcie:0,gpuSlot:'AGP',igpu:'Intel Extreme Graphics 2',
    source:'https://www.asrock.com/mb/Intel/P4i65G/index.asp'
  });

  /* “SSD 1.0–5.0” means PCIe link generation, not an SSD generation.
     AIC profiles represent the historical link without inventing a retail SKU. */
  [
    [1,64],[2,128],[3,512],[4,1000],[5,2000]
  ].forEach(([pcie,capacity]) => add('storage', {
    id:`ssd-pcie-${pcie}-aic-${capacity}`,
    name:`Perfil SSD PCIe ${pcie}.0 ×4 · ${capacity >= 1000 ? capacity/1000+' TB' : capacity+' GB'} · AIC`,
    brand:'Profile', type:'SSD', iface:'PCIe', form:'AIC', capacity, pcie,
    read:null, watts:pcie >= 5 ? 14 : 8, kind:'profile',
    source:'https://pcisig.com/pci-express-technology'
  }));
  [
    ['SATA 1.5 Gb/s',64],['SATA 3 Gb/s',128],['SATA 6 Gb/s',512]
  ].forEach(([link,capacity]) => add('storage', {
    id:'ssd-'+slug(link+'-'+capacity), name:`Perfil SSD ${link} · ${capacity} GB · 2.5-inch`,
    brand:'Profile', type:'SSD', iface:'SATA', sataLink:link, form:'2.5-inch',
    capacity, pcie:0, read:null, watts:5, kind:'profile',
    source:'https://sata-io.org/developers/sata-ecosystem'
  }));

  [
    {name:'GeForce 8800 GT 512MB',brand:'NVIDIA',arch:'Tesla',year:2007,vram:0.5,memory:'GDDR3',watts:105,bus:256,pcie:2},
    {name:'GeForce 9500 GT 1GB DDR2',brand:'NVIDIA',arch:'Tesla',year:2008,vram:1,memory:'DDR2',watts:50,bus:128,pcie:2},
    {name:'Radeon HD 3450 512MB DDR2',brand:'AMD',arch:'TeraScale',year:2008,vram:0.5,memory:'DDR2',watts:25,bus:64,pcie:2},
    {name:'Radeon HD 4870 1GB',brand:'AMD',arch:'TeraScale',year:2008,vram:1,memory:'GDDR5',watts:150,bus:256,pcie:2}
  ].forEach(gpu => add('gpu', {
    id:'gpu-'+slug(gpu.name), length:null, psuMin:0, kind:'reference',
    source:gpu.brand === 'NVIDIA'
      ? 'https://www.nvidia.com/en-us/geforce/graphics-cards/compare/'
      : 'https://www.amd.com/en/products/graphics/desktops/radeon.html',
    ...gpu
  }));

  root.PC_CATALOG_VERSION = '1.25.0';
})(typeof window !== 'undefined' ? window : globalThis);
