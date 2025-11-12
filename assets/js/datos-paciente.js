/**
 * Sistema de tabs para Datos del Paciente
 * Maneja la navegación entre las diferentes secciones del formulario
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeDerechosDeberes();
});

/**
 * Inicializa el sistema de tabs
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            // Agregar clase active al botón y contenido seleccionado
            button.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
                
                // Scroll suave al inicio del contenido
                targetContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

/**
 * Inicializa el toggle de Derechos/Deberes
 */
function initializeDerechosDeberes() {
    const toggleButtons = document.querySelectorAll('.derechos-deberes-toggle');
    const toggleContents = {
        'derechos': document.getElementById('derechos-content'),
        'deberes': document.getElementById('deberes-content')
    };
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toggleType = button.dataset.toggle;
            
            // Remover clase active de todos los botones
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ocultar todo el contenido
            Object.values(toggleContents).forEach(content => {
                if (content) content.classList.add('hidden');
            });
            
            // Activar el botón y mostrar el contenido seleccionado
            button.classList.add('active');
            if (toggleContents[toggleType]) {
                toggleContents[toggleType].classList.remove('hidden');
            }
        });
    });
}

// Manejo de formularios (opcional - para futuras implementaciones)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', form.id || 'sin id');
        // Aquí puedes agregar la lógica para enviar los datos al servidor
        alert('Información guardada correctamente');
    });
});

