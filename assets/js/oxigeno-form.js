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
    selectedAddress: null,
    nuevaDireccion: null,
    deliveryDate: null,
    deliveryDateText: null
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
    generarFechasDisponibles();
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

    // Direcciones
    const direccionCards = document.querySelectorAll('.direccion-card');
    direccionCards.forEach(card => {
        card.addEventListener('click', () => handleDireccionSelection(card));
    });

    // Agregar nueva dirección
    const agregarDireccionBtn = document.getElementById('agregar-direccion-btn');
    if (agregarDireccionBtn) {
        agregarDireccionBtn.addEventListener('click', handleAgregarDireccion);
    }

    // Cancelar nueva dirección
    const cancelarDireccionBtn = document.getElementById('cancelar-direccion-btn');
    if (cancelarDireccionBtn) {
        cancelarDireccionBtn.addEventListener('click', handleCancelarDireccion);
    }

    // Formulario de nueva dirección
    const formNuevaDireccion = document.getElementById('form-nueva-direccion');
    if (formNuevaDireccion) {
        formNuevaDireccion.addEventListener('submit', handleGuardarDireccion);
    }

    // Botones del resumen (paso 4)
    const btnBackResumen = document.getElementById('btn-back-resumen');
    if (btnBackResumen) {
        btnBackResumen.addEventListener('click', handleBackButton);
    }

    const btnConfirmarPedido = document.getElementById('btn-confirmar-pedido');
    if (btnConfirmarPedido) {
        btnConfirmarPedido.addEventListener('click', handleConfirmarPedido);
    }

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
 * Maneja la selección de dirección
 */
function handleDireccionSelection(card) {
    const direccion = card.dataset.direccion;
    
    // Limpiar selecciones previas
    document.querySelectorAll('.direccion-card').forEach(c => {
        c.classList.remove('selected', 'border-[#134395]');
        c.classList.add('border-gray-200');
        // Ocultar el punto de selección
        const radioInner = c.querySelector('.direccion-radio > div > div');
        if (radioInner) radioInner.classList.add('hidden');
    });
    
    // Marcar la tarjeta como seleccionada
    card.classList.add('selected', 'border-[#134395]');
    card.classList.remove('border-gray-200');
    
    // Mostrar el punto de selección
    const radioInner = card.querySelector('.direccion-radio > div > div');
    if (radioInner) radioInner.classList.remove('hidden');
    
    // Actualizar estado
    formState.selectedAddress = direccion;
    
    // Actualizar botón continuar
    updateContinueButton();
}

/**
 * Maneja el botón de agregar nueva dirección
 */
function handleAgregarDireccion() {
    const form = document.getElementById('nueva-direccion-form');
    const agregarBtn = document.getElementById('agregar-direccion-btn');
    
    // Mostrar el formulario con animación
    if (form) {
        form.classList.remove('hidden');
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        // Opcional: ocultar el botón de agregar mientras se muestra el formulario
        if (agregarBtn) {
            agregarBtn.style.opacity = '0.5';
            agregarBtn.style.pointerEvents = 'none';
        }
    }
}

/**
 * Maneja el botón de cancelar nueva dirección
 */
function handleCancelarDireccion(e) {
    e.preventDefault();
    const form = document.getElementById('nueva-direccion-form');
    const agregarBtn = document.getElementById('agregar-direccion-btn');
    const formElement = document.getElementById('form-nueva-direccion');
    
    // Ocultar el formulario
    if (form) {
        form.classList.add('hidden');
    }
    
    // Restaurar el botón de agregar
    if (agregarBtn) {
        agregarBtn.style.opacity = '1';
        agregarBtn.style.pointerEvents = 'auto';
    }
    
    // Limpiar el formulario
    if (formElement) {
        formElement.reset();
    }
}

/**
 * Maneja el guardado de la nueva dirección
 */
