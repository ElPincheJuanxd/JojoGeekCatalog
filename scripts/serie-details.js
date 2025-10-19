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
        this.updateNewsBadge();
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
                     class="hero-poster"
                     onerror="this.src='../assets/images/placeholder.jpg'">
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

    // 🆕 MÉTODO MEJORADO PARA DETECTAR FRANQUICIAS
    detectFranchise(serie) {
        // 🆕 PRIMERO: Verificar si tiene campo franchise explícito
        if (serie.franchise) {
            return serie.franchise;
        }
        
        // 🆕 SEGUNDO: Detección automática por título
        const franchisePatterns = [
            { pattern: /berserk/i, franchise: 'Berserk' },
            { pattern: /attack on titan|shingeki no kyojin/i, franchise: 'Attack on Titan' },
            { pattern: /naruto/i, franchise: 'Naruto' },
            { pattern: /one piece/i, franchise: 'One Piece' },
            { pattern: /dragon ball|dragonball/i, franchise: 'Dragon Ball' },
            { pattern: /bleach/i, franchise: 'Bleach' },
            { pattern: /one punch man/i, franchise: 'One Punch Man' },
            { pattern: /my hero academia|boku no hero/i, franchise: 'My Hero Academia' },
            { pattern: /demon slayer|kimetsu no yaiba/i, franchise: 'Demon Slayer' },
            { pattern: /jujutsu kaisen/i, franchise: 'Jujutsu Kaisen' },
            { pattern: /chainsaw man/i, franchise: 'Chainsaw Man' },
            { pattern: /vinland saga/i, franchise: 'Vinland Saga' },
            { pattern: /tokyo revengers/i, franchise: 'Tokyo Revengers' },
            { pattern: /spy x family/i, franchise: 'Spy x Family' },
            { pattern: /haikyuu|haikyu/i, franchise: 'Haikyuu' },
            { pattern: /hunter x hunter/i, franchise: 'Hunter x Hunter' },
            { pattern: /fullmetal alchemist/i, franchise: 'Fullmetal Alchemist' },
            { pattern: /fate\/stay night|fate zero/i, franchise: 'Fate' },
            { pattern: /evangelion/i, franchise: 'Evangelion' },
            { pattern: /cowboy bebop/i, franchise: 'Cowboy Bebop' },
            { pattern: /death note/i, franchise: 'Death Note' },
            { pattern: /code geass/i, franchise: 'Code Geass' },
            { pattern: /steins;gate/i, franchise: 'Steins;Gate' },
            { pattern: /re:zero/i, franchise: 'Re:Zero' },
            { pattern: /konosuba/i, franchise: 'KonoSuba' },
            { pattern: /overlord/i, franchise: 'Overlord' },
            { pattern: /that time i got reincarnated as a slime|tensura/i, franchise: 'Tensei Shitara Slime' },
            { pattern: /mushoku tensei/i, franchise: 'Mushoku Tensei' },
            { pattern: /jojo|jojo's bizarre adventure/i, franchise: "JoJo's Bizarre Adventure" },
            { pattern: /sailor moon/i, franchise: 'Sailor Moon' },
            { pattern: /pokémon|pokemon/i, franchise: 'Pokémon' },
            { pattern: /digimon/i, franchise: 'Digimon' },
            { pattern: /gundam/i, franchise: 'Gundam' },
            { pattern: /macross/i, franchise: 'Macross' },
            { pattern: /saint seiya|caballeros del zodiaco/i, franchise: 'Saint Seiya' },
            { pattern: /solo leveling/i, franchise: 'Solo Leveling' },
            { pattern: /the rising of the shield hero|shield hero/i, franchise: 'The Rising of the Shield Hero' }
        ];
        
        for (const franchise of franchisePatterns) {
            if (franchise.pattern.test(serie.title)) {
                return franchise.franchise;
            }
        }
        
        return null;
    }

    // 🆕 SISTEMA DE RECOMENDACIONES MEJORADO CON FRANQUICIAS
    getSimilarSeries() {
        if (!this.currentSerie) return [];
        
        const currentSerie = this.currentSerie;
        const scoredSeries = [];
        
        // 🆕 DETECTAR SI LA SERIE ACTUAL PERTENECE A UNA FRANQUICIA
        const currentFranchise = this.detectFranchise(currentSerie);
        
        this.series.forEach(serie => {
            if (serie.id === currentSerie.id) return;
            
            let score = 0;
            
            // 🆕 PUNTUACIÓN POR MISMA FRANQUICIA (Peso: 60%) - MÁS IMPORTANTE
            const serieFranchise = this.detectFranchise(serie);
            if (currentFranchise && serieFranchise && currentFranchise === serieFranchise) {
                score += 60;
            }
            
            // 🆕 PUNTUACIÓN POR GÉNEROS COMPARTIDOS (Peso: 25%)
            const sharedGenres = currentSerie.genre.filter(genre => 
                serie.genre.includes(genre)
            ).length;
            score += sharedGenres * 5; // 5 puntos por género compartido
            
            // 🆕 PUNTUACIÓN POR ESTUDIO (Peso: 10%)
            if (currentSerie.studio && serie.studio === currentSerie.studio) {
                score += 10;
            }
            
            // 🆕 PUNTUACIÓN POR AÑO (Series más recientes) (Peso: 5%)
            const yearDiff = Math.abs(currentSerie.year - serie.year);
            if (yearDiff <= 2) score += 5;
            else if (yearDiff <= 5) score += 3;
            
            if (score > 0) {
                scoredSeries.push({
                    serie: serie,
                    score: score,
                    sharedGenres: sharedGenres,
                    sameFranchise: currentFranchise && serieFranchise && currentFranchise === serieFranchise
                });
            }
        });
        
        // Ordenar por puntuación y tomar las mejores 4
        return scoredSeries
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)
            .map(item => item.serie);
    }

    renderSimilarSeries() {
        const similarContainer = document.getElementById('similarSeries');
        const similarSeries = this.getSimilarSeries();
        
        if (similarSeries.length === 0) {
            similarContainer.innerHTML = `
                <div class="no-similar">
                    <div class="no-similar-icon">🎯</div>
                    <h3>No hay recomendaciones disponibles</h3>
                    <p>Explora el catálogo para descubrir más contenido</p>
                    <a href="../index.html" class="btn-primary" style="margin-top: 1rem;">
                        Explorar Catálogo
                    </a>
                </div>
            `;
            return;
        }

        // 🆕 DETECTAR FRANQUICIA ACTUAL
        const currentFranchise = this.detectFranchise(this.currentSerie);
        
        // 🆕 CALCULAR PORCENTAJE DE SIMILITUD MEJORADO
        const getSimilarityInfo = (serie) => {
            const sharedGenres = this.currentSerie.genre.filter(genre => 
                serie.genre.includes(genre)
            ).length;
            const totalGenres = Math.max(this.currentSerie.genre.length, serie.genre.length);
            const genreSimilarity = Math.round((sharedGenres / totalGenres) * 100);
            
            // 🆕 VERIFICAR SI ES DE LA MISMA FRANQUICIA
            const serieFranchise = this.detectFranchise(serie);
            const isSameFranchise = currentFranchise && serieFranchise && currentFranchise === serieFranchise;
            
            return {
                similarity: genreSimilarity,
                isSameFranchise: isSameFranchise,
                franchiseName: currentFranchise
            };
        };

        similarContainer.innerHTML = `
            <div class="similar-section-header">
                <h2>${currentFranchise ? `Contenido de ${currentFranchise}` : 'Contenido que podría gustarte'}</h2>
                <p>${currentFranchise ? 'Series y películas relacionadas' : 'Basado en géneros, estudio y popularidad'}</p>
            </div>
            <div class="similar-grid">
                ${similarSeries.map(serie => {
                    const similarityInfo = getSimilarityInfo(serie);
                    const isMovie = this.isMovie(serie);
                    const movieInfo = this.getMovieInfo(serie);
                    
                    return `
                        <a href="serie.html?id=${serie.id}" class="similar-card">
                            <div class="similar-card-header">
                                <img src="../${serie.poster}" 
                                     alt="${serie.title}" 
                                     class="similar-poster"
                                     onerror="this.src='../assets/images/placeholder.jpg'">
                                <div class="similarity-badge ${similarityInfo.isSameFranchise ? 'franchise-badge' : ''}">
                                    ${similarityInfo.isSameFranchise ? 'Misma franquicia' : `${similarityInfo.similarity}% similar`}
                                </div>
                            </div>
                            <div class="similar-info">
                                <div class="similar-title">${serie.title}</div>
                                <div class="similar-meta">
                                    <span class="similar-year">${serie.year}</span>
                                    <span class="similar-type">${movieInfo.display}</span>
                                </div>
                                <div class="similar-genres">
                                    ${serie.genre.slice(0, 2).map(genre => 
                                        `<span class="similar-genre-tag">${this.getGenreDisplayName(genre)}</span>`
                                    ).join('')}
                                    ${serie.genre.length > 2 ? 
                                        `<span class="similar-genre-more">+${serie.genre.length - 2}</span>` : 
                                        ''
                                    }
                                </div>
                                ${similarityInfo.isSameFranchise ? `
                                    <div class="franchise-indicator">
                                        <span class="franchise-dot"></span>
                                        Relacionado con ${similarityInfo.franchiseName}
                                    </div>
                                ` : ''}
                            </div>
                        </a>
                    `;
                }).join('')}
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
}

document.addEventListener('DOMContentLoaded', () => {
    new SerieDetails();
});