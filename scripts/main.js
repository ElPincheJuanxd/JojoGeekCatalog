// DIAGNÓSTICO - Verificar disponibilidad de datos
console.log('🔍 Verificando datos en main.js:');
console.log('- seriesData:', typeof seriesData !== 'undefined' ? `✅ (${seriesData.length} series)` : '❌ No definido');
console.log('- noticiasData:', typeof noticiasData !== 'undefined' ? `✅ (${noticiasData.length} noticias)` : '❌ No definido');

// Detección de tema del sistema
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectSystemTheme);
}

detectSystemTheme();

// Sistema de Lista de Deseos
class WishlistManager {
    constructor() {
        this.wishlist = this.loadWishlist();
    }

    loadWishlist() {
        const saved = localStorage.getItem('seriesWishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('seriesWishlist', JSON.stringify(this.wishlist));
        this.updateAllWishlistCounts();
        this.dispatchWishlistUpdate();
    }

    addToWishlist(serieId) {
        if (!this.wishlist.includes(serieId)) {
            this.wishlist.push(serieId);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    removeFromWishlist(serieId) {
        const index = this.wishlist.indexOf(serieId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    isInWishlist(serieId) {
        return this.wishlist.includes(serieId);
    }

    getWishlistCount() {
        return this.wishlist.length;
    }

    // 🆕 Actualizar TODOS los contadores
    updateAllWishlistCounts() {
        const count = this.getWishlistCount();
        
        const countElements = document.querySelectorAll('.wishlist-count');
        countElements.forEach(element => {
            element.textContent = count;
            if (count > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    dispatchWishlistUpdate() {
        // 🆕 Disparar evento global para sincronizar todas las páginas
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
        
        // 🆕 También disparar storage event para sincronizar entre pestañas
        const storageEvent = new StorageEvent('storage', {
            key: 'seriesWishlist',
            newValue: JSON.stringify(this.wishlist)
        });
        window.dispatchEvent(storageEvent);
    }
}

// Sistema de Estados de Visualización
class ViewingStateManager {
    constructor() {
        this.viewingStates = this.loadViewingStates();
        this.seriesProgress = this.loadSeriesProgress();
    }

    loadViewingStates() {
        const saved = localStorage.getItem('seriesViewingStates');
        return saved ? JSON.parse(saved) : {};
    }

    saveViewingStates() {
        localStorage.setItem('seriesViewingStates', JSON.stringify(this.viewingStates));
        this.dispatchViewingStateUpdate();
    }

    loadSeriesProgress() {
        const saved = localStorage.getItem('seriesProgress');
        return saved ? JSON.parse(saved) : {};
    }

    saveSeriesProgress() {
        localStorage.setItem('seriesProgress', JSON.stringify(this.seriesProgress));
        this.dispatchViewingStateUpdate();
    }

    setViewingState(serieId, state) {
        this.viewingStates[serieId] = state;
        this.saveViewingStates();
        
        if (state !== 'watching') {
            this.removeProgress(serieId);
        }
    }

    removeViewingState(serieId) {
        delete this.viewingStates[serieId];
        this.saveViewingStates();
    }

    getViewingState(serieId) {
        return this.viewingStates[serieId] || 'pending';
    }

    setProgress(serieId, season, episode) {
        this.seriesProgress[serieId] = {
            currentSeason: Math.max(1, parseInt(season) || 1),
            currentEpisode: Math.max(1, parseInt(episode) || 1),
            lastUpdated: new Date().toISOString()
        };
        this.saveSeriesProgress();
    }

    removeProgress(serieId) {
        delete this.seriesProgress[serieId];
        this.saveSeriesProgress();
    }

    getProgress(serieId) {
        return this.seriesProgress[serieId] || null;
    }

    hasProgress(serieId) {
        return !!this.seriesProgress[serieId];
    }

    getProgressDisplay(serieId) {
        const progress = this.getProgress(serieId);
        if (!progress) return null;
        
        return `T${progress.currentSeason} E${progress.currentEpisode}`;
    }

    getViewingStateDisplay(state) {
        const states = {
            'pending': { text: 'Por Ver', icon: 'eye' },
            'watching': { text: 'Viendo', icon: 'play' },
            'completed': { text: 'Completada', icon: 'check' }
        };
        return states[state] || states.pending;
    }

    getStatusIcon(state) {
        const icons = {
            'pending': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>`,
            'watching': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" stroke="currentColor" stroke-width="2"/>
            </svg>`,
            'completed': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"/>
            </svg>`
        };
        return icons[state] || icons.pending;
    }

    dispatchViewingStateUpdate() {
        window.dispatchEvent(new CustomEvent('viewingStateUpdated'));
    }
}

// 🆕 GESTOR DE ESTADO TEMPORAL SOLO PARA NAVEGACIÓN ENTRE SERIES
class CatalogStateManager {
    constructor() {
        this.stateKey = 'catalogTempState';
        this.init();
    }

    init() {
        // No hacemos nada especial en init
    }

    // 🆕 Guardar estado solo cuando se navega a una serie
    saveState(searchTerm, genreFilters, statusFilters) {
        const state = {
            scrollPosition: window.scrollY,
            searchTerm: searchTerm,
            genreFilters: Array.from(genreFilters),
            statusFilters: Array.from(statusFilters),
            timestamp: Date.now()
        };
        localStorage.setItem(this.stateKey, JSON.stringify(state));
        console.log('💾 Estado guardado para navegación entre series');
    }

    // 🆕 Restaurar estado solo si existe
    restoreState() {
        const saved = localStorage.getItem(this.stateKey);
        if (saved) {
            const state = JSON.parse(saved);
            console.log('🔄 Restaurando estado de navegación');
            return state;
        }
        return null;
    }

    // 🆕 Limpiar estado inmediatamente después de restaurar
    clearState() {
        localStorage.removeItem(this.stateKey);
        console.log('🧹 Estado limpiado');
    }
}

// 🖼️ CATÁLOGO OPTIMIZADO CON SISTEMA DE IMÁGENES MEJORADO
class OptimizedSeriesCatalog {
    constructor() {
        this.series = seriesData;
        // 🆕 CACHE DE IMÁGENES - se mantiene durante la sesión
        this.imageCache = new Map();
        // 🆕 CACHE DE IMÁGENES OPTIMIZADAS
        this.optimizedCache = new Map();
        
        // 🆕 AGREGAR TIMEOUT PARA BÚSQUEDA OPTIMIZADA
        this.searchTimeout = null;
        
        this.sortSeriesAlphabetically();
        this.filteredSeries = [...this.series];
        this.activeGenreFilters = new Set(['all']);
        this.activeStatusFilters = new Set(['all']);
        this.allGenres = this.getAllGenres();
        this.wishlistManager = new WishlistManager();
        this.viewingStateManager = new ViewingStateManager();
        this.searchTerm = '';
        this.stateManager = new CatalogStateManager();
        this.init();
    }

    // 🆕 MÉTODO PARA DETECTAR PELÍCULAS
    isMovie(serie) {
        return serie.genre.some(g => 
            g.toLowerCase().includes('película') || 
            g.toLowerCase().includes('pelicula') ||
            g.toLowerCase().includes('movie')
        );
    }

    // 🆕 MÉTODO PARA ORDENAR SERIES ALFABÉTICAMENTE
    sortSeriesAlphabetically() {
        this.series.sort((a, b) => a.title.localeCompare(b.title));
        console.log('🔤 Series ordenadas alfabéticamente');
    }

    // 🆕 Restaurar estado al inicializar y LIMPIAR INMEDIATAMENTE
    restoreState() {
        const savedState = this.stateManager.restoreState();
        if (savedState) {
            // Restaurar búsqueda
            this.searchTerm = savedState.searchTerm || '';
            const searchInput = document.getElementById('searchInput');
            if (searchInput && this.searchTerm) {
                searchInput.value = this.searchTerm;
            }

            // Restaurar filtros
            if (savedState.genreFilters) {
                this.activeGenreFilters = new Set(savedState.genreFilters);
            }
            if (savedState.statusFilters) {
                this.activeStatusFilters = new Set(savedState.statusFilters);
            }

            // Aplicar filtros
            this.applyFilters();
            this.updateChipsActiveState('genre');
            this.updateChipsActiveState('status');

            // Restaurar scroll después de renderizar
            setTimeout(() => {
                if (savedState.scrollPosition) {
                    window.scrollTo(0, savedState.scrollPosition);
                    console.log('📜 Scroll restaurado:', savedState.scrollPosition);
                }
                // 🆕 LIMPIAR INMEDIATAMENTE DESPUÉS DE RESTAURAR
                this.stateManager.clearState();
            }, 300);
        }
    }

    // 🆕 Guardar estado actual
    saveCurrentState() {
        this.stateManager.saveState(
            this.searchTerm,
            this.activeGenreFilters,
            this.activeStatusFilters
        );
    }

    getAllGenres() {
        const genres = new Set();
        this.series.forEach(serie => {
            serie.genre.forEach(genre => genres.add(genre));
        });
        return Array.from(genres);
    }

    renderChips() {
        this.renderGenreChips();
        this.renderStatusChips();
    }

    renderGenreChips() {
        const genreChipsContainer = document.getElementById('genreChips');
        const genreChips = [
            { value: 'all', text: 'Todos los géneros' },
            ...this.allGenres.map(genre => ({
                value: genre,
                text: this.getGenreDisplayName(genre)
            }))
        ];

        genreChipsContainer.innerHTML = genreChips.map(chip => `
            <button class="filter-chip ${chip.value === 'all' ? 'active' : ''}" 
                    data-type="genre" 
                    data-value="${chip.value}">
                ${chip.text}
            </button>
        `).join('');
    }

    renderStatusChips() {
        const statusChipsContainer = document.getElementById('statusChips');
        const statusChips = [
            { value: 'all', text: 'Todos los estados' },
            { value: 'pending', text: 'Por Ver' },
            { value: 'watching', text: 'Viendo' },
            { value: 'completed', text: 'Completada' }
        ];

        statusChipsContainer.innerHTML = statusChips.map(chip => `
            <button class="filter-chip ${chip.value === 'all' ? 'active' : ''}" 
                    data-type="status" 
                    data-value="${chip.value}">
                ${chip.text}
            </button>
        `).join('');
    }

    getGenreDisplayName(genre) {
        const names = {
            'drama': 'Drama',
            'accion': 'Acción',
            'fantasia': 'Fantasía',
            'aventura': 'Aventura',
            'seinen': 'Seinen',
            'ciencia ficcion': 'Ciencia Ficción',
            'horror': 'Horror',
            'comedia': 'Comedia',
            'deporte': 'Deporte',
            'historico': 'Histórico',
            'psicologico': 'Psicológico',
            'misterio': 'Misterio',
            // 🆕 NUEVOS GÉNEROS
            'videojuegos': 'Videojuegos',
            'romance': 'Romance',
            'thriller': 'Thriller',
            'pelicula': 'Película',
            'película': 'Película',
            'escolares': 'Escolares',
            'sobrenatural': 'Sobrenatural',
            'shonen': 'Shonen',
            'isekai': 'Isekai',
            'harem': 'Harem',
            'recuentos de la vida': 'Recuentos de la vida',
            'artes marciales': 'Artes Marciales',
            'shoujo': 'Shoujo',
            'suspenso': 'Suspenso',
            'superpoderes': 'Superpoderes',
            'musica': 'Música',
            'música': 'Música',
            'supervivencia': 'Supervivencia',
            'parodia': 'Parodia',
            'mecha': 'Mecha',
            'musical': 'Musical',
            'cocina': 'Cocina',
            'superheroes': 'Superhéroes',
            'superhéroes': 'Superhéroes',
            'ecchi': 'Ecchi',
            'manwhas': 'Manwhas',
            'post-apocaliptico': 'Post-apocalíptico',
            'post-apocalíptico': 'Post-apocalíptico',
            'monstruos': 'Monstruos',
            'filosofico': 'Filosófico',
            'filosófico': 'Filosófico'
        };
        return names[genre] || genre;
    }

    // 🆕 MÉTODO MODIFICADO PARA LAZY LOADING CON CACHE Y OPTIMIZACIÓN
    renderSeries() {
        const grid = document.getElementById('seriesGrid');
        grid.innerHTML = '';

        if (this.filteredSeries.length === 0) {
            grid.innerHTML = '<p class="no-results">No se encontraron series</p>';
            return;
        }

        this.filteredSeries.forEach(serie => {
            const card = this.createSerieCard(serie);
            grid.appendChild(card);
        });

        // 🆕 INICIALIZAR LAZY LOADING CON CACHE Y OPTIMIZACIÓN
        this.initializeLazyLoading();
        
        // 🆕 PRECARGAR IMÁGENES IMPORTANTES EN SEGUNDO PLANO
        setTimeout(() => this.preloadImportantImages(), 1000);
    }

    // 🆕 MÉTODO MODIFICADO PARA CREAR CARDS CON DETECCIÓN DE CACHE Y OPTIMIZACIÓN
    createSerieCard(serie) {
        const card = document.createElement('div');
        card.className = 'serie-card';
        const isInWishlist = this.wishlistManager.isInWishlist(serie.id);
        const viewingState = this.viewingStateManager.getViewingState(serie.id);
        const hasProgress = this.viewingStateManager.hasProgress(serie.id);
        const isMovie = this.isMovie(serie);
        
        // 🆕 VERIFICAR SI LA IMAGEN YA ESTÁ EN CACHE NORMAL U OPTIMIZADA
        const isCached = this.imageCache.has(serie.poster);
        const isOptimized = this.optimizedCache.has(serie.poster);
        const finalSrc = isOptimized ? this.optimizedCache.get(serie.poster) : 
                         isCached ? this.imageCache.get(serie.poster) : 
                         './assets/images/placeholder.jpg';
        
        card.innerHTML = `
            <div class="status-indicator-card ${viewingState} ${hasProgress ? 'has-progress' : ''}" 
                 data-serie-id="${serie.id}">
                <span class="status-icon-card">${this.viewingStateManager.getStatusIcon(viewingState)}</span>
            </div>
            
            <button class="wishlist-btn-card ${isInWishlist ? 'active' : ''}" 
                    data-serie-id="${serie.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <!-- 🆕 IMAGEN CON DETECCIÓN DE CACHE Y OPTIMIZACIÓN -->
            <img src="${finalSrc}" 
                 data-src="${serie.poster}" 
                 alt="${serie.title}" 
                 class="serie-poster ${isCached || isOptimized ? 'loaded' : 'lazy'} ${isCached ? 'cached' : ''} ${isOptimized ? 'optimized' : ''}"
                 width="300" 
                 height="450"
                 loading="lazy">
            
            <div class="serie-info">
                <h3 class="serie-title">${serie.title}</h3>
                <div class="serie-meta">
                    <span>${serie.year}</span>
                    <span>${isMovie ? 'Película' : `${serie.seasons} temp`}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.wishlist-btn-card') && !e.target.closest('.status-indicator-card')) {
                this.showSerieDetails(serie);
            }
        });

        const wishlistBtn = card.querySelector('.wishlist-btn-card');
        wishlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWishlist(serie.id, wishlistBtn);
        });

        const statusIndicator = card.querySelector('.status-indicator-card');
        statusIndicator.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showSerieDetails(serie);
        });

        return card;
    }

    // 🆕 SISTEMA DE CACHE DE IMÁGENES MEJORADO CON OPTIMIZACIÓN
    initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('.serie-poster.lazy');
        
        console.log(`🖼️ Inicializando lazy loading: ${lazyImages.length} imágenes por cargar`);

        if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImageWithOptimization(img);
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else if (lazyImages.length > 0) {
            // Fallback para navegadores antiguos
            lazyImages.forEach(img => this.loadImageWithOptimization(img));
        }

        // 🆕 Mostrar estadísticas del cache
        const cachedImages = document.querySelectorAll('.serie-poster.cached').length;
        const optimizedImages = document.querySelectorAll('.serie-poster.optimized').length;
        console.log(`📊 Cache stats: ${cachedImages} cacheadas | ${optimizedImages} optimizadas | ${lazyImages.length} pendientes`);
    }

    // 🆕 MÉTODO MEJORADO PARA CARGAR IMÁGENES CON OPTIMIZACIÓN
    async loadImageWithOptimization(img) {
        const src = img.getAttribute('data-src');
        
        // 🆕 VERIFICAR SI YA ESTÁ OPTIMIZADA
        if (this.optimizedCache.has(src)) {
            img.src = this.optimizedCache.get(src);
            img.classList.remove('lazy');
            img.classList.add('loaded');
            img.classList.add('optimized');
            console.log(`⚡ Usando versión optimizada: ${src.split('/').pop()}`);
            return;
        }
        
        // 🆕 VERIFICAR SI YA ESTÁ EN CACHE NORMAL
        if (this.imageCache.has(src)) {
            img.src = this.imageCache.get(src);
            img.classList.remove('lazy');
            img.classList.add('loaded');
            img.classList.add('cached');
            return;
        }

        // 🆕 CARGAR Y OPTIMIZAR IMAGEN
        await this.loadAndOptimizeImage(img, src);
    }

    // 🆕 MÉTODO PARA CARGAR Y OPTIMIZAR IMAGEN
    async loadAndOptimizeImage(targetImg, originalSrc) {
        try {
            const tempImage = new Image();
            tempImage.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
                tempImage.onload = resolve;
                tempImage.onerror = reject;
                tempImage.src = originalSrc;
            });

            // 🆕 INTENTAR OPTIMIZAR LA IMAGEN
            const optimizedResult = await this.optimizeImage(tempImage);
            
            if (optimizedResult && optimizedResult.success) {
                // 🆕 GUARDAR VERSIÓN OPTIMIZADA
                this.optimizedCache.set(originalSrc, optimizedResult.dataUrl);
                targetImg.src = optimizedResult.dataUrl;
                targetImg.classList.add('optimized');
                console.log(`🎯 Imagen optimizada: ${originalSrc.split('/').pop()} - ${optimizedResult.reduction}% más pequeña`);
            } else {
                // 🆕 FALLBACK A VERSIÓN ORIGINAL
                this.imageCache.set(originalSrc, originalSrc);
                targetImg.src = originalSrc;
                console.log(`📦 Usando original (sin optimización): ${originalSrc.split('/').pop()}`);
            }
            
            targetImg.classList.remove('lazy');
            targetImg.classList.add('loaded');
            
        } catch (error) {
            // 🆕 FALLBACK EN CASO DE ERROR
            console.warn('❌ Error cargando imagen, usando placeholder:', originalSrc, error);
            targetImg.classList.remove('lazy');
            // Mantener el placeholder
        }
    }

