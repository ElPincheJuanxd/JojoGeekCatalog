// 🆕 WISHLIST MANAGER MEJORADO
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
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
        
        const storageEvent = new StorageEvent('storage', {
            key: 'seriesWishlist',
            newValue: JSON.stringify(this.wishlist)
        });
        window.dispatchEvent(storageEvent);
    }
}

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

    dispatchViewingStateUpdate() {
        window.dispatchEvent(new CustomEvent('viewingStateUpdated'));
    }
}

class SerieDetails {
    constructor() {
        this.series = seriesData;
        this.currentSerie = null;
        this.wishlistManager = new WishlistManager();
        this.viewingStateManager = new ViewingStateManager();
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

    // 🆕 MÉTODO PARA OBTENER INFORMACIÓN DE PELÍCULAS
    getMovieInfo(serie) {
        const isMovie = this.isMovie(serie);
        const movieParts = serie.parts || 1;
        
        if (!isMovie) {
            return {
                display: `${serie.seasons} temporada${serie.seasons > 1 ? 's' : ''}`,
                infoLabel: 'Temporadas:',
                infoValue: serie.seasons.toString()
            };
        }
        
        if (movieParts > 1) {
            return {
                display: `Saga (${movieParts} películas)`,
                infoLabel: 'Saga:',
                infoValue: `${movieParts} películas`
            };
        } else {
            return {
                display: 'Película',
                infoLabel: 'Película:',
                infoValue: 'Individual'
            };
        }
    }

    init() {
        this.wishlistManager.updateAllWishlistCounts();
        this.updateNewsBadge(); // 🆕 AGREGADA ESTA LÍNEA
        this.loadSerieFromURL();
        this.renderSerieDetails();
        this.setupWishlistButton();
        this.setupViewingStateButtons();
        this.setupProgressSection();
        this.setupEventListeners();
    }

    loadSerieFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const serieId = parseInt(urlParams.get('id'));
        
        this.currentSerie = this.series.find(serie => serie.id === serieId);
        
        if (!this.currentSerie) {
            window.location.href = '../index.html';
            return;
        }
    }

    renderSerieDetails() {
        if (!this.currentSerie) return;

        this.renderHero();
        this.renderInfo();
        this.renderDescription();
        this.renderSimilarSeries();
    }

