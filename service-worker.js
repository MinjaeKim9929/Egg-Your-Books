const CACHE_NAME = 'egg-books-v1';
const FILES_TO_CACHE = [
	'/Egg-Your-Books/',
	'/Egg-Your-Books/index.html',
	'/Egg-Your-Books/signin.html',
	'/Egg-Your-Books/signup.html',
	'/Egg-Your-Books/style.css',
	'/Egg-Your-Books/app.js',
	'/Egg-Your-Books/manifest.json',
	'/Egg-Your-Books/assets/icons/egg-128.png',
	'/Egg-Your-Books/assets/icons/egg-512.png',
	'/Egg-Your-Books/assets/icons/fried-egg-128.png',
	'/Egg-Your-Books/assets/icons/fried-egg-512.png',
];
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('Opened cache');
			// Instead of cache.addAll, use Promise.all with fetch requests
			return Promise.all(
				FILES_TO_CACHE.map((url) => {
					return fetch(url)
						.then((response) => {
							if (!response.ok) {
								throw new Error(`Failed to fetch ${url}`);
							}
							return cache.put(url, response);
						})
						.catch((error) => {
							console.error(`Failed to cache ${url}:`, error);
							// Continue with other resources even if one fails
							return Promise.resolve();
						});
				})
			);
		})
	);
});
// Activation
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// Fetch
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Cache hit - return response
			if (response) {
				return response;
			}

			// Clone the request because it's a stream and can only be consumed once
			const fetchRequest = event.request.clone();

			return fetch(fetchRequest)
				.then((response) => {
					// Check if we received a valid response
					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}

					// Clone the response because it's a stream and can only be consumed once
					const responseToCache = response.clone();

					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseToCache);
					});

					return response;
				})
				.catch(() => {
					// If fetch fails, return a fallback response if available
					return caches.match('/Egg-Your-Books/index.html');
				});
		})
	);
});
