/**
 * Sistema de gestión de pedidos de oxígeno
 * Maneja el flujo de múltiples pasos y la selección de productos
 */

// Estado global del formulario
const formState = {
    currentStep: 1,
    totalSteps: 4,
    selectedCategory: null,
    selectedSubcategory: null,
    selectedProducts: [],
    selectedRecollectionType: null,
    selectedMotivo: null,
    address: {},
    deliveryDate: null
};

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
});

/**
 * Inicializa el formulario
 */
function initializeForm() {
    updateStepDisplay();
    updateNavigationButtons();
}

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    // Categorías principales
    const categoryCards = document.querySelectorAll('[data-category]');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => handleCategorySelection(card));
    });

    // Productos de equipos y descartables
    const productCards = document.querySelectorAll('[data-product]');
    productCards.forEach(card => {
        card.addEventListener('click', () => handleProductSelection(card));
    });

    // Tipo de recolección
    const recollectionCards = document.querySelectorAll('[data-recollection]');
    recollectionCards.forEach(card => {
        card.addEventListener('click', () => handleRecollectionTypeSelection(card));
    });

    // Motivo de recolección
    const motivoCards = document.querySelectorAll('[data-motivo]');
    motivoCards.forEach(card => {
        card.addEventListener('click', () => handleMotivoSelection(card));
    });

    // Botones de navegación
    document.getElementById('btn-back').addEventListener('click', handleBackButton);
    document.getElementById('btn-continue').addEventListener('click', handleContinueButton);
}

/**
 * Maneja la selección de categoría principal
 */
function handleCategorySelection(card) {
    const category = card.dataset.category;
    
    // Limpiar selecciones previas
    document.querySelectorAll('[data-category]').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    // Actualizar estado
    formState.selectedCategory = category;
    formState.selectedSubcategory = null;
    formState.selectedProducts = [];
    formState.selectedRecollectionType = null;
    formState.selectedMotivo = null;
    
    // Mostrar subcategorías correspondientes
    showSubcategories(category);
    
    // Actualizar botón continuar
    updateContinueButton();
}

/**
 * Muestra las subcategorías según la categoría seleccionada
 */
function showSubcategories(category) {
    const container = document.getElementById('subcategories-container');
    const allSubcategories = document.querySelectorAll('.subcategory-content');
    
    // Ocultar todas las subcategorías
    allSubcategories.forEach(sub => sub.classList.add('hidden'));
    
    // Mostrar la subcategoría correspondiente
    const targetSubcategory = document.getElementById(`${category}-content`);
    if (targetSubcategory) {
        container.classList.remove('hidden');
        targetSubcategory.classList.remove('hidden');
        
        // Animación
        setTimeout(() => {
            targetSubcategory.classList.add('fade-in');
        }, 10);
    }
}

/**
 * Maneja la selección de productos (equipos y descartables)
 */
function handleProductSelection(card) {
    const product = card.dataset.product;
    
    // Toggle selección
    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        formState.selectedProducts = formState.selectedProducts.filter(p => p !== product);
    } else {
        card.classList.add('selected');
        formState.selectedProducts.push(product);
    }
    
    // Actualizar botón continuar
    updateContinueButton();
}

/**
 * Maneja la selección del tipo de recolección
 */
function handleRecollectionTypeSelection(card) {
    const type = card.dataset.recollection;
    
    // Limpiar selecciones previas
    document.querySelectorAll('[data-recollection]').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    // Actualizar estado
    formState.selectedRecollectionType = type;
    formState.selectedMotivo = null;
    
    // Limpiar selección de motivo
    document.querySelectorAll('[data-motivo]').forEach(c => c.classList.remove('selected'));
    
    // Mostrar sección de motivo
    const motivoSection = document.getElementById('motivo-recoleccion');
    motivoSection.classList.remove('hidden');
    
    // Actualizar botón continuar
    updateContinueButton();
}

/**
 * Maneja la selección del motivo de recolección
 */
function handleMotivoSelection(card) {
    const motivo = card.dataset.motivo;
    
    // Limpiar selecciones previas
    document.querySelectorAll('[data-motivo]').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    // Actualizar estado
    formState.selectedMotivo = motivo;
    
    // Actualizar botón continuar
    updateContinueButton();
}

/**
 * Actualiza el estado del botón continuar
 */
function updateContinueButton() {
    const btnContinue = document.getElementById('btn-continue');
    let canContinue = false;
    
    switch(formState.currentStep) {
        case 1:
            if (formState.selectedCategory === 'equipos' || formState.selectedCategory === 'descartables') {
                canContinue = formState.selectedProducts.length > 0;
            } else if (formState.selectedCategory === 'recoleccion') {
                canContinue = formState.selectedRecollectionType !== null && formState.selectedMotivo !== null;
            }
            break;
        case 2:
        case 3:
            canContinue = true; // En los pasos 2 y 3 se puede avanzar
            break;
        case 4:
            canContinue = false; // En el paso 4 no hay botón continuar
            break;
    }
    
    btnContinue.disabled = !canContinue;
}

/**
 * Maneja el botón Regresar
 */
function handleBackButton() {
    if (formState.currentStep > 1) {
        formState.currentStep--;
        updateStepDisplay();
        updateNavigationButtons();
    } else {
        // Si está en el paso 1, volver al índice
        window.location.href = 'index.html';
    }
}

/**
 * Maneja el botón Continuar
 */
