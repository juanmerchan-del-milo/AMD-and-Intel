(function(){
'use strict';
const intro=document.getElementById('cpuFamilyWelcome');
const button=document.getElementById('cpuFamilyContinue');
const language=document.getElementById('language');
if(!intro||!button)return;
const copy={
 es:{
  kicker:'Guía rápida de procesadores',
  title:'Conoce las familias antes de entrar',
  sub:'Aquí tienes una idea corta de Intel Core y AMD Ryzen. Es solo una guía rápida: dentro de la app puedes ver modelos, generaciones, núcleos, hilos, gráficos integrados y más.',
  intelNote:'Intel Core · de entrada a alta gama',
  amdNote:'AMD Ryzen · de entrada a alta gama',
  intel3:'Gama de entrada. Tareas, clases, internet y uso diario.',
  intel5:'Gama media. Buen equilibrio para juegos y multitarea.',
  intel7:'Gama alta. Juegos exigentes, edición y trabajo pesado.',
  intel9:'Tope de gama. Renderizado, creación y cargas intensas.',
  amd3:'Gama de entrada. Tareas, clases, internet y uso diario.',
  amd5:'Gama media. Buen equilibrio para juegos y multitarea.',
  amd7:'Gama alta. Juegos exigentes, edición y trabajo pesado.',
  amd9:'Tope de gama. Renderizado, creación y cargas intensas.',
  tip:'El número ayuda a ubicar la gama, pero no decide todo: también importan la generación, el modelo exacto, los núcleos, los hilos, la frecuencia, la caché y la potencia.',
  more:'¿Quieres seguir viendo la aplicación?',
  continue:'Continuar'
 },
 en:{
  kicker:'Quick processor guide',
  title:'Meet the CPU families before entering',
  sub:'Here is a short overview of Intel Core and AMD Ryzen. It is only a quick guide: inside the app you can explore models, generations, cores, threads, integrated graphics and more.',
  intelNote:'Intel Core · entry to high-end',
  amdNote:'AMD Ryzen · entry to high-end',
  intel3:'Entry tier. School, web, everyday tasks and light use.',
  intel5:'Mid tier. A balanced choice for gaming and multitasking.',
  intel7:'High tier. Demanding games, editing and heavier work.',
  intel9:'Top tier. Rendering, creation and intensive workloads.',
  amd3:'Entry tier. School, web, everyday tasks and light use.',
  amd5:'Mid tier. A balanced choice for gaming and multitasking.',
  amd7:'High tier. Demanding games, editing and heavier work.',
  amd9:'Top tier. Rendering, creation and intensive workloads.',
  tip:'The number helps show the tier, but it does not tell the whole story: generation, exact model, cores, threads, clock speed, cache and power also matter.',
  more:'Want to keep exploring the app?',
  continue:'Continue'
 },
 zh:{
  kicker:'处理器快速指南',
  title:'进入应用前先认识处理器系列',
  sub:'这里简单介绍 Intel Core 和 AMD Ryzen。进入应用后还可以查看型号、代际、核心、线程、集成显卡等更多信息。',
  intelNote:'Intel Core · 从入门到高端',
  amdNote:'AMD Ryzen · 从入门到高端',
  intel3:'入门级。适合学习、上网和日常任务。',
  intel5:'中端。适合游戏和多任务，比较均衡。',
  intel7:'高端。适合高要求游戏、剪辑和较重任务。',
  intel9:'旗舰级。适合渲染、创作和高负载工作。',
  amd3:'入门级。适合学习、上网和日常任务。',
  amd5:'中端。适合游戏和多任务，比较均衡。',
  amd7:'高端。适合高要求游戏、剪辑和较重任务。',
  amd9:'旗舰级。适合渲染、创作和高负载工作。',
  tip:'数字可以帮助判断大致级别，但不是全部。处理器代际、具体型号、核心、线程、频率、缓存和功耗也很重要。',
  more:'想继续查看应用吗？',
  continue:'继续'
 }
};
function apply(){
 const lang=['es','en','zh'].includes(language?.value)?language.value:'es';
 document.querySelectorAll('[data-welcome]').forEach(el=>{
  const value=copy[lang][el.dataset.welcome];
  if(value!=null)el.textContent=value;
 });
}
function close(){
 intro.hidden=true;
 document.querySelector('main')?.scrollIntoView({
  behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',
  block:'start'
 });
}
button.addEventListener('click',close);
language?.addEventListener('change',apply);
apply();
try{
 if(/cpu=/.test(location.hash))intro.hidden=true;
}catch{}
})();
