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
            <li class="relative dropdown-container">
                <button class="dropdown-toggle flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors group">
                    <span class="font-medium">Pedidos</span>
                    <div
                        class="w-4 h-4 rounded-full flex items-center justify-center group-hover:border-blue-900 transition-colors">
                        <img src="assets/img/icons/menu-item.svg" alt="Messer - Gases for Life" class="h-12">
                    </div>
                </button>
                <div class="dropdown-menu hidden absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg py-2 min-w-[220px] z-50">
                    <a href="pedidos.html" class="block px-4 py-3 text-gray-700 hover:bg-[#E9F1FF] hover:text-blue-900 transition-colors">
                        <span class="font-medium">Sigue tus pedidos</span>
                    </a>
                    <a href="historial-pedidos.html" class="block px-4 py-3 text-gray-700 hover:bg-[#E9F1FF] hover:text-blue-900 transition-colors">
                        <span class="font-medium">Historial de pedidos</span>
                    </a>
                </div>
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
            <li class="mobile-dropdown-container">
                <button class="mobile-dropdown-toggle w-full flex items-center justify-between gap-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 transition-colors p-3 rounded-lg group">
                    <span class="font-medium">Pedidos</span>
                    <svg class="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="mobile-dropdown-content hidden pl-6 mt-2 space-y-2">
                    <a href="pedidos.html" class="block text-gray-600 hover:text-blue-900 transition-colors py-2">
                        <span class="font-medium">Sigue tus pedidos</span>
                    </a>
                    <a href="historial-pedidos.html" class="block text-gray-600 hover:text-blue-900 transition-colors py-2">
                        <span class="font-medium">Historial de pedidos</span>
                    </a>
                </div>
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
</footer>`,
    
    // Navegación temporal - SOLO PARA DEMO (quitar antes de producción)
    tempNav: `<div id="temp-nav" class="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] transition-all duration-300">
    <button id="temp-nav-toggle" class="bg-[#134395] text-white px-4 py-3 rounded-l-lg shadow-lg hover:bg-[#0f3275] transition-colors flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <span class="hidden sm:inline">Navegación</span>
    </button>
    <div id="temp-nav-panel" class="hidden bg-white shadow-2xl rounded-l-lg border border-gray-200 p-4 min-w-[220px] max-h-[80vh] overflow-y-auto">
        <div class="mb-3 pb-3 border-b border-gray-200">
            <h3 class="font-bold text-[#134395] text-sm">NAVEGACIÓN TEMPORAL</h3>
            <p class="text-xs text-gray-500 mt-1">Para demo</p>
        </div>
        <nav class="space-y-1">
            <a href="index.html" class="block px-3 py-2 text-sm text-gray-700 hover:bg-[#E9F1FF] hover:text-[#134395] rounded transition-colors">Inicio</a>
            <a href="datos-paciente.html" class="block px-3 py-2 text-sm text-gray-700 hover:bg-[#E9F1FF] hover:text-[#134395] rounded transition-colors">Datos del Paciente</a>
            <a href="agendar-cita.html" class="block px-3 py-2 text-sm text-gray-700 hover:bg-[#E9F1FF] hover:text-[#134395] rounded transition-colors">Agendar Cita</a>
            <a href="oxigeno.html" class="block px-3 py-2 text-sm text-gray-700 hover:bg-[#E9F1FF] hover:text-[#134395] rounded transition-colors">Oxígeno</a>
            <a href="pedidos.html" class="block px-3 py-2 text-sm text-gray-700 hover:bg-[#E9F1FF] hover:text-[#134395] rounded transition-colors">Pedidos</a>
            <a href="pedido-detalle.html" class="block px-3 py-2 text-sm text-gray-700 hover:bg-[#E9F1FF] hover:text-[#134395] rounded transition-colors">Detalle Pedido</a>
            <a href="historial-pedidos.html" class="block px-3 py-2 text-sm text-gray-700 hover:bg-[#E9F1FF] hover:text-[#134395] rounded transition-colors">Historial Pedidos</a>
        </nav>
    </div>
</div>`
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

// Función para inicializar dropdowns en el menú desktop
function initDesktopDropdowns() {
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    
    dropdownContainers.forEach(container => {
        const toggle = container.querySelector('.dropdown-toggle');
        const menu = container.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Mostrar dropdown al pasar el mouse
        container.addEventListener('mouseenter', () => {
            menu.classList.remove('hidden');
        });
        
        // Ocultar dropdown al salir el mouse
        container.addEventListener('mouseleave', () => {
            menu.classList.add('hidden');
        });
        
        // Toggle en click
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            menu.classList.toggle('hidden');
        });
    });
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
        }
    });
}

// Función para inicializar dropdowns en el menú móvil
function initMobileDropdowns() {
    const mobileDropdownContainers = document.querySelectorAll('.mobile-dropdown-container');
    
    mobileDropdownContainers.forEach(container => {
        const toggle = container.querySelector('.mobile-dropdown-toggle');
        const content = container.querySelector('.mobile-dropdown-content');
        const icon = toggle.querySelector('svg');
        
        if (!toggle || !content) return;
        
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle el contenido
            content.classList.toggle('hidden');
            
            // Rotar el icono
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });
}

// Función para cargar navegación temporal directamente en el body
function loadTempNav() {
    try {
        const tempNavHTML = COMPONENTS.tempNav;
        if (!tempNavHTML) {
            console.warn('Navegación temporal no encontrada');
            return false;
        }
        
        // Verificar si ya existe
        if (document.getElementById('temp-nav')) {
            return true;
        }
        
        // Insertar HTML directamente en el body
        document.body.insertAdjacentHTML('beforeend', tempNavHTML);
        
        // Inicializar toggle de navegación temporal después de insertar
        setTimeout(() => {
            const toggle = document.getElementById('temp-nav-toggle');
            const panel = document.getElementById('temp-nav-panel');
            
            if (toggle && panel) {
                toggle.addEventListener('click', () => {
                    panel.classList.toggle('hidden');
                });
            }
        }, 0);
        
        return true;
    } catch (error) {
        console.error('Error al cargar navegación temporal:', error);
        return false;
    }
}

// Función principal que carga todos los componentes
async function loadAllComponents() {
    try {
        // Cargar navbar, footer y navegación temporal en paralelo
        const [navbarLoaded, footerLoaded, tempNavLoaded] = await Promise.all([
            loadComponent('navbar', 'navbar-container'),
            loadComponent('footer', 'footer-container'),
            Promise.resolve(loadTempNav())
        ]);
        
        // Inicializar funcionalidad del menú móvil después de cargar el navbar
        if (navbarLoaded) {
            initMobileMenu();
            initDesktopDropdowns();
            initMobileDropdowns();
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