function handleContinueButton() {
    if (formState.currentStep < formState.totalSteps) {
        formState.currentStep++;
        
        // Si llegamos al paso 4, generar el resumen
        if (formState.currentStep === 4) {
            generateOrderSummary();
        }
        
        updateStepDisplay();
        updateNavigationButtons();
    }
}

/**
 * Actualiza la visualización de los pasos
 */
function updateStepDisplay() {
    // Actualizar círculos del stepper
    for (let i = 1; i <= formState.totalSteps; i++) {
        const circle = document.getElementById(`step-${i}`);
        const stepItem = circle.closest('.step-item');
        const label = stepItem.querySelector('span');
        
        circle.classList.remove('active', 'completed');
        label.classList.remove('text-[#134395]', 'text-[#5EA436]', 'text-gray-500');
        label.classList.remove('font-semibold', 'font-medium');
        
        if (i < formState.currentStep) {
            circle.classList.add('completed');
            label.classList.add('text-[#5EA436]', 'font-medium');
        } else if (i === formState.currentStep) {
            circle.classList.add('active');
            label.classList.add('text-[#134395]', 'font-semibold');
        } else {
            label.classList.add('text-gray-500', 'font-medium');
        }
    }
    
    // Mostrar/ocultar contenido de pasos
    document.querySelectorAll('.step-content').forEach((content, index) => {
        if (index + 1 === formState.currentStep) {
            content.classList.remove('hidden');
            content.classList.add('fade-in');
        } else {
            content.classList.add('hidden');
            content.classList.remove('fade-in');
        }
    });
}

/**
 * Actualiza los botones de navegación
 */
function updateNavigationButtons() {
    const btnBack = document.getElementById('btn-back');
    const btnContinue = document.getElementById('btn-continue');
    
    // Botón Regresar siempre visible
    btnBack.style.display = 'block';
    
    // Botón Continuar
    if (formState.currentStep === formState.totalSteps) {
        btnContinue.style.display = 'none';
    } else {
        btnContinue.style.display = 'block';
        updateContinueButton();
    }
}

/**
 * Genera el resumen del pedido
 */
function generateOrderSummary() {
    const summaryContainer = document.getElementById('order-summary');
    let summaryHTML = '';
    
    // Categoría
    summaryHTML += `
        <div class="bg-white rounded-xl p-4">
            <h3 class="font-bold text-[#134395] mb-2">Categoría</h3>
            <p class="text-gray-700">${getCategoryName(formState.selectedCategory)}</p>
        </div>
    `;
    
    // Productos o tipo de recolección
    if (formState.selectedCategory === 'equipos' || formState.selectedCategory === 'descartables') {
        summaryHTML += `
            <div class="bg-white rounded-xl p-4">
                <h3 class="font-bold text-[#134395] mb-2">Productos seleccionados</h3>
                <ul class="list-disc list-inside text-gray-700">
                    ${formState.selectedProducts.map(p => `<li>${getProductName(p)}</li>`).join('')}
                </ul>
            </div>
        `;
    } else if (formState.selectedCategory === 'recoleccion') {
        summaryHTML += `
            <div class="bg-white rounded-xl p-4">
                <h3 class="font-bold text-[#134395] mb-2">Tipo de recolección</h3>
                <p class="text-gray-700">${getRecollectionTypeName(formState.selectedRecollectionType)}</p>
            </div>
            <div class="bg-white rounded-xl p-4">
                <h3 class="font-bold text-[#134395] mb-2">Motivo</h3>
                <p class="text-gray-700">${getMotivoName(formState.selectedMotivo)}</p>
            </div>
        `;
    }
    
    // Información adicional (placeholder)
    summaryHTML += `
        <div class="bg-white rounded-xl p-4">
            <h3 class="font-bold text-[#134395] mb-2">Información adicional</h3>
            <p class="text-gray-700">La dirección y fecha de entrega se han guardado correctamente.</p>
        </div>
    `;
    
    summaryContainer.innerHTML = summaryHTML;
}

/**
 * Funciones auxiliares para obtener nombres legibles
 */
function getCategoryName(category) {
    const names = {
        'equipos': 'Equipos de oxígeno',
        'descartables': 'Dispositivos descartables',
        'recoleccion': 'Recolección de equipos'
    };
    return names[category] || category;
}

function getProductName(product) {
    const names = {
        'cilindro': 'Cilindro de oxígeno',
        'soporte': 'Soporte para equipo',
        'concentrador': 'Concentradores de oxígeno',
        'termo': 'Termo de oxígeno líquido',
        'canula': 'Cánula de oxígeno',
        'extension': 'Extensión 7 metros cánula',
        'humidificador': 'Humidificador de oxígeno',
        'kit-mascara': 'Kit de máscara ventury adulto oxígeno',
        'mascara-traqueo': 'Máscara de traqueostomía adulto',
        'nipel': 'Nipel conector de oxígeno'
    };
    return names[product] || product;
}

function getRecollectionTypeName(type) {
    const names = {
        'parcial': 'Recolección parcial',
        'total': 'Recolección total'
    };
    return names[type] || type;
}

function getMotivoName(motivo) {
    const names = {
        'fallecimiento': 'Fallecimiento',
        'mejoria': 'Mejoría',
        'orden-medica': 'Orden médica',
        'cambio-proveedor': 'Cambio de proveedor'
    };
    return names[motivo] || motivo;
}

// Logging para debug (opcional - remover en producción)
window.formState = formState; // Para poder ver el estado en la consola

