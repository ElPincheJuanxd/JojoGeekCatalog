// performance-detector.js - DETECTOR DE RENDIMIENTO AUTOMÁTICO
class PerformanceDetector {
    constructor() {
        this.performanceLevel = 'high';
        this.init();
    }

    init() {
        console.log('📊 Iniciando PerformanceDetector');
        this.detectPerformance();
        this.applyPerformanceSettings();
    }

    detectPerformance() {
        // Detectar dispositivos de bajos recursos
        const isLowEndDevice = (
            navigator.hardwareConcurrency <= 2 || // 2 o menos núcleos
            (navigator.deviceMemory && navigator.deviceMemory <= 2) || // 2GB o menos RAM
            !('IntersectionObserver' in window) || // APIs modernas faltantes
            window.innerWidth <= 360 // Pantalla muy pequeña
        );

        // Detectar conexiones lentas
        const isSlowConnection = (
            navigator.connection && (
                navigator.connection.saveData || // Modo ahorro de datos activado
                navigator.connection.effectiveType.includes('2g') || // 2G
                navigator.connection.effectiveType.includes('3g') || // 3G
                navigator.connection.downlink <= 1 // Menos de 1 Mbps
            )
        );

        if (isLowEndDevice || isSlowConnection) {
            this.performanceLevel = 'low';
            console.warn('📱 Dispositivo de bajo rendimiento detectado - Activando modo optimizado');
        } else {
            console.log('🚀 Dispositivo de alto rendimiento - Modo normal');
        }
    }

    applyPerformanceSettings() {
        if (this.performanceLevel === 'low') {
            this.enablePowerSaveMode();
            this.reduceImageQuality();
            this.disableHeavyAnimations();
        }
    }

    enablePowerSaveMode() {
        // Activar clase CSS para modo ahorro de energía
        document.documentElement.classList.add('power-save-mode');
        console.log('💡 Modo ahorro de energía activado');
    }

    reduceImageQuality() {
        // Reducir carga concurrente de imágenes
        if (window.optimizedImageLoader) {
            window.optimizedImageLoader.maxConcurrentLoads = 1;
            console.log('🖼️ Carga de imágenes optimizada para bajo rendimiento');
        }
    }

    disableHeavyAnimations() {
        // Las animaciones pesadas se desactivan via CSS
        console.log('🎬 Animaciones pesadas desactivadas');
    }

    getPerformanceLevel() {
        return this.performanceLevel;
    }

    isLowPerformance() {
        return this.performanceLevel === 'low';
    }
}

// Inicializar automáticamente
window.performanceDetector = new PerformanceDetector();