(()=>{
const D={
es:{k1:"LÍNEA DE TIEMPO",h1:"Evolución de arquitecturas",k2:"PLATAFORMA MÓVIL",h2:"Una portátil moderna por dentro",k3:"SISTEMAS COMPACTOS",h3:"Mini PC: pequeño por fuera, complejo por dentro",thermal:"Mapa térmico",fans:"Ventiladores",perf:"Modo rendimiento",close:"Cerrar carcasa",open:"Abrir carcasa",air:"Flujo de aire",amd:"Portátil con AMD Ryzen",amdP:"Normalmente integra CPU Zen, gráficos Radeon y, en las familias Ryzen AI, una NPU para tareas locales de IA.",intel:"Portátil con Intel Core",intelP:"Core y Core Ultra móviles combinan CPU, iGPU y, según la serie, NPU. Las variantes H y HX priorizan mayor rendimiento.",facts:["Arquitectura","Empaquetado","IA y movilidad"],factP:["Nuevos núcleos, cachés, predicción y ejecución.","Chiplets, tiles, interconexiones y apilado 3D.","NPUs dedicadas, mejores iGPU y plataformas más eficientes."],mini:["Oficina / estudio","Creación / desarrollo","Embebido / computación perimetral"],miniP:["Silencio, bajo consumo y espacio mínimo.","Más RAM, mejor SSD y refrigeración más exigente.","Conectividad, operación continua y formatos específicos."],npu:"NPU / IA",yes:"Integrada",no:"No indicada",device:{Desktop:"Escritorio",Laptop:"Portátil",Embedded:"Embebido"},power:"Orden de potencia",tiers:{"BÁSICO":"BÁSICO","MEDIO":"MEDIO","ALTO":"ALTO","ENTUSIASTA":"ENTUSIASTA","EXTREME":"EXTREME"}},
en:{k1:"TIMELINE",h1:"Architecture evolution",k2:"MOBILE PLATFORM",h2:"Inside a modern laptop",k3:"COMPACT SYSTEMS",h3:"Mini PC: small outside, complex inside",thermal:"Thermal map",fans:"Fans",perf:"Performance mode",close:"Close case",open:"Open case",air:"Airflow",amd:"Laptop with AMD Ryzen",amdP:"It typically integrates Zen CPU cores, Radeon graphics and, in Ryzen AI families, an NPU for local AI tasks.",intel:"Laptop with Intel Core",intelP:"Mobile Core and Core Ultra chips combine CPU, iGPU and, depending on the series, an NPU. H and HX variants prioritize higher performance.",facts:["Architecture","Packaging","AI and mobility"],factP:["New cores, caches, prediction and execution.","Chiplets, tiles, interconnects and 3D stacking.","Dedicated NPUs, better iGPUs and more efficient platforms."],mini:["Office / study","Creation / development","Embedded / edge computing"],miniP:["Silence, low power use and minimal space.","More RAM, a better SSD and stronger cooling.","Connectivity, continuous operation and specific form factors."],npu:"NPU / AI",yes:"Integrated",no:"Not specified",device:{Desktop:"Desktop",Laptop:"Laptop",Embedded:"Embedded"},power:"Power order",tiers:{"BÁSICO":"BASIC","MEDIO":"MID","ALTO":"HIGH","ENTUSIASTA":"ENTHUSIAST","EXTREME":"EXTREME"}},
zh:{k1:"时间线",h1:"架构演进",k2:"移动平台",h2:"现代笔记本内部结构",k3:"紧凑系统",h3:"迷你电脑：外小内复杂",thermal:"热力图",fans:"风扇",perf:"性能模式",close:"关闭机壳",open:"打开机壳",air:"气流",amd:"搭载 AMD Ryzen 的笔记本电脑",amdP:"通常集成 Zen CPU、Radeon 图形，并且在 Ryzen AI 家族中还带有用于本地 AI 任务的 NPU。",intel:"搭载 Intel Core 的笔记本电脑",intelP:"移动版 Core 与 Core Ultra 结合 CPU、iGPU，并根据系列不同带有 NPU。H 和 HX 版本更强调高性能。",facts:["架构","封装","AI 与移动性"],factP:["新的核心、缓存、预测与执行能力。","Chiplet、Tile、互连和 3D 堆叠。","专用 NPU、更强 iGPU 与更高能效平台。"],mini:["办公 / 学习","创作 / 开发","嵌入式 / 边缘计算"],miniP:["安静、低功耗、占用空间小。","更大内存、更快 SSD 与更强散热。","连接性、持续运行与特定外形规格。"],npu:"NPU / AI",yes:"已集成",no:"未注明",device:{Desktop:"台式机",Laptop:"笔记本电脑",Embedded:"嵌入式"},power:"性能顺序",tiers:{"BÁSICO":"基础","MEDIO":"中级","ALTO":"高性能","ENTUSIASTA":"发烧级","EXTREME":"旗舰级"}}};
const G=[
[["2017","Ryzen 1000","Zen · 14 nm"],["2019","Ryzen 3000","Zen 2 · chiplets"],["2020","Ryzen 5000","Zen 3 · latencia refinada"],["2022","Ryzen 7000","Zen 4 · DDR5 / PCIe 5"],["2024","Ryzen 9000","Zen 5 · nueva generación"],["2021","Intel Core 12.ª gen.","Alder Lake · P+E"],["2022–24","Intel Core 13.ª / 14.ª gen.","Raptor Lake"],["2023","Core Ultra Serie 1","Meteor Lake · tiles"],["2024–25","Core Ultra Serie 2","Arrow / Lunar Lake"],["2026","Core Ultra Serie 3","Panther Lake · Intel 18A"]],
[["2017","Ryzen 1000","Zen · 14 nm"],["2019","Ryzen 3000","Zen 2 · chiplets"],["2020","Ryzen 5000","Zen 3 · refined latency"],["2022","Ryzen 7000","Zen 4 · DDR5 / PCIe 5"],["2024","Ryzen 9000","Zen 5 · new generation"],["2021","12th Gen Intel Core","Alder Lake · P+E"],["2022–24","13th / 14th Gen Intel Core","Raptor Lake"],["2023","Core Ultra Series 1","Meteor Lake · tiles"],["2024–25","Core Ultra Series 2","Arrow / Lunar Lake"],["2026","Core Ultra Series 3","Panther Lake · Intel 18A"]],
[["2017","Ryzen 1000","Zen · 14 nm"],["2019","Ryzen 3000","Zen 2 · chiplets"],["2020","Ryzen 5000","Zen 3 · 延迟优化"],["2022","Ryzen 7000","Zen 4 · DDR5 / PCIe 5"],["2024","Ryzen 9000","Zen 5 · 新一代"],["2021","第 12 代 Intel Core","Alder Lake · P+E"],["2022–24","第 13 / 14 代 Intel Core","Raptor Lake"],["2023","Core Ultra 第 1 系列","Meteor Lake · tiles"],["2024–25","Core Ultra 第 2 系列","Arrow / Lunar Lake"],["2026","Core Ultra 第 3 系列","Panther Lake · Intel 18A"]]];
const q=(s,r=document)=>r?.querySelector?.(s),qa=(s,r=document)=>Array.from(r?.querySelectorAll?.(s)||[]),lc=()=>{let x=(q("#language")?.value||document.documentElement.lang||"es").toLowerCase();return x.startsWith("en")?"en":x.startsWith("zh")?"zh":"es"},T=()=>D[lc()],set=(s,v,r=document)=>{let e=typeof s==="string"?q(s,r):s;if(e&&v!=null)e.textContent=v},pool=()=>{try{return typeof getAllModels==="function"?getAllModels():models}catch(e){return window.models||[]}},hasNpu=n=>/(ryzen ai|core ultra|7840hs|7840u|8845hs|8840u|8945hs|8940hs)/i.test(String(n||""));
window.populateFamilies=function(){let e=q("#family");if(!e)return;let old=e.value,tr=window.I?.[lc()]||{},a=[...new Set(pool().map(m=>m[1]))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}));e.innerHTML='<option value="all">'+(tr.allFamilies||"All families")+'</option>'+a.map(x=>'<option value="'+x+'">'+x+'</option>').join("");if([...e.options].some(o=>o.value===old))e.value=old};
window.populateGenerations=function(){let e=q("#generation");if(!e)return;let old=e.value,tr=window.I?.[lc()]||{},a=[...new Set(pool().map(m=>m[3]))].sort((a,b)=>(+(String(a).match(/\d+/)?.[0]||0))-(+(String(b).match(/\d+/)?.[0]||0))||String(a).localeCompare(String(b),undefined,{numeric:true}));e.innerHTML='<option value="all">'+(tr.allGenerations||"All generations")+'</option>'+a.map(x=>'<option value="'+x+'">'+x+'</option>').join("");if([...e.options].some(o=>o.value===old))e.value=old};
window.populateSelects=function(){let all=pool();for(const [id,brand] of [["leftSelect","AMD"],["rightSelect","Intel"]]){let e=q("#"+id);if(!e)continue;let old=e.dataset.model||"";let a=all.filter(m=>m[0]===brand);e.innerHTML=a.map(m=>'<option value="'+m[2]+'">'+m[2]+' · '+m[3]+'</option>').join("");if([...e.options].some(o=>o.value===old))e.value=old;e.dataset.model=e.value}};
window.compare=function(){let all=pool(),le=q("#leftSelect"),re=q("#rightSelect"),a=all.find(m=>m[2]===le?.value)||all.find(m=>m[0]==="AMD"),i=all.find(m=>m[2]===re?.value)||all.find(m=>m[0]==="Intel");if(!a||!i)return;if(le)le.dataset.model=le.value;if(re)re.dataset.model=re.value;let tr=window.I?.[lc()]||window.I?.es||{},gpu=m=>m[10]||(m[9]==="No"?(tr.no||"No"):m[9]),rows=[[tr.family||"Family",a[1],i[1]],[tr.gen||"Generation",a[3],i[3]],[tr.cores||"Cores",a[4],i[4]],[tr.threads||"Threads",a[5],i[5]],[tr.clock||"Frequency",a[6],i[6]],[tr.cache||"Cache",a[7],i[7]],[tr.power||"Power",a[8],i[8]],[tr.graphics||"Graphics",gpu(a),gpu(i)]],box=q("#comparison");if(box)box.innerHTML='<div class="compare-grid">'+rows.map(x=>'<div>'+x[1]+'</div><div class="label">'+x[0]+'</div><div>'+x[2]+'</div>').join("")+'</div>'};
function npuBox(){let g=q("#specsSection .spec-grid");if(!g)return;let b=q("#spNPUBox");if(!b){b=document.createElement("div");b.id="spNPUBox";b.className="spec-box";b.innerHTML='<span id="spNPULabel"></span><b id="spNPU"></b>';g.appendChild(b)}set("#spNPULabel",T().npu);set("#spNPU",hasNpu(q("#specModel")?.value)?T().yes:T().no)}
function localize(){let t=T(),gi=lc()==="es"?0:lc()==="en"?1:2,g=q("#tab-gens"),l=q("#tab-laptops"),m=q("#tab-minipcs");if(g){set(".panel-kicker",t.k1,g);set("h3",t.h1,g);qa(".timeline .tl-card",g).forEach((c,i)=>{let r=G[gi][i];if(r){set(".year",r[0],c);set("b",r[1],c);set("small",r[2],c)}});qa(".facts-grid>div",g).forEach((d,i)=>{set("b",t.facts[i],d);set("p",t.factP[i],d)})}if(l){set(".panel-kicker",t.k2,l);set("h3",t.h2,l);set("#laptopThermal",t.thermal,l);set("#laptopFans",t.fans,l);set("#laptopPower",t.perf,l);let c=qa(".two-cards .info-card",l);if(c[0]){set("b",t.amd,c[0]);set("p",t.amdP,c[0])}if(c[1]){set("b",t.intel,c[1]);set("p",t.intelP,c[1])}}if(m){set(".panel-kicker",t.k3,m);set("h3",t.h3,m);set("#miniAirflow",t.air,m);let o=q("#miniExplode",m);if(o)o.textContent=q("#miniLab")?.classList.contains("exploded")?t.close:t.open;qa(".facts-grid>div",m).forEach((d,i)=>{set("b",t.mini[i],d);set("p",t.miniP[i],d)})}qa(".device-badge").forEach(e=>{let x=e.textContent.trim();if(t.device[x])e.textContent=t.device[x]});qa(".power-rank").forEach(e=>{let s=q("small",e),b=q("b",e);if(s)s.textContent=t.power;if(b&&t.tiers[b.textContent.trim()])b.textContent=t.tiers[b.textContent.trim()]});npuBox()}
function apply(){try{populateFamilies();populateGenerations();populateSelects();compare()}catch(e){}localize();try{window.updSpecs?.()}catch(e){}npuBox()}
q("#language")?.addEventListener("change",()=>setTimeout(apply,180));q("#specModel")?.addEventListener("change",()=>setTimeout(npuBox,20));q("#leftSelect")?.addEventListener("change",compare);q("#rightSelect")?.addEventListener("change",compare);document.addEventListener("amdIntelLanguageApplied",()=>setTimeout(apply,150));setTimeout(()=>{try{window.render?.()}catch(e){}apply()},400);setTimeout(apply,1000);
})();

/* v1.23.0 - Generations visibility + 3D catalog separation */
(function(){
  window.APP_BUILD="1.23.0";
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
    return /Ryzen AI|Ryzen 7 7840HS|Ryzen 7 8845HS|Ryzen 5 8600G|Core Ultra/i.test(s);
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
