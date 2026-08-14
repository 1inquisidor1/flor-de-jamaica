# 📐 FASE 2: PLANTILLAS MAESTRAS Y NAVEGACIÓN - INSTRUCCIONES

## ✅ Archivos Creados en esta Fase

- ✅ `_layouts/default.html` - Plantilla base global
- ✅ `_layouts/page.html` - Plantilla para subpáginas
- ✅ `_includes/header.html` - Navegación responsiva (dropdown/hamburguesa)
- ✅ `_includes/footer.html` - Pie de página elegante

---

## 📋 DESCRIPCIÓN DE CADA ARCHIVO

### **1. _layouts/default.html (Plantilla Base)**

Esta es la plantilla "madre" que hereda todas las páginas. Contiene:

- **HTML5 Structure:** DOCTYPE, meta tags, viewport responsive
- **Meta tags SEO:** Open Graph para redes sociales, Twitter Cards
- **Google Fonts:** Playfair Display (títulos) + Inter (cuerpo)
- **Favicon:** Referencia a `/assets/images/iconos/favicon.ico`
- **Inyecciones dinámicas:**
  - `{% include header.html %}` - Menú de navegación
  - `{{ content }}` - Contenido único de cada página
  - `{% include footer.html %}` - Pie de página

**Estructura visual:**
```
<header> (incluido)
<main>{{ content }}</main>
<footer> (incluido)
<script main.js>
```

---

### **2. _layouts/page.html (Plantilla de Subpáginas)**

Hereda de `default.html` y añade:

- **Front Matter:** `layout: default` (para heredar)
- **Hero Section:** Título grande + línea decorativa
- **Contenedor Principal:** `max-width` para legibilidad
- **Intersection Observer:** Anima elementos al scrollear (fade-in elegante)

**Estructura visual:**
```
<section class="page-hero">
  <h1>{{ page.title }}</h1>
  <div class="linea-decorativa"></div>
</section>

<article class="page-contenido">
  {{ content }}
</article>
```

---

### **3. _includes/header.html (Navegación Responsiva)**

Menu inteligente con comportamiento dual:

#### **Escritorio (> 768px):**
- Logo a la izquierda: "🌺 Jamaica"
- Navegación a la derecha: "Inicio" | "Explorar"
- "Explorar" tiene un **dropdown (desplegable)** con:
  - 🌿 Apariencia
  - 🧪 Composición
  - ❤️ Beneficios
  - 🍹 Usos

#### **Móvil (≤ 768px):**
- Logo: "🌺 Jamaica"
- Botón hamburguesa (☰) que abre/cierra menú
- Menú vertical completo
- "Explorar" actúa como **acordeón** (click para desplegar)

#### **Características especiales:**
- ✨ **Header Glassmorphism:** Al scrollear > 80px, el header se vuelve translúcido con blur
- 🎯 **ARIA Labels:** Accesible para lectores de pantalla
- ⌨️ **Cierre automático:** El menú se cierra al navegar o hacer click fuera
- 📱 **Responsive:** Cambia automáticamente entre dropdown y hamburguesa según pantalla

---

### **4. _includes/footer.html (Pie de Página)**

Sección inferior elegante con:

#### **Contenido:**
- **Redes Sociales:** Instagram, Facebook, TikTok (enlaces placeholder)
- **Contacto:** Email de contacto (placeholder: contacto@florajamaica.com)
- **Copyright:** "© 2026 Flor de Jamaica. Diseñado con esencia natural."

#### **Estructura:**
```
<footer-superior>
  Redes Sociales | Contacto
</footer-superior>

<linea-decorativa>

<footer-inferior>
  Copyright
</footer-inferior>
```

**Nota:** Los enlaces de redes sociales se actualizarán cuando se entreguen los canales oficiales.

---

## 🎨 LÓGICA DE NAVEGACIÓN (JavaScript Incluido)

### **Control del Menú Hamburguesa**
1. Click en hamburguesa → Abre/cierra menú
2. Click en un enlace → Cierra menú automáticamente
3. Click fuera del menú → Cierra menú

### **Control del Acordeón "Explorar" (Móvil)**
1. Click en "Explorar" → Despliega submenú
2. Click nuevamente → Pliega submenú
3. Click en un subenlace → Cierra acordeón (pero mantiene menú abierto)

### **Efecto Header Glassmorphism**
- Mientras scroll ≤ 80px → Header sólido
- Cuando scroll > 80px → Header con blur + sombra (efecto moderno)

---

## 🔗 RUTAS CONFIRMADAS EN EL MENÚ

Las siguientes rutas están codificadas en `header.html`:

- **Inicio:** `/` (raíz del sitio)
- **Apariencia:** `/apariencia/`
- **Composición:** `/composicion/`
- **Beneficios:** `/beneficios/`
- **Usos:** `/usos/`

Estas páginas se crearán en **FASE 3**.

---

## ⚡ NOTAS TÉCNICAS

### **Por qué JavaScript en el header?**
- El menú necesita interactividad (click, hover, acordeón)
- No queremos dependencias externas
- Vanilla JS es ligero y rápido

### **Por qué `relative_url`?**
- Convierte rutas locales en rutas relativas correctas
- Funciona perfectamente con GitHub Pages
- Ejemplo: `{{ '/' | relative_url }}` → `/flor-de-jamaica/`

### **Accesibilidad (ARIA)**
- `aria-expanded="false/true"` - Indica estado del dropdown
- `aria-haspopup="true"` - Indica que es un menú desplegable
- `aria-label` - Describe el propósito del botón hamburguesa

---

## ✅ VERIFICACIÓN FASE 2

Asegúrate de que:

- ✅ Todos los 4 archivos `.html` existen en sus carpetas correctas
- ✅ El JavaScript dentro de `header.html` funciona sin errores
- ✅ Las rutas están usando `{{ '...' | relative_url }}`
- ✅ Los emojis en los enlaces se muestran correctamente

---

## 🚀 PRÓXIMO PASO: FASE 3

Una vez confirmado FASE 2, crearemos:

1. **index.md** - Página de inicio con slider
2. **apariencia.md** - Subpágina Apariencia
3. **composicion.md** - Subpágina Composición
4. **beneficios.md** - Subpágina Beneficios
5. **usos.md** - Subpágina Usos
6. **assets/css/style.scss** - Todos los estilos

---

## 📤 COMANDO PARA SUBIR A GITHUB

```bash
cd ~/Claude/Projects/Jamaica\ Nacional/

git add _layouts/ _includes/ FASE-2-INSTRUCCIONES.md

git commit -m "FASE 2: Plantillas maestras y navegación responsiva"

git push origin main
```

---

¿Listo para FASE 3? 🚀
