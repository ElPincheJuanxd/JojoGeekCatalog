// 🖼️ SISTEMA DE COMPRESIÓN AGRESIVA MEJORADO
class ImageOptimizer {
    constructor() {
        this.supportedFormats = ['webp', 'jpeg'];
        this.maxWidth = 800;
        this.maxHeight = 1200;
        this.optimizationEnabled = true;
        this.compressionCache = new Map();
    }

    // Detectar tipo de imagen y aplicar perfil de compresión
    getCompressionProfile(imgSrc) {
        if (imgSrc.includes('poster') || imgSrc.includes('/posters/')) {
            return { width: 400, height: 600, quality: 0.4, format: 'webp' };
        }
        if (imgSrc.includes('news') || imgSrc.includes('/noticias/')) {
            return { width: 600, height: 400, quality: 0.5, format: 'webp' };
        }
        if (imgSrc.includes('avatar') || imgSrc.includes('/avatars/')) {
            return { width: 80, height: 80, quality: 0.6, format: 'webp' };
        }
        // Perfil por defecto (más agresivo)
        return { width: 400, height: 600, quality: 0.4, format: 'webp' };
    }

    // Compresión agresiva con WebP
    async compressImage(imageElement, originalSrc) {
        if (!this.optimizationEnabled) {
            return { success: true, dataUrl: originalSrc, optimized: false };
        }

        // Verificar cache de compresión
        const cacheKey = `${originalSrc}_compressed`;
        if (this.compressionCache.has(cacheKey)) {
            return { 
                success: true, 
                dataUrl: this.compressionCache.get(cacheKey), 
                optimized: true,
                cached: true 
            };
        }

        try {
            const profile = this.getCompressionProfile(originalSrc);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calcular tamaño manteniendo aspect ratio
            const { width, height } = this.calculateSize(
                imageElement.naturalWidth, 
                imageElement.naturalHeight,
                profile.width,
                profile.height
            );
            
            canvas.width = width;
            canvas.height = height;
            
            // Aplicar filtros de compresión agresiva
            ctx.drawImage(imageElement, 0, 0, width, height);
            
            // Intentar WebP primero, luego JPEG como fallback
            let dataUrl;
            let formatUsed = profile.format;
            
            try {
                dataUrl = canvas.toDataURL(`image/webp`, profile.quality);
            } catch (error) {
                console.warn('WebP no soportado, usando JPEG:', error);
                dataUrl = canvas.toDataURL('image/jpeg', profile.quality * 0.9); // JPEG más comprimido
                formatUsed = 'jpeg';
            }
            
            // Guardar en cache de compresión
            this.compressionCache.set(cacheKey, dataUrl);
            
            const originalSize = this.getImageSize(originalSrc);
            const optimizedSize = this.estimateSize(dataUrl);
            const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
            
            console.log(`📊 Compresión: ${savings}% ahorro (${originalSize}KB → ${optimizedSize}KB)`);
            
            return {
                success: true,
                dataUrl: dataUrl,
                format: formatUsed,
                width: width,
                height: height,
                optimized: true,
                originalSize: originalSize,
                optimizedSize: optimizedSize,
                savings: savings
            };
            
        } catch (error) {
            console.warn('❌ Error en compresión, usando original:', error);
            return { 
                success: false, 
                dataUrl: originalSrc, 
                optimized: false,
                error: error.message 
            };
        }
    }

    calculateSize(originalWidth, originalHeight, maxWidth, maxHeight) {
        let width = originalWidth;
        let height = originalHeight;
        
        if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
        }
        
        if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
        }
        
        return { 
            width: Math.round(width), 
            height: Math.round(height) 
        };
    }

    getImageSize(src) {
        // Estimación basada en tipo de archivo y dimensiones típicas
        if (src.includes('poster')) return 300; // KB
        if (src.includes('news')) return 200;   // KB
        return 150; // KB por defecto
    }

    estimateSize(dataUrl) {
        // Calcular tamaño aproximado de data URL (KB)
        return Math.round((dataUrl.length * 0.75) / 1024);
    }

    // Limpiar cache de compresión
    clearCompressionCache() {
        this.compressionCache.clear();
        console.log('🗑️ Cache de compresión limpiado');
    }

    // Estadísticas
    getStats() {
        return {
            totalCompressed: this.compressionCache.size,
            enabled: this.optimizationEnabled,
            cacheSize: this.compressionCache.size
        };
    }
}

// 🖼️ MANAGER PRINCIPAL OPTIMIZADO
class OptimizedImageManager {
    constructor() {
        this.optimizer = new ImageOptimizer();
        this.originalCache = new Map(); // Cache de imágenes originales
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando ImageManager con compresión agresiva...');
        this.setupImageObserver();
    }

    setupImageObserver() {
        // Observer para nuevas imágenes agregadas al DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const images = node.querySelectorAll ? 
                            node.querySelectorAll('img[data-src]:not(.optimized)') : [];
                        images.forEach(img => this.precacheAndCompress(img));
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    async precacheAndCompress(img) {
        try {
            const src = img.getAttribute('data-src');
            
            if (this.originalCache.has(src)) {
                return; // Ya está procesada
            }
            
            const tempImg = new Image();
            tempImg.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
                tempImg.onload = resolve;
                tempImg.onerror = reject;
                tempImg.src = src;
            });
            
            // Comprimir agresivamente
            const result = await this.optimizer.compressImage(tempImg, src);
            
            if (result.success && result.optimized) {
                this.originalCache.set(src, result.dataUrl);
                console.log(`⚡ Precached y comprimido: ${src.split('/').pop()} (${result.savings}% ahorro)`);
            }
            
        } catch (error) {
            console.warn('❌ Error precacheando imagen:', error);
        }
    }

    // Obtener versión optimizada
    getOptimizedVersion(originalSrc) {
        return this.originalCache.get(originalSrc);
    }

    // Cargar imagen con compresión
    async loadWithCompression(imgElement) {
        const originalSrc = imgElement.getAttribute('data-src');
        
        try {
            // Verificar si ya tenemos versión comprimida
            const optimized = this.getOptimizedVersion(originalSrc);
            
            if (optimized) {
                imgElement.src = optimized;
                imgElement.classList.remove('lazy');
                imgElement.classList.add('loaded', 'optimized');
                return;
            }
            
            // Cargar y comprimir on-demand
            const tempImg = new Image();
            tempImg.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
                tempImg.onload = resolve;
                tempImg.onerror = reject;
                tempImg.src = originalSrc;
            });
            
            const result = await this.optimizer.compressImage(tempImg, originalSrc);
            
            if (result.success) {
                imgElement.src = result.dataUrl;
                imgElement.classList.remove('lazy');
                imgElement.classList.add('loaded', 'optimized');
                
                if (result.optimized) {
                    console.log(`🎯 Compresión aplicada: ${originalSrc.split('/').pop()}`);
                }
            }
            
        } catch (error) {
            console.warn('❌ Error cargando imagen comprimida, usando original:', error);
            imgElement.src = originalSrc;
        }
    }

    // Estadísticas
    getStats() {
        const optimizerStats = this.optimizer.getStats();
        return {
            ...optimizerStats,
            originalCacheSize: this.originalCache.size
        };
    }
}

// 🌍 INICIALIZACIÓN GLOBAL
if (typeof window !== 'undefined') {
    window.optimizedImageManager = new OptimizedImageManager();
    console.log('🖼️ Sistema de compresión agresiva cargado');
    
    // Debug helpers
    window.getCompressionStats = () => window.optimizedImageManager.getStats();
    window.clearCompressionCache = () => window.optimizedImageManager.optimizer.clearCompressionCache();
}