function handleGuardarDireccion(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const tipoDireccion = document.getElementById('tipo-direccion').value;
    const direccionCompleta = document.getElementById('direccion-completa').value;
    const ciudad = document.getElementById('ciudad').value;
    const barrio = document.getElementById('barrio').value;
    const codigoPostal = document.getElementById('codigo-postal').value;
    const numeroInterior = document.getElementById('numero-interior').value;
    const referencias = document.getElementById('referencias').value;
    const indicaciones = document.getElementById('indicaciones').value;
    const guardarComoAlterna = document.getElementById('guardar-como-alterna').checked;
    
    // Validar campos requeridos
    if (!tipoDireccion || !direccionCompleta || !ciudad || !barrio) {
        alert('Por favor completa todos los campos obligatorios marcados con *');
        return;
    }
    
    // Construir la dirección completa
    let direccionFinal = direccionCompleta;
    if (numeroInterior) {
        direccionFinal += ` ${numeroInterior}`;
    }
    if (barrio) {
        direccionFinal += ` - ${barrio}`;
    }
    if (ciudad) {
        direccionFinal += `, ${ciudad}`;
    }
    
    // Guardar en el estado del formulario
    formState.nuevaDireccion = {
        tipo: tipoDireccion,
        direccion: direccionCompleta,
        ciudad: ciudad,
        barrio: barrio,
        codigoPostal: codigoPostal,
        numeroInterior: numeroInterior,
        referencias: referencias,
        indicaciones: indicaciones,
        direccionCompleta: direccionFinal,
        guardarComoAlterna: guardarComoAlterna
    };
    
    // Marcar como dirección seleccionada
    formState.selectedAddress = 'nueva';
    
    // Limpiar selección de otras direcciones
    document.querySelectorAll('.direccion-card').forEach(c => {
        c.classList.remove('selected', 'border-[#134395]');
        c.classList.add('border-gray-200');
        const radioInner = c.querySelector('.direccion-radio > div > div');
        if (radioInner) radioInner.classList.add('hidden');
    });
    
    // Ocultar el formulario
    const form = document.getElementById('nueva-direccion-form');
    if (form) {
        form.classList.add('hidden');
    }
    
    // Restaurar el botón de agregar
    const agregarBtn = document.getElementById('agregar-direccion-btn');
    if (agregarBtn) {
        agregarBtn.style.opacity = '1';
        agregarBtn.style.pointerEvents = 'auto';
        // Cambiar el texto para indicar que se agregó
        const span = agregarBtn.querySelector('span');
        if (span) {
            span.textContent = '✓ Dirección agregada - Clic para editar';
            agregarBtn.classList.add('border-[#5EA436]', 'bg-green-50');
        }
    }
    
    // Mostrar mensaje de éxito
    mostrarNotificacion('Dirección agregada correctamente', 'success');
    
    // Habilitar el botón continuar
    updateContinueButton();
}

/**
 * Muestra una notificación temporal
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
        tipo === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white font-semibold`;
    notificacion.textContent = mensaje;
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

/**
 * Genera las fechas disponibles para entrega
 */