    // 🆕 MÉTODO PARA OPTIMIZAR IMAGEN USANDO CANVAS
    async optimizeImage(imageElement, quality = 0.8, maxWidth = 800) {
        return new Promise((resolve) => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Calcular nuevo tamaño manteniendo aspect ratio
                let width = imageElement.naturalWidth;
                let height = imageElement.naturalHeight;
                
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Dibujar imagen redimensionada
                ctx.drawImage(imageElement, 0, 0, width, height);
                
                // 🆕 INTENTAR WebP PRIMERO, LUEGO JPEG
                let optimizedDataUrl;
                try {
                    optimizedDataUrl = canvas.toDataURL('image/webp', quality);
                } catch (webpError) {
                    // Fallback a JPEG si WebP no es soportado
                    optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
                }
                
                // Calcular reducción (estimación)
                const originalSize = this.estimateImageSize(imageElement);
                const optimizedSize = optimizedDataUrl.length;
                const reduction = originalSize > 0 ? 
                    ((1 - (optimizedSize / originalSize)) * 100).toFixed(1) : '0';
                
                resolve({
                    success: true,
                    dataUrl: optimizedDataUrl,
                    format: optimizedDataUrl.includes('webp') ? 'webp' : 'jpeg',
                    originalSize,
                    optimizedSize,
                    reduction
                });
                
            } catch (error) {
                console.warn('❌ Error en optimización:', error);
                resolve({ success: false, error: error.message });
            }
        });
    }

    // 🆕 ESTIMAR TAMAÑO DE IMAGEN (aproximado)
    estimateImageSize(img) {
        // Estimación basada en dimensiones y calidad
        if (img.naturalWidth && img.naturalHeight) {
            return img.naturalWidth * img.naturalHeight * 0.5; // Estimación aproximada
        }
        return 0;
    }

    // 🆕 MÉTODO PARA PRECARGAR IMÁGENES IMPORTANTES
    preloadImportantImages() {
        // Precargar solo si no hay muchas imágenes ya en cache
        if (this.imageCache.size + this.optimizedCache.size < 20) {
            const importantImages = this.filteredSeries.slice(0, 6).map(serie => serie.poster);
            
            importantImages.forEach(src => {
                if (!this.imageCache.has(src) && !this.optimizedCache.has(src)) {
                    const img = new Image();
                    img.onload = () => {
                        this.imageCache.set(src, src);
                        console.log(`⚡ Preload cache: ${src.split('/').pop()}`);
                    };
                    img.onerror = () => {
                        console.warn(`❌ Error preload: ${src}`);
                    };
                    img.src = src;
                }
            });
        }
    }

    // 🆕 MÉTODO TOGGLEWISHLIST CORREGIDO - ACTUALIZACIÓN INMEDIATA
    toggleWishlist(serieId, button) {
        const wasInWishlist = this.wishlistManager.isInWishlist(serieId);
        
        if (wasInWishlist) {
            this.wishlistManager.removeFromWishlist(serieId);
            
            // 🆕 ACTUALIZACIÓN VISUAL INMEDIATA - MÉTODO DIRECTO
            button.classList.remove('active');
            button.style.background = 'rgba(0, 0, 0, 0.7)';
            
            console.log('❌ Serie removida de wishlist:', serieId);
        } else {
            this.wishlistManager.addToWishlist(serieId);
            
            // 🆕 ACTUALIZACIÓN VISUAL INMEDIATA - MÉTODO DIRECTO
            button.classList.add('active');
            button.style.background = 'var(--accent)';
            
            console.log('✅ Serie agregada a wishlist:', serieId);
        }
        
        // 🆕 PEQUEÑA ANIMACIÓN DE FEEDBACK
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    handleChipClick(type, value) {
        if (type === 'genre') {
            this.handleGenreChipClick(value);
        } else if (type === 'status') {
            this.handleStatusChipClick(value);
        }
        this.applyFilters();
    }

    handleGenreChipClick(value) {
        if (value === 'all') {
            this.activeGenreFilters.clear();
            this.activeGenreFilters.add('all');
        } else {
            this.activeGenreFilters.delete('all');
            if (this.activeGenreFilters.has(value)) {
                this.activeGenreFilters.delete(value);
                if (this.activeGenreFilters.size === 0) {
                    this.activeGenreFilters.add('all');
                }
            } else {
                this.activeGenreFilters.add(value);
            }
        }
        this.updateChipsActiveState('genre');
    }

    handleStatusChipClick(value) {
        if (value === 'all') {
            this.activeStatusFilters.clear();
            this.activeStatusFilters.add('all');
        } else {
            this.activeStatusFilters.delete('all');
            if (this.activeStatusFilters.has(value)) {
                this.activeStatusFilters.delete(value);
                if (this.activeStatusFilters.size === 0) {
                    this.activeStatusFilters.add('all');
                }
            } else {
                this.activeStatusFilters.add(value);
            }
        }
        this.updateChipsActiveState('status');
    }

    updateChipsActiveState(type) {
        const chips = document.querySelectorAll(`.filter-chip[data-type="${type}"]`);
        chips.forEach(chip => {
            const value = chip.dataset.value;
            if (type === 'genre') {
                chip.classList.toggle('active', this.activeGenreFilters.has(value));
            } else if (type === 'status') {
                chip.classList.toggle('active', this.activeStatusFilters.has(value));
            }
        });
    }

    applyFilters() {
        let filtered = [...this.series];
        
        if (!this.activeGenreFilters.has('all')) {
            filtered = filtered.filter(serie =>
                serie.genre.some(genre => this.activeGenreFilters.has(genre))
            );
        }
        
        if (!this.activeStatusFilters.has('all')) {
            filtered = filtered.filter(serie =>
                this.activeStatusFilters.has(this.viewingStateManager.getViewingState(serie.id))
            );
        }
        
        // 🆕 ORDENAR RESULTADOS FILTRADOS ALFABÉTICAMENTE
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        
        this.filteredSeries = filtered;
        this.renderSeries();
    }

    // 🆕 BÚSQUEDA OPTIMIZADA CON DEBOUNCE
    searchSeries(query) {
        // 🆕 DEBOUNCE - Esperar que el usuario termine de escribir
        clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            this.searchTerm = query.toLowerCase().trim();
            
            if (this.searchTerm === '') {
                this.applyFilters();
            } else {
                // 🆕 BÚSQUEDA OPTIMIZADA - Solo en título y géneros
                this.filteredSeries = this.series.filter(serie => {
                    // Buscar solo en título (primero) - más rápido
                    if (serie.title.toLowerCase().includes(this.searchTerm)) {
                        return true;
                    }
                    
                    // Luego en géneros (segundo)
                    if (serie.genre.some(g => g.includes(this.searchTerm))) {
                        return true;
                    }
                    
                    return false;
                });
                
                // 🆕 ORDENAR RESULTADOS DE BÚSQUEDA ALFABÉTICAMENTE
                this.filteredSeries.sort((a, b) => a.title.localeCompare(b.title));
                this.renderSeries();
            }
        }, 300); // 🆕 Esperar 300ms después de que el usuario deje de escribir
    }

    toggleFiltersPanel() {
        const panel = document.getElementById('filtersChipsPanel');
        const toggle = document.getElementById('filterToggle');
        const isOpening = !panel.classList.contains('active');
        
        panel.classList.toggle('active');
        toggle.classList.toggle('active');
        
        let overlay = document.querySelector('.overlay');
        if (isOpening) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'overlay';
                document.body.appendChild(overlay);
                
                overlay.addEventListener('click', () => {
                    this.closeFiltersPanel();
                });
            }
            overlay.classList.add('active');
        } else {
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    }

    closeFiltersPanel() {
        const panel = document.getElementById('filtersChipsPanel');
        const toggle = document.getElementById('filterToggle');
        
        panel.classList.remove('active');
        toggle.classList.remove('active');
        
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    setupEventListeners() {
        document.getElementById('filterToggle').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFiltersPanel();
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-chip')) {
                const type = e.target.dataset.type;
                const value = e.target.dataset.value;
                this.handleChipClick(type, value);
            }
        });

        const searchInput = document.getElementById('searchInput');
        
        // 🆕 EVENTO OPTIMIZADO
        searchInput.addEventListener('input', (e) => {
            this.searchSeries(e.target.value);
        });

        // 🆕 LIMPIAR TIMEOUT AL SALIR DE LA PÁGINA
        window.addEventListener('beforeunload', () => {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
        });

        window.addEventListener('wishlistUpdated', () => {
            this.wishlistManager.updateAllWishlistCounts();
        });

        window.addEventListener('viewingStateUpdated', () => {
            this.renderSeries();
        });
    }

    // 🆕 Modificar init
    init() {
        this.wishlistManager.updateAllWishlistCounts();
        this.renderChips();
        this.restoreState(); // 🆕 Restaurar antes de renderizar series
        this.renderSeries();
        this.setupEventListeners();
    }

    // 🆕 Modificar showSerieDetails para guardar estado antes de navegar
    showSerieDetails(serie) {
        this.saveCurrentState();
        setTimeout(() => {
            window.location.href = `pages/serie.html?id=${serie.id}`;
        }, 100);
    }

    // 🆕 Método para limpiar estado (usar cuando se salga del catálogo)
    clearState() {
        this.stateManager.clearState();
    }
}

