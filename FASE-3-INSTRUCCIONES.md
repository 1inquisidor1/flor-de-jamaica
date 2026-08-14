# 📝 FASE 3: CONTENIDO & ESTILOS - INSTRUCCIONES

## ✅ Archivos Creados en esta Fase

- ✅ `index.md` - Página de inicio con slider automático
- ✅ `apariencia.md` - Subpágina: Descripción botánica
- ✅ `composicion.md` - Subpágina: Datos nutricionales
- ✅ `beneficios.md` - Subpágina: Beneficios científicos
- ✅ `usos.md` - Subpágina: Aplicaciones (gastronomía, medicina, industria)
- ✅ `assets/css/style.scss` - Estilos maestros (paleta, tipografía, responsive)

---

## 📋 DESCRIPCIÓN POR ARCHIVO

### **1. index.md (Página de Inicio)**

Estructura completa con:

**Secciones:**
1. **Hero Slider:** 3 imágenes que rotan automáticamente cada 4 segundos
   - Imagen 1: Campo con flores ("La flor que cautiva")
   - Imagen 2: Flor individual close-up ("Naturaleza en cada pétalo")
   - Imagen 3: Bebida Jamaica ("Tradición y salud")

2. **Mensaje de Bienvenida:** Párrafo introductorio elegante

3. **Grid de Tarjetas:** 4 tarjetas con acceso rápido
   - 🌿 Apariencia
   - 🧪 Composición
   - ❤️ Beneficios
   - 🍹 Usos

**JavaScript Integrado:**
- Rotación automática del slider
- Controles interactivos (dots)
- Pausa al hover (escritorio) y touch (móvil)

---

### **2. apariencia.md**

Contenido botánico detallado incluyendo:
- Descripción de la planta (porte, tamaño, tallo, hojas)
- La flor vs el cáliz (estructura comestible)
- Ciclo de vida
- Adaptabilidad geográfica

---

### **3. composicion.md**

Análisis nutricional con:
- Tabla de nutrientes (Calcio, Potasio, Vitamina C, etc.)
- Antocianinas y flavonoides
- Compuestos bioactivos
- Comparativa nutricional
- Datos de interés (calorías, colesterol, sodio)

---

### **4. beneficios.md**

Beneficios respaldados científicamente:
1. Regulación de presión arterial
2. Poder antioxidante y protección cardiovascular
3. Efecto diurético y digestivo
4. Otros efectos terapéuticos (antiinflamatorio, antibacteriano, etc.)

Incluye cita inspiradora y recomendaciones de consumo.

---

### **5. usos.md**

Aplicaciones versátiles en:
- **Gastronomía:** Agua de Jamaica, infusiones, confituras, repostería, vinos
- **Medicina Tradicional:** Sistemas mexicano y africano
- **Industria:** Colorante natural, cosmética, suplementos, textiles
- **Sostenibilidad:** Beneficios ambientales y comunitarios
- **Tendencias Futuras:** Investigación moderna

---

### **6. assets/css/style.scss**

Hoja de estilos maestra que incluye:

**Secciones principales:**
1. Variables globales (paleta, tipografía, espaciado, sombras)
2. Reset y estilos base
3. Tipografía (h1-h6, p, strong, em)
4. Header y navegación responsiva
5. Footer elegante
6. Página de inicio (hero slider, tarjetas)
7. Página interna (hero, contenido centrado)
8. Animaciones de entrada (Intersection Observer)
9. Tablas y listas
10. Blockquotes y elementos especiales
11. Accesibilidad (skip link, screen reader only, reduce motion)
12. Estilos de impresión

**Características:**
- ✨ Variables CSS personalizadas
- 📱 100% responsive (mobile-first)
- ♿ Accesible (ARIA, contraste de colores)
- ⚡ Optimizado (transiciones suaves, animaciones)
- 🎨 Paleta Jamaica integrada
- 🔤 Tipografía elegante (Playfair + Inter)

