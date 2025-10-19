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
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
        
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

// GESTOR DE ESTADO TEMPORAL
class CatalogStateManager {
    constructor() {
        this.stateKey = 'catalogTempState';
    }

    saveState(searchTerm, genreFilters, statusFilters) {
        const state = {
            scrollPosition: window.scrollY,
            searchTerm: searchTerm,
            genreFilters: Array.from(genreFilters),
            statusFilters: Array.from(statusFilters),
            timestamp: Date.now()
        };
        localStorage.setItem(this.stateKey, JSON.stringify(state));
    }

    restoreState() {
        const saved = localStorage.getItem(this.stateKey);
        return saved ? JSON.parse(saved) : null;
    }

    clearState() {
        localStorage.removeItem(this.stateKey);
    }
}

// 🚀 CATÁLOGO ULTRA-OPTIMIZADO
class UltraOptimizedSeriesCatalog {
    constructor() {
        this.series = seriesData;
        
        // 🆕 CACHE MEJORADO - Solo cache simple
        this.imageCache = new Map();
        this.searchTimeout = null;
        this.lazyLoadingObserver = null;
        
        this.sortSeriesAlphabetically();
        this.filteredSeries = [...this.series];
        this.activeGenreFilters = new Set(['all']);
        this.activeStatusFilters = new Set(['all']);
        this.allGenres = this.getAllGenres();
        this.wishlistManager = new WishlistManager();
        this.viewingStateManager = new ViewingStateManager();
        this.searchTerm = '';
        this.stateManager = new CatalogStateManager();
        
        // 🆕 OPTIMIZACIÓN: Precargar datos críticos
        this.preloadCriticalData();
        this.init();
    }

    // 🆕 PRECARGAR DATOS CRÍTICOS
    preloadCriticalData() {
        // Precargar estados de wishlist y viewing states
        this.wishlistManager.loadWishlist();
        this.viewingStateManager.loadViewingStates();
    }

    isMovie(serie) {
        return serie.genre.some(g => 
            g.toLowerCase().includes('película') || 
            g.toLowerCase().includes('pelicula') ||
            g.toLowerCase().includes('movie')
        );
    }

    sortSeriesAlphabetically() {
        this.series.sort((a, b) => a.title.localeCompare(b.title));
    }

    restoreState() {
        const savedState = this.stateManager.restoreState();
        if (savedState) {
            this.searchTerm = savedState.searchTerm || '';
            const searchInput = document.getElementById('searchInput');
            if (searchInput && this.searchTerm) {
                searchInput.value = this.searchTerm;
            }

            if (savedState.genreFilters) {
                this.activeGenreFilters = new Set(savedState.genreFilters);
            }
            if (savedState.statusFilters) {
                this.activeStatusFilters = new Set(savedState.statusFilters);
            }

            this.applyFilters();
            this.updateChipsActiveState('genre');
            this.updateChipsActiveState('status');

            setTimeout(() => {
                if (savedState.scrollPosition) {
                    window.scrollTo(0, savedState.scrollPosition);
                }
                this.stateManager.clearState();
            }, 100); // 🆕 Menos tiempo de espera
        }
    }

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

    // 🆕 RENDERIZADO ULTRA-OPTIMIZADO
    renderSeries() {
        const grid = document.getElementById('seriesGrid');
        
        // 🆕 LIMPIAR OBSERVER ANTERIOR
        if (this.lazyLoadingObserver) {
            this.lazyLoadingObserver.disconnect();
        }

        if (this.filteredSeries.length === 0) {
            grid.innerHTML = '<p class="no-results">No se encontraron series</p>';
            return;
        }

        // 🆕 USAR FRAGMENT PARA RENDERIZADO MÁS RÁPIDO
        const fragment = document.createDocumentFragment();
        
        this.filteredSeries.forEach(serie => {
            const card = this.createSerieCard(serie);
            fragment.appendChild(card);
        });

        grid.innerHTML = ''; // Limpiar una sola vez
        grid.appendChild(fragment);

        // 🆕 INICIALIZAR LAZY LOADING OPTIMIZADO
        this.initializeOptimizedLazyLoading();
    }

    // 🆕 CREAR CARD OPTIMIZADA
    createSerieCard(serie) {
        const card = document.createElement('div');
        card.className = 'serie-card';
        
        const isInWishlist = this.wishlistManager.isInWishlist(serie.id);
        const viewingState = this.viewingStateManager.getViewingState(serie.id);
        const hasProgress = this.viewingStateManager.hasProgress(serie.id);
        const isMovie = this.isMovie(serie);
        
        // 🆕 CARGAR IMAGEN DIRECTAMENTE SIN CACHE COMPLEJO
        const finalSrc = this.imageCache.has(serie.poster) ? 
                        this.imageCache.get(serie.poster) : 
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
            
            <img src="${finalSrc}" 
                 data-src="${serie.poster}" 
                 alt="${serie.title}" 
                 class="serie-poster ${this.imageCache.has(serie.poster) ? 'loaded' : 'lazy'}"
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

        // 🆕 EVENTOS OPTIMIZADOS - Delegación de eventos
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

        return card;
    }

