/* Offline shell. Manufacturer links and user configurations are never cached. */
'use strict';
const CACHE='pc-lab-builder-1.24.0-r2';
const FILES=[
  './','./index.html','./styles.css','./catalog.js','./cpus.js','./catalog-extended.js',
  './i18n.js','./glossary.js','./engine.js','./viewer.js','./app.js',
  './cpu-lab.html','./v18-fixes.js','./lab-124-fixes.js','./pwa.js',
  './desktop/desktop.css','./desktop/renderer.js',
  './manifest.webmanifest','./vendor/three.min.js','./vendor/OrbitControls.js','./app-hero.png',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('pc-lab-builder-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  const path=new URL(event.request.url).pathname;
  if(!FILES.some(file=>new URL(file,self.registration.scope).pathname===path))return;
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    const response=await fetch(event.request);
    if(response.ok)cache.put(event.request,response.clone());
    return response;
  }));
});
