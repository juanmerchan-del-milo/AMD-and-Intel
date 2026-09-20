(function(){
'use strict';
const intro=document.getElementById('cpuFamilyWelcome');
const button=document.getElementById('cpuFamilyContinue');
const language=document.getElementById('language');
if(!intro||!button)return;
const copy={
 es:{
  kicker:'Guía rápida de procesadores',
  title:'Antes de empezar: conoce las familias de CPU',
  sub:'Los números 3, 5, 7 y 9 sirven como una guía rápida del nivel de cada familia. Mira qué suele ofrecer cada una y luego entra a la aplicación.',
  intelNote:'Intel Core · nivel general',
  amdNote:'AMD Ryzen · nivel general',
  intel3:'Clases, internet, tareas y juegos ligeros.',
  intel5:'Equilibrio para gaming, estudio y multitarea.',
  intel7:'Gaming exigente, edición y creación de contenido.',
  intel9:'Trabajo pesado, renderizado y alto rendimiento.',
  amd3:'Clases, internet, tareas y juegos ligeros.',
  amd5:'Equilibrio para gaming, estudio y multitarea.',
  amd7:'Gaming exigente, edición y creación de contenido.',
  amd9:'Trabajo pesado, renderizado y alto rendimiento.',
  tip:'Importante: un número más alto suele indicar una gama superior, pero el rendimiento real también depende de la generación y del modelo exacto.',
  continue:'Continuar'
 },
 en:{
  kicker:'Quick processor guide',
  title:'Before you start: meet the CPU families',
  sub:'The numbers 3, 5, 7 and 9 are a quick guide to each family’s general tier. See what each one is usually made for, then enter the app.',
  intelNote:'Intel Core · general tier',
  amdNote:'AMD Ryzen · general tier',
  intel3:'Classes, web, everyday tasks and light games.',
  intel5:'Balanced for gaming, school and multitasking.',
  intel7:'Demanding gaming, editing and content creation.',
  intel9:'Heavy workloads, rendering and high performance.',
  amd3:'Classes, web, everyday tasks and light games.',
  amd5:'Balanced for gaming, school and multitasking.',
  amd7:'Demanding gaming, editing and content creation.',
  amd9:'Heavy workloads, rendering and high performance.',
  tip:'Important: a higher number usually means a higher tier, but real performance also depends on the generation and exact model.',
  continue:'Continue'
 },
 zh:{
  kicker:'处理器快速指南',
  title:'开始之前：先认识 CPU 系列',
  sub:'3、5、7、9 可以快速表示产品的大致级别。先看看每个级别通常适合什么，再进入应用。',
  intelNote:'Intel Core · 大致级别',
  amdNote:'AMD Ryzen · 大致级别',
  intel3:'上课、上网、日常任务和轻度游戏。',
  intel5:'适合游戏、学习和多任务的均衡选择。',
  intel7:'高要求游戏、剪辑和内容创作。',
  intel9:'重负载、渲染和高性能任务。',
  amd3:'上课、上网、日常任务和轻度游戏。',
  amd5:'适合游戏、学习和多任务的均衡选择。',
  amd7:'高要求游戏、剪辑和内容创作。',
  amd9:'重负载、渲染和高性能任务。',
  tip:'提示：数字更高通常表示更高的产品级别，但实际性能还取决于处理器代际和具体型号。',
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
 try{sessionStorage.setItem('pc-lab-cpu-welcome','seen')}catch{}
 document.querySelector('main')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
}
button.addEventListener('click',close);
language?.addEventListener('change',apply);
apply();
try{
 const hasDeepLink=/cpu=/.test(location.hash);
 if(sessionStorage.getItem('pc-lab-cpu-welcome')==='seen'||hasDeepLink)intro.hidden=true;
}catch{}
})();
