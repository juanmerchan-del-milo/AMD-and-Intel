(()=>{
  'use strict';
  const RELEASES='https://github.com/juanmerchan-del-milo/AMD-and-Intel/releases/latest';
  const $=id=>document.getElementById(id);
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const standalone=()=>window.matchMedia?.('(display-mode: standalone)').matches||navigator.standalone===true;
  const lang=()=>{const value=($('language')?.value||document.documentElement.lang||'es').toLowerCase();return value.startsWith('zh')?'zh':value.startsWith('en')?'en':'es'};
  const copy={
    es:{install:'Instalar',downloads:'Descargas',installed:'La aplicación ya está instalada.',ios:'En iPhone/iPad: abre este sitio en Safari, toca Compartir y luego Añadir a pantalla de inicio.',browser:'Abre el menú de tu navegador y elige Instalar aplicación o Añadir a pantalla de inicio.',native:'Esta versión ya está instalada como aplicación.'},
    en:{install:'Install',downloads:'Downloads',installed:'The app is already installed.',ios:'On iPhone/iPad: open this site in Safari, tap Share, then Add to Home Screen.',browser:'Open your browser menu and choose Install app or Add to Home Screen.',native:'This version is already installed as an app.'},
    zh:{install:'安装',downloads:'下载',installed:'应用已经安装。',ios:'在 iPhone/iPad 上：请用 Safari 打开本网站，点击“共享”，然后选择“添加到主屏幕”。',browser:'请打开浏览器菜单，然后选择“安装应用”或“添加到主屏幕”。',native:'此版本已作为应用安装。'}
  };
  let promptEvent=null;
  const words=()=>copy[lang()];
  const updateLabels=()=>document.querySelectorAll('[data-pwa-label]').forEach(node=>{node.textContent=words()[node.dataset.pwaLabel]||node.textContent});
  const message=text=>{
    const toast=$('toast')||$('v15Toast');
    if(!toast){alert(text);return}
    toast.textContent=text;toast.classList.add('show');clearTimeout(message.timer);message.timer=setTimeout(()=>toast.classList.remove('show'),3200);
  };
  const install=async()=>{
    if(standalone()){message(words().installed);return}
    if(location.protocol==='file:'){message(words().native);return}
    if(ios){message(words().ios);return}
    if(promptEvent){
      const current=promptEvent;promptEvent=null;current.prompt();
      try{await current.userChoice}catch{}
      return;
    }
    message(words().browser);
  };
  addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();promptEvent=event;
    $('v15InstallBanner')?.classList.add('show');
    if($('installApp'))$('installApp').hidden=false;
  });
  addEventListener('appinstalled',()=>{
    promptEvent=null;$('v15InstallBanner')?.classList.remove('show');
    if($('installApp'))$('installApp').hidden=true;
    message(words().installed);
  });
  $('installApp')?.addEventListener('click',install);
  $('v15Install')?.addEventListener('click',install);
  $('v15InstallBannerBtn')?.addEventListener('click',install);
  $('v15Download')?.addEventListener('click',()=>open(RELEASES,'_blank','noopener'));
  $('language')?.addEventListener('change',updateLabels);
  if(ios&&!standalone()){
    const banner=$('v15InstallBanner'),paragraph=banner?.querySelector('p');
    if(paragraph)paragraph.textContent=words().ios;
    banner?.classList.add('show');
  }
  if(location.protocol==='file:'||window.desktopApp){if($('installApp'))$('installApp').hidden=true}
  updateLabels();
  if('serviceWorker' in navigator&&location.protocol==='https:')addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();