// 🆕 SISTEMA CENTRALIZADO DE WISHLIST
class GlobalWishlistManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateAllWishlistCounts();
        this.setupGlobalListeners();
    }

    updateAllWishlistCounts() {
        const wishlist = JSON.parse(localStorage.getItem('seriesWishlist') || '[]');
        const count = wishlist.length;
        
        // Actualizar TODOS los badges de wishlist en la página
        const wishlistBadges = document.querySelectorAll('.wishlist-count');
        wishlistBadges.forEach(badge => {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.add('visible');
            } else {
                badge.classList.remove('visible');
            }
        });
        
        console.log('🔄 Wishlist global actualizada:', count, 'series');
    }

    setupGlobalListeners() {
        // Escuchar cambios en localStorage desde otras pestañas
        window.addEventListener('storage', (e) => {
            if (e.key === 'seriesWishlist') {
                this.updateAllWishlistCounts();
            }
        });

        // Escuchar eventos personalizados desde otras partes de la app
        window.addEventListener('wishlistUpdated', () => {
            this.updateAllWishlistCounts();
        });
    }
}

// 🆕 SISTEMA DE PANEL ACERCA DE / CONTACTO
class AboutPanelManager {
    constructor() {
        this.panel = document.getElementById('aboutPanel');
        this.overlay = document.getElementById('aboutOverlay');
        this.toggleButton = document.getElementById('aboutToggle');
        this.closeButton = document.getElementById('aboutClose');
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('ℹ️ Panel Acerca De inicializado');
    }

