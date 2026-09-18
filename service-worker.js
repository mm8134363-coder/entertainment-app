const CACHE_NAME = "noor-al-muslim-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./icon.svg",
  "./icon-192-1.png",
  "./icon-512-1.png",

  "./quran.json"
];


/* =========================================================
   تثبيت التطبيق وتخزين الملفات
   ========================================================= */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(
          FILES_TO_CACHE
        );

      })
      .then(() => {

        return self.skipWaiting();

      })

  );

});


/* =========================================================
   تفعيل النسخة الجديدة وحذف الكاش القديم
   ========================================================= */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames
            .filter(name => {

              return name !== CACHE_NAME;

            })
            .map(name => {

              return caches.delete(name);

            })

        );

      })
      .then(() => {

        return self.clients.claim();

      })

  );

});


/* =========================================================
   تشغيل التطبيق بدون إنترنت
   ========================================================= */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request)
      .then(cachedResponse => {

        if (cachedResponse) {

          return cachedResponse;

        }

        return fetch(event.request)
          .then(networkResponse => {

            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {

              return networkResponse;

            }

            const responseToCache =
              networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {

                cache.put(
                  event.request,
                  responseToCache
                );

              });

            return networkResponse;

          })
          .catch(() => {

            return caches.match(
              "./index.html"
            );

          });

      })

  );

});


/* =========================================================
   استقبال رسالة لتحديث التطبيق
   ========================================================= */

self.addEventListener("message", event => {

  if (
    event.data &&
    event.data.type === "SKIP_WAITING"
  ) {

    self.skipWaiting();

  }

});


/* =========================================================
   إشعارات التطبيق
   ========================================================= */

self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();

    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(clientList => {

        for (const client of clientList) {

          if (
            "focus" in client
          ) {

            return client.focus();

          }

        }

        if (
          clients.openWindow
        ) {

          return clients.openWindow(
            "./"
          );

        }

      })

    );

  }
);
