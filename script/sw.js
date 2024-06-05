const CACHE_NAME = "v1";
const urlsToCache = [
  "/",
  "/styles/main.css",
  "/script/main.js",
  "/fallback.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Ouverture du cache");
      return Promise.all(
        urlsToCache.map((url) => {
          return cache.add(url).catch((err) => {
            console.error("Erreur lors de la mise en cache de", url, err);
          });
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activé");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          let responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch((error) => {
          console.error("Échec de la requête:", error);
          return caches.match("/fallback.json");
        });
    })
  );
});

self.addEventListener("push", function (event) {
  const title = "Notification Push";
  const data = event.data ? event.data.text() : "No data";
  const options = {
    body: data,
    icon: "icon.png",
    badge: "badge.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
