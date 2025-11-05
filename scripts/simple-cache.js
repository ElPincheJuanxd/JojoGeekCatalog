// 🚀 SISTEMA DE CACHE SIMPLE Y EFECTIVO
class SimpleImageCache {
    constructor() {
        this.memoryCache = new Map();
        this.maxMemorySize = 50 * 1024 * 1024;
        this.currentMemorySize = 0;
        this.init();
    }

    init() {
        console.log('🚀 Iniciando SimpleImageCache');
        this.loadPersistentCache();
    }

    async cacheImage(url, blob) {
        try {
            this.memoryCache.set(url, blob);
            this.currentMemorySize += blob.size;
            await this.saveToPersistentCache(url, blob);
            console.log(`💾 Cache: ${this.getFileName(url)} (${(blob.size/1024).toFixed(1)}KB)`);
            this.cleanupMemory();
        } catch (error) {
            console.warn('⚠️ Error en cache:', error);
        }
    }

    async getCachedImage(url) {
        if (this.memoryCache.has(url)) {
            console.log('📸 MEMORIA:', this.getFileName(url));
            return this.memoryCache.get(url);
        }

        const persistent = await this.getFromPersistentCache(url);
        if (persistent) {
            console.log('📸 PERSISTENTE:', this.getFileName(url));
            this.memoryCache.set(url, persistent);
            return persistent;
        }

        return null;
    }

    async saveToPersistentCache(url, blob) {
        return new Promise((resolve) => {
            try {
                const reader = new FileReader();
                reader.onload = () => {
                    const cacheKey = `img_${this.hashUrl(url)}`;
                    const cacheData = {
                        data: reader.result,
                        timestamp: Date.now(),
                        size: blob.size,
                        url: url
                    };
                    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                    resolve(true);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                resolve(false);
            }
        });
    }

    async getFromPersistentCache(url) {
        return new Promise((resolve) => {
            try {
                const cacheKey = `img_${this.hashUrl(url)}`;
                const cached = localStorage.getItem(cacheKey);
                if (!cached) {
                    resolve(null);
                    return;
                }
                const cacheData = JSON.parse(cached);
                const isExpired = Date.now() - cacheData.timestamp > (30 * 24 * 60 * 60 * 1000);
                if (isExpired) {
                    localStorage.removeItem(cacheKey);
                    resolve(null);
                    return;
                }
                fetch(cacheData.data)
                    .then(res => res.blob())
                    .then(blob => resolve(blob))
                    .catch(() => resolve(null));
            } catch (error) {
                resolve(null);
            }
        });
    }

    cleanupMemory() {
        if (this.currentMemorySize <= this.maxMemorySize) return;
        let deletedSize = 0;
        const entries = Array.from(this.memoryCache.entries());
        for (let i = 0; i < Math.floor(entries.length / 3); i++) {
            const [url, blob] = entries[i];
            this.memoryCache.delete(url);
            deletedSize += blob.size;
        }
        this.currentMemorySize -= deletedSize;
        console.log(`🗑️ Limpiados ${(deletedSize/1024/1024).toFixed(2)}MB`);
    }

    async loadPersistentCache() {
        console.log('📂 Cargando cache persistente...');
        let loadedCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('img_')) {
                try {
                    const cached = localStorage.getItem(key);
                    const cacheData = JSON.parse(cached);
                    if (cacheData && cacheData.url) {
                        fetch(cacheData.data)
                            .then(res => res.blob())
                            .then(blob => {
                                this.memoryCache.set(cacheData.url, blob);
                                this.currentMemorySize += blob.size;
                                loadedCount++;
                            });
                    }
                } catch (error) {}
            }
        }
        console.log(`✅ ${loadedCount} imágenes precargadas`);
    }

    clearAllCache() {
        this.memoryCache.clear();
        this.currentMemorySize = 0;
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith('img_')) {
                localStorage.removeItem(key);
            }
        }
        console.log('✅ Todo el cache limpiado');
    }

    getStats() {
        let persistentCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).startsWith('img_')) persistentCount++;
        }
        return {
            memory: {
                count: this.memoryCache.size,
                size: (this.currentMemorySize / 1024 / 1024).toFixed(2) + ' MB'
            },
            persistent: {
                count: persistentCount
            },
            total: this.memoryCache.size + persistentCount
        };
    }

    hashUrl(url) {
        return btoa(url).replace(/[^a-zA-Z0-9]/g, '');
    }

    getFileName(url) {
        return url.split('/').pop() || 'unknown';
    }
}

window.simpleImageCache = new SimpleImageCache();