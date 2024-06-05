const CACHE_NAME = "cache";
self.addEventListener("fetch", function (event) {
  if (event.request.url.startsWith("chrome-extension")) {
    console.warn("Chrome extension request blocked", event.request.url);
    return;
  }
  event.respondWith(
    caches.open("my-cache").then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return (
          response ||
          fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
}),
  self.addEventListener("install", function (e) {
    self.skipWaiting(),
      e.waitUntil(
        (async () => {
          const cache = await caches.open(CACHE_NAME);
          await cache.addAll([
            "/offline.html",
            "/movies/offline.html",
            "/movie/offline.html",
            "/tv/offline.html",
            "/tv-shows/offline.html",
            "/search/offline.html",
          ]);
        })()
      ),
      console.log("Latest version installed!");
  }),
  self.addEventListener("push", function (event) {
    const data = event.data.json();
    const title = data.title || "Notification";
    const options = {
      body: data.body,
      icon: data.icon || "/images/icon.png", // chemin vers une icône
      badge: data.badge || "/images/badge.png", // chemin vers une badge
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });
