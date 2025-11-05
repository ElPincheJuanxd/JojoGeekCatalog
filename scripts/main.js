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

// GESTOR DE ESTADO TEMPORAL - ACTUALIZADO PARA SCROLL PRECISO
class CatalogStateManager {
    constructor() {
        this.stateKey = 'catalogTempState';
    }

    saveState(searchTerm, genreFilters, statusFilters, activeCategory, scrollPosition = null) {
        const state = {
            scrollPosition: scrollPosition !== null ? scrollPosition : window.scrollY,
            searchTerm: searchTerm,
            genreFilters: Array.from(genreFilters),
            statusFilters: Array.from(statusFilters),
            activeCategory: activeCategory,
            timestamp: Date.now()
        };
        localStorage.setItem(this.stateKey, JSON.stringify(state));
        console.log('💾 Estado guardado:', { 
            category: activeCategory, 
            search: searchTerm,
            scroll: scrollPosition !== null ? `${scrollPosition}px (exacto)` : `${window.scrollY}px (actual)`,
            genreFilters: genreFilters.size,
            statusFilters: statusFilters.size
        });
    }

    restoreState() {
        const saved = localStorage.getItem(this.stateKey);
        if (saved) {
            const state = JSON.parse(saved);
            console.log('📂 Estado restaurado:', { 
                category: state.activeCategory,
                search: state.searchTerm,
                scroll: state.scrollPosition
            });
            return state;
        }
        return null;
    }

    clearState() {
        localStorage.removeItem(this.stateKey);
        console.log('🗑️ Estado limpiado');
    }
}

// 🚀 CATÁLOGO ULTRA-OPTIMIZADO CON NUEVO SISTEMA DE CACHE Y CATEGORÍAS
class UltraOptimizedSeriesCatalog {
    constructor() {
        this.series = seriesData;
        
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
        
        // 🆕 SISTEMA DE CATEGORÍAS
        this.activeCategory = 'all';
        this.categories = this.defineCategories();
        this.categoryCounts = this.calculateCategoryCounts();
        
        this.init();
    }

    // 🆕 DEFINICIÓN DE CATEGORÍAS
    defineCategories() {
        return [
            { 
                id: 'all', 
                name: 'Todos', 
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
            },
            { 
                id: 'peliculas', 
                name: 'Películas', 
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
            },
            { 
                id: 'anime', 
                name: 'Anime', 
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
            },
            { 
                id: 'series', 
                name: 'Series', 
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 11a9 9 0 0118 0m-9 9v4m-6-4h12" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
            },
            { 
                id: 'animados', 
                name: 'Animados', 
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
            }
        ];
    }

    // 🆕 MÉTODO CORREGIDO PARA CALCULAR CONTEO
    calculateCategoryCounts() {
        const counts = {};
        
        this.categories.forEach(category => {
            if (category.id === 'all') {
                counts['all'] = this.series.length; // Todas las series
            } else {
                const seriesInCategory = this.series.filter(serie => 
                    serie.category && serie.category === category.id
                );
                counts[category.id] = seriesInCategory.length;
            }
        });
        
        console.log('✅ Conteo de categorías:', counts);
        return counts;
    }

    // 🆕 RENDERIZAR TABS DE CATEGORÍAS
    renderCategoryTabs() {
        const tabsContainer = document.getElementById('categoriesTabs');
        
        tabsContainer.innerHTML = this.categories.map(category => `
            <button class="category-tab ${category.id === this.activeCategory ? 'active' : ''}" 
                    data-category="${category.id}">
                <span class="category-icon">${category.icon}</span>
                ${category.name}
                <span class="category-count">${this.categoryCounts[category.id]}</span>
            </button>
        `).join('');
    }

