/**
 * Sistema de carga de componentes reutilizables
 * Carga dinámicamente el navbar y footer en todas las páginas
 * 
 * Este script funciona en cualquier entorno (con o sin servidor)
 */

// Templates de componentes embebidos
const COMPONENTS = {
    navbar: `<header class="bg-white rounded-b-3xl fixed top-0 left-0 right-0 z-50 w-full">
    <!-- Barra superior -->
    <div class="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-50">
        <!-- Botón hamburguesa (solo móvil y tablet) -->
        <button id="menuToggle" class="lg:hidden text-gray-700 hover:text-blue-900 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>

        <!-- Logo -->
        <div class="flex items-center">
            <img src="assets/img/logo/2ce674c2cf5f16cf041c8891ac7a2059c31cc429.png" alt="Messer - Gases for Life"
                class="h-8 md:h-12">
        </div>

        <!-- Usuario y botón de cerrar sesión -->
        <div class="flex items-center gap-2 md:gap-6">
            <!-- Usuario - oculto en móvil, visible en tablet y desktop -->
            <div class="hidden sm:flex items-center gap-2 text-gray-700">
                <img src="assets/img/icons/user.svg" alt="Messer - Gases for Life" class="h-5 md:h-6">
                <span class="font-medium text-sm md:text-base">Nombre Apellido</span>
            </div>
            <!-- Botón cerrar sesión -->
            <button
                class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-3 py-1.5 md:px-6 md:py-2.5 rounded-full transition-colors text-sm md:text-base">
                <span class="hidden sm:inline">Cerrar sesión</span>
                <span class="sm:hidden">Salir</span>
            </button>
        </div>
    </div>

    <!-- Menú de navegación desktop -->
    <nav class="hidden lg:block px-6 py-4">
        <ul class="flex items-center justify-around gap-12">
            <li>
                <a href="datos-paciente.html" class="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors group">
                    <span class="font-medium">Datos del paciente</span>
                    <div
                        class="w-4 h-4 rounded-full flex items-center justify-center group-hover:border-blue-900 transition-colors">
                        <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-12">
                    </div>
                </a>
            </li>
            <li>
                <button class="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors group">
                    <span class="font-medium">Solicitudes</span>
                    <div
                        class="w-4 h-4 rounded-full flex items-center justify-center group-hover:border-blue-900 transition-colors">
                        <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-12">
                    </div>
                </button>
            </li>
            <li>
                <button class="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors group">
                    <span class="font-medium">Pedidos</span>
                    <div
                        class="w-4 h-4 rounded-full flex items-center justify-center group-hover:border-blue-900 transition-colors">
                        <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-12">
                    </div>
                </button>
            </li>
            <li>
                <button class="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors group">
                    <span class="font-medium">Consultas</span>
                    <div
                        class="w-4 h-4 rounded-full flex items-center justify-center group-hover:border-blue-900 transition-colors">
                        <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-12">
                    </div>
                </button>
            </li>
            <li>
                <button class="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors group">
                    <span class="font-medium">Tutoriales</span>
                    <div
                        class="w-4 h-4 rounded-full flex items-center justify-center group-hover:border-blue-900 transition-colors">
                        <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-12">
                    </div>
                </button>
            </li>
        </ul>
    </nav>

    <!-- Menú móvil/tablet (desplegable) -->
    <nav id="mobileMenu" class="lg:hidden hidden px-4 py-4 bg-white rounded-b-3xl">
        <!-- Usuario en móvil -->
        <div class="sm:hidden flex items-center gap-2 text-gray-700 pb-4 mb-4 border-b border-gray-200">
            <img src="assets/img/icons/user.svg" alt="Messer - Gases for Life" class="h-5">
            <span class="font-medium text-sm">Nombre Apellido</span>
        </div>
        
        <ul class="space-y-3">
            <li>
                <a href="datos-paciente.html" class="w-full flex items-center justify-between gap-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors p-3 rounded-lg group">
                    <span class="font-medium">Datos del paciente</span>
                    <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-6">
                </a>
            </li>
            <li>
                <button class="w-full flex items-center justify-between gap-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors p-3 rounded-lg group">
                    <span class="font-medium">Solicitudes</span>
                    <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-6">
                </button>
            </li>
            <li>
                <button class="w-full flex items-center justify-between gap-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors p-3 rounded-lg group">
                    <span class="font-medium">Pedidos</span>
                    <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-6">
                </button>
            </li>
            <li>
                <button class="w-full flex items-center justify-between gap-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors p-3 rounded-lg group">
                    <span class="font-medium">Consultas</span>
                    <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-6">
                </button>
            </li>
            <li>
                <button class="w-full flex items-center justify-between gap-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors p-3 rounded-lg group">
                    <span class="font-medium">Tutoriales</span>
                    <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-6">
                </button>
            </li>
        </ul>
    </nav>
</header>`,
    
    footer: `<footer class="bg-[#134395] text-white py-16 lg:py-24 px-6 rounded-t-3xl">
    <div class="container mx-auto max-w-7xl">
        <div class="footer-grid">
            <!-- Columna 1: Logo y branding -->
            <div class="footer-brand">
                <div class="mb-6">
                    <img src="assets/img/logo/logo-3.png" alt="Messer - Gases for Life" class="h-16 mb-6">
                </div>
                <h3 class="text-2xl font-bold mb-2">Messer Colombia</h3>
                <p class="text-white/80 text-lg">Portal Web Pacientes</p>
            </div>

            <!-- Columna 2: Realiza en este portal -->
            <div class="footer-links">
                <h3 class="text-2xl font-bold mb-6">Realiza en este portal</h3>
                <div class="footer-links-grid">
                    <div class="space-y-3">
                        <a href="#" class="block hover:text-white/80 transition-colors">Cambios de datos</a>
                        <a href="#" class="block hover:text-white/80 transition-colors">Solicitud de citas</a>
                        <a href="#" class="block hover:text-white/80 transition-colors">Pedido de equipos</a>
                        <a href="#" class="block hover:text-white/80 transition-colors">Consulta de estudios</a>
                    </div>
                    <div class="space-y-3">
                        <a href="#" class="block hover:text-white/80 transition-colors">Descarga de documentos</a>
                        <a href="#" class="block hover:text-white/80 transition-colors">Ver tutoriales</a>
                        <a href="#" class="block hover:text-white/80 transition-colors">Firma de comprobantes</a>
                        <a href="#" class="block hover:text-white/80 transition-colors">Pago de servicios</a>
                    </div>
                </div>
            </div>

            <!-- Columna 3: Contáctanos -->
            <div class="footer-contact">
                <h3 class="text-2xl font-bold mb-6">Contáctanos</h3>
                <div class="space-y-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                            <img src="assets/img/icons/Frame (11).svg" alt="phone" class="">
                        </div>
                        <div>
                            <p class="text-lg">Tel. 018000-124242</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                            <img src="assets/img/icons/Vector (13).svg" alt="location" class="">
                        </div>
                        <div>
                            <p class="text-lg">Calle 11 No. 68-32</p>
                            <p class="text-lg">Bogotá, Colombia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>`
};

