// SISTEMA DE NOTICIAS SIMPLIFICADO - SIN USUARIOS/COMENTARIOS

class NewsManager {
    constructor() {
        this.noticias = noticiasData;
        this.noticiasLeidas = this.loadReadStatus();
        this.filterActual = 'all';
        this.init();
    }

    init() {
        this.renderNoticias();
        this.setupEventListeners();
        this.updateStats();
    }

    loadReadStatus() {
        const saved = localStorage.getItem('newsReadStatus');
        return saved ? JSON.parse(saved) : {};
    }

    renderNoticias() {
        const grid = document.getElementById('noticiasGrid');
        const emptyState = document.getElementById('emptyNoticias');
        
        const noticiasFiltradas = this.filtrarNoticias();

        if (noticiasFiltradas.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        
        grid.innerHTML = noticiasFiltradas.map(noticia => this.createNoticiaCard(noticia)).join('');
    }

    filtrarNoticias() {
        let filtradas = [...this.noticias];
        if (this.filterActual !== 'all') {
            filtradas = filtradas.filter(noticia => noticia.tipo === this.filterActual);
        }
        filtradas.sort((a, b) => {
            if (a.destacada && !b.destacada) return -1;
            if (!a.destacada && b.destacada) return 1;
            return new Date(b.fecha) - new Date(a.fecha);
        });
        return filtradas;
    }

    createNoticiaCard(noticia) {
        const esLeida = this.noticiasLeidas[noticia.id];
        const seriesRelacionadas = noticia.seriesRelacionadas || [];
        const seriesCount = seriesRelacionadas.length;
        
        return `
            <div class="noticia-card ${noticia.destacada ? 'destacada' : ''} ${esLeida ? 'leida' : ''}" 
                 data-noticia-id="${noticia.id}">
                ${noticia.destacada ? '<div class="noticia-badge destacada">Destacada</div>' : ''}
                <div class="noticia-badge ${noticia.tipo}">${this.getTipoDisplay(noticia.tipo)}</div>
                
                <img src="../${noticia.imagen}" 
                     alt="${noticia.titulo}" 
                     class="noticia-imagen"
                     onerror="this.src='../assets/images/noticias/default-news.jpg'">
                
                <div class="noticia-contenido">
                    <div class="noticia-header">
                        <h3 class="noticia-titulo">${noticia.titulo}</h3>
                        <div class="noticia-meta">
                            <span class="noticia-fecha">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                ${this.formatFecha(noticia.fecha)}
                            </span>
                        </div>
                    </div>
                    
                    <p class="noticia-resumen">${noticia.resumen}</p>
                    
                    <div class="noticia-footer">
                        <div class="noticia-series">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" 
                                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span class="series-count">${seriesCount} serie${seriesCount !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getTipoDisplay(tipo) {
        const tipos = {
            'anuncio': 'Anuncio',
            'trailer': 'Tráiler',
            'noticia': 'Noticia'
        };
        return tipos[tipo] || tipo;
    }

    formatFecha(fechaStr) {
        const fecha = new Date(fechaStr);
        const hoy = new Date();
        const ayer = new Date(hoy);
        ayer.setDate(ayer.getDate() - 1);

        if (fecha.toDateString() === hoy.toDateString()) {
            return 'Hoy';
        } else if (fecha.toDateString() === ayer.toDateString()) {
            return 'Ayer';
        } else {
            return fecha.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.handleFilterChange(filter);
            });
        });

        document.addEventListener('click', (e) => {
            const noticiaCard = e.target.closest('.noticia-card');
            if (noticiaCard) {
                const noticiaId = parseInt(noticiaCard.dataset.noticiaId);
                this.openNoticia(noticiaId);
            }
        });
    }

    handleFilterChange(filter) {
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.remove('active');
        });
        
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.filterActual = filter;
        this.renderNoticias();
    }

    openNoticia(noticiaId) {
        // Marcar como leída y guardar
        this.noticiasLeidas[noticiaId] = true;
        localStorage.setItem('newsReadStatus', JSON.stringify(this.noticiasLeidas));
        
        // Redirigir a la página de detalle
        window.location.href = `noticia-detalle.html?id=${noticiaId}`;
    }

    updateStats() {
        const noticiasNoLeidas = this.noticias.filter(noticia => !this.noticiasLeidas[noticia.id]).length;
        const newsBadge = document.querySelector('.noticias-count');
        if (newsBadge && noticiasNoLeidas > 0) {
            newsBadge.textContent = noticiasNoLeidas;
            newsBadge.classList.add('visible');
        }
    }
}

// SISTEMA DE WISHLIST PARA NOTICIAS
class NewsWishlistManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateWishlistBadge();
        this.setupWishlistListeners();
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

    setupWishlistListeners() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'seriesWishlist') {
                this.updateWishlistBadge();
            }
        });

        window.addEventListener('wishlistUpdated', () => {
            this.updateWishlistBadge();
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new NewsManager();
    new NewsWishlistManager();
});