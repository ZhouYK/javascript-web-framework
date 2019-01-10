// 与sw-version.js中swVersion保持一致
/**
 * 生命周期
 * 1，先install
 * 2，然后activate
 * 3，然后fetch serviceWorker域下所有的请求都会走fetch(包括页面本身)
 * @type {string}
 */
var curVersion = '0.0';
var CACHE_NAME = `javascript-web-framework-cache-${curVersion}`;
var pageVersion;
var urlsToCache = [
];

function itsVersion(url) {
  const arr = url.match(/\/forsw\.gif\?(.*)/);
  if (RegExp.$1) {
    pageVersion = RegExp.$1;
  }
}
self.addEventListener('install', function (event) {
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
        itsVersion(event.request.url);
        if (response && pageVersion && curVersion === pageVersion) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();
          // 缓存所有的js
          if (fetchRequest.url.endsWith('.js')) {
            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        });
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('activate');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
