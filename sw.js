// sw.js - Service Worker para Cache Permanente + Compresión
const CACHE_VERSION = '1.0';
const CACHE_NAME = `jojo-cache-${CACHE_VERSION}`;
const IMAGE_CACHE = `jojo-images-${CACHE_VERSION}`;

// Precaché de imágenes críticas
const PRECACHE_IMAGES = [
  './assets/images/placeholder.jpg',
  './assets/images/logo.webp'
];

// Estrategias de compresión por tipo de imagen
const COMPRESSION_PROFILES = {
  'poster': { width: 400, height: 600, quality: 0.5, format: 'webp' },
  'news': { width: 600, height: 400, quality: 0.6, format: 'webp' },
  'avatar': { width: 80, height: 80, quality: 0.7, format: 'webp' },
  'default': { width: 800, height: 600, quality: 0.6, format: 'webp' }
};

self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker instalándose...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_IMAGES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('🔥 Service Worker activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheName.startsWith('jojo-') || 
              (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE)) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Solo manejar imágenes de nuestros assets
  if (!url.pathname.match(/\.(jpg|jpeg|png|webp|gif)$/i) || 
      !url.pathname.includes('/assets/')) {
    return;
  }

  event.respondWith(
    handleImageRequest(event.request)
  );
});

async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('📸 Sirviendo del cache:', getFileName(request.url));
    return cachedResponse;
  }

  try {
    // Cargar de red
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      // Clonar la respuesta para cachear
      const responseToCache = networkResponse.clone();
      
      // Guardar en cache (sin comprimir para mantener calidad)
      cache.put(request, responseToCache);
      console.log('💾 Guardado en cache:', getFileName(request.url));
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Error cargando imagen:', getFileName(request.url), error);
    // Fallback a placeholder
    const placeholder = await caches.match('./assets/images/placeholder.jpg');
    return placeholder || new Response('Image error', { status: 404 });
  }
}

function getFileName(url) {
  return url.split('/').pop();
}