function generarFechasDisponibles() {
    const container = document.getElementById('fechas-container');
    if (!container) return;
    
    // Generar las próximas 3 fechas a partir de mañana
    const fechas = [];
    const hoy = new Date();
    
    // Empezar desde mañana
    for (let i = 1; i <= 3; i++) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() + i);
        fechas.push(fecha);
    }
    
    // Generar HTML para cada fecha
    container.innerHTML = fechas.map((fecha, index) => {
        const diaSemana = obtenerDiaSemana(fecha.getDay());
        const dia = fecha.getDate();
        const mes = obtenerMes(fecha.getMonth());
        const ano = fecha.getFullYear();
        const fechaISO = fecha.toISOString().split('T')[0];
        
        return `
            <div class="fecha-card bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#134395] cursor-pointer transition-all duration-300" 
                 data-fecha="${fechaISO}"
                 data-fecha-texto="${diaSemana} ${dia} de ${mes} de ${ano}">
                <div class="flex flex-col items-center text-center">
                    <svg class="w-16 h-16 text-[#134395] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M9 11l2 2 4-4" opacity="0.6">
                        </path>
                    </svg>
                    <p class="text-lg font-bold text-[#134395] mb-1">${diaSemana}</p>
                    <p class="text-sm text-gray-600">${dia} de ${mes} de ${ano}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Agregar event listeners a las tarjetas de fecha
    const fechaCards = container.querySelectorAll('.fecha-card');
    fechaCards.forEach(card => {
        card.addEventListener('click', () => handleFechaSelection(card));
    });
}

/**
 * Obtiene el nombre del día de la semana
 */
function obtenerDiaSemana(dia) {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[dia];
}

/**
 * Obtiene el nombre del mes
 */
function obtenerMes(mes) {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return meses[mes];
}

/**
 * Maneja la selección de fecha
 */
function handleFechaSelection(card) {
    const fecha = card.dataset.fecha;
    const fechaTexto = card.dataset.fechaTexto;
    
    // Limpiar selecciones previas
    document.querySelectorAll('.fecha-card').forEach(c => {
        c.classList.remove('selected', 'border-[#134395]', 'border-red-500');
        c.classList.add('border-gray-200');
    });
    
    // Marcar la tarjeta como seleccionada
    card.classList.add('selected', 'border-red-500');
    card.classList.remove('border-gray-200');
    
    // Actualizar estado
    formState.deliveryDate = fecha;
    formState.deliveryDateText = fechaTexto;
    
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
            // En el paso 2 se requiere que se seleccione una dirección
            canContinue = formState.selectedAddress !== null && formState.selectedAddress !== undefined;
            break;
        case 3:
            // En el paso 3 se requiere que se seleccione una fecha
            canContinue = formState.deliveryDate !== null && formState.deliveryDate !== undefined;
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
    const navigationButtons = document.querySelector('.flex.justify-center.gap-5.items-center.mt-8.pt-6.border-t');
    
    // En el paso 4 (resumen), ocultamos los botones de navegación principales
    // porque el resumen tiene sus propios botones
    if (formState.currentStep === formState.totalSteps) {
        if (navigationButtons) {
            navigationButtons.style.display = 'none';
        }
    } else {
        if (navigationButtons) {
            navigationButtons.style.display = 'flex';
        }
        
        // Botón Regresar siempre visible en pasos 1-3
        if (btnBack) {
            btnBack.style.display = 'block';
        }
        
        // Botón Continuar
        if (btnContinue) {
            btnContinue.style.display = 'block';
            updateContinueButton();
        }
    }
}

/**
 * Genera el resumen del pedido
 */
function generateOrderSummary() {
    // Tipo de tratamiento
    const tipoTratamiento = document.getElementById('resumen-tipo-tratamiento');
    if (tipoTratamiento) {
        tipoTratamiento.textContent = 'Oxígeno';
    }
    
    // Clasificación
    const clasificacion = document.getElementById('resumen-clasificacion');
    if (clasificacion) {
        clasificacion.textContent = getCategoryName(formState.selectedCategory);
    }
    
    // Opción específica
    const opcionEspecifica = document.getElementById('resumen-opcion-especifica');
    if (opcionEspecifica) {
        if (formState.selectedCategory === 'equipos' || formState.selectedCategory === 'descartables') {
            // Mostrar el primer producto o la cantidad de productos
            if (formState.selectedProducts.length > 0) {
                opcionEspecifica.textContent = getProductName(formState.selectedProducts[0]);
                if (formState.selectedProducts.length > 1) {
                    opcionEspecifica.textContent += ` (+${formState.selectedProducts.length - 1} más)`;
                }
            }
        } else if (formState.selectedCategory === 'recoleccion') {
            opcionEspecifica.textContent = getRecollectionTypeName(formState.selectedRecollectionType);
        }
    }
    
    // Tabla de productos
    const tablaContainer = document.getElementById('tabla-productos-container');
    if (tablaContainer) {
        let tablaHTML = '<div class="overflow-x-auto">';
        tablaHTML += '<table class="w-full">';
        tablaHTML += '<thead class="bg-gray-50">';
        tablaHTML += '<tr>';
        tablaHTML += '<th class="px-4 py-3 text-left text-sm font-bold text-[#134395]">Código</th>';
        tablaHTML += '<th class="px-4 py-3 text-left text-sm font-bold text-[#134395]">Producto</th>';
        tablaHTML += '<th class="px-4 py-3 text-left text-sm font-bold text-[#134395]">Envase</th>';
        tablaHTML += '<th class="px-4 py-3 text-left text-sm font-bold text-[#134395]">Cantidad</th>';
        tablaHTML += '</tr>';
        tablaHTML += '</thead>';
        tablaHTML += '<tbody class="divide-y divide-gray-200">';
        
        if (formState.selectedCategory === 'equipos' || formState.selectedCategory === 'descartables') {
            formState.selectedProducts.forEach((producto, index) => {
                const codigo = generarCodigoProducto(producto);
                const nombre = getProductName(producto);
                const envase = 'PRO_PU : PRODUCTO POR UNIDAD';
                const cantidad = '1';
                
                tablaHTML += '<tr class="hover:bg-gray-50">';
                tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${codigo}</td>`;
                tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${nombre}</td>`;
                tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${envase}</td>`;
                tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${cantidad}</td>`;
                tablaHTML += '</tr>';
            });
        } else if (formState.selectedCategory === 'recoleccion') {
            const codigo = '99999999';
            const nombre = `${getRecollectionTypeName(formState.selectedRecollectionType)} - ${getMotivoName(formState.selectedMotivo)}`;
            const envase = 'SERVICIO';
            const cantidad = '1';
            
            tablaHTML += '<tr class="hover:bg-gray-50">';
            tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${codigo}</td>`;
            tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${nombre}</td>`;
            tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${envase}</td>`;
            tablaHTML += `<td class="px-4 py-3 text-sm text-gray-700">${cantidad}</td>`;
            tablaHTML += '</tr>';
        }
        
        tablaHTML += '</tbody>';
        tablaHTML += '</table>';
        tablaHTML += '</div>';
        
        tablaContainer.innerHTML = tablaHTML;
    }
    
    // Dirección
    const direccion = document.getElementById('resumen-direccion');
    if (direccion) {
        direccion.textContent = getAddressLabel(formState.selectedAddress);
    }
    
    // Fecha
    const fecha = document.getElementById('resumen-fecha');
    if (fecha) {
        fecha.textContent = formState.deliveryDateText || '-';
    }
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

