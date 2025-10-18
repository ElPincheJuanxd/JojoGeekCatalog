// 🖼️ SISTEMA DE OPTIMIZACIÓN DE IMÁGENES MEJORADO
class ImageOptimizer {
    constructor() {
        this.supportedFormats = ['webp', 'jpeg'];
        this.quality = 0.8; // 80% calidad
        this.maxWidth = 800;
        this.maxHeight = 1200;
        this.optimizationEnabled = true;
    }

    // Verificar soporte de formatos
    async checkBrowserSupport() {
        return {
            webp: await this.testFormat('webp'),
            avif: await this.testFormat('avif'),
            bestFormat: 'webp' // Por defecto usar WebP
        };
    }

    // Testear formato
    testFormat(format) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => resolve(img.height === 2);
            img.src = `data:image/${format};base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==`;
        });
    }

    // Optimizar imagen
    async optimizeImage(imageElement, format = 'webp') {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calcular tamaño manteniendo aspect ratio
            const { width, height } = this.calculateSize(
                imageElement.naturalWidth, 
                imageElement.naturalHeight
            );
            
            canvas.width = width;
            canvas.height = height;
            
            // Dibujar imagen redimensionada
            ctx.drawImage(imageElement, 0, 0, width, height);
            
            // Intentar formato optimizado
            let dataUrl;
            try {
                dataUrl = canvas.toDataURL(`image/${format}`, this.quality);
            } catch (error) {
                // Fallback a JPEG
                dataUrl = canvas.toDataURL('image/jpeg', this.quality);
            }
            
            return {
                success: true,
                dataUrl: dataUrl,
                format: dataUrl.includes('webp') ? 'webp' : 'jpeg',
                width: width,
                height: height
            };
            
        } catch (error) {
            console.warn('❌ Error en optimización:', error);
            return { success: false, error: error.message };
        }
    }

    // Calcular tamaño optimizado
    calculateSize(originalWidth, originalHeight) {
        let width = originalWidth;
        let height = originalHeight;
        
        if (width > this.maxWidth) {
            height = (height * this.maxWidth) / width;
            width = this.maxWidth;
        }
        
        if (height > this.maxHeight) {
            width = (width * this.maxHeight) / height;
            height = this.maxHeight;
        }
        
        return { 
            width: Math.round(width), 
            height: Math.round(height) 
        };
    }
}

// 🖼️ MANAGER PRINCIPAL DE OPTIMIZACIÓN
class OptimizedImageManager {
    constructor() {
        this.optimizer = new ImageOptimizer();
        this.optimizedCache = new Map();
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando OptimizedImageManager...');
        
        // Esperar a que la página cargue completamente
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupOptimization());
        } else {
            this.setupOptimization();
        }
    }

    async setupOptimization() {
        try {
            const support = await this.optimizer.checkBrowserSupport();
            console.log(`🎯 Soporte del navegador - WebP: ${support.webp}, AVIF: ${support.avif}`);
            console.log(`🎯 Usando formato: ${support.bestFormat}`);
            
            // Configurar observer para nuevas imágenes
            this.setupImageObserver();
            
        } catch (error) {
            console.error('❌ Error inicializando optimizador:', error);
        }
    }

    setupImageObserver() {
        // Observer para detectar nuevas imágenes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const images = node.querySelectorAll ? 
                            node.querySelectorAll('img[data-src]:not(.optimized)') : [];
                        images.forEach(img => this.precacheImage(img));
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Precargar y optimizar imagen
    async precacheImage(img) {
        try {
            const src = img.getAttribute('data-src');
            
            if (this.optimizedCache.has(src)) {
                return; // Ya está optimizada
            }
            
            const tempImg = new Image();
            tempImg.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
                tempImg.onload = resolve;
                tempImg.onerror = reject;
                tempImg.src = src;
            });
            
            const result = await this.optimizer.optimizeImage(tempImg, 'webp');
            
            if (result.success) {
                this.optimizedCache.set(src, result.dataUrl);
                console.log(`⚡ Precached optimizado: ${src.split('/').pop()}`);
            }
            
        } catch (error) {
            console.warn('❌ Error precacheando imagen:', error);
        }
    }

    // Obtener versión optimizada
    getOptimizedVersion(originalSrc) {
        return this.optimizedCache.get(originalSrc);
    }

    // Estadísticas del cache
    getStats() {
        return {
            totalOptimized: this.optimizedCache.size,
            enabled: this.optimizer.optimizationEnabled
        };
    }
}

// 🖼️ INICIALIZACIÓN GLOBAL
if (typeof window !== 'undefined') {
    window.optimizedImageManager = new OptimizedImageManager();
    
    // Exportar para uso global
    window.ImageOptimizer = ImageOptimizer;
    window.OptimizedImageManager = OptimizedImageManager;
    
    console.log('🖼️ Sistema de optimización de imágenes cargado');
}