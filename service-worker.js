const CACHE_NAME = "noor-muslim-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./icon-192-1.png",
  "./icon-512-1.png"
];

/* =====================================================
   تثبيت Service Worker
   ===================================================== */

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME).then((cache) => {

      return cache.addAll(FILES_TO_CACHE);

    })

  );

  self.skipWaiting();

});


/* =====================================================
   تفعيل النسخة الجديدة وحذف الكاش القديم
   ===================================================== */

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((cacheNames) => {

      return Promise.all(

        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))

      );

    })

  );

  self.clients.claim();

});


/* =====================================================
   تحميل الملفات
   ===================================================== */

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request).then((cachedResponse) => {

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {

          if (
            networkResponse &&
            networkResponse.status === 200
          ) {

            const responseClone =
              networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {

              cache.put(
                event.request,
                responseClone
              );

            });

          }

          return networkResponse;

        })
        .catch(() => {

          return caches.match("./index.html");

        });

    })

  );

});
