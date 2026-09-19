(function(root){
'use strict';
const categories=['cpu','gpu','ram','storage','motherboard','psu','cooler','case'];
function byId(id,db=root.PC_CATALOG){for(const cat of categories){const item=db[cat].find(x=>x.id===id);if(item)return item}return null}
function empty(){return {mode:'desktop',cpu:null,gpu:null,ram:null,storage:[],motherboard:null,psu:null,cooler:null,case:null}}
function resolve(build,db=root.PC_CATALOG){return Object.fromEntries(categories.map(k=>[k,k==='storage'?(build[k]||[]).map(id=>byId(id,db)).filter(Boolean):byId(build[k],db)]))}
function power(build,db=root.PC_CATALOG){const b=resolve(build,db);const parts={cpu:b.cpu?.powerBudget||0,gpu:b.gpu?.watts||0,ram:b.ram?.watts||0,storage:b.storage.reduce((sum,x)=>sum+(x.watts||0),0),motherboard:b.motherboard?.watts||0,cooler:b.cooler?.watts||0,case:b.case?.watts||0};const total=Math.ceil(Object.values(parts).reduce((a,b)=>a+b,0));return {parts,total,recommended:total?Math.ceil(Math.max(total*1.3,b.gpu?.psuMin||0)/50)*50:0}}
function check(build,db=root.PC_CATALOG){const b=resolve(build,db),errors=[],warnings=[],p=power(build,db);const {cpu:c,gpu:g,ram:r,motherboard:m,case:h,psu:s,cooler:f,storage:d}=b;const add=(list,key)=>{if(!list.includes(key))list.push(key)};
 if(c&&c.buildable===false)add(errors,'mobileCpu');
 if(c&&m&&c.socket!==m.socket)add(errors,'socketBad');
 if(g&&m&&m.gpuSlot&&m.gpuSlot!=='PCIe')add(errors,'gpuSlotBad');
 if(m&&m.pcie===0&&d.some(x=>x.form==='AIC'))add(errors,'storageSlotBad');
 if(c&&m&&/B460/.test(m.name)&&/^Core i\d-11/.test(c.name))add(errors,'chipsetBad');
 if(r&&((m&&r.memory!==m.memory)||(c&&!c.memory.includes(r.memory))))add(errors,'ramBad');
 if(r&&m){if(r.form!==m.ramForm)add(errors,'formBad');if(r.modules>m.dimms)add(errors,'ramSlots');if(r.capacity>m.maxRam)add(errors,'ramLimit')}
 if(m&&h&&!h.boards.includes(m.form))add(errors,'caseBad');
 if(s&&h&&!h.psus.includes(s.form))add(errors,'psuFormBad');
 if(g&&h){if(g.length&&g.length>h.maxGpu)add(errors,'gpuBad');if(!g.length)add(warnings,'gpuUnknown')}
 if(f&&h){if(f.type==='Air'&&f.height>h.maxCooler)add(errors,'coolerBad');if(f.type==='AIO'&&!h.radiators.includes(f.radiator))add(errors,'radiatorBad')}
 if(f&&c&&!f.sockets.includes(c.socket))add(errors,'coolerSocket');
 if(s&&s.capacity<p.recommended)add(errors,'psuBad');
 if(m){const nvme=d.filter(x=>x.iface==='NVMe');if(nvme.length>m.m2)add(errors,'m2Bad');if(d.filter(x=>x.iface==='SATA').length>m.sata)add(errors,'sataBad');if(nvme.some(x=>x.pcie>m.storageGen))add(warnings,'lanesReview');if(d.some(x=>x.form==='AIC'))add(warnings,'storageAicReview');if(d.some(x=>x.form==='AIC'&&x.pcie>m.pcie))add(warnings,'lanesReview')}
 if(h&&(d.filter(x=>x.form==='3.5-inch').length>h.hddBays||d.filter(x=>x.form==='2.5-inch').length>h.ssdBays))add(errors,'bayBad');
 if(c&&!g&&c.igpu==='No'&&!m?.igpu)add(errors,'videoBad');
 if(c&&m)add(warnings,'biosReview');if(r&&m)add(warnings,'qvlReview');if(s)add(warnings,'connectorReview');if(h)add(warnings,'measureReview');if(f)add(warnings,'thermalReview');
 if(g?.brand==='Intel')add(warnings,'arcReview');if(g&&m&&g.pcie>m.pcie)add(warnings,'gpuPcieReview');if(d.some(x=>x.iface==='USB'))add(warnings,'externalReview');
 if(Object.values(b).flat().some(x=>x&&['profile','custom'].includes(x.kind)))add(warnings,'profileReview');
 const missing=['cpu','ram','motherboard','psu','cooler','case'].filter(k=>!b[k]);if(!d.length)missing.push('storage');
 const educational=build.mode==='study';if(educational)add(warnings,'studyNotice');return {errors,warnings,missing,power:p,educational,complete:!missing.length,ok:!educational&&!errors.length&&!missing.length};
}
const relevant={cpu:['mobileCpu','socketBad','chipsetBad','ramBad','coolerSocket','videoBad','psuBad'],gpu:['gpuBad','psuBad','gpuSlotBad'],ram:['ramBad','formBad','ramSlots','ramLimit'],storage:['m2Bad','sataBad','bayBad','storageSlotBad'],motherboard:['gpuSlotBad','storageSlotBad','socketBad','chipsetBad','ramBad','formBad','ramSlots','ramLimit','caseBad','m2Bad','sataBad'],psu:['psuBad','psuFormBad'],cooler:['coolerBad','radiatorBad','coolerSocket'],case:['caseBad','psuFormBad','gpuBad','coolerBad','radiatorBad','bayBad']};
function compatibleCandidate(build,category,item){if(build.mode==='study')return true;const test=structuredCloneSafe(build);test[category]=category==='storage'?[item.id]:item.id;return !check(test).errors.some(x=>relevant[category].includes(x))}
function structuredCloneSafe(value){return JSON.parse(JSON.stringify(value))}
function validateBuild(value,db=root.PC_CATALOG){if(!value||typeof value!=='object'||Array.isArray(value))throw Error('build');const out=empty();if(value.mode!==undefined&&!['desktop','study'].includes(value.mode))throw Error('mode');out.mode=value.mode||'desktop';for(const cat of categories){if(cat==='storage'){if(!Array.isArray(value.storage)||value.storage.length>12)throw Error('storage');out.storage=value.storage.map(id=>{if(typeof id!=='string'||!db.storage.some(x=>x.id===id))throw Error('drive');return id})}else{if(value[cat]!==null&&(typeof value[cat]!=='string'||!db[cat].some(x=>x.id===value[cat])))throw Error(cat);out[cat]=value[cat]}}return out}
root.PC_ENGINE={categories,byId,empty,resolve,power,check,compatibleCandidate,validateBuild,clone:structuredCloneSafe};
})(typeof window!=='undefined'?window:globalThis);
