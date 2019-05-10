var cacheName = 'mca-v190423';
var appShellFiles = [
 //"./index.html",
 "./script.js",
 "./style.css",
 "./warning.png"
];


self.addEventListener('install', function(e) {
  // console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
          //console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
          //console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
          //console.log('[Service Worker] Caching new resource: '+e.request.url);
          if (! e.request.url.startsWith("https://maps.googleapis.com")){
            cache.put(e.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});