const CACHE_NAME = 'egg-books-cache-v1';
const FILES_TO_CACHE = [
	'/Egg-Your-Books/',
	'/Egg-Your-Books/index.html',
	'/Egg-Your-Books/signin.html',
	'/Egg-Your-Books/signup.html',
	'/Egg-Your-Books/style.css',
	'/Egg-Your-Books/app.js',
	'/Egg-Your-Books/assets/icons/egg-128.png',
	'/Egg-Your-Books/assets/icons/egg-512.png',
	'/Egg-Your-Books/assets/icons/fried-egg-128.png',
	'/Egg-Your-Books/assets/icons/fried-egg-512.png',
	'/Egg-Your-Books/manifest.json',
];

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));
});

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
