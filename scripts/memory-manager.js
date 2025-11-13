// memory-manager.js - GESTOR DE MEMORIA OPTIMIZADO
class MemoryManager {
    constructor() {
        this.cleanupInterval = null;
        this.init();
    }

    init() {
        console.log('🧹 Iniciando MemoryManager');
        
        // Limpiar memoria cada 30 segundos
        this.cleanupInterval = setInterval(() => {
            this.cleanupMemory();
        }, 30000);

        // Limpiar al salir de la página
        window.addEventListener('beforeunload', () => {
            this.forceCleanup();
        });

        // Limpiar cuando la app se minimiza
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.cleanupMemory();
            }
        });
    }

    cleanupMemory() {
        // Limpiar cache de imágenes Blob
        this.cleanupImageCache();
        
        // Forzar garbage collection si está disponible
        if (window.gc) {
            window.gc();
        }
        
        console.log('🧹 Memoria limpiada');
    }

    cleanupImageCache() {
        // Limpiar URLs Blob de imágenes
        const images = document.querySelectorAll('img[src^="blob:"]');
        let cleaned = 0;
        
        images.forEach(img => {
            try {
                URL.revokeObjectURL(img.src);
                cleaned++;
            } catch (e) {
                // Ignorar errores en URLs inválidas
            }
        });
        
        if (cleaned > 0) {
            console.log(`🗑️ Liberadas ${cleaned} URLs Blob`);
        }
    }

    forceCleanup() {
        // Limpieza completa al salir
        this.cleanupMemory();
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        console.log('🧹 Limpieza final completada');
    }
}

// Inicializar automáticamente
window.memoryManager = new MemoryManager();