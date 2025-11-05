// 🚀 CARGADOR OPTIMIZADO CON CACHE SIMPLE
class OptimizedImageLoader {
    constructor() {
        this.lazyObserver = null;
        this.init();
    }

    init() {
        console.log('🚀 Iniciando OptimizedImageLoader');
        this.setupLazyLoading();
    }

    async loadImage(imgElement) {
        const originalSrc = imgElement.getAttribute('data-src') || imgElement.src;
        if (!originalSrc) return;

        try {
            const cachedBlob = await window.simpleImageCache.getCachedImage(originalSrc);
            if (cachedBlob) {
                const cachedUrl = URL.createObjectURL(cachedBlob);
                this.setImageSource(imgElement, cachedUrl, true);
                return;
            }

            console.log('🌐 Red:', this.getFileName(originalSrc));
            const response = await fetch(originalSrc);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const blob = await response.blob();
            window.simpleImageCache.cacheImage(originalSrc, blob);
            
            const blobUrl = URL.createObjectURL(blob);
            this.setImageSource(imgElement, blobUrl, false);
            
        } catch (error) {
            console.error('❌ Error:', this.getFileName(originalSrc), error);
            this.handleImageError(imgElement, originalSrc);
        }
    }

    setImageSource(imgElement, src, fromCache) {
        imgElement.src = src;
        imgElement.onload = () => {
            imgElement.classList.remove('lazy');
            imgElement.classList.add('loaded');
            if (fromCache) imgElement.classList.add('cached');
            console.log(`✅ ${this.getFileName(src)} ${fromCache ? '(cache)' : ''}`);
        };
    }

    handleImageError(imgElement, originalSrc) {
        console.warn('🔄 Placeholder:', this.getFileName(originalSrc));
        imgElement.src = '/assets/images/placeholder.jpg';
        imgElement.classList.remove('lazy');
        imgElement.classList.add('loaded');
    }

    setupLazyLoading() {
        this.lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.lazyObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px',
            threshold: 0.01
        });

        document.addEventListener('DOMContentLoaded', () => {
            this.observeLazyImages();
        });

        new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const lazyImages = node.querySelectorAll ? 
                            node.querySelectorAll('img[data-src].lazy') : [];
                        lazyImages.forEach(img => this.lazyObserver.observe(img));
                    }
                });
            });
        }).observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    observeLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src].lazy');
        console.log(`👀 Observando ${lazyImages.length} imágenes`);
        lazyImages.forEach(img => this.lazyObserver.observe(img));
    }

    getFileName(url) {
        return url.split('/').pop() || 'unknown';
    }
}

window.optimizedImageLoader = new OptimizedImageLoader();