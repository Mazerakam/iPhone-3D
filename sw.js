const CACHE_NAME = 'iphone-3d-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/components-data.js',
    '/three-scene.js',
    '/app.js',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});