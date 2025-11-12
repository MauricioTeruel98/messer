# 📋 Formulario de Pedido de Oxígeno - Documentación

## 📝 Descripción General

Sistema de pedido de equipos y servicios de oxígeno con flujo de múltiples pasos (multi-step form). El usuario avanza por 4 pasos para completar su solicitud.

## 🎯 Flujo del Formulario

### Paso 1: Producto/Servicio
El usuario selecciona entre 3 categorías principales:

#### 1. **Equipos de Oxígeno**
Al seleccionar esta opción, se muestran 4 productos:
- Cilindro de oxígeno (Label text)
- Soporte para equipo (Label text)
- Concentradores de oxígeno
- Termo de oxígeno líquido

**Comportamiento**: El usuario puede seleccionar múltiples productos. El botón "Continuar" se habilita solo cuando al menos un producto está seleccionado.

#### 2. **Dispositivos Descartables**
Al seleccionar esta opción, se muestran 6 productos:
- Cánula de oxígeno
- Extensión 7 metros cánula
- Humidificador de oxígeno
- Kit de máscara ventury adulto oxígeno
- Máscara de traqueostomía adulto
- Nipel conector de oxígeno

**Comportamiento**: Igual que equipos, permite selección múltiple.

#### 3. **Recolección de Equipos**
Al seleccionar esta opción, se muestra primero el tipo de recolección:
- Recolección parcial
- Recolección total

Después de seleccionar el tipo, aparece el **Motivo de la recolección**:
- Fallecimiento
- Mejoría
- Orden médica
- Cambio de proveedor

**Comportamiento**: El botón "Continuar" se habilita solo cuando se ha seleccionado tanto el tipo de recolección como el motivo.

### Paso 2: Dirección
Formulario para ingresar la dirección de entrega:
- Dirección completa
- Ciudad
- Código postal
- Referencias adicionales

### Paso 3: Fecha de Entrega
Selector de fecha para elegir cuándo se desea recibir el pedido.

### Paso 4: Resumen
Muestra un resumen completo de:
- Categoría seleccionada
- Productos seleccionados (o tipo de recolección y motivo)
- Información adicional guardada
- Botón "Confirmar Pedido" (verde)

## 🔧 Componentes Técnicos

### Archivos
```
oxigeno.html                    - Estructura HTML del formulario
assets/js/oxigeno-form.js       - Lógica de JavaScript
assets/css/style.css            - Estilos CSS (sección específica al final)
assets/img/oxigeno.png          - Imagen del hero section
assets/img/Equipos.png          - Icono de equipos
assets/img/Descartables.png     - Icono de descartables
assets/img/Recoleccion.png      - Icono de recolección
```

### Estado Global (formState)
El formulario mantiene un estado global en JavaScript con:
```javascript
{
    currentStep: 1,              // Paso actual (1-4)
    totalSteps: 4,               // Total de pasos
    selectedCategory: null,      // 'equipos', 'descartables', 'recoleccion'
    selectedSubcategory: null,   // Subcategoría si aplica
    selectedProducts: [],        // Array de productos seleccionados
    selectedRecollectionType: null, // 'parcial' o 'total'
    selectedMotivo: null,        // Motivo de recolección
    address: {},                 // Datos de dirección
    deliveryDate: null           // Fecha de entrega
}
```

## 🎨 Estilos y Clases

### Tarjetas Seleccionables
```css
.selectable-card              /* Tarjeta normal */
.selectable-card:hover        /* Efecto hover */
.selectable-card.selected     /* Tarjeta seleccionada (borde rojo) */
```

### Stepper
```css
.step-circle                  /* Círculo del paso (gris) */
.step-circle.active           /* Paso actual (azul #134395) */
.step-circle.completed        /* Paso completado (verde #10B981) */
```

## ⚙️ Funcionalidades Principales

### 1. Selección Dinámica
- Las subcategorías se muestran/ocultan según la categoría principal seleccionada
- Las tarjetas pueden ser de selección única o múltiple según el contexto