function getAddressLabel(addressType) {
    if (addressType === 'nueva' && formState.nuevaDireccion) {
        return `Nueva dirección: ${formState.nuevaDireccion.direccionCompleta}`;
    }
    
    const addresses = {
        'principal': 'CR 70G # #79 - 21 Barrio Suba Imperial Reservado',
        'alterna': 'CRA 109A 150B 79 Torre 3 Apto. 805 Conj. Residencial Imperial Reservado 2'
    };
    return addresses[addressType] || addressType;
}

/**
 * Genera un código único para el producto
 */
function generarCodigoProducto(producto) {
    const codigos = {
        'cilindro': '20610001',
        'soporte': '20610002',
        'concentrador': '20610003',
        'termo': '20610004',
        'canula': '20630103',
        'extension': '20630104',
        'humidificador': '20630105',
        'kit-mascara': '20630106',
        'mascara-traqueo': '20630107',
        'nipel': '20630108'
    };
    return codigos[producto] || '20600000';
}

/**
 * Maneja la confirmación del pedido
 */
function handleConfirmarPedido() {
    // Generar código de pedido aleatorio
    const codigoPedido = generarCodigoPedido();
    
    // Guardar el pedido (en una implementación real, esto se enviaría al backend)
    console.log('Pedido confirmado:', {
        codigo: codigoPedido,
        categoria: formState.selectedCategory,
        productos: formState.selectedProducts,
        direccion: formState.selectedAddress,
        fecha: formState.deliveryDate,
        timestamp: new Date().toISOString()
    });
    
    // Mostrar notificación de éxito
    mostrarNotificacion('Pedido registrado exitosamente', 'success');
    
    // Redirigir a la página de éxito después de un breve delay
    setTimeout(() => {
        window.location.href = `oxigeno-exito.html?codigo=${codigoPedido}`;
    }, 1000);
}

/**
 * Genera un código de pedido único
 */
function generarCodigoPedido() {
    const prefijo = 'SPW';
    const numero = Math.floor(Math.random() * 90000) + 10000; // Número de 5 dígitos
    return `${prefijo}-${numero}`;
}

// Logging para debug (opcional - remover en producción)
window.formState = formState; // Para poder ver el estado en la consola