    setupEventListeners() {
        // Abrir panel
        this.toggleButton.addEventListener('click', () => {
            this.openPanel();
        });

        // Cerrar panel
        this.closeButton.addEventListener('click', () => {
            this.closePanel();
        });

        // Cerrar con overlay
        this.overlay.addEventListener('click', () => {
            this.closePanel();
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.panel.classList.contains('active')) {
                this.closePanel();
            }
        });
    }

    openPanel() {
        this.panel.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        console.log('📱 Panel Acerca De abierto');
    }

    closePanel() {
        this.panel.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
        console.log('📱 Panel Acerca De cerrado');
    }

    // Método para actualizar información dinámicamente
    updateVersionInfo(version, updateDate) {
        const versionElement = document.querySelector('.version-info strong');
        const dateElement = document.querySelector('.version-info span');
        
        if (versionElement) versionElement.textContent = `Versión ${version}`;
        if (dateElement) dateElement.textContent = `Actualizado: ${updateDate}`;
    }
}

// SISTEMA DE BADGE DE NOTICIAS MEJORADO
function updateNewsBadge() {
    // Esperar a que noticiasData esté disponible
    if (typeof noticiasData === 'undefined') {
        console.log('noticiasData no está disponible aún, reintentando...');
        setTimeout(updateNewsBadge, 100);
        return;
    }
    
    try {
        const noticiasLeidas = JSON.parse(localStorage.getItem('newsReadStatus') || '{}');
        const noticiasNoLeidas = noticiasData.filter(noticia => !noticiasLeidas[noticia.id]).length;
        
        const newsBadges = document.querySelectorAll('.noticias-count');
        newsBadges.forEach(badge => {
            badge.textContent = noticiasNoLeidas;
            if (noticiasNoLeidas > 0) {
                badge.classList.add('visible');
            } else {
                badge.classList.remove('visible');
            }
        });
        
        console.log('✅ Badge actualizado:', noticiasNoLeidas, 'noticias no leídas');
    } catch (error) {
        console.error('❌ Error actualizando badge:', error);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando SeriesCatalog Optimizado...');
    
    // 🆕 USAR LA VERSIÓN OPTIMIZADA
    new OptimizedSeriesCatalog();
    new GlobalWishlistManager();
    
    // 🆕 INICIALIZAR PANEL ACERCA DE
    new AboutPanelManager();
    
    // Intentar actualizar badge después de que todo esté cargado
    setTimeout(updateNewsBadge, 500);
});

// También actualizar cuando se cargue la ventana completa
window.addEventListener('load', updateNewsBadge);

// Actualizar badge cuando cambie el estado de lectura
window.addEventListener('storage', updateNewsBadge);