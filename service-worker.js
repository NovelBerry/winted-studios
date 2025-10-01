const CACHE_NAME = 'winted-studio-v1';
const urlsToCache = [
  'Winted_Studio.html',
  'manifest.json',
   
];

// Evento de Instalación: Carga los archivos necesarios en el caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Sirve los recursos desde el caché (primero)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso si está en caché, si no, va a la red
        return response || fetch(event.request);
      })
  );
});
