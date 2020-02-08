//Milan Hirani

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js13kPWA/sw.js');
};

//caching the files
var cacheName = 'js13kPWA-v1';
var appShellFiles = [
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/',
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/app.js',
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/courses.js',
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/Css.css',
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/Images/Logo.png',
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/Images/piano.png',
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/Images/maths.png',
    'F:/Uni Year 3/App Development/Coursework 2/Coursework 2 code/js13kPWA/Images/english.png',
];

//installing the service worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

//fetching the content with the service worker
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

// updating the app

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('js13kPWA-v2').then((cache) => {
            return cache.addAll(contentToCache);
        })
    );
});

// clearing the cache
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});