    // 🆕 LAZY LOADING ULTRA-OPTIMIZADO
    initializeOptimizedLazyLoading() {
        const lazyImages = document.querySelectorAll('.serie-poster.lazy');
        
        if (lazyImages.length === 0) return;

        // 🆕 OBSERVER MÁS EFICIENTE
        this.lazyLoadingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImageSimple(img);
                    this.lazyLoadingObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px', // 🆕 Cargar antes de que sean visibles
            threshold: 0.01
        });

        lazyImages.forEach(img => this.lazyLoadingObserver.observe(img));
    }

    // 🆕 CARGA SIMPLE DE IMÁGENES - SIN OPTIMIZACIÓN COMPLEJA
    async loadImageSimple(img) {
        const src = img.getAttribute('data-src');
        
        if (this.imageCache.has(src)) {
            img.src = this.imageCache.get(src);
            img.classList.remove('lazy');
            img.classList.add('loaded');
            return;
        }

        try {
            // 🆕 CARGAR DIRECTAMENTE SIN OPTIMIZACIÓN (más rápido)
            await new Promise((resolve, reject) => {
                const tempImg = new Image();
                tempImg.onload = () => {
                    this.imageCache.set(src, src);
                    img.src = src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    resolve();
                };
                tempImg.onerror = reject;
                tempImg.src = src;
            });
        } catch (error) {
            console.warn('❌ Error cargando imagen:', src);
            // Mantener placeholder
        }
    }

    toggleWishlist(serieId, button) {
        const wasInWishlist = this.wishlistManager.isInWishlist(serieId);
        
        if (wasInWishlist) {
            this.wishlistManager.removeFromWishlist(serieId);
            button.classList.remove('active');
        } else {
            this.wishlistManager.addToWishlist(serieId);
            button.classList.add('active');
        }
        
        // 🆕 ANIMACIÓN MÁS RÁPIDA
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
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
        
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        this.filteredSeries = filtered;
        this.renderSeries();
    }

    // 🆕 BÚSQUEDA MÁS RÁPIDA
    searchSeries(query) {
        clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            this.searchTerm = query.toLowerCase().trim();
            
            if (this.searchTerm === '') {
                this.applyFilters();
            } else {
                // 🆕 BÚSQUEDA MÁS EFICIENTE
                this.filteredSeries = this.series.filter(serie => 
                    serie.title.toLowerCase().includes(this.searchTerm) ||
                    serie.genre.some(g => g.includes(this.searchTerm))
                );
                
                this.filteredSeries.sort((a, b) => a.title.localeCompare(b.title));
                this.renderSeries();
            }
        }, 200); // 🆕 Menos tiempo de debounce
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
        searchInput.addEventListener('input', (e) => {
            this.searchSeries(e.target.value);
        });

        // 🆕 LIMPIAR RECURSOS
        window.addEventListener('beforeunload', () => {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            if (this.lazyLoadingObserver) {
                this.lazyLoadingObserver.disconnect();
            }
        });

        window.addEventListener('wishlistUpdated', () => {
            this.wishlistManager.updateAllWishlistCounts();
        });

        window.addEventListener('viewingStateUpdated', () => {
            this.renderSeries();
        });
    }

    init() {
        this.wishlistManager.updateAllWishlistCounts();
        this.renderChips();
        this.restoreState();
        this.renderSeries();
        this.setupEventListeners();
    }

    showSerieDetails(serie) {
        this.saveCurrentState();
        setTimeout(() => {
            window.location.href = `pages/serie.html?id=${serie.id}`;
        }, 50); // 🆕 Menos tiempo de espera
    }

    clearState() {
        this.stateManager.clearState();
    }
}

// SISTEMA CENTRALIZADO DE WISHLIST
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
        
        const wishlistBadges = document.querySelectorAll('.wishlist-count');
        wishlistBadges.forEach(badge => {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.add('visible');
            } else {
                badge.classList.remove('visible');
            }
        });
    }

    setupGlobalListeners() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'seriesWishlist') {
                this.updateAllWishlistCounts();
            }
        });

        window.addEventListener('wishlistUpdated', () => {
            this.updateAllWishlistCounts();
        });
    }
}

// SISTEMA DE PANEL ACERCA DE
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
    }

    setupEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            this.openPanel();
        });

        this.closeButton.addEventListener('click', () => {
            this.closePanel();
        });

        this.overlay.addEventListener('click', () => {
            this.closePanel();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.panel.classList.contains('active')) {
                this.closePanel();
            }
        });
    }

    openPanel() {
        this.panel.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closePanel() {
        this.panel.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// SISTEMA DE BADGE DE NOTICIAS
function updateNewsBadge() {
    if (typeof noticiasData === 'undefined') {
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
    } catch (error) {
        console.error('❌ Error actualizando badge:', error);
    }
}

// 🚀 INICIALIZACIÓN OPTIMIZADA
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Catálogo Ultra-Optimizado...');
    
    // 🆕 USAR LA VERSIÓN ULTRA-OPTIMIZADA
    new UltraOptimizedSeriesCatalog();
    new GlobalWishlistManager();
    new AboutPanelManager();
    
    setTimeout(updateNewsBadge, 500);
});

window.addEventListener('load', updateNewsBadge);
window.addEventListener('storage', updateNewsBadge);