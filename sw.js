const CACHE_NAME = "tes-github-io-cache-v1";
const urlsToCache = [
    "/tes.github.io/",         // Cache halaman utama
    "/tes.github.io/index.html",
    "/tes.github.io/index.js",
    "/tes.github.io/style.css", // Jika ada file CSS
    "/tes.github.io/images/logo.png" // Jika ada gambar
];

// Install Service Worker dan cache file
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch request untuk menghidupkan mode offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match("/tes.github.io/index.html"); // Default ke halaman utama jika offline
        })
    );
});

// Activate Service Worker dan hapus cache lama jika ada
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
