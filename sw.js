const CACHE="amd-intel-cpu-lab-v1.23.1";
const CORE=["./","./index.html","./manifest.webmanifest","./icon.svg","./app-hero.png","./v18-fixes.js","./pwa.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;
 if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(c=>c.put("./index.html",x));return r}).catch(()=>caches.match("./index.html")));return}
 e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{if(r&&r.ok){const y=r.clone();caches.open(CACHE).then(c=>c.put(e.request,y))}return r})))
});