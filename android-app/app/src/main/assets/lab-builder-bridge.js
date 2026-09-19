/* CPU Lab and the PC builder share stable catalog identities. */
(function(){
'use strict';
const select=document.getElementById('v5Model');if(!select||!window.PC_CATALOG)return;
const norm=name=>String(name||'').replace(/^(AMD|Intel) /,'').trim().toLowerCase();
const row=document.createElement('div');row.className='cpu-builder-links';row.innerHTML='<a data-action="choose"></a><a data-action="inspect"></a>';
select.closest('label')?.insertAdjacentElement('afterend',row);if(!row.isConnected)select.insertAdjacentElement('afterend',row);
const style=document.createElement('style');style.textContent='.cpu-builder-links{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.cpu-builder-links a{padding:12px 16px;border:1px solid #53757c;border-radius:10px;background:#173b3c;color:#c5ffeb;font-size:13px;text-decoration:none;font-weight:700}.cpu-builder-links a:focus-visible{outline:2px solid #a0ffdb;outline-offset:3px}';document.head.appendChild(style);
function refresh(){
 const lang=(document.getElementById('language')?.value||document.documentElement.lang||'es').slice(0,2),ix={es:0,en:1,zh:2}[lang]||0;
 const cpu=PC_CATALOG.cpu.find(c=>norm(c.name)===norm(select.value)),labels=[['Elegir para mi PC','Choose for my PC','选择用于我的电脑'],['Abrir y explorar en 3D','Open and explore in 3D','打开并探索 3D']];
 row.hidden=!cpu;if(!cpu)return;
 [...row.children].forEach((link,n)=>{link.textContent=labels[n][ix];link.href='./index.html#'+new URLSearchParams({cpu:cpu.id,action:link.dataset.action,lang:['es','en','zh'].includes(lang)?lang:'es'})});
}
select.addEventListener('change',refresh);document.getElementById('language')?.addEventListener('change',refresh);
new MutationObserver(refresh).observe(select,{childList:true,subtree:true});refresh();
})();
