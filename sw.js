const CACHE='imperium-v7-cache';
const ASSETS=['./','./index.html','./campo-batalla.png','./manifest.webmanifest','./icon-192.png','./icon-512.png', './siervo-caminar-1.png','./siervo-caminar-2.png','./siervo-caminar-3.png','./siervo-caminar-4.png','./siervo-caminar-5.png','./siervo-lanzar-1.png','./siervo-lanzar-2.png','./siervo-lanzar-3.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{let copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
