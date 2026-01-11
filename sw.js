// Yespañol Service Worker - Full offline capability
// Bump version to force cache refresh
const CACHE_NAME = 'yespanol-v9';
const STATIC_CACHE = 'yespanol-static-v9';
const DYNAMIC_CACHE = 'yespanol-dynamic-v9';

// Core files that must be cached
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/progress.html',
    '/settings.html',
    '/mensaje.html',
    '/manifest.json',
    // Styles
    '/css/design-system.css',
    // JavaScript
    '/js/core.js',
    '/js/ui.js',
    '/js/ui-premium.js',
    '/js/story.js',
    '/js/loading.js',
    '/js/content.js',
    // Grammar pages
    '/grammar/ser-estar.html',
    '/grammar/por-para.html',
    '/grammar/subjunctive.html',
    '/grammar/preterite-imperfect.html',
    // Vocabulary pages
    '/vocabulary/everyday.html',
    '/vocabulary/idioms.html',
    '/vocabulary/false-friends.html',
    '/vocabulary/travel.html',
    '/vocabulary/slang.html',
    // Practice pages
    '/practice/flashcards.html',
    '/practice/quiz.html',
];

// Install - cache all static assets
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch(err => console.error('[SW] Cache failed:', err))
    );
});

// Activate - clean old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch strategy: Cache First, then Network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Serve from cache immediately
                    // Also fetch fresh version in background
                    fetchAndCache(event.request);
                    return cachedResponse;
                }

                // Not in cache - fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // Cache the new response
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => cache.put(event.request, responseClone));

                        return response;
                    })
                    .catch(() => {
                        // Network failed - serve offline page if it's a navigation
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        return new Response('Offline', { status: 503, statusText: 'Offline' });
                    });
            })
    );
});

// Background fetch and cache update
function fetchAndCache(request) {
    fetch(request)
        .then(response => {
            if (response && response.status === 200) {
                caches.open(DYNAMIC_CACHE)
                    .then(cache => cache.put(request, response));
            }
        })
        .catch(() => {}); // Silently fail
}

// Handle messages from main thread
self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
