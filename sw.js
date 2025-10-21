// sw.js - SERVICE WORKER DEFINITIVO para rutas relativas y absolutas
const CACHE_VERSION = '2.1';
const CACHE_NAME = `jojo-cache-${CACHE_VERSION}`;
const IMAGE_CACHE = `jojo-images-${CACHE_VERSION}`;

// Precaché con rutas ABSOLUTAS
const PRECACHE_IMAGES = [
    '/assets/images/placeholder.jpg'
];

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
                    if (cacheName.startsWith('jojo-') && cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 🆕 FUNCIÓN PARA CONVERTIR RUTAS RELATIVAS A ABSOLUTAS
function normalizeImageUrl(request) {
    const requestUrl = request.url;
    const baseUrl = self.location.origin;
    
    // Si ya es una URL absoluta (empieza con http o /), dejarla tal cual
    if (requestUrl.startsWith('http') || requestUrl.startsWith('/')) {
        return request;
    }
    
    // Si es ruta relativa (./assets/...), convertir a absoluta
    if (requestUrl.includes('./assets/')) {
        // Extraer la parte después de ./
        const relativePath = requestUrl.split('./')[1];
        const absoluteUrl = baseUrl + '/' + relativePath;
        
        console.log('🔄 Normalizando ruta:', requestUrl, '→', absoluteUrl);
        return new Request(absoluteUrl);
    }
    
    // Para otros casos, devolver la request original
    return request;
}

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Solo manejar imágenes
    const isImage = url.pathname.match(/\.(jpg|jpeg|png|webp|gif)$/i) || 
                   request.url.match(/\.(jpg|jpeg|png|webp|gif)$/i);
    
    if (!isImage) return;
    
    // 🆕 NORMALIZAR la URL (convertir rutas relativas a absolutas)
    const normalizedRequest = normalizeImageUrl(request);
    
    console.log('🖼️ Procesando imagen:', normalizedRequest.url);
    event.respondWith(handleImageRequest(normalizedRequest));
});

async function handleImageRequest(request) {
    const cache = await caches.open(IMAGE_CACHE);
    
    try {
        // 1. PRIMERO buscar en cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            console.log('📸 Sirviendo del cache:', getFileName(request.url));
            return cachedResponse;
        }

        // 2. SI NO ESTÁ EN CACHE, cargar de net
        console.log('🌐 Cargando de red:', getFileName(request.url));
        const networkResponse = await fetch(request);
        
        if (networkResponse.status === 200) {
            // 3. GUARDAR en cache para futuras peticiones
            const responseToCache = networkResponse.clone();
            cache.put(request, responseToCache)
                .then(() => {
                    console.log('💾 Guardado en cache:', getFileName(request.url));
                });
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('❌ Error cargando imagen:', getFileName(request.url), error);
        
        // 4. FALLBACK: placeholder
        try {
            const placeholder = await caches.match('/assets/images/placeholder.jpg');
            if (placeholder) {
                console.log('🔄 Sirviendo placeholder para:', getFileName(request.url));
                return placeholder;
            }
        } catch (fallbackError) {
            console.error('❌ Fallback también falló:', fallbackError);
        }
        
        return new Response('Image not available', { 
            status: 404,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

function getFileName(url) {
    return url.split('/').pop() || 'unknown';
}

// Manejar mensajes para actualizaciones
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});