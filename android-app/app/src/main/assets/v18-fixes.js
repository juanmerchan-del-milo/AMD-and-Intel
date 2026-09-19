(()=>{
const D={
es:{k1:"LÍNEA DE TIEMPO",h1:"Evolución de arquitecturas",k2:"PLATAFORMA MÓVIL",h2:"Una portátil moderna por dentro",k3:"SISTEMAS COMPACTOS",h3:"Mini PC: pequeño por fuera, complejo por dentro",thermal:"Mapa térmico",fans:"Ventiladores",perf:"Modo rendimiento",close:"Cerrar carcasa",open:"Abrir carcasa",air:"Flujo de aire",amd:"Portátil con AMD Ryzen",amdP:"Normalmente integra CPU Zen, gráficos Radeon y, en las familias Ryzen AI, una NPU para tareas locales de IA.",intel:"Portátil con Intel Core",intelP:"Core y Core Ultra móviles combinan CPU, iGPU y, según la serie, NPU. Las variantes H y HX priorizan mayor rendimiento.",facts:["Arquitectura","Empaquetado","IA y movilidad"],factP:["Nuevos núcleos, cachés, predicción y ejecución.","Chiplets, tiles, interconexiones y apilado 3D.","NPUs dedicadas, mejores iGPU y plataformas más eficientes."],mini:["Oficina / estudio","Creación / desarrollo","Embebido / computación perimetral"],miniP:["Silencio, bajo consumo y espacio mínimo.","Más RAM, mejor SSD y refrigeración más exigente.","Conectividad, operación continua y formatos específicos."],npu:"NPU / IA",yes:"Integrada",no:"No indicada",device:{Desktop:"Escritorio",Laptop:"Portátil",Embedded:"Embebido"},power:"Orden de potencia",tiers:{"BÁSICO":"BÁSICO","MEDIO":"MEDIO","ALTO":"ALTO","ENTUSIASTA":"ENTUSIASTA","EXTREME":"EXTREME"}},
en:{k1:"TIMELINE",h1:"Architecture evolution",k2:"MOBILE PLATFORM",h2:"Inside a modern laptop",k3:"COMPACT SYSTEMS",h3:"Mini PC: small outside, complex inside",thermal:"Thermal map",fans:"Fans",perf:"Performance mode",close:"Close case",open:"Open case",air:"Airflow",amd:"Laptop with AMD Ryzen",amdP:"It typically integrates Zen CPU cores, Radeon graphics and, in Ryzen AI families, an NPU for local AI tasks.",intel:"Laptop with Intel Core",intelP:"Mobile Core and Core Ultra chips combine CPU, iGPU and, depending on the series, an NPU. H and HX variants prioritize higher performance.",facts:["Architecture","Packaging","AI and mobility"],factP:["New cores, caches, prediction and execution.","Chiplets, tiles, interconnects and 3D stacking.","Dedicated NPUs, better iGPUs and more efficient platforms."],mini:["Office / study","Creation / development","Embedded / edge computing"],miniP:["Silence, low power use and minimal space.","More RAM, a better SSD and stronger cooling.","Connectivity, continuous operation and specific form factors."],npu:"NPU / AI",yes:"Integrated",no:"Not specified",device:{Desktop:"Desktop",Laptop:"Laptop",Embedded:"Embedded"},power:"Power order",tiers:{"BÁSICO":"BASIC","MEDIO":"MID","ALTO":"HIGH","ENTUSIASTA":"ENTHUSIAST","EXTREME":"EXTREME"}},
zh:{k1:"时间线",h1:"架构演进",k2:"移动平台",h2:"现代笔记本内部结构",k3:"紧凑系统",h3:"迷你电脑：外小内复杂",thermal:"热力图",fans:"风扇",perf:"性能模式",close:"关闭机壳",open:"打开机壳",air:"气流",amd:"搭载 AMD Ryzen 的笔记本电脑",amdP:"通常集成 Zen CPU、Radeon 图形，并且在 Ryzen AI 家族中还带有用于本地 AI 任务的 NPU。",intel:"搭载 Intel Core 的笔记本电脑",intelP:"移动版 Core 与 Core Ultra 结合 CPU、iGPU，并根据系列不同带有 NPU。H 和 HX 版本更强调高性能。",facts:["架构","封装","AI 与移动性"],factP:["新的核心、缓存、预测与执行能力。","Chiplet、Tile、互连和 3D 堆叠。","专用 NPU、更强 iGPU 与更高能效平台。"],mini:["办公 / 学习","创作 / 开发","嵌入式 / 边缘计算"],miniP:["安静、低功耗、占用空间小。","更大内存、更快 SSD 与更强散热。","连接性、持续运行与特定外形规格。"],npu:"NPU / AI",yes:"已集成",no:"未注明",device:{Desktop:"台式机",Laptop:"笔记本电脑",Embedded:"嵌入式"},power:"性能顺序",tiers:{"BÁSICO":"基础","MEDIO":"中级","ALTO":"高性能","ENTUSIASTA":"发烧级","EXTREME":"旗舰级"}}};
const G=[
[["2017","Ryzen 1000","Zen · 14 nm"],["2019","Ryzen 3000","Zen 2 · chiplets"],["2020","Ryzen 5000","Zen 3 · latencia refinada"],["2022","Ryzen 7000","Zen 4 · DDR5 / PCIe 5"],["2024","Ryzen 9000","Zen 5 · nueva generación"],["2021","Intel Core 12.ª gen.","Alder Lake · P+E"],["2022–24","Intel Core 13.ª / 14.ª gen.","Raptor Lake"],["2023","Core Ultra Serie 1","Meteor Lake · tiles"],["2024–25","Core Ultra Serie 2","Arrow / Lunar Lake"],["2026","Core Ultra Serie 3","Panther Lake · Intel 18A"]],
[["2017","Ryzen 1000","Zen · 14 nm"],["2019","Ryzen 3000","Zen 2 · chiplets"],["2020","Ryzen 5000","Zen 3 · refined latency"],["2022","Ryzen 7000","Zen 4 · DDR5 / PCIe 5"],["2024","Ryzen 9000","Zen 5 · new generation"],["2021","12th Gen Intel Core","Alder Lake · P+E"],["2022–24","13th / 14th Gen Intel Core","Raptor Lake"],["2023","Core Ultra Series 1","Meteor Lake · tiles"],["2024–25","Core Ultra Series 2","Arrow / Lunar Lake"],["2026","Core Ultra Series 3","Panther Lake · Intel 18A"]],
[["2017","Ryzen 1000","Zen · 14 nm"],["2019","Ryzen 3000","Zen 2 · chiplets"],["2020","Ryzen 5000","Zen 3 · 延迟优化"],["2022","Ryzen 7000","Zen 4 · DDR5 / PCIe 5"],["2024","Ryzen 9000","Zen 5 · 新一代"],["2021","第 12 代 Intel Core","Alder Lake · P+E"],["2022–24","第 13 / 14 代 Intel Core","Raptor Lake"],["2023","Core Ultra 第 1 系列","Meteor Lake · tiles"],["2024–25","Core Ultra 第 2 系列","Arrow / Lunar Lake"],["2026","Core Ultra 第 3 系列","Panther Lake · Intel 18A"]]];
const q=(s,r=document)=>r?.querySelector?.(s),qa=(s,r=document)=>Array.from(r?.querySelectorAll?.(s)||[]),lc=()=>{let x=(q("#language")?.value||document.documentElement.lang||"es").toLowerCase();return x.startsWith("en")?"en":x.startsWith("zh")?"zh":"es"},T=()=>D[lc()],set=(s,v,r=document)=>{let e=typeof s==="string"?q(s,r):s;if(e&&v!=null)e.textContent=v},pool=()=>{try{return typeof getAllModels==="function"?getAllModels():models}catch(e){return window.models||[]}},npuName=n=>{n=String(n||"");if(/Ryzen AI [579]/i.test(n))return"AMD Ryzen AI · XDNA 2";if(/(?:7840HS|8845HS|8600G)/i.test(n))return"AMD Ryzen AI · XDNA";if(/^Core Ultra /i.test(n)||/^Core [357] (?:305|320|360)$/i.test(n))return"Intel AI Boost";return""},hasNpu=n=>!!npuName(n);
window.populateFamilies=function(){let e=q("#family");if(!e)return;let old=e.value,tr=window.I?.[lc()]||{},a=[...new Set(pool().map(m=>m[1]))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}));e.innerHTML='<option value="all">'+(tr.allFamilies||"All families")+'</option>'+a.map(x=>'<option value="'+x+'">'+x+'</option>').join("");if([...e.options].some(o=>o.value===old))e.value=old};
window.populateGenerations=function(){let e=q("#generation");if(!e)return;let old=e.value,tr=window.I?.[lc()]||{},a=[...new Set(pool().map(m=>m[3]))].sort((a,b)=>(+(String(a).match(/\d+/)?.[0]||0))-(+(String(b).match(/\d+/)?.[0]||0))||String(a).localeCompare(String(b),undefined,{numeric:true}));e.innerHTML='<option value="all">'+(tr.allGenerations||"All generations")+'</option>'+a.map(x=>'<option value="'+x+'">'+x+'</option>').join("");if([...e.options].some(o=>o.value===old))e.value=old};
window.populateSelects=function(){let all=pool();for(const [id,brand] of [["leftSelect","AMD"],["rightSelect","Intel"]]){let e=q("#"+id);if(!e)continue;let old=e.dataset.model||"";let a=all.filter(m=>m[0]===brand);e.innerHTML=a.map(m=>'<option value="'+m[2]+'">'+m[2]+' · '+m[3]+'</option>').join("");if([...e.options].some(o=>o.value===old))e.value=old;e.dataset.model=e.value}};
window.compare=function(){let all=pool(),le=q("#leftSelect"),re=q("#rightSelect"),a=all.find(m=>m[2]===le?.value)||all.find(m=>m[0]==="AMD"),i=all.find(m=>m[2]===re?.value)||all.find(m=>m[0]==="Intel");if(!a||!i)return;if(le)le.dataset.model=le.value;if(re)re.dataset.model=re.value;let tr=window.I?.[lc()]||window.I?.es||{},gpu=m=>m[10]||(m[9]==="No"?(tr.no||"No"):m[9]),rows=[[tr.family||"Family",a[1],i[1]],[tr.gen||"Generation",a[3],i[3]],[tr.cores||"Cores",a[4],i[4]],[tr.threads||"Threads",a[5],i[5]],[tr.clock||"Frequency",a[6],i[6]],[tr.cache||"Cache",a[7],i[7]],[tr.power||"Power",a[8],i[8]],[tr.graphics||"Graphics",gpu(a),gpu(i)]],box=q("#comparison");if(box)box.innerHTML='<div class="compare-grid">'+rows.map(x=>'<div>'+x[1]+'</div><div class="label">'+x[0]+'</div><div>'+x[2]+'</div>').join("")+'</div>'};
function npuBox(){let g=q("#specsSection .spec-grid");if(!g)return;let b=q("#spNPUBox");if(!b){b=document.createElement("div");b.id="spNPUBox";b.className="spec-box";b.innerHTML='<span id="spNPULabel"></span><b id="spNPU"></b>';g.appendChild(b)}let name=npuName(q("#specModel")?.value);set("#spNPULabel",T().npu);set("#spNPU",name||T().no)}
function localize(){let t=T(),gi=lc()==="es"?0:lc()==="en"?1:2,g=q("#tab-gens"),l=q("#tab-laptops"),m=q("#tab-minipcs");if(g){set(".panel-kicker",t.k1,g);set("h3",t.h1,g);qa(".timeline .tl-card",g).forEach((c,i)=>{let r=G[gi][i];if(r){set(".year",r[0],c);set("b",r[1],c);set("small",r[2],c)}});qa(".facts-grid>div",g).forEach((d,i)=>{set("b",t.facts[i],d);set("p",t.factP[i],d)})}if(l){set(".panel-kicker",t.k2,l);set("h3",t.h2,l);set("#laptopThermal",t.thermal,l);set("#laptopFans",t.fans,l);set("#laptopPower",t.perf,l);let c=qa(".two-cards .info-card",l);if(c[0]){set("b",t.amd,c[0]);set("p",t.amdP,c[0])}if(c[1]){set("b",t.intel,c[1]);set("p",t.intelP,c[1])}}if(m){set(".panel-kicker",t.k3,m);set("h3",t.h3,m);set("#miniAirflow",t.air,m);let o=q("#miniExplode",m);if(o)o.textContent=q("#miniLab")?.classList.contains("exploded")?t.close:t.open;qa(".facts-grid>div",m).forEach((d,i)=>{set("b",t.mini[i],d);set("p",t.miniP[i],d)})}qa(".device-badge").forEach(e=>{let x=e.textContent.trim();if(t.device[x])e.textContent=t.device[x]});qa(".power-rank").forEach(e=>{let s=q("small",e),b=q("b",e);if(s)s.textContent=t.power;if(b&&t.tiers[b.textContent.trim()])b.textContent=t.tiers[b.textContent.trim()]});npuBox()}
function apply(){try{populateFamilies();populateGenerations();populateSelects();compare()}catch(e){}localize();try{window.updSpecs?.()}catch(e){}npuBox()}
q("#language")?.addEventListener("change",()=>setTimeout(apply,180));q("#specModel")?.addEventListener("change",()=>setTimeout(npuBox,20));q("#leftSelect")?.addEventListener("change",compare);q("#rightSelect")?.addEventListener("change",compare);document.addEventListener("amdIntelLanguageApplied",()=>setTimeout(apply,150));setTimeout(()=>{try{window.render?.()}catch(e){}apply()},400);setTimeout(apply,1000);
})();

