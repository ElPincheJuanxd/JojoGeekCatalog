class NoticiaDetalle {
    constructor() {
        this.noticias = noticiasData;
        this.series = seriesData;
        this.currentNoticia = null;
        this.init();
    }

    init() {
        this.loadNoticiaFromURL();
        this.renderNoticiaDetalle();
        this.updateWishlistBadge();
        this.setupEventListeners();
    }

    loadNoticiaFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const noticiaId = parseInt(urlParams.get('id'));
        
        this.currentNoticia = this.noticias.find(noticia => noticia.id === noticiaId);
        
        if (!this.currentNoticia) {
            window.location.href = 'noticias.html';
            return;
        }

        // Marcar como leída
        this.marcarComoLeida(noticiaId);
    }

    marcarComoLeida(noticiaId) {
        const noticiasLeidas = JSON.parse(localStorage.getItem('newsReadStatus') || '{}');
        noticiasLeidas[noticiaId] = true;
        localStorage.setItem('newsReadStatus', JSON.stringify(noticiasLeidas));
        
        // Actualizar badge en todas las páginas
        window.dispatchEvent(new CustomEvent('newsReadStatusUpdated'));
    }

    renderNoticiaDetalle() {
        if (!this.currentNoticia) return;

        this.renderHero();
        this.renderContenido();
        this.renderNoticiasRelacionadas();
    }

    renderHero() {
        const hero = document.getElementById('noticiaHero');
        
        hero.innerHTML = `
            <div class="hero-content-detalle">
                <img src="../${this.currentNoticia.imagen}" 
                     alt="${this.currentNoticia.titulo}" 
                     class="hero-poster-detalle"
                     onerror="this.src='../assets/images/noticias/default-news.jpg'">
                <div class="hero-text-detalle">
                    <div class="badges-container">
                        <span class="noticia-badge ${this.currentNoticia.tipo}">
                            ${this.getTipoDisplay(this.currentNoticia.tipo)}
                        </span>
                        ${this.currentNoticia.destacada ? 
                            '<span class="noticia-badge destacada">Destacada</span>' : ''}
                    </div>
                    <h1>${this.currentNoticia.titulo}</h1>
                    <div class="hero-meta-detalle">
                        <div class="meta-item-detalle">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ${this.formatFecha(this.currentNoticia.fecha)}
                        </div>
                        ${this.currentNoticia.seriesRelacionadas && this.currentNoticia.seriesRelacionadas.length > 0 ? `
                            <div class="meta-item-detalle">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" 
                                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                ${this.currentNoticia.seriesRelacionadas.length} serie${this.currentNoticia.seriesRelacionadas.length !== 1 ? 's' : ''} relacionada${this.currentNoticia.seriesRelacionadas.length !== 1 ? 's' : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderContenido() {
        const content = document.getElementById('noticiaContent');
        
        // 🆕 VIDEO ARRIBA DEL TODO PARA TRÁILERS
        let videoHTML = '';
        if (this.currentNoticia.videoId && this.currentNoticia.tipo === 'trailer') {
            videoHTML = `
                <div class="trailer-principal">
                    <h3>🎬 Mira el Tráiler</h3>
                    <div class="video-container principal">
                        <iframe src="https://www.youtube.com/embed/${this.currentNoticia.videoId}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                </div>
            `;
        }

        let seriesHTML = '';
        if (this.currentNoticia.seriesRelacionadas && this.currentNoticia.seriesRelacionadas.length > 0) {
            const seriesRelacionadas = this.getSeriesRelacionadas();
            seriesHTML = `
                <div class="series-relacionadas-detalle">
                    <h3>Series Relacionadas</h3>
                    <div class="series-links">
                        ${seriesRelacionadas.map(serie => `
                            <a href="serie.html?id=${serie.id}" class="serie-link">
                                <img src="../${serie.poster}" alt="${serie.title}">
                                <span>${serie.title}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        content.innerHTML = `
            ${videoHTML}
            <div class="noticia-texto">
                ${this.formatContenido(this.currentNoticia.contenido)}
            </div>
            ${seriesHTML}
        `;
    }

    renderNoticiasRelacionadas() {
        const container = document.getElementById('noticiasRelacionadas');
        const relatedGrid = document.getElementById('relatedGrid');
        
        const noticiasRelacionadas = this.getNoticiasRelacionadas();
        
        if (noticiasRelacionadas.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        relatedGrid.innerHTML = noticiasRelacionadas.map(noticia => `
            <div class="related-card" data-noticia-id="${noticia.id}">
                <img src="../${noticia.imagen}" 
                     alt="${noticia.titulo}" 
                     class="related-poster"
                     onerror="this.src='../assets/images/noticias/default-news.jpg'">
                <div class="related-info">
                    <div class="related-title">${noticia.titulo}</div>
                    <div class="related-fecha">${this.formatFecha(noticia.fecha)}</div>
                </div>
            </div>
        `).join('');
    }

    getSeriesRelacionadas() {
        if (!this.currentNoticia.seriesRelacionadas) return [];
        
        return this.currentNoticia.seriesRelacionadas
            .map(serieId => this.series.find(serie => serie.id === serieId))
            .filter(serie => serie !== undefined);
    }

    getNoticiasRelacionadas() {
        return this.noticias
            .filter(noticia => 
                noticia.id !== this.currentNoticia.id &&
                noticia.seriesRelacionadas && 
                noticia.seriesRelacionadas.some(serieId => 
                    this.currentNoticia.seriesRelacionadas.includes(serieId)
                )
            )
            .slice(0, 3);
    }

    formatContenido(contenido) {
        return contenido.split('\n\n').map(parrafo => 
            `<p>${parrafo.trim()}</p>`
        ).join('');
    }

    formatFecha(fechaStr) {
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    getTipoDisplay(tipo) {
        const tipos = {
            'anuncio': 'Anuncio',
            'trailer': 'Tráiler',
            'noticia': 'Noticia'
        };
        return tipos[tipo] || tipo;
    }

    updateWishlistBadge() {
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

    setupEventListeners() {
        // Navegación a noticias relacionadas
        document.addEventListener('click', (e) => {
            const relatedCard = e.target.closest('.related-card');
            if (relatedCard) {
                const noticiaId = parseInt(relatedCard.dataset.noticiaId);
                window.location.href = `noticia-detalle.html?id=${noticiaId}`;
            }
        });

        // Escuchar cambios en wishlist
        window.addEventListener('wishlistUpdated', () => {
            this.updateWishlistBadge();
        });

        window.addEventListener('storage', (e) => {
            if (e.key === 'seriesWishlist') {
                this.updateWishlistBadge();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NoticiaDetalle();
});