---

## 🖼️ RUTAS DE IMÁGENES UTILIZADAS

```
assets/images/slider/
  ├── florCampos.jpeg        (Slide 1: Campo con flores)
  ├── florIndividual.jpeg    (Slide 2: Flor close-up)
  └── JugoJamaica.jpeg       (Slide 3: Bebida)

assets/images/iconos/
  └── favicon.ico            (Ícono pestaña)
```

**Nota importante:** Debes asegurate de que estas imágenes existan en la carpeta `assets/images/` del repositorio. Las rutas están configuradas correctamente para jekyll.

---

## ⚙️ CÓMO FUNCIONA EL SLIDER

**JavaScript incluido en index.md:**

1. **Detección de slides:** Busca todos los elementos `.slide`
2. **Mostrar primer slide:** Al cargar la página, muestra el primero
3. **Rotación automática:** Cambios cada 4 segundos
4. **Controles interactivos:** Dots clicables para saltar a un slide
5. **Pausa al interactuar:** 
   - Escritorio: Al pasar el ratón
   - Móvil: Al tocar
6. **Reinicio:** Se reanuda después de 4 segundos de inactividad

---

## 🎨 VARIABLES CSS DISPONIBLES

Todas las variables están en el `:root` de style.scss:

```css
--rojo-profundo: #B71F3E
--crema: #FDF5F0
--dorado: #E8A34B
--verde-hoja: #3D6B4F
--tinta: #1A1412
--font-titulo: 'Playfair Display', serif
--font-cuerpo: 'Inter', sans-serif
```

Cualquier cambio de marca se hace simplemente actualizando estas variables.

---

## ✅ VERIFICACIÓN FASE 3

Asegúrate de:

- ✅ Todos los 5 archivos `.md` están en la raíz
- ✅ El archivo `style.scss` está en `assets/css/`
- ✅ Las imágenes existen en `assets/images/slider/`
- ✅ El favicon existe en `assets/images/iconos/`
- ✅ El slider funciona (3 imágenes rotando)
- ✅ Las tarjetas en index redirigen correctamente
- ✅ Los estilos se aplican (colores, tipografía, responsive)

---

## 🔗 ÁRBOL DE DEPENDENCIAS COMPLETO

```
index.md
  → _layouts/home (que hereda de default)
    → Google Fonts (Playfair + Inter)
    → style.scss (todos los estilos)
    → header.html (navegación)
    → footer.html (pie de página)
    → Imágenes en assets/images/slider/

apariencia.md, composicion.md, beneficios.md, usos.md
  → _layouts/page (que hereda de default)
    → Mismo setup que index
```

---

## 📱 RESPONSIVE DESIGN

El sitio está optimizado para:

- **Escritorio:** 1200px+ (grid 4 columnas)
- **Tablet:** 769px-1199px (grid 2 columnas)
- **Móvil:** ≤ 768px (grid 1 columna)

Punto de quiebre principal: **768px**

---

## 🚀 PRÓXIMO PASO: FASE 4

Cuando FASE 3 esté completa, pasaremos a:

**FASE 4: Interactividad Avanzada**
- JavaScript para slider mejorado (fade transitions)
- Menú móvil dinámico (hamburguesa + acordeón)
- Scroll effects (header glassmorphism, reveal animations)
- Metaetiquetas Open Graph (compartir en redes)

---

## 📤 COMANDO PARA SUBIR A GITHUB

```bash
cd ~/Claude/Projects/Jamaica\ Nacional/

# Añadir todos los archivos de FASE 3
git add index.md apariencia.md composicion.md beneficios.md usos.md assets/css/style.scss FASE-3-INSTRUCCIONES.md

# Commit
git commit -m "FASE 3: Contenido completo y estilos maestros (5 páginas + CSS)"

# Push
git push origin main
```

---

¡FASE 3 completada! 🎨 El sitio ahora tiene contenido, estilos y estructura lista.