    // 🆕 MANEJAR CAMBIO DE CATEGORÍA - ACTUALIZADO PARA SCROLL PRECISO
    handleCategoryChange(categoryId) {
        // 🆕 GUARDAR POSICIÓN ACTUAL ANTES DEL CAMBIO
        const currentScroll = window.scrollY;
        
        this.activeCategory = categoryId;
        
        // Actualizar estado visual de tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === categoryId);
        });
        
        console.log('🔀 Cambio de categoría:', categoryId, 'Scroll actual:', currentScroll + 'px');
        
        // Aplicar filtros (incluyendo la nueva categoría)
        this.applyFilters();
        
        // 🆕 GUARDAR ESTADO PERO MANTENER EL SCROLL ACTUAL
        this.stateManager.saveState(
            this.searchTerm,
            this.activeGenreFilters,
            this.activeStatusFilters,
            this.activeCategory,
            currentScroll // 🆕 MANTENER POSICIÓN EXACTA
        );
    }

    // 🆕 MÉTODO PARA ACTUALIZAR ESTADO VISUAL DE TABS
    updateCategoryTabsVisualState() {
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            const categoryId = tab.dataset.category;
            tab.classList.toggle('active', categoryId === this.activeCategory);
        });
        console.log('🎯 Tabs actualizados, categoría activa:', this.activeCategory);
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

    // 🆕 RESTORE STATE ACTUALIZADO PARA SCROLL PRECISO
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

            // 🆕 RESTAURAR CATEGORÍA ACTIVA CON SEGURIDAD
            if (savedState.activeCategory) {
                const categoryExists = this.categories.some(cat => cat.id === savedState.activeCategory);
                if (categoryExists) {
                    this.activeCategory = savedState.activeCategory;
                    console.log('✅ Categoría restaurada:', this.activeCategory);
                } else {
                    console.warn('⚠️ Categoría no encontrada:', savedState.activeCategory);
                    this.activeCategory = 'all';
                }
            }

            this.applyFilters();
            this.updateChipsActiveState('genre');
            this.updateChipsActiveState('status');
            
            // 🆕 ACTUALIZAR TABS DE CATEGORÍAS VISUALMENTE
            this.updateCategoryTabsVisualState();

            // 🆕 RESTAURAR SCROLL CON MÁS PRECISIÓN
            if (savedState.scrollPosition) {
                console.log('🎯 Restaurando scroll a:', savedState.scrollPosition + 'px');
                
                // 🆕 USAR requestAnimationFrame PARA MEJOR SINCRONIZACIÓN
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: savedState.scrollPosition,
                        behavior: 'instant' // 🆕 SCROLL INSTANTÁNEO SIN ANIMACIÓN
                    });
                    
                    // 🆕 VERIFICACIÓN DESPUÉS DE LA RESTAURACIÓN
                    setTimeout(() => {
                        console.log('📏 Scroll actual después de restauración:', window.scrollY + 'px');
                        console.log('📏 Diferencia:', (window.scrollY - savedState.scrollPosition) + 'px');
                    }, 100);
                });
            }

            // 🆕 LIMPIAR ESTADO DESPUÉS DE RESTAURAR SCROLL
            setTimeout(() => {
                this.stateManager.clearState();
            }, 1000); // 🆕 DAR MÁS TIEMPO PARA QUE SE RESTAURE EL SCROLL
        }
    }

    // 🆕 SAVE CURRENT STATE ACTUALIZADO - NO GUARDAR SCROLL PARA CAMBIOS EN PÁGINA
    saveCurrentState() {
        this.stateManager.saveState(
            this.searchTerm,
            this.activeGenreFilters,
            this.activeStatusFilters,
            this.activeCategory,
            null // 🆕 NO GUARDAR SCROLL PARA CAMBIOS EN PÁGINA ACTUAL
        );
    }

    // 🆕 MÉTODO MEJORADO - GÉNEROS ORDENADOS ALFABÉTICAMENTE
    getAllGenres() {
        const genres = new Set();
        this.series.forEach(serie => {
            serie.genre.forEach(genre => genres.add(genre));
        });
        
        // Convertir a array y ordenar alfabéticamente
        const genresArray = Array.from(genres);
        return genresArray.sort((a, b) => {
            const nameA = this.getGenreDisplayName(a).toLowerCase();
            const nameB = this.getGenreDisplayName(b).toLowerCase();
            return nameA.localeCompare(nameB);
        });
    }

    renderChips() {
        this.renderGenreChips();
        this.renderStatusChips();
    }

    renderGenreChips() {
        const genreChipsContainer = document.getElementById('genreChips');
        
        // "Todos los géneros" siempre primero
        const genreChips = [
            { value: 'all', text: 'Todos los géneros' }
        ];
        
        // Luego los géneros ordenados alfabéticamente
        this.allGenres.forEach(genre => {
            genreChips.push({
                value: genre,
                text: this.getGenreDisplayName(genre)
            });
        });

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

    // 🆕 RENDERIZADO CON NUEVO SISTEMA DE CACHE
    renderSeries() {
        const grid = document.getElementById('seriesGrid');
        
        if (this.lazyLoadingObserver) {
            this.lazyLoadingObserver.disconnect();
        }

        if (this.filteredSeries.length === 0) {
            grid.innerHTML = '<p class="no-results">No se encontraron series</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        
        this.filteredSeries.forEach(serie => {
            const card = this.createSerieCard(serie);
            fragment.appendChild(card);
        });

        grid.innerHTML = '';
        grid.appendChild(fragment);

        // 🆕 USAR EL NUEVO SISTEMA DE LAZY LOADING
        this.initializeOptimizedLazyLoading();
    }

    createSerieCard(serie) {
        const card = document.createElement('div');
        card.className = 'serie-card';
        
        const isInWishlist = this.wishlistManager.isInWishlist(serie.id);
        const viewingState = this.viewingStateManager.getViewingState(serie.id);
        const hasProgress = this.viewingStateManager.hasProgress(serie.id);
        const isMovie = this.isMovie(serie);
        
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
            
            <img src="./assets/images/placeholder.jpg" 
                 data-src="${serie.poster}" 
                 alt="${serie.title}" 
                 class="serie-poster lazy"
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

        return card;
    }

    // 🆕 LAZY LOADING OPTIMIZADO - DELEGADO AL NUEVO SISTEMA
    initializeOptimizedLazyLoading() {
        console.log('✅ Lazy loading optimizado activado');
        
        // El OptimizedImageLoader se encarga automáticamente
        // Solo nos aseguramos de que observe las imágenes existentes
        setTimeout(() => {
            if (window.optimizedImageLoader) {
                window.optimizedImageLoader.observeLazyImages();
            }
        }, 100);
    }

    toggleWishlist(serieId, button) {
        const wasInWishlist = this.wishlistManager.isInWishlist(serieId);
        
        if (wasInWishlist) {
            this.wishlistManager.removeFromWishlist(serieId);
            button.classList.remove('active');
            button.style.background = 'rgba(0, 0, 0, 0.7)';
        } else {
            this.wishlistManager.addToWishlist(serieId);
            button.classList.add('active');
            button.style.background = 'var(--accent)';
        }
        
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
            let isActive = false;
            
            if (type === 'genre') {
                isActive = this.activeGenreFilters.has(value);
            } else if (type === 'status') {
                isActive = this.activeStatusFilters.has(value);
            }
            
            chip.classList.toggle('active', isActive);
            
            if (isActive) {
                chip.style.background = 'var(--accent)';
                chip.style.color = 'white';
                chip.style.borderColor = 'var(--accent)';
            } else {
                chip.style.background = 'var(--bg-primary)';
                chip.style.color = 'var(--text-primary)';
                chip.style.borderColor = 'var(--bg-primary)';
            }
        });
    }

    // 🆕 MÉTODO DE FILTRADO MEJORADO CON CATEGORÍAS - CORREGIDO
    applyFilters() {
        let filtered = [...this.series];
        
        console.group('🔍 Aplicando filtros');
        console.log('Categoría activa:', this.activeCategory);
        console.log('Búsqueda:', this.searchTerm);
        console.log('Géneros activos:', Array.from(this.activeGenreFilters));
        console.log('Estados activos:', Array.from(this.activeStatusFilters));
        
        // 🆕 FILTRAR POR CATEGORÍA ACTIVA - CON SEGURIDAD
        if (this.activeCategory !== 'all') {
            const beforeFilter = filtered.length;
            filtered = filtered.filter(serie => 
                serie.category && serie.category === this.activeCategory
            );
            console.log(`📊 Filtro categoría: ${beforeFilter} → ${filtered.length}`);
        }
        
        // FILTRAR POR GÉNERO (existente)
        if (!this.activeGenreFilters.has('all')) {
            const beforeFilter = filtered.length;
            filtered = filtered.filter(serie =>
                serie.genre.some(genre => this.activeGenreFilters.has(genre))
            );
            console.log(`🎭 Filtro género: ${beforeFilter} → ${filtered.length}`);
        }
        
        // FILTRAR POR ESTADO (existente)
        if (!this.activeStatusFilters.has('all')) {
            const beforeFilter = filtered.length;
            filtered = filtered.filter(serie =>
                this.activeStatusFilters.has(this.viewingStateManager.getViewingState(serie.id))
            );
            console.log(`📊 Filtro estado: ${beforeFilter} → ${filtered.length}`);
        }
        
        // FILTRAR POR BÚSQUEDA (existente)
        if (this.searchTerm) {
            const beforeFilter = filtered.length;
            filtered = filtered.filter(serie => 
                serie.title.toLowerCase().includes(this.searchTerm) ||
                serie.genre.some(g => g.includes(this.searchTerm))
            );
            console.log(`🔎 Filtro búsqueda: ${beforeFilter} → ${filtered.length}`);
        }
        
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        this.filteredSeries = filtered;
        
        console.log(`✅ Resultados finales: ${this.filteredSeries.length} series`);
        console.groupEnd();
        
        this.renderSeries();
    }

    searchSeries(query) {
        clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            this.searchTerm = query.toLowerCase().trim();
            this.applyFilters();
        }, 200);
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
            
            // 🆕 MANEJAR CLIC EN TABS DE CATEGORÍAS
            if (e.target.closest('.category-tab')) {
                const categoryTab = e.target.closest('.category-tab');
                const categoryId = categoryTab.dataset.category;
                this.handleCategoryChange(categoryId);
            }
        });

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchSeries(e.target.value);
        });

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

    // 🆕 INIT MEJORADO PARA PERSISTENCIA
    init() {
        this.wishlistManager.updateAllWishlistCounts();
        this.renderChips();
        this.renderCategoryTabs();
        
        // 🆕 PRIMERO RESTAURAR ESTADO, LUEGO RENDERIZAR
        this.restoreState();
        
        this.renderSeries();
        this.setupEventListeners();
        
        // 🆕 LOG DE ESTADO INICIAL
        console.log('🚀 Catálogo inicializado:', {
            categoría: this.activeCategory,
            seriesTotales: this.series.length,
            seriesFiltradas: this.filteredSeries.length,
            búsqueda: this.searchTerm
        });
    }

    // 🆕 SHOW SERIE DETAILS ACTUALIZADO PARA SCROLL PRECISO
    showSerieDetails(serie) {
        console.log('🎬 Navegando a serie:', serie.title);
        console.log('📝 Guardando estado actual:', {
            categoría: this.activeCategory,
            búsqueda: this.searchTerm,
            scrollPosition: window.scrollY
        });
        
        // 🆕 GUARDAR POSICIÓN EXACTA INMEDIATAMENTE ANTES DE NAVEGAR
        this.stateManager.saveState(
            this.searchTerm,
            this.activeGenreFilters,
            this.activeStatusFilters,
            this.activeCategory,
            window.scrollY // 🆕 POSICIÓN EXACTA
        );
        
        // 🆕 NAVEGACIÓN INMEDIATA SIN TIMEOUT
        window.location.href = `./pages/serie.html?id=${serie.id}`;
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
    console.log('🚀 Inicializando Catálogo con Nuevo Sistema de Cache y Categorías...');
    
    new UltraOptimizedSeriesCatalog();
    new GlobalWishlistManager();
    new AboutPanelManager();
    
    setTimeout(updateNewsBadge, 500);
});

window.addEventListener('load', updateNewsBadge);
window.addEventListener('storage', updateNewsBadge);