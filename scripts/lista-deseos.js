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
        // 🆕 Disparar evento global para sincronizar todas las páginas
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
        
        // 🆕 También disparar storage event para sincronizar entre pestañas
        const storageEvent = new StorageEvent('storage', {
            key: 'seriesWishlist',
            newValue: JSON.stringify(this.wishlist)
        });
        window.dispatchEvent(storageEvent);
    }

    getWishlistSeries(allSeries) {
        return this.wishlist.map(id => 
            allSeries.find(serie => serie.id === id)
        ).filter(serie => serie !== undefined);
    }
}

class WishlistPage {
    constructor() {
        this.series = seriesData;
        this.wishlistManager = new WishlistManager();
        this.init();
    }

    init() {
        this.wishlistManager.updateAllWishlistCounts();
        this.updateNewsBadge(); // 🆕 AGREGADA ESTA LÍNEA
        this.renderWishlist();
        this.setupEventListeners();
    }

    // 🆕 MÉTODO PARA DETECTAR PELÍCULAS
    isMovie(serie) {
        return serie.genre.some(g => 
            g.toLowerCase().includes('película') || 
            g.toLowerCase().includes('pelicula') ||
            g.toLowerCase().includes('movie')
        );
    }

    renderWishlist() {
        const wishlistGrid = document.getElementById('wishlistGrid');
        const emptyWishlist = document.getElementById('emptyWishlist');
        const seriesCount = document.getElementById('seriesCount');
        
        const wishlistSeries = this.wishlistManager.getWishlistSeries(this.series);
        
        // Actualizar estadísticas
        seriesCount.textContent = wishlistSeries.length;
        
        // Mostrar/ocultar estado vacío
        if (wishlistSeries.length === 0) {
            wishlistGrid.style.display = 'none';
            emptyWishlist.style.display = 'block';
            return;
        } else {
            wishlistGrid.style.display = 'grid';
            emptyWishlist.style.display = 'none';
        }

        // Renderizar series
        wishlistGrid.innerHTML = wishlistSeries.map(serie => `
            <div class="wishlist-item" data-serie-id="${serie.id}">
                <div class="wishlist-item-header">
                    <img src="../${serie.poster}" 
                         alt="${serie.title}" 
                         class="wishlist-item-poster">
                    <button class="remove-btn" data-serie-id="${serie.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" 
                                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="wishlist-item-info">
                    <h3 class="wishlist-item-title">${serie.title}</h3>
                    <div class="wishlist-item-meta">
                        <span>${serie.year}</span>
                        <span>
                            ${this.isMovie(serie) ? 'Película' : `${serie.seasons} temporada${serie.seasons > 1 ? 's' : ''}`}
                        </span>
                    </div>
                    <div class="wishlist-item-genres">
                        ${serie.genre.map(genre => 
                            `<span class="wishlist-genre-tag">${this.getGenreDisplayName(genre)}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const serieId = parseInt(btn.dataset.serieId);
                this.removeFromWishlist(serieId);
            });
        });

        // Agregar eventos para navegar a los detalles
        document.querySelectorAll('.wishlist-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.remove-btn')) {
                    const serieId = parseInt(item.dataset.serieId);
                    window.location.href = `serie.html?id=${serieId}`;
                }
            });
        });
    }

    removeFromWishlist(serieId) {
        this.wishlistManager.removeFromWishlist(serieId);
        this.renderWishlist();
    }

    setupEventListeners() {
        // Escuchar actualizaciones de wishlist desde otras páginas
        window.addEventListener('wishlistUpdated', () => {
            this.wishlistManager.updateAllWishlistCounts();
            this.renderWishlist();
        });
        
        // Escuchar cambios en localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'seriesWishlist') {
                this.wishlistManager.updateAllWishlistCounts();
                this.renderWishlist();
            }
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
            'misterio': 'Misterio'
        };
        return names[genre] || genre;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WishlistPage();
});