    renderHero() {
        const hero = document.getElementById('serieHero');
        const viewingState = this.viewingStateManager.getViewingState(this.currentSerie.id);
        const stateDisplay = this.viewingStateManager.getViewingStateDisplay(viewingState);
        const progress = this.viewingStateManager.getProgressDisplay(this.currentSerie.id);
        const movieInfo = this.getMovieInfo(this.currentSerie);
        
        hero.innerHTML = `
            <div class="hero-content">
                <img src="../${this.currentSerie.poster}" 
                     alt="${this.currentSerie.title}" 
                     class="hero-poster">
                <div class="hero-text">
                    <h1>${this.currentSerie.title}</h1>
                    <div class="hero-meta">
                        <div class="meta-item">
                            <span>📅</span>
                            <span>${this.currentSerie.year}</span>
                        </div>
                        <div class="meta-item">
                            <span>🎬</span>
                            <span>${movieInfo.display}</span>
                        </div>
                        <div class="meta-item">
                            <span>🏢</span>
                            <span>${this.currentSerie.studio || 'Studio no disponible'}</span>
                        </div>
                        <div class="meta-item">
                            <span>📊</span>
                            <span>${stateDisplay.text}${progress ? ` (${progress})` : ''}</span>
                        </div>
                    </div>
                    <div class="genre-tags">
                        ${this.currentSerie.genre.map(genre => 
                            `<span class="genre-tag">${this.getGenreDisplayName(genre)}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderInfo() {
        const info = document.getElementById('serieInfo');
        const movieInfo = this.getMovieInfo(this.currentSerie);
        
        info.innerHTML = `
            <div class="info-card">
                <h3>Información General</h3>
                <div class="meta-item"><strong>Fechas de emisión:</strong> ${this.currentSerie.year}</div>
                <div class="meta-item"><strong>${movieInfo.infoLabel}</strong> ${movieInfo.infoValue}</div>
                <div class="meta-item"><strong>Estudio:</strong> ${this.currentSerie.studio || 'No disponible'}</div>
            </div>
            <div class="info-card">
                <h3>Géneros</h3>
                <div class="genre-tags">
                    ${this.currentSerie.genre.map(genre => 
                        `<span class="genre-tag">${this.getGenreDisplayName(genre)}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    renderDescription() {
        const description = document.getElementById('serieDescription');
        description.innerHTML = `
            <h2>Sinopsis</h2>
            <p>${this.currentSerie.description}</p>
        `;
    }

    renderSimilarSeries() {
        const similarContainer = document.getElementById('similarSeries');
        const similarSeries = this.getSimilarSeries();
        
        if (similarSeries.length === 0) {
            similarContainer.innerHTML = '';
            return;
        }

        similarContainer.innerHTML = `
            <h2>Series Similares</h2>
            <div class="similar-grid">
                ${similarSeries.map(serie => `
                    <a href="serie.html?id=${serie.id}" class="similar-card">
                        <img src="../${serie.poster}" 
                             alt="${serie.title}" 
                             class="similar-poster">
                        <div class="similar-info">
                            <div class="similar-title">${serie.title}</div>
                            <div class="similar-year">${serie.year}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }

    setupWishlistButton() {
        const wishlistBtn = document.getElementById('wishlistBtn');
        const wishlistBtnText = document.getElementById('wishlistBtnText');
        
        if (this.wishlistManager.isInWishlist(this.currentSerie.id)) {
            wishlistBtn.classList.add('active');
            wishlistBtnText.textContent = 'En Mi Lista';
        } else {
            wishlistBtn.classList.remove('active');
            wishlistBtnText.textContent = 'Agregar a Mi Lista';
        }

        wishlistBtn.addEventListener('click', () => {
            this.toggleWishlist();
        });
    }

    setupViewingStateButtons() {
        const statusSection = document.createElement('div');
        statusSection.className = 'status-section';
        statusSection.innerHTML = `
            <h3>Estado de Visualización</h3>
            <div class="status-buttons">
                <button class="status-btn" data-state="pending">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Por Ver
                </button>
                <button class="status-btn" data-state="watching">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Viendo
                </button>
                <button class="status-btn" data-state="completed">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Completada
                </button>
            </div>
        `;

        const description = document.getElementById('serieDescription');
        description.parentNode.insertBefore(statusSection, description.nextSibling);

        const currentState = this.viewingStateManager.getViewingState(this.currentSerie.id);
        const activeBtn = statusSection.querySelector(`[data-state="${currentState}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        statusSection.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setViewingState(btn.dataset.state);
            });
        });
    }

    setupProgressSection() {
        const progressSection = document.createElement('div');
        progressSection.className = 'progress-section';
        const isMovie = this.isMovie(this.currentSerie);
        
        progressSection.innerHTML = `
            <h3>Progreso de Visualización</h3>
            <div class="progress-form">
                <div class="progress-field">
                    <label for="currentSeason">${isMovie ? 'Parte Actual' : 'Temporada Actual'}</label>
                    <div class="progress-input-group">
                        <button class="progress-btn" data-action="decrease" data-field="season">-</button>
                        <input type="number" id="currentSeason" class="progress-input" value="1" min="1">
                        <button class="progress-btn" data-action="increase" data-field="season">+</button>
                    </div>
                </div>
                <div class="progress-field">
                    <label for="currentEpisode">${isMovie ? 'Minuto Actual' : 'Capítulo Actual'}</label>
                    <div class="progress-input-group">
                        <button class="progress-btn" data-action="decrease" data-field="episode">-</button>
                        <input type="number" id="currentEpisode" class="progress-input" value="1" min="1">
                        <button class="progress-btn" data-action="increase" data-field="episode">+</button>
                    </div>
                </div>
                <div class="progress-display" id="progressDisplay"></div>
                <div class="progress-actions">
                    <button class="progress-cancel-btn" id="progressCancel">Cancelar</button>
                    <button class="progress-save-btn" id="progressSave">Guardar Progreso</button>
                </div>
            </div>
        `;

        const statusSection = document.querySelector('.status-section');
        statusSection.parentNode.insertBefore(progressSection, statusSection.nextSibling);

        this.setupProgressEventListeners();
        this.updateProgressSection();
    }

    setupProgressEventListeners() {
        document.querySelectorAll('.progress-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const field = e.target.dataset.field;
                this.adjustProgressValue(field, action);
            });
        });

        document.getElementById('progressSave').addEventListener('click', () => {
            this.saveProgress();
        });

        document.getElementById('progressCancel').addEventListener('click', () => {
            this.cancelProgress();
        });

        document.getElementById('currentSeason').addEventListener('input', (e) => {
            this.validateProgressInput(e.target);
        });

        document.getElementById('currentEpisode').addEventListener('input', (e) => {
            this.validateProgressInput(e.target);
        });
    }

    adjustProgressValue(field, action) {
        const input = document.getElementById(`current${field.charAt(0).toUpperCase() + field.slice(1)}`);
        let value = parseInt(input.value) || 1;
        
        if (action === 'increase') {
            value++;
        } else if (action === 'decrease' && value > 1) {
            value--;
        }
        
        input.value = Math.max(1, value);
    }

    validateProgressInput(input) {
        let value = parseInt(input.value) || 1;
        input.value = Math.max(1, value);
    }

    saveProgress() {
        const season = document.getElementById('currentSeason').value;
        const episode = document.getElementById('currentEpisode').value;
        
        this.viewingStateManager.setProgress(this.currentSerie.id, season, episode);
        
        const progressDisplay = document.getElementById('progressDisplay');
        const isMovie = this.isMovie(this.currentSerie);
        
        if (isMovie) {
            progressDisplay.textContent = `Progreso guardado: Parte ${season}, Minuto ${episode}`;
        } else {
            progressDisplay.textContent = `Progreso guardado: Temporada ${season}, Capítulo ${episode}`;
        }
        
        progressDisplay.classList.add('active');
        
        setTimeout(() => {
            progressDisplay.classList.remove('active');
        }, 3000);
        
        this.renderHero();
    }

    cancelProgress() {
        const currentProgress = this.viewingStateManager.getProgress(this.currentSerie.id);
        if (currentProgress) {
            document.getElementById('currentSeason').value = currentProgress.currentSeason;
            document.getElementById('currentEpisode').value = currentProgress.currentEpisode;
        } else {
            document.getElementById('currentSeason').value = 1;
            document.getElementById('currentEpisode').value = 1;
        }
    }

    updateProgressSection() {
        const progressSection = document.querySelector('.progress-section');
        const currentState = this.viewingStateManager.getViewingState(this.currentSerie.id);
        const currentProgress = this.viewingStateManager.getProgress(this.currentSerie.id);
        
        if (currentState === 'watching') {
            progressSection.classList.add('active');
            
            if (currentProgress) {
                document.getElementById('currentSeason').value = currentProgress.currentSeason;
                document.getElementById('currentEpisode').value = currentProgress.currentEpisode;
            }
        } else {
            progressSection.classList.remove('active');
        }
    }

    setViewingState(state) {
        this.viewingStateManager.setViewingState(this.currentSerie.id, state);
        
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.state === state) {
                btn.classList.add('active');
            }
        });

        const stateDisplay = this.viewingStateManager.getViewingStateDisplay(state);
        const metaItems = document.querySelectorAll('.hero-meta .meta-item');
        const statusMeta = Array.from(metaItems).find(item => item.textContent.includes('📊'));
        if (statusMeta) {
            const progress = this.viewingStateManager.getProgressDisplay(this.currentSerie.id);
            statusMeta.innerHTML = `<span>📊</span><span>${stateDisplay.text}${progress ? ` (${progress})` : ''}</span>`;
        }

        this.updateProgressSection();
    }

    toggleWishlist() {
        const wishlistBtn = document.getElementById('wishlistBtn');
        const wishlistBtnText = document.getElementById('wishlistBtnText');
        
        if (this.wishlistManager.isInWishlist(this.currentSerie.id)) {
            this.wishlistManager.removeFromWishlist(this.currentSerie.id);
            wishlistBtn.classList.remove('active');
            wishlistBtnText.textContent = 'Agregar a Mi Lista';
        } else {
            this.wishlistManager.addToWishlist(this.currentSerie.id);
            wishlistBtn.classList.add('active');
            wishlistBtnText.textContent = 'En Mi Lista';
        }
    }

    setupEventListeners() {
        window.addEventListener('wishlistUpdated', () => {
            this.wishlistManager.updateAllWishlistCounts();
        });

        window.addEventListener('viewingStateUpdated', () => {
            // Actualizar si es necesario
        });
    }

    // 🆕 MÉTODO AGREGADO PARA ACTUALIZAR BADGE DE NOTICIAS
    updateNewsBadge() {
        const noticiasLeidas = JSON.parse(localStorage.getItem('newsReadStatus') || '{}');
        const noticiasNoLeidas = noticiasData.filter(noticia => !noticiasLeidas[noticia.id]).length;
        
        const newsBadge = document.querySelector('.noticias-count');
        if (newsBadge) {
            newsBadge.textContent = noticiasNoLeidas;
            if (noticiasNoLeidas > 0) {
                newsBadge.classList.add('visible');
            } else {
                newsBadge.classList.remove('visible');
            }
        }
    }

    getSimilarSeries() {
        if (!this.currentSerie) return [];
        
        return this.series
            .filter(serie => 
                serie.id !== this.currentSerie.id && 
                serie.genre.some(genre => this.currentSerie.genre.includes(genre))
            )
            .slice(0, 4);
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
            'misterio': 'Misterio'
        };
        return names[genre] || genre;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SerieDetails();
});