### 2. Validación
- El botón "Continuar" se habilita/deshabilita según el estado del formulario
- En el Paso 1, se requiere al menos una selección válida
- Cada paso valida sus propios requisitos

### 3. Navegación
- **Botón Regresar**: Retrocede al paso anterior. En el paso 1, vuelve a index.html
- **Botón Continuar**: Avanza al siguiente paso. Se deshabilita si falta información

### 4. Persistencia
- El estado del formulario se mantiene al navegar entre pasos
- Las selecciones previas permanecen al retroceder

### 5. Resumen Final
- Se genera dinámicamente en el Paso 4
- Muestra toda la información recopilada
- Botón de confirmación para enviar el pedido

## 🚀 Funciones JavaScript Principales

```javascript
initializeForm()                        // Inicializa el formulario
setupEventListeners()                   // Configura todos los listeners
handleCategorySelection(card)           // Maneja selección de categoría
showSubcategories(category)             // Muestra subcategorías dinámicamente
handleProductSelection(card)            // Maneja selección de productos
handleRecollectionTypeSelection(card)   // Maneja tipo de recolección
handleMotivoSelection(card)             // Maneja motivo de recolección
updateContinueButton()                  // Actualiza estado del botón
handleBackButton()                      // Navega al paso anterior
handleContinueButton()                  // Navega al paso siguiente
updateStepDisplay()                     // Actualiza visualización de pasos
generateOrderSummary()                  // Genera resumen del pedido
```

## 📱 Responsive

El formulario es completamente responsive:
- **Desktop**: Grid de 3-4 columnas según la sección
- **Tablet**: Grid de 2 columnas
- **Mobile**: Columna única

## 🎯 Próximas Mejoras Sugeridas

1. **Integración con Backend**
   - Enviar datos del formulario a una API
   - Validar disponibilidad de productos
   - Generar número de pedido

2. **Persistencia en LocalStorage**
   - Guardar progreso del formulario
   - Recuperar sesión si el usuario cierra la página

3. **Validaciones Avanzadas**
   - Validar formato de dirección
   - Verificar fechas de entrega disponibles
   - Mostrar errores específicos

4. **Confirmación Visual**
   - Modal de confirmación al enviar
   - Animación de éxito
   - Opción de imprimir/descargar resumen

5. **Paso de Dirección Completo**
   - Integración con API de Google Maps
   - Autocompletar dirección
   - Validación de código postal

6. **Calendario Interactivo**
   - Mostrar solo fechas disponibles
   - Indicar días con mayor demanda
   - Sugerir fechas alternativas

## 🐛 Debug

Para ver el estado actual del formulario en la consola:
```javascript
console.log(window.formState);
```

## 📞 Conectar desde el Index

El botón está enlazado desde `index.html`:
```html
<a href="oxigeno.html" class="...">Solicita servicios y equipos para oxígeno</a>
```

## ✅ Checklist de Funcionalidades Implementadas

- ✅ Flujo de 4 pasos con stepper visual
- ✅ 3 categorías principales con subcategorías
- ✅ Selección múltiple de productos
- ✅ Validación de selecciones
- ✅ Navegación entre pasos
- ✅ Generación de resumen
- ✅ Diseño responsive
- ✅ Animaciones y transiciones
- ✅ Estilos consistentes con el diseño
- ✅ Integración con navbar y footer
- ⏳ Integración con backend (pendiente)
- ⏳ Persistencia de datos (pendiente)
- ⏳ Envío de formulario (pendiente)

## 🎨 Paleta de Colores Utilizada

- **Azul Principal**: `#134395` (Messer blue)
- **Azul Hover**: `#0f3275`
- **Rojo Selección**: `#DC2626`
- **Rojo Fondo**: `#FEF2F2`
- **Verde Completado**: `#10B981`
- **Gris Inactivo**: `#E5E7EB`

---

**Última actualización**: 11 de noviembre de 2025
**Versión**: 1.0

