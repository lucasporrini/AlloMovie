const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js',
  '/fallback.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Fichiers en cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activé');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }
        let responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(error => {
        console.error('Échec de la requête:', error);
        return caches.match('/fallback.json');
      });
    })
  );
});