/* v1.23.0 - Generations visibility + 3D catalog separation */
(function(){
  window.APP_BUILD="1.24.0";
  const q=function(s,r){return (r||document).querySelector(s)};
  const qa=function(s,r){return Array.from((r||document).querySelectorAll(s))};
  const lang=function(){
    const x=(q("#language")?.value||document.documentElement.lang||"es").toLowerCase();
    return x.startsWith("en")?"en":x.startsWith("zh")?"zh":"es";
  };
  const TX={
    es:{brand:"Marca",platform:"Plataforma",feature:"Funciones",all:"Todos",mobile:"Móviles / portátiles",desktop:"Escritorio",mini:"Mini PC / compactos",npu:"NPU / IA",igpu:"iGPU",processors:"Procesadores",show:"Mostrando",models:"modelos 3D",none:"No hay modelos para esta combinación.",miniNote:"Mini PC es una categoría orientativa: incluye chips móviles, embebidos y modelos de menor consumo que pueden aparecer en equipos compactos."},
    en:{brand:"Brand",platform:"Platform",feature:"Features",all:"All",mobile:"Mobile / laptops",desktop:"Desktop",mini:"Mini PCs / compact",npu:"NPU / AI",igpu:"iGPU",processors:"Processors",show:"Showing",models:"3D models",none:"No models match this combination.",miniNote:"Mini PC is an approximate category: it includes mobile, embedded and lower-power chips that may be used in compact systems."},
    zh:{brand:"品牌",platform:"平台",feature:"功能",all:"全部",mobile:"移动 / 笔记本",desktop:"台式机",mini:"迷你电脑 / 紧凑型",npu:"NPU / AI",igpu:"iGPU",processors:"处理器",show:"显示",models:"个 3D 型号",none:"此筛选组合没有可用型号。",miniNote:"迷你电脑为近似分类：包含移动、嵌入式以及可能用于紧凑型设备的较低功耗芯片。"}
  };
  const t=function(){return TX[lang()]};

  function repairArchitecturePanels(){
    qa("#architectureSection .arch-panel").forEach(function(p){p.classList.add("visible")});
    const gens=q("#tab-gens");
    if(gens)gens.classList.add("visible");
  }
  qa(".arch-tabs [data-tab], .visual-tabs [data-tab]").forEach(function(btn){
    if(btn.dataset.v1230VisibleFix)return;
    btn.dataset.v1230VisibleFix="1";
    btn.addEventListener("click",function(){
      setTimeout(function(){
        const panel=document.getElementById("tab-"+btn.dataset.tab);
        if(panel)panel.classList.add("visible");
        repairArchitecturePanels();
      },0);
    },true);
  });
  repairArchitecturePanels();

  const select=q("#v5Model");
  const card=q("#real3dSection .real3d-card");
  if(!select||!card)return;

  let browser=q("#v23Browser3D");
  if(!browser){
    const controls=q("#real3dSection .lab-controls");
    browser=document.createElement("div");
    browser.id="v23Browser3D";
    browser.className="v23-3d-browser";
    browser.setAttribute("aria-label","3D catalog filters");
    browser.innerHTML=
      '<div class="v23-filter-row" data-v23-row="brand">'+
        '<span class="v23-filter-label" id="v23BrandLabel">Marca</span>'+
        '<button type="button" class="v23-filter active" data-v23-brand="all">Todos</button>'+
        '<button type="button" class="v23-filter" data-v23-brand="AMD">AMD</button>'+
        '<button type="button" class="v23-filter" data-v23-brand="Intel">Intel</button>'+
      '</div>'+
      '<div class="v23-filter-row" data-v23-row="platform">'+
        '<span class="v23-filter-label" id="v23PlatformLabel">Plataforma</span>'+
        '<button type="button" class="v23-filter active" data-v23-platform="all">Todos</button>'+
        '<button type="button" class="v23-filter" data-v23-platform="mobile">Móviles / portátiles</button>'+
        '<button type="button" class="v23-filter" data-v23-platform="desktop">Escritorio</button>'+
        '<button type="button" class="v23-filter" data-v23-platform="mini">Mini PC / compactos</button>'+
      '</div>'+
      '<div class="v23-filter-row" data-v23-row="feature">'+
        '<span class="v23-filter-label" id="v23FeatureLabel">Funciones</span>'+
        '<button type="button" class="v23-filter active" data-v23-feature="all">Todos</button>'+
        '<button type="button" class="v23-filter" data-v23-feature="npu">NPU / IA</button>'+
        '<button type="button" class="v23-filter" data-v23-feature="igpu">iGPU</button>'+
      '</div>'+
      '<div class="v23-filter-summary" id="v23FilterSummary" aria-live="polite"></div>'+
      '<div class="v23-filter-note" id="v23MiniNote"></div>';
    if(controls)controls.insertAdjacentElement("beforebegin",browser);
  }

  if(!q("#v1230-3d-style")){
    const st=document.createElement("style");
    st.id="v1230-3d-style";
    st.textContent=[
      ".v23-3d-browser{margin:14px 0 12px;padding:12px;border:1px solid #2d4665;border-radius:15px;background:linear-gradient(145deg,#091321,#07101c);display:grid;gap:9px}",
      ".v23-filter-row{display:flex;align-items:center;gap:7px;flex-wrap:wrap;min-width:0}",
      ".v23-filter-label{min-width:92px;color:#8298b2;font-size:11px;font-weight:900;letter-spacing:.7px;text-transform:uppercase}",
      ".v23-filter{min-height:40px!important;padding:8px 12px!important;border-radius:999px!important;border:1px solid #304b6c!important;background:#0c1727!important;color:#9db3cd!important;font-size:12px!important;font-weight:800!important;white-space:nowrap}",
      ".v23-filter.active{border-color:#65adff!important;color:#f6f9ff!important;background:#173252!important;box-shadow:0 0 0 1px #65adff33 inset}",
      ".v23-filter-summary{padding-top:2px;color:#91a6bf;font-size:11px;line-height:1.4}",
      ".v23-filter-note{color:#687f99;font-size:10px;line-height:1.4}",
      "#v5Model optgroup{font-weight:900;background:#0c1524;color:#9db8d6}",
      "#v5Model option{font-weight:500}",
      "@media(max-width:720px){.v23-3d-browser{padding:10px}.v23-filter-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.v23-filter-label{grid-column:1/-1;min-width:0}.v23-filter{width:100%;min-height:44px!important;white-space:normal}.v23-filter-row[data-v23-row=brand]{grid-template-columns:repeat(3,minmax(0,1fr))}.v23-filter-row[data-v23-row=brand] .v23-filter-label{grid-column:1/-1}}"
    ].join("\n");
    document.head.appendChild(st);
  }

  const state={brand:"all",platform:"all",feature:"all"};
  function rows(){
    try{if(typeof getAllModels==="function")return getAllModels().slice()}catch(e){}
    try{if(typeof models!=="undefined")return models.slice()}catch(e){}
    return [];
  }
  function device(row){
    try{if(typeof deviceType==="function")return deviceType(row)}catch(e){}
    const s=[row?.[1],row?.[2],row?.[3]].join(" ");
    if(/Mobile|Ryzen AI|(?:HX|HS|H|U)\b/i.test(s))return "Laptop";
    if(/PE\b|Embedded/i.test(s))return "Embedded";
    return "Desktop";
  }
  function watts(row){
    const m=String(row?.[8]||"").match(/(\d+(?:\.\d+)?)/);
    return m?Number(m[1]):999;
  }
  function isMini(row){
    const d=device(row);
    return d==="Laptop"||d==="Embedded"||watts(row)<=65;
  }
  function hasNpu(row){
    const s=[row?.[1],row?.[2],row?.[3]].join(" ");
    return /Ryzen AI|Ryzen 7 7840HS|Ryzen 7 8845HS|Ryzen 5 8600G|Core Ultra|Core (?:3 305|5 320|7 360)/i.test(s);
  }
  function hasIgpu(row){return String(row?.[9]||"No").trim()!=="No"}
  function score(row){
    try{return typeof powerScore==="function"?powerScore(row):0}catch(e){return 0}
  }
  function matches(row){
    if(state.brand!=="all"&&row[0]!==state.brand)return false;
    const d=device(row);
    if(state.platform==="mobile"&&d!=="Laptop")return false;
    if(state.platform==="desktop"&&d!=="Desktop")return false;
    if(state.platform==="mini"&&!isMini(row))return false;
    if(state.feature==="npu"&&!hasNpu(row))return false;
    if(state.feature==="igpu"&&!hasIgpu(row))return false;
    return true;
  }
  function fill3D(){
    const old=select.value;
    const filtered=rows().filter(matches).sort(function(a,b){return score(a)-score(b)||String(a[2]).localeCompare(String(b[2]),undefined,{numeric:true})});
    select.innerHTML="";
    ["AMD","Intel"].forEach(function(brand){
      const subset=filtered.filter(function(r){return r[0]===brand});
      if(!subset.length)return;
      const group=document.createElement("optgroup");
      group.label=brand;
      subset.forEach(function(row){
        const o=document.createElement("option");
        o.value=row[2];
        o.textContent=row[2]+" · "+row[3];
        group.appendChild(o);
      });
      select.appendChild(group);
    });
    if(Array.from(select.options).some(function(o){return o.value===old}))select.value=old;
    else if(select.options.length)select.selectedIndex=0;
    select.disabled=!filtered.length;
    const tx=t();
    const count=q("#v7ModelCount");
    if(count)count.textContent=filtered.length+" "+tx.models;
    const summary=q("#v23FilterSummary");
    if(summary)summary.textContent=filtered.length?tx.show+" "+filtered.length+" "+tx.models+".":tx.none;
    if(filtered.length)select.dispatchEvent(new Event("change",{bubbles:true}));
  }
  function activate(kind,value){
    state[kind]=value;
    qa("[data-v23-"+kind+"]",browser).forEach(function(b){b.classList.toggle("active",b.getAttribute("data-v23-"+kind)===value)});
    fill3D();
  }
  browser.addEventListener("click",function(e){
    const b=e.target.closest("button");
    if(!b)return;
    if(b.hasAttribute("data-v23-brand"))activate("brand",b.getAttribute("data-v23-brand"));
    else if(b.hasAttribute("data-v23-platform"))activate("platform",b.getAttribute("data-v23-platform"));
    else if(b.hasAttribute("data-v23-feature"))activate("feature",b.getAttribute("data-v23-feature"));
  });

  function localize3D(){
    const x=t();
    const set=function(id,v){const e=q("#"+id);if(e)e.textContent=v};
    set("v23BrandLabel",x.brand);
    set("v23PlatformLabel",x.platform);
    set("v23FeatureLabel",x.feature);
    set("v23MiniNote",x.miniNote);
    qa('[data-v23-brand="all"],[data-v23-platform="all"],[data-v23-feature="all"]',browser).forEach(function(e){e.textContent=x.all});
    const text=function(sel,v){const e=q(sel,browser);if(e)e.textContent=v};
    text('[data-v23-platform="mobile"]',x.mobile);
    text('[data-v23-platform="desktop"]',x.desktop);
    text('[data-v23-platform="mini"]',x.mini);
    text('[data-v23-feature="npu"]',x.npu);
    text('[data-v23-feature="igpu"]',x.igpu);
    const lab=select.closest("label");
    if(lab&&lab.firstChild&&lab.firstChild.nodeType===3)lab.firstChild.nodeValue=x.processors+" ";
    fill3D();
  }
  q("#language")?.addEventListener("change",function(){setTimeout(localize3D,120)});
  document.addEventListener("amdIntelLanguageApplied",function(){setTimeout(localize3D,150)});
  setTimeout(function(){repairArchitecturePanels();localize3D()},250);
  setTimeout(function(){repairArchitecturePanels();localize3D()},900);
})();


