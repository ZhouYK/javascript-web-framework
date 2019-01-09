var CACHE_NAME = 'javascript-web-framework-cache';
var urlsToCache = [
  '/dll/production/vendors.dll.js',
  '/favicon.ico',
  '/'
];
function judgeUrlToCache (url) {
  return urlsToCache.some(function (str) {
    return url.endsWith(str);
  })
}
self.addEventListener('install', function (event) {
  console.log('install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(function (err) {
          return caches.match('/');
        });
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('activate, update2');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          console.log(cacheName);
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