// Función para cargar componente desde templates embebidos
function loadComponent(componentName, targetId) {
    return new Promise((resolve) => {
        try {
            const targetElement = document.getElementById(targetId);
            if (!targetElement) {
                console.error(`Elemento con id="${targetId}" no encontrado`);
                resolve(false);
                return;
            }
            
            const componentHTML = COMPONENTS[componentName];
            if (!componentHTML) {
                console.error(`Componente "${componentName}" no encontrado`);
                resolve(false);
                return;
            }
            
            targetElement.innerHTML = componentHTML;
            resolve(true);
        } catch (error) {
            console.error(`Error al cargar componente ${componentName}:`, error);
            resolve(false);
        }
    });
}

// Función para inicializar la funcionalidad del menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuToggle || !mobileMenu) {
        console.warn('Elementos del menú móvil no encontrados');
        return;
    }
    
    menuToggle.addEventListener('click', function() {
        // Alternar la visibilidad del menú
        mobileMenu.classList.toggle('hidden');
        
        // Cambiar el icono del botón hamburguesa
        const icon = menuToggle.querySelector('svg path');
        if (mobileMenu.classList.contains('hidden')) {
            // Icono de hamburguesa (3 líneas)
            icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            // Icono de cerrar (X)
            icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    });
    
    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('svg path');
            if (icon) {
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        }
    });
}

// Función principal que carga todos los componentes
async function loadAllComponents() {
    try {
        // Cargar navbar y footer en paralelo
        const [navbarLoaded, footerLoaded] = await Promise.all([
            loadComponent('navbar', 'navbar-container'),
            loadComponent('footer', 'footer-container')
        ]);
        
        // Inicializar funcionalidad del menú móvil después de cargar el navbar
        if (navbarLoaded) {
            initMobileMenu();
        }
        
        console.log('Componentes cargados exitosamente');
    } catch (error) {
        console.error('Error al cargar componentes:', error);
    }
}

// Cargar componentes cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    // El DOM ya está cargado
    loadAllComponents();
}

