# 🚀 Instrucciones de Uso - Componentes Reutilizables

## ✅ Problema Solucionado

El navbar y footer ahora **funcionan correctamente** sin necesidad de servidor. Los componentes están embebidos directamente en el JavaScript.

## 📝 Cómo Usar en Cualquier Página

Para agregar navbar y footer a cualquier página HTML, simplemente sigue esta estructura:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Página - Messer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="bg-gray-50">
    <!-- Navbar Component -->
    <div id="navbar-container"></div>

    <!-- Tu contenido aquí -->
    <main class="container mx-auto px-4 py-8">
        <!-- ... -->
    </main>

    <!-- Footer Component -->
    <div id="footer-container"></div>

    <!-- Script para cargar componentes -->
    <script src="assets/js/components-loader.js"></script>
</body>
</html>
```

## 🎯 Solo 3 Pasos

1. **Agrega el div del navbar:**
   ```html
   <div id="navbar-container"></div>
   ```

2. **Agrega el div del footer:**
   ```html
   <div id="footer-container"></div>
   ```

3. **Incluye el script al final del body:**
   ```html
   <script src="assets/js/components-loader.js"></script>
   ```

## ✨ ¡Eso es todo!

Los componentes se cargarán automáticamente al abrir la página.

## 🧪 Archivos de Prueba

Puedes probar los componentes abriendo directamente desde el explorador:

- **test.html** - Página de prueba simple
- **ejemplo.html** - Página con más contenido y explicaciones
- **index.html** - Página principal actualizada

## 📂 Estructura de Archivos

```
messer/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── components-loader.js ← Magia aquí
│   └── img/
├── components/
│   ├── navbar.html (referencia)
│   ├── footer.html (referencia)
│   └── README.md
├── index.html
├── ejemplo.html
└── test.html
```

## 💡 Ventajas

✅ **Funciona sin servidor** - Abre directamente desde el explorador  
✅ **Sin copy-paste** - Solo incluyes 2 divs y 1 script  
✅ **Mantenimiento fácil** - Actualiza en un solo lugar  
✅ **Menú móvil automático** - Todo funciona out-of-the-box  
✅ **Código limpio** - Páginas más legibles  

## 🔧 Para Actualizar Navbar o Footer

Solo edita el archivo:
```
assets/js/components-loader.js
```

Busca el objeto `COMPONENTS` y modifica el template que necesites:
- `COMPONENTS.navbar` para el navbar
- `COMPONENTS.footer` para el footer

¡Todos los cambios se aplicarán automáticamente en todas las páginas!

## ❓ ¿Problemas?

1. **¿No se ven los componentes?**
   - Verifica que el script esté al final del `<body>`
   - Abre la consola del navegador (F12) para ver errores
   - Verifica que los IDs sean exactos: `navbar-container` y `footer-container`

2. **¿El menú móvil no funciona?**
   - Verifica que Tailwind CSS esté cargado
   - Revisa la consola para errores de JavaScript

3. **¿Los estilos no se aplican?**
   - Verifica que `style.css` esté vinculado correctamente
   - Asegúrate de que las rutas de las imágenes sean correctas

## 📞 Soporte

Revisa `components/README.md` para documentación completa y ejemplos adicionales.

