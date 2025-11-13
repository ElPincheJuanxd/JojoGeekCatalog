// optimized-image-loader.js - VERSIÓN HÍBRIDA INTELIGENTE
class OptimizedImageLoader {
    constructor() {
        this.lazyObserver = null;
        this.loadingQueue = new Set();
        this.maxConcurrentLoads = 2;
        this.currentLoads = 0;
        this.processedImages = new Set();
        this.memoryCache = new Map();
        this.maxMemorySize = 15 * 1024 * 1024; // 15MB en RAM
        this.currentMemorySize = 0;
        this.maxLocalStorageSize = 5 * 1024 * 1024; // 5MB máximo en localStorage
        this.currentLocalStorageSize = 0;
        this.useLocalStorage = true;
        
        this.init();
    }

    init() {
        // 🆕 VERIFICAR INTELIGENTEMENTE EL LOCALSTORAGE
        this.useLocalStorage = this.checkLocalStorageAvailability();
        this.calculateLocalStorageUsage();
        
        console.log(this.useLocalStorage ? 
            '🚀 ImageLoader con persistencia (localStorage disponible)' : 
            '🚀 ImageLoader solo memoria (localStorage lleno/no disponible)'
        );
        
        this.setupOptimizedLazyLoading();
        
        // Configuración para dispositivos lentos
        if (window.performanceDetector && window.performanceDetector.isLowPerformance()) {
            this.maxConcurrentLoads = 1;
            console.log('📱 Modo bajo rendimiento: 1 carga concurrente');
        }
    }

