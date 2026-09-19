/* PC Lab Builder 1.25.0. Reference designs and explicitly labelled generic profiles.
   Not a complete worldwide SKU database. Dimensions/connectors may differ by vendor. */
(function(root){
'use strict';
const DB={cpu:[],gpu:[],ram:[],storage:[],motherboard:[],psu:[],cooler:[],case:[]};
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const sources={
 nvidia:'https://www.nvidia.com/en-us/geforce/graphics-cards/compare/',
 amd:'https://www.amd.com/en/products/graphics/desktops/radeon.html',
 intel:'https://www.intel.com/content/www/us/en/products/details/discrete-gpus/arc.html',
 ram:'https://www.kingston.com/en/memory/gaming',
 storage:'https://www.kingston.com/en/ssd',
 boards:'https://www.msi.com/Motherboards',
 psu:'https://www.corsair.com/us/en/c/psu',
 cooler:'https://www.noctua.at/en/products/nh-d15/specifications',
 chassis:'https://www.corsair.com/us/en/c/pc-cases'
};
function gpu(brand,arch,year,rows){rows.forEach(r=>{
 const [name,vram,memory,watts,bus,pcie=3,psuMin=0]=r;
 DB.gpu.push({id:'gpu-'+slug(name),name,brand,arch,year,vram,memory,watts,bus,pcie,psuMin,length:null,source:sources[brand.toLowerCase()],kind:'reference'});
})}
gpu('NVIDIA','Tesla',2009,[['GeForce 210 1GB DDR3',1,'DDR3',30.5,64,2],['GeForce GT 220 1GB DDR3',1,'DDR3',58,128,2]]);
gpu('NVIDIA','Fermi',2011,[['GeForce GT 520',1,'DDR3',29,64,2],['GeForce GT 610',2,'DDR3',29,64,2],['GeForce GTX 550 Ti',1,'GDDR5',116,192,2],['GeForce GTX 560 Ti',1,'GDDR5',170,256,2]]);
gpu('NVIDIA','Kepler',2014,[['GeForce GT 710 DDR3',2,'DDR3',19,64,2],['GeForce GT 730 GK208 DDR3',2,'DDR3',23,64,2],['GeForce GT 730 GK208 GDDR5',2,'GDDR5',25,64,2],['GeForce GTX 650',1,'GDDR5',64,128],['GeForce GTX 660',2,'GDDR5',140,192],['GeForce GTX 760',2,'GDDR5',170,256],['GeForce GTX 780 Ti',3,'GDDR5',250,384]]);
gpu('NVIDIA','Maxwell',2014,[['GeForce GTX 750 Ti',2,'GDDR5',60,128],['GeForce GTX 950',2,'GDDR5',90,128],['GeForce GTX 960',2,'GDDR5',120,128],['GeForce GTX 970',4,'GDDR5',145,256],['GeForce GTX 980',4,'GDDR5',165,256],['GeForce GTX 980 Ti',6,'GDDR5',250,384]]);
gpu('NVIDIA','Pascal',2017,[['GeForce GT 1030 DDR4',2,'DDR4',20,64,3,300],['GeForce GT 1030 GDDR5',2,'GDDR5',30,64,3,300],['GeForce GTX 1050 2GB',2,'GDDR5',75,128],['GeForce GTX 1050 Ti',4,'GDDR5',75,128],['GeForce GTX 1060 3GB',3,'GDDR5',120,192],['GeForce GTX 1060 6GB',6,'GDDR5',120,192],['GeForce GTX 1070',8,'GDDR5',150,256],['GeForce GTX 1070 Ti',8,'GDDR5',180,256],['GeForce GTX 1080',8,'GDDR5X',180,256],['GeForce GTX 1080 Ti',11,'GDDR5X',250,352]]);
gpu('NVIDIA','Turing',2019,[['GeForce GTX 1650 GDDR5',4,'GDDR5',75,128],['GeForce GTX 1650 GDDR6',4,'GDDR6',75,128],['GeForce GTX 1650 SUPER',4,'GDDR6',100,128],['GeForce GTX 1660',6,'GDDR5',120,192],['GeForce GTX 1660 SUPER',6,'GDDR6',125,192],['GeForce GTX 1660 Ti',6,'GDDR6',120,192],['GeForce RTX 2060 6GB',6,'GDDR6',160,192],['GeForce RTX 2060 SUPER',8,'GDDR6',175,256],['GeForce RTX 2070',8,'GDDR6',175,256],['GeForce RTX 2070 SUPER',8,'GDDR6',215,256],['GeForce RTX 2080',8,'GDDR6',215,256],['GeForce RTX 2080 SUPER',8,'GDDR6',250,256],['GeForce RTX 2080 Ti',11,'GDDR6',250,352]]);
gpu('NVIDIA','Ampere',2021,[['GeForce RTX 3050 6GB',6,'GDDR6',70,96,4],['GeForce RTX 3050 8GB',8,'GDDR6',130,128,4],['GeForce RTX 3060 8GB',8,'GDDR6',170,128,4],['GeForce RTX 3060 12GB',12,'GDDR6',170,192,4],['GeForce RTX 3060 Ti GDDR6',8,'GDDR6',200,256,4],['GeForce RTX 3070',8,'GDDR6',220,256,4],['GeForce RTX 3070 Ti',8,'GDDR6X',290,256,4],['GeForce RTX 3080 10GB',10,'GDDR6X',320,320,4],['GeForce RTX 3080 12GB',12,'GDDR6X',350,384,4],['GeForce RTX 3080 Ti',12,'GDDR6X',350,384,4],['GeForce RTX 3090',24,'GDDR6X',350,384,4],['GeForce RTX 3090 Ti',24,'GDDR6X',450,384,4,850]]);
gpu('NVIDIA','Ada Lovelace',2023,[['GeForce RTX 4060',8,'GDDR6',115,128,4,550],['GeForce RTX 4060 Ti 8GB',8,'GDDR6',160,128,4,550],['GeForce RTX 4060 Ti 16GB',16,'GDDR6',165,128,4,550],['GeForce RTX 4070 GDDR6X',12,'GDDR6X',200,192,4,650],['GeForce RTX 4070 SUPER',12,'GDDR6X',220,192,4,650],['GeForce RTX 4070 Ti',12,'GDDR6X',285,192,4,700],['GeForce RTX 4070 Ti SUPER',16,'GDDR6X',285,256,4,700],['GeForce RTX 4080',16,'GDDR6X',320,256,4,750],['GeForce RTX 4080 SUPER',16,'GDDR6X',320,256,4,750],['GeForce RTX 4090 FE',24,'GDDR6X',450,384,4,850]]);
gpu('NVIDIA','Blackwell',2025,[['GeForce RTX 5050',8,'GDDR6',130,128,5,550],['GeForce RTX 5060',8,'GDDR7',145,128,5,550],['GeForce RTX 5060 Ti 8GB',8,'GDDR7',180,128,5,600],['GeForce RTX 5060 Ti 16GB',16,'GDDR7',180,128,5,600],['GeForce RTX 5070 FE',12,'GDDR7',250,192,5,650],['GeForce RTX 5070 Ti',16,'GDDR7',300,256,5,750],['GeForce RTX 5080 FE',16,'GDDR7',360,256,5,850],['GeForce RTX 5090 FE',32,'GDDR7',575,512,5,1000]]);
gpu('AMD','TeraScale',2010,[['Radeon HD 5450 DDR3',1,'DDR3',19.1,64,2],['Radeon HD 6570 DDR3',1,'DDR3',44,128,2],['Radeon HD 6670 GDDR5',1,'GDDR5',66,128,2],['Radeon HD 6870',1,'GDDR5',151,256,2]]);
gpu('AMD','GCN',2013,[['Radeon HD 7750',1,'GDDR5',55,128],['Radeon HD 7770',1,'GDDR5',80,128],['Radeon HD 7870',2,'GDDR5',175,256],['Radeon R7 250 GDDR5',1,'GDDR5',65,128],['Radeon R9 270X',2,'GDDR5',180,256],['Radeon R9 280X',3,'GDDR5',250,384],['Radeon R9 290',4,'GDDR5',275,512],['Radeon R9 390',8,'GDDR5',275,512]]);
gpu('AMD','Polaris',2017,[['Radeon RX 460 2GB',2,'GDDR5',75,128],['Radeon RX 470 4GB',4,'GDDR5',120,256],['Radeon RX 480 8GB',8,'GDDR5',150,256],['Radeon RX 550 2GB',2,'GDDR5',50,128],['Radeon RX 560 4GB',4,'GDDR5',80,128],['Radeon RX 570 4GB',4,'GDDR5',150,256],['Radeon RX 580 8GB 2304SP',8,'GDDR5',185,256],['Radeon RX 590',8,'GDDR5',225,256]]);
gpu('AMD','Vega',2017,[['Radeon RX Vega 56',8,'HBM2',210,2048],['Radeon RX Vega 64',8,'HBM2',295,2048],['Radeon VII',16,'HBM2',300,4096]]);
gpu('AMD','RDNA',2019,[['Radeon RX 5500 XT 4GB',4,'GDDR6',130,128,4],['Radeon RX 5500 XT 8GB',8,'GDDR6',130,128,4],['Radeon RX 5600 XT',6,'GDDR6',150,192,4],['Radeon RX 5700',8,'GDDR6',180,256,4],['Radeon RX 5700 XT',8,'GDDR6',225,256,4]]);
gpu('AMD','RDNA 2',2021,[['Radeon RX 6400',4,'GDDR6',53,64,4],['Radeon RX 6500 XT 4GB',4,'GDDR6',107,64,4],['Radeon RX 6600',8,'GDDR6',132,128,4],['Radeon RX 6600 XT',8,'GDDR6',160,128,4],['Radeon RX 6650 XT',8,'GDDR6',180,128,4],['Radeon RX 6700',10,'GDDR6',175,160,4],['Radeon RX 6700 XT',12,'GDDR6',230,192,4],['Radeon RX 6750 XT',12,'GDDR6',250,192,4],['Radeon RX 6800',16,'GDDR6',250,256,4],['Radeon RX 6800 XT',16,'GDDR6',300,256,4],['Radeon RX 6900 XT',16,'GDDR6',300,256,4],['Radeon RX 6950 XT',16,'GDDR6',335,256,4]]);
gpu('AMD','RDNA 3',2023,[['Radeon RX 7600',8,'GDDR6',165,128,4,550],['Radeon RX 7600 XT',16,'GDDR6',190,128,4,600],['Radeon RX 7700 XT',12,'GDDR6',245,192,4,700],['Radeon RX 7800 XT',16,'GDDR6',263,256,4,700],['Radeon RX 7900 GRE',16,'GDDR6',260,256,4,700],['Radeon RX 7900 XT',20,'GDDR6',315,320,4,750],['Radeon RX 7900 XTX',24,'GDDR6',355,384,4,800]]);
gpu('AMD','RDNA 4',2025,[['Radeon RX 9060 XT 8GB',8,'GDDR6',150,128,5,450],['Radeon RX 9060 XT 16GB',16,'GDDR6',160,128,5,450],['Radeon RX 9070',16,'GDDR6',220,256,5,650],['Radeon RX 9070 XT',16,'GDDR6',304,256,5,750]]);
gpu('Intel','Alchemist / Xe HPG',2022,[['Arc A310',4,'GDDR6',75,64,4],['Arc A380',6,'GDDR6',75,96,4],['Arc A580',8,'GDDR6',185,256,4],['Arc A750',8,'GDDR6',225,256,4],['Arc A770 8GB',8,'GDDR6',225,256,4],['Arc A770 16GB',16,'GDDR6',225,256,4]]);
gpu('Intel','Battlemage / Xe2',2025,[['Arc B570',10,'GDDR6',150,160,4],['Arc B580',12,'GDDR6',190,192,4,600]]);
const overrides={
 'GeForce GT 1030 DDR4':{source:'https://www.nvidia.com/en-us/geforce/graphics-cards/gt-1030/specifications/',reviewed:true},
 'GeForce GT 1030 GDDR5':{source:'https://www.nvidia.com/en-us/geforce/graphics-cards/gt-1030/specifications/',reviewed:true},
 'GeForce RTX 5070 FE':{length:242,source:'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/',reviewed:true},
 'GeForce RTX 5090 FE':{length:304,source:'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/',reviewed:true},
 'GeForce RTX 5080 FE':{length:304,source:'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/',reviewed:true},
 'GeForce RTX 4090 FE':{length:304,source:'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/'},
 'Arc B580':{length:272,source:'https://www.intel.com/content/www/us/en/products/sku/241598/intel-arc-b580-graphics/specifications.html',reviewed:true},
 'Radeon RX 9070 XT':{source:'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070xt.html'},
 'Radeon RX 9060 XT 16GB':{source:'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9060xt.html'}
};
DB.gpu.forEach(g=>Object.assign(g,overrides[g.name]||{}));

// Memory entries are configuration profiles, not invented manufacturer SKUs.
const ramProfiles=[
 ['DDR2',2,1,800,6],['DDR2',4,2,800,6],['DDR3',4,1,1333,9],['DDR3',8,2,1600,9],['DDR3',16,2,1600,10],['DDR3',16,2,1866,10],['DDR3',32,4,1600,11],
 ['DDR4',4,1,2400,17],['DDR4',8,1,2666,19],['DDR4',8,2,3200,16],['DDR4',16,2,2666,16],['DDR4',16,2,3200,16],['DDR4',16,2,3600,18],['DDR4',32,2,3200,16],['DDR4',32,2,3600,18],['DDR4',64,2,3200,16],['DDR4',128,4,3200,16],
 ['DDR5',8,1,4800,40],['DDR5',16,2,5200,40],['DDR5',32,2,4800,40],['DDR5',32,2,5600,36],['DDR5',32,2,6000,30],['DDR5',32,2,6400,32],['DDR5',48,2,6000,32],['DDR5',64,2,6000,30],['DDR5',96,2,5600,40],['DDR5',128,4,5600,40],['DDR5',32,2,7200,34],['DDR5',48,2,8000,40],['DDR5',256,4,5600,46]
];
ramProfiles.forEach(([memory,capacity,modules,speed,cl])=>DB.ram.push({id:`ram-${memory}-${capacity}-${speed}`.toLowerCase(),name:`${memory}-${speed} · ${capacity} GB (${modules} × ${capacity/modules}) · CL${cl}`,brand:'Profile',memory,capacity,modules,speed,cl,form:'UDIMM',watts:modules*5,kind:'profile',source:sources.ram}));
['DDR4','DDR5'].forEach((memory,i)=>DB.ram.push({id:`ram-sodimm-${memory}`.toLowerCase(),name:`SO-DIMM ${memory} · 32 GB (2 × 16)`,brand:'Profile',memory,capacity:32,modules:2,speed:i?5600:3200,cl:i?46:22,form:'SO-DIMM',watts:8,kind:'profile',source:sources.ram}));
DB.ram.push({id:'ram-ecc-rdimm',name:'DDR5 ECC RDIMM · 64 GB (2 × 32)',brand:'Profile',memory:'DDR5',capacity:64,modules:2,speed:4800,cl:40,form:'RDIMM',watts:12,kind:'profile',source:sources.ram});

function drive(brand,family,type,iface,form,capacities,gen,read,source){capacities.forEach(capacity=>DB.storage.push({id:'ssd-'+slug(family+'-'+capacity),name:`${family} · ${capacity>=1000?capacity/1000+' TB':capacity+' GB'}`,brand,type,iface,form,capacity,pcie:gen,read,watts:type==='HDD'?10:iface==='SATA'?5:gen===5?14:8,kind:'family',source}));}
drive('Samsung','870 EVO','SSD','SATA','2.5-inch',[250,500,1000,2000,4000],0,560,'https://semiconductor.samsung.com/consumer-storage/internal-ssd/870evo/');
drive('Samsung','970 EVO Plus','SSD','NVMe','M.2 2280',[250,500,1000,2000],3,3500,'https://semiconductor.samsung.com/consumer-storage/internal-ssd/970evoplus/');
drive('Samsung','980 PRO','SSD','NVMe','M.2 2280',[250,500,1000,2000],4,7000,'https://semiconductor.samsung.com/consumer-storage/internal-ssd/980pro/');
drive('Samsung','990 PRO','SSD','NVMe','M.2 2280',[1000,2000,4000],4,7450,'https://semiconductor.samsung.com/consumer-storage/internal-ssd/990-pro/');
drive('Kingston','A400','SSD','SATA','2.5-inch',[240,480,960],0,500,'https://www.kingston.com/en/ssd/a400-solid-state-drive');
drive('Kingston','KC3000','SSD','NVMe','M.2 2280',[512,1024,2048,4096],4,7000,'https://www.kingston.com/en/ssd/kc3000-nvme-m2-solid-state-drive');
drive('WD_BLACK','SN850X','SSD','NVMe','M.2 2280',[1000,2000,4000,8000],4,7300,'https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd');
drive('Crucial','T700','SSD','NVMe','M.2 2280',[1000,2000,4000],5,12400,'https://www.crucial.com/ssd/t700/ct2000t700ssd3');
// Generic capacity profiles avoid attributing unverified RPM/throughput to an exact HDD SKU.
for(const capacity of [500,1000,2000,4000,8000,12000,16000,20000,24000])DB.storage.push({id:'hdd-'+capacity,name:`HDD SATA · ${capacity/1000} TB · 3.5-inch`,brand:'Profile',type:'HDD',iface:'SATA',form:'3.5-inch',capacity,pcie:0,read:null,watts:10,kind:'profile',source:'https://www.seagate.com/products/hard-drives/'});
DB.storage.push({id:'storage-usb-1tb',name:'SSD USB · 1 TB',brand:'Profile',type:'SSD',iface:'USB',form:'External',capacity:1000,pcie:0,read:null,watts:5,kind:'profile',source:sources.storage});

const boards=[
 ['AM3+ 970','AM3+','DDR3','ATX',4,32,0,6,0,2],['H61 LGA1155','LGA1155','DDR3','mATX',2,16,0,4,0,2],['B85 LGA1150','LGA1150','DDR3','mATX',4,32,0,4,0,3],['B250 LGA1151','LGA1151','DDR4','mATX',4,64,1,4,3,3],
 ['B450 AM4','AM4','DDR4','mATX',4,64,1,4,3,3],['B550 AM4','AM4','DDR4','ATX',4,128,2,6,4,4],['X570 AM4','AM4','DDR4','ATX',4,128,2,6,4,4],['A520 AM4','AM4','DDR4','mATX',2,64,1,4,3,3],
 ['A620 AM5','AM5','DDR5','mATX',2,96,2,4,4,4],['B650 AM5','AM5','DDR5','ATX',4,192,2,4,4,4],['B650E AM5','AM5','DDR5','ATX',4,192,3,4,5,5],['X670E AM5','AM5','DDR5','ATX',4,192,4,4,5,5],['B850 AM5','AM5','DDR5','ATX',4,192,3,4,5,4],['X870E AM5','AM5','DDR5','ATX',4,192,4,4,5,5],['B650 Mini-ITX','AM5','DDR5','ITX',2,96,2,2,4,4],
 ['B460 LGA1200','LGA1200','DDR4','mATX',4,128,2,4,3,3],['B560 LGA1200','LGA1200','DDR4','ATX',4,128,2,6,4,4],
 ['H610 DDR4','LGA1700','DDR4','mATX',2,64,1,4,3,4],['B660 DDR4','LGA1700','DDR4','mATX',4,128,2,4,4,4],['B760 DDR4','LGA1700','DDR4','ATX',4,128,2,4,4,4],['B760 DDR5','LGA1700','DDR5','ATX',4,192,2,4,4,4],['Z790 DDR5','LGA1700','DDR5','ATX',4,192,4,6,4,5],['Z790 Mini-ITX','LGA1700','DDR5','ITX',2,96,2,2,4,5],
 ['B860 LGA1851','LGA1851','DDR5','mATX',4,192,3,4,5,5],['Z890 LGA1851','LGA1851','DDR5','ATX',4,192,4,4,5,5]
];
boards.forEach(([name,socket,memory,form,dimms,maxRam,m2,sata,storageGen,pcie])=>DB.motherboard.push({id:'mb-'+slug(name),name,brand:'Profile',socket,memory,form,dimms,maxRam,m2,sata,storageGen,pcie,ramForm:'UDIMM',watts:45,kind:'profile',source:sources.boards}));
DB.motherboard.push({id:'mb-msi-b650-tomahawk',name:'MAG B650 TOMAHAWK WIFI',brand:'MSI',socket:'AM5',memory:'DDR5',form:'ATX',dimms:4,maxRam:256,m2:3,sata:6,storageGen:4,pcie:4,ramForm:'UDIMM',watts:45,kind:'reference',reviewed:true,source:'https://www.msi.com/Motherboard/MAG-B650-TOMAHAWK-WIFI/Specification'});

for(const watts of [300,350,400,450,500,550,600,650,750,850,1000,1200,1500,1600])DB.psu.push({id:'psu-atx-'+watts,name:`ATX · ${watts} W`,brand:'Profile',form:'ATX',capacity:watts,standard:watts>=650?'ATX 3.1':'ATX 2.x',rating:null,watts:0,kind:'profile',source:sources.psu});
for(const watts of [450,600,750,850,1000])DB.psu.push({id:'psu-sfx-'+watts,name:`SFX · ${watts} W`,brand:'Profile',form:'SFX',capacity:watts,standard:watts>=750?'ATX 3.1':'ATX 2.x',rating:null,watts:0,kind:'profile',source:sources.psu});

const currentSockets=['AM4','AM5','LGA1200','LGA1700','LGA1851'];
[['Low profile 47 mm',47],['Tower 120 mm · 155 mm',155],['Dual tower · 160 mm',160],['Dual tower · 165 mm',165]].forEach(([name,height])=>DB.cooler.push({id:'cooler-air-'+height,name,brand:'Profile',type:'Air',height,sockets:currentSockets,radiator:0,watts:4,kind:'profile',source:sources.cooler}));
for(const size of [120,240,280,360,420])DB.cooler.push({id:'cooler-aio-'+size,name:`AIO · ${size} mm`,brand:'Profile',type:'AIO',height:65,sockets:currentSockets,radiator:size,watts:18,kind:'profile',source:'https://www.arctic.de/en/products/cooling/cpu-cooler/cpu-water-cooler/'});
DB.cooler.push({id:'cooler-legacy',name:'Legacy universal tower · 155 mm',brand:'Profile',type:'Air',height:155,sockets:['AM3+','LGA1150','LGA1151','LGA1155','AM4'],radiator:0,watts:4,kind:'profile',source:sources.cooler});

[
 ['Compact SFX', 'ITX', ['ITX'],['SFX'],300,70,[120,240],0,2],
 ['Mini tower','mATX',['ITX','mATX'],['ATX','SFX'],320,155,[120,240],2,2],
 ['Airflow mid tower','ATX',['ITX','mATX','ATX'],['ATX','SFX'],380,170,[120,240,280,360],2,3],
 ['Panorama dual chamber','ATX',['ITX','mATX','ATX'],['ATX','SFX'],400,165,[120,240,280,360],2,4],
 ['Full tower XL','EATX',['ITX','mATX','ATX','EATX'],['ATX','SFX'],450,185,[120,240,280,360,420],6,6]
].forEach(([name,form,boards,psus,maxGpu,maxCooler,radiators,hddBays,ssdBays])=>DB.case.push({id:'case-'+slug(name),name,brand:'Profile',form,boards,psus,maxGpu,maxCooler,radiators,hddBays,ssdBays,watts:9,kind:'profile',source:sources.chassis}));

root.PC_CATALOG=DB;root.PC_SOURCES=sources;root.PC_SLUG=slug;
})(typeof window!=='undefined'?window:globalThis);