/* v1.23.1 - stable final UI repair layer */
(function(){
  window.APP_BUILD="1.24.0";
  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const code=()=>{
    const v=(q("#language")?.value||"es").toLowerCase();
    return v.startsWith("en")?"en":v.startsWith("zh")?"zh":"es";
  };
  const L={
    es:{
      heroTitle:"Compara, explora y entiende el procesador por dentro.",
      heroSub:"Una sola aplicación para ver modelos, especificaciones, arquitectura, refrigeración, portátiles, mini PCs y vista 3D.",
      chips:["AMD Ryzen","Intel Core","Arquitectura","3D","Windows","Android"],
      compareTitle:"Comparación directa",compareSub:"Elige cualquier modelo disponible en cada lado.",tag:"No son equivalencias exactas",
      labels:["Familia","Generación","Núcleos","Hilos","Frecuencia base / turbo","Caché","Potencia de referencia","Gráficos integrados"],
      specsTitle:"Especificaciones del procesador",
      specsSub:"Núcleos, hilos, frecuencia base/turbo, caché, potencia de referencia y gráficos integrados.",
      visualTitle:"Cómo se construyen y dónde se usan",
      visualSub:"Explora una vista esquemática del interior del chip, sus generaciones y equipos que usan estos procesadores.",
      tabs:["Interior del procesador","Generaciones","Portátiles","Mini PCs","Refrigeración"],
      processors:"Procesadores",models3d:"modelos 3D",desktop:"Escritorio",laptop:"Portátil",embedded:"Embebido",cores:"núcleos",threads:"hilos",
      gpu:"Gráficos integrados",noGpu:"Sin gráficos integrados",
      sources:"Fuentes de referencia: AMD e Intel. AMD publica especificaciones de Ryzen y productos heredados; Intel publica listas de procesadores, generaciones y gráficos integrados.",
      footer:"Un Ryzen 7 o Core i7 no determina por sí solo cuál es más rápido. Compara el modelo concreto, generación, núcleos, hilos, frecuencia, caché, consumo y gráficos."
    },
    en:{
      heroTitle:"Compare, explore and understand the processor from the inside.",
      heroSub:"One app to view models, specifications, architecture, cooling, laptops, mini PCs and a 3D view.",
      chips:["AMD Ryzen","Intel Core","Architecture","3D","Windows","Android"],
      compareTitle:"Direct comparison",compareSub:"Choose any available model on each side.",tag:"Not exact equivalents",
      labels:["Family","Generation","Cores","Threads","Base / turbo frequency","Cache","Reference power","Integrated graphics"],
      specsTitle:"Processor specifications",
      specsSub:"Cores, threads, base/turbo frequency, cache, reference power and integrated graphics.",
      visualTitle:"How processors are built and where they are used",
      visualSub:"Explore a schematic view of the chip interior, generations and the devices that use these processors.",
      tabs:["Inside the processor","Generations","Laptops","Mini PCs","Cooling"],
      processors:"Processors",models3d:"3D models",desktop:"Desktop",laptop:"Laptop",embedded:"Embedded",cores:"cores",threads:"threads",
      gpu:"Integrated graphics",noGpu:"No integrated graphics",
      sources:"Reference sources: AMD and Intel. AMD publishes Ryzen and legacy product specifications; Intel publishes processor lists, generations and integrated graphics.",
      footer:"A Ryzen 7 or Core i7 name alone does not determine which is faster. Compare the exact model, generation, cores, threads, frequency, cache, power and graphics."
    },
    zh:{
      heroTitle:"比较、探索并理解处理器内部结构。",
      heroSub:"一个应用即可查看型号、规格、架构、散热、笔记本、迷你电脑和 3D 视图。",
      chips:["AMD Ryzen","Intel Core","架构","3D","Windows","Android"],
      compareTitle:"直接对比",compareSub:"在两侧选择任意可用型号。",tag:"不是精确对位",
      labels:["系列","代际","核心","线程","基础 / 睿频频率","缓存","参考功耗","集成显卡"],
      specsTitle:"处理器规格",
      specsSub:"核心、线程、基础/睿频频率、缓存、参考功耗和集成显卡。",
      visualTitle:"处理器如何构建以及用在哪里",
      visualSub:"探索芯片内部结构、各代变化以及使用这些处理器的设备。",
      tabs:["处理器内部","代际","笔记本","迷你电脑","散热"],
      processors:"处理器",models3d:"个 3D 型号",desktop:"台式机",laptop:"笔记本",embedded:"嵌入式",cores:"核心",threads:"线程",
      gpu:"集成显卡",noGpu:"无集成显卡",
      sources:"参考来源：AMD 与 Intel。AMD 发布 Ryzen 和历史产品规格；Intel 发布处理器列表、代际和集成显卡信息。",
      footer:"仅凭 Ryzen 7 或 Core i7 这个名称并不能判断谁更快。请比较具体型号、代际、核心、线程、频率、缓存、功耗和图形。"
    }
  };
  const T=()=>L[code()];
  const set=(sel,value,root=document)=>{
    const el=q(sel,root);
    if(el&&value!=null&&el.textContent!==String(value))el.textContent=String(value);
  };
  const heroSvg=[
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720">',
    '<defs><linearGradient id="bg" x1="0" x2="1"><stop offset="0" stop-color="#06101d"/><stop offset="1" stop-color="#0e2340"/></linearGradient>',
    '<linearGradient id="a" x1="0" x2="1"><stop offset="0" stop-color="#ff7148"/><stop offset="1" stop-color="#ffb657"/></linearGradient>',
    '<linearGradient id="b" x1="0" x2="1"><stop offset="0" stop-color="#59b7ff"/><stop offset="1" stop-color="#8ce0ff"/></linearGradient></defs>',
    '<rect width="1200" height="720" rx="36" fill="url(#bg)"/>',
    '<circle cx="180" cy="120" r="140" fill="#1d4a82" opacity=".22"/><circle cx="980" cy="580" r="220" fill="#173861" opacity=".22"/>',
    '<rect x="130" y="120" width="350" height="230" rx="28" fill="#09192d" stroke="#24486f"/>',
    '<rect x="170" y="165" width="118" height="118" rx="18" fill="url(#a)"/><rect x="315" y="190" width="118" height="118" rx="18" fill="url(#b)"/>',
    '<g fill="#d7e7ff" font-family="Arial,Helvetica,sans-serif"><text x="130" y="420" font-size="34" font-weight="700">AMD vs Intel</text>',
    '<text x="130" y="460" font-size="18" opacity=".9">CPU LAB · Architecture · 3D · Compare</text>',
    '<text x="560" y="205" font-size="28" font-weight="700" letter-spacing="4">AMD vs Intel · CPU LAB</text>',
    '<text x="560" y="295" font-size="70" font-weight="800">CPU LAB</text><text x="560" y="380" font-size="48" font-weight="700">AMD · INTEL · 3D</text></g></svg>'
  ].join("");
  const heroUri="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(heroSvg);

  function fixHero(){
    const x=T();
    document.documentElement.lang=code()==="zh"?"zh-CN":code();
    document.title="AMD vs Intel · CPU LAB";
    const img=q("#finalVisual img");
    if(img&&img.src!==heroUri){img.src=heroUri;img.alt="AMD vs Intel CPU Lab";img.style.objectFit="cover";}
    set("#finalVisual .kicker","AMD vs Intel · CPU LAB");
    set("#finalVisual h2",x.heroTitle);
    set("#finalVisual p",x.heroSub);
    qa("#finalVisual .final-visual-chips span").forEach((el,i)=>{
      if(x.chips[i]&&el.textContent!==x.chips[i])el.textContent=x.chips[i];
    });
  }

  function repairArchitecture(){
    qa("#architectureSection .arch-panel, #architectureSection .visual-panel").forEach(p=>p.classList.add("visible"));
    const x=T();
    set("#architectureSection h2",x.visualTitle);
    const lead=q("#architectureSection .arch-hero p")||q("#architectureSection .visual-lead p");
    if(lead&&lead.textContent!==x.visualSub)lead.textContent=x.visualSub;
    const tabs=qa("#architectureSection .arch-tabs button, #architectureSection .visual-tabs button");
    x.tabs.forEach((v,i)=>{if(tabs[i]&&tabs[i].textContent!==v)tabs[i].textContent=v;});
  }

  function fixComparison(){
    const x=T();
    set(".compare-head h2",x.compareTitle);
    set(".compare-head .sub",x.compareSub);
    set(".compare-head .tag",x.tag);
    qa("#comparison .compare-grid .label").forEach((el,i)=>{
      const v=x.labels[i];
      if(v&&el.textContent!==v)el.textContent=v;
    });
  }

  function wrapComparison(){
    if(window.__v1231CompareWrapped)return;
    const original=window.compare;
    if(typeof original!=="function")return;
    window.__v1231CompareWrapped=true;
    window.compare=function(){
      const out=original.apply(this,arguments);
      setTimeout(fixComparison,0);
      return out;
    };
  }

  function fixSpecs(){
    const x=T();
    set('#specsSection [data-i18n="specsTitle"]',x.specsTitle);
    set('#specsSection [data-i18n="specsSub"]',x.specsSub);
    set('#specsSection [data-i18n="frequency"]',x.labels[4]);
    set('#specsSection [data-i18n="power"]',x.labels[6]);
    set('#specsSection [data-i18n="igpu"]',x.labels[7]);
  }

  function modelRows(){
    try{if(typeof getAllModels==="function")return getAllModels()}catch(e){}
    try{if(typeof models!=="undefined")return models}catch(e){}
    return [];
  }
  function localizedDevice(row){
    const x=T();
    let d="";
    try{if(typeof deviceType==="function")d=deviceType(row)||""}catch(e){}
    if(!d){
      const s=[row?.[1],row?.[2],row?.[3]].join(" ");
      d=/Mobile|Ryzen AI|(?:HX|HS|H|U)\b/i.test(s)?"Laptop":(/PE\b|Embedded/i.test(s)?"Embedded":"Desktop");
    }
    return d==="Laptop"?x.laptop:d==="Embedded"?x.embedded:x.desktop;
  }
  function fix3DMeta(){
    const x=T();
    const sel=q("#v5Model");
    const name=sel?.value||"";
    const row=modelRows().find(r=>r[2]===name);
    const meta=q("#v5ModelMeta");
    if(meta&&row){
      const gpu=String(row[9]||"No");
      const gpuHtml=gpu==="No"
        ? '<span class="meta-chip no-gpu">'+x.noGpu+'</span>'
        : '<span class="meta-chip gpu"><i class="gpu-dot"></i>'+x.gpu+': <b>'+gpu+'</b></span>';
      const wanted='<span class="meta-name">'+name+'</span>'+
        '<span class="meta-chip">'+row[4]+' '+x.cores+'</span>'+
        '<span class="meta-chip">'+localizedDevice(row)+'</span>'+gpuHtml;
      if(meta.innerHTML!==wanted)meta.innerHTML=wanted;
    }
    const count=q("#v7ModelCount");
    if(count){
      const n=(count.textContent.match(/\d+/)||[String(sel?.options?.length||0)])[0];
      const wanted=code()==="zh"?n+" "+x.models3d:n+" "+x.models3d;
      if(count.textContent!==wanted)count.textContent=wanted;
    }
    set("#v23ProcessorLabel",x.processors);
    const partTitle=q("#v5PartTitle"),partDesc=q("#v5PartDesc");
    if(row&&partTitle&&partTitle.textContent===name&&partDesc){
      const wanted=localizedDevice(row)+" · "+row[4]+" "+x.cores+" / "+row[5]+" "+x.threads+" · "+row[6];
      if(partDesc.textContent!==wanted)partDesc.textContent=wanted;
    }
  }

  function fixFooter(){
    const x=T();
    set('footer [data-i18n="sources"]',x.sources);
    set('footer [data-i18n="footerNote"]',x.footer);
  }

  function run(){
    wrapComparison();
    repairArchitecture();
    fixHero();
    fixSpecs();
    fixComparison();
    fix3DMeta();
    fixFooter();
  }

  qa("#architectureSection [data-tab]").forEach(btn=>{
    if(btn.dataset.v1231Bound)return;
    btn.dataset.v1231Bound="1";
    btn.addEventListener("click",()=>setTimeout(repairArchitecture,20),true);
  });
  q("#language")?.addEventListener("change",()=>setTimeout(run,120));
  q("#leftSelect")?.addEventListener("change",()=>setTimeout(fixComparison,20));
  q("#rightSelect")?.addEventListener("change",()=>setTimeout(fixComparison,20));
  q("#v5Model")?.addEventListener("change",()=>setTimeout(()=>{fix3DMeta();fixComparison();},30));
  q("#specModel")?.addEventListener("change",()=>setTimeout(fixSpecs,20));
  document.addEventListener("amdIntelLanguageApplied",()=>setTimeout(run,140));

  let timer=0;
  const observer=new MutationObserver(()=>{
    clearTimeout(timer);
    timer=setTimeout(run,90);
  });
  try{observer.observe(document.body,{subtree:true,childList:true});}catch(e){}
  setTimeout(run,80);
  setTimeout(run,450);
  setTimeout(run,1200);
})();