    checkLocalStorageAvailability() {
        try {
            // Test de escritura y lectura
            const testKey = 'cache_test_' + Date.now();
            const testData = { test: true, timestamp: Date.now() };
            
            localStorage.setItem(testKey, JSON.stringify(testData));
            const retrieved = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);
            
            return retrieved && JSON.parse(retrieved).test === true;
        } catch (error) {
            console.warn('⚠️ localStorage no disponible, usando solo memoria');
            return false;
        }
    }

    calculateLocalStorageUsage() {
        if (!this.useLocalStorage) return;
        
        try {
            let totalSize = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('img_')) {
                    const item = localStorage.getItem(key);
                    totalSize += new Blob([item]).size;
                }
            }
            this.currentLocalStorageSize = totalSize;
            console.log(`💾 Uso actual de localStorage: ${(totalSize/1024/1024).toFixed(2)}MB`);
        } catch (error) {
            this.useLocalStorage = false;
        }
    }

    setupOptimizedLazyLoading() {
        this.lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (!this.processedImages.has(img)) {
                        this.queueImageLoad(img);
                        this.lazyObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '100px',
            threshold: 0.01
        });

        this.observeLazyImages();
        
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    queueImageLoad(imgElement) {
        if (this.loadingQueue.has(imgElement) || this.processedImages.has(imgElement)) {
            return;
        }

        if (this.currentLoads >= this.maxConcurrentLoads) {
            this.loadingQueue.add(imgElement);
            return;
        }

        this.loadImage(imgElement);
    }

    async loadImage(imgElement) {
        const originalSrc = imgElement.getAttribute('data-src');
        if (!originalSrc || this.processedImages.has(imgElement)) {
            return;
        }

        this.currentLoads++;
        this.processedImages.add(imgElement);
        
        try {
            // 🎯 ESTRATEGIA DE CACHE EN 3 PASOS:

            // 1. ✅ MEMORIA RAM (siempre primero - más rápido)
            const memoryCached = this.memoryCache.get(originalSrc);
            if (memoryCached) {
                console.log('⚡ MEMORIA:', this.getFileName(originalSrc));
                this.setImageFromBlob(imgElement, memoryCached, true);
                return;
            }

            // 2. ✅ LOCALSTORAGE (si está disponible)
            if (this.useLocalStorage) {
                const storedCached = await this.getStoredCache(originalSrc);
                if (storedCached) {
                    console.log('💾 STORAGE:', this.getFileName(originalSrc));
                    // Mover a memoria RAM para acceso más rápido
                    this.cacheInMemory(originalSrc, storedCached);
                    this.setImageFromBlob(imgElement, storedCached, true);
                    return;
                }
            }

            // 3. ✅ RED (último recurso)
            console.log('🌐 RED:', this.getFileName(originalSrc));
            const blob = await this.loadFromNetwork(originalSrc);
            
            // Guardar en ambos sistemas de cache
            this.cacheInMemory(originalSrc, blob);
            if (this.useLocalStorage) {
                this.cacheInStorage(originalSrc, blob);
            }
            
            this.setImageFromBlob(imgElement, blob, false);
            
        } catch (error) {
            console.warn('❌ Error carga:', this.getFileName(originalSrc), error);
            this.handleImageError(imgElement, originalSrc);
        } finally {
            this.currentLoads--;
            this.processQueue();
        }
    }

    async loadFromNetwork(url) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(url, { 
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.blob();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    async getStoredCache(url) {
        if (!this.useLocalStorage) return null;
        
        try {
            const cacheKey = this.getStorageKey(url);
            const cached = localStorage.getItem(cacheKey);
            if (!cached) return null;

            const cacheData = JSON.parse(cached);
            
            // 🆕 VERIFICAR EXPIRACIÓN (7 días)
            const isExpired = Date.now() - cacheData.timestamp > (7 * 24 * 60 * 60 * 1000);
            if (isExpired) {
                localStorage.removeItem(cacheKey);
                this.currentLocalStorageSize -= cacheData.size || 0;
                return null;
            }

            // Convertir data URL a blob
            const response = await fetch(cacheData.data);
            const blob = await response.blob();
            
            return blob;
        } catch (error) {
            // Si falla, desactivar localStorage para esta sesión
            console.warn('⚠️ Error accediendo localStorage, desactivando...');
            this.useLocalStorage = false;
            return null;
        }
    }

    cacheInMemory(url, blob) {
        // Solo cachear imágenes menores a 500KB en memoria
        if (blob.size > 500000) return;
        
        this.memoryCache.set(url, blob);
        this.currentMemorySize += blob.size;
        
        // Limpiar memoria si excede el límite
        if (this.currentMemorySize > this.maxMemorySize) {
            this.cleanupMemoryCache();
        }
    }

    cacheInStorage(url, blob) {
        if (!this.useLocalStorage || blob.size > 300000) return; // Máximo 300KB en storage
        
        try {
            // 🆕 VERIFICAR ESPACIO DISPONIBLE
            if (this.currentLocalStorageSize + blob.size > this.maxLocalStorageSize) {
                this.cleanupOldStorageCache();
            }
            
            // Si todavía no hay espacio, no cachear
            if (this.currentLocalStorageSize + blob.size > this.maxLocalStorageSize) {
                return;
            }
            
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const cacheKey = this.getStorageKey(url);
                    const cacheData = {
                        data: reader.result,
                        timestamp: Date.now(),
                        size: blob.size,
                        url: url
                    };
                    
                    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                    this.currentLocalStorageSize += blob.size;
                    
                } catch (error) {
                    // Si falla, desactivar localStorage
                    this.useLocalStorage = false;
                    console.warn('⚠️ localStorage lleno, desactivando...');
                }
            };
            reader.readAsDataURL(blob);
            
        } catch (error) {
            this.useLocalStorage = false;
        }
    }

    cleanupMemoryCache() {
        let deletedSize = 0;
        const entries = Array.from(this.memoryCache.entries());
        
        // Eliminar las 5 imágenes más antiguas
        for (let i = 0; i < Math.min(5, entries.length); i++) {
            const [url, blob] = entries[i];
            this.memoryCache.delete(url);
            deletedSize += blob.size;
        }
        
        this.currentMemorySize -= deletedSize;
        console.log(`🧹 Memoria: liberados ${(deletedSize/1024/1024).toFixed(2)}MB`);
    }

    cleanupOldStorageCache() {
        if (!this.useLocalStorage) return;
        
        try {
            const cacheEntries = [];
            
            // Recolectar todas las entradas de cache
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('img_')) {
                    try {
                        const item = localStorage.getItem(key);
                        const cacheData = JSON.parse(item);
                        cacheEntries.push({
                            key: key,
                            timestamp: cacheData.timestamp,
                            size: cacheData.size || 0
                        });
                    } catch (e) {
                        // Entrada corrupta, eliminar
                        localStorage.removeItem(key);
                    }
                }
            }
            
            // Ordenar por antigüedad (más viejas primero)
            cacheEntries.sort((a, b) => a.timestamp - b.timestamp);
            
            // Eliminar las 10 más antiguas
            let deletedSize = 0;
            for (let i = 0; i < Math.min(10, cacheEntries.length); i++) {
                const entry = cacheEntries[i];
                localStorage.removeItem(entry.key);
                deletedSize += entry.size;
                this.currentLocalStorageSize -= entry.size;
            }
            
            if (deletedSize > 0) {
                console.log(`🗑️ Storage: liberados ${(deletedSize/1024/1024).toFixed(2)}MB`);
            }
            
        } catch (error) {
            this.useLocalStorage = false;
        }
    }

    setImageFromBlob(imgElement, blob, fromCache) {
        const blobUrl = URL.createObjectURL(blob);
        
        imgElement.onload = () => {
            URL.revokeObjectURL(blobUrl);
            imgElement.classList.remove('lazy');
            imgElement.classList.add('loaded');
        };

        imgElement.onerror = () => {
            URL.revokeObjectURL(blobUrl);
            this.handleImageError(imgElement, imgElement.getAttribute('data-src'));
        };

        imgElement.src = blobUrl;
    }

    handleImageError(imgElement, originalSrc) {
        console.warn('🔄 Usando placeholder para:', this.getFileName(originalSrc));
        
        if (originalSrc.includes('../')) {
            imgElement.src = '../assets/images/placeholder.jpg';
        } else {
            imgElement.src = './assets/images/placeholder.jpg';
        }
        
        imgElement.classList.remove('lazy');
        imgElement.classList.add('loaded');
    }

    processQueue() {
        if (this.loadingQueue.size === 0 || this.currentLoads >= this.maxConcurrentLoads) {
            return;
        }

        const nextImage = Array.from(this.loadingQueue.values())[0];
        this.loadingQueue.delete(nextImage);
        this.loadImage(nextImage);
    }

    observeLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src].lazy');
        console.log(`👀 Observando ${lazyImages.length} imágenes`);
        
        // Cargar primeras 2 imágenes inmediatamente
        lazyImages.forEach((img, index) => {
            if (index < 2) {
                this.queueImageLoad(img);
            } else {
                this.lazyObserver.observe(img);
            }
        });
    }

    getStorageKey(url) {
        return 'img_' + this.simpleHash(url);
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }

    getFileName(url) {
        return url.split('/').pop() || 'unknown';
    }

    // 🆕 MÉTODOS DE DIAGNÓSTICO
    getCacheStats() {
        return {
            memory: {
                count: this.memoryCache.size,
                size: (this.currentMemorySize / 1024 / 1024).toFixed(2) + ' MB'
            },
            storage: {
                enabled: this.useLocalStorage,
                size: (this.currentLocalStorageSize / 1024 / 1024).toFixed(2) + ' MB',
                maxSize: (this.maxLocalStorageSize / 1024 / 1024).toFixed(2) + ' MB'
            },
            processed: this.processedImages.size
        };
    }

    cleanup() {
        if (this.lazyObserver) {
            this.lazyObserver.disconnect();
        }
        this.loadingQueue.clear();
        this.memoryCache.clear();
        
        document.querySelectorAll('img[src^="blob:"]').forEach(img => {
            try {
                URL.revokeObjectURL(img.src);
            } catch (e) {
                // Ignorar errores
            }
        });
    }
}

// Inicializar
window.optimizedImageLoader = new OptimizedImageLoader();

// 🆕 AGREGAR FUNCIONES DE DIAGNÓSTICO AL GLOBAL
window.getImageCacheStats = () => {
    if (window.optimizedImageLoader) {
        return window.optimizedImageLoader.getCacheStats();
    }
    return { error: 'ImageLoader no disponible' };
};

window.clearImageCache = () => {
    if (window.optimizedImageLoader) {
        window.optimizedImageLoader.cleanup();
        console.log('🧹 Cache de imágenes limpiado');
    }
};