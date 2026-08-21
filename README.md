# Flor de Jamaica — Elegancia Natural

Sitio web estático construido con [Jekyll](https://jekyllrb.com/) y desplegado en GitHub Pages, dedicado a la Flor de Jamaica (*Hibiscus sabdariffa*): su apariencia botánica, composición nutricional, beneficios respaldados científicamente y usos gastronómicos, medicinales e industriales.

**Sitio web en vivo:** https://1inquisidor1.github.io/flor-de-jamaica/

---

## Visión General

Este repositorio contiene un sitio web Jekyll completo que funciona como **showroom digital** de la Flor de Jamaica. El sitio está optimizado para GitHub Pages, cumpliendo con sus Términos de Servicio (no incluye e-commerce directo) — las ventas se realizan indirectamente vía WhatsApp e Instagram.

---

## Estructura del Repositorio

El sitio web está construido directamente en la raíz del repositorio:

```
├── _config.yml Configuración global de Jekyll
├── _layouts/ Plantillas HTML (default, home, page)
├── _includes/ Componentes reutilizables (header, footer, popup)
├── _posts/ Artículos de blog
├── blog/ Artículos de blog avanzados
├── assets/ Recursos estáticos (CSS, JS, imágenes, datos)
├── *.md Páginas: index, beneficios, composición, etc.
├── 404.html Página de error 404 personalizada
├── robots.txt Directivas para motores de búsqueda
├── Gemfile & Gemfile.lock Dependencias de Ruby/Jekyll
├── .nojekyll Fuerza el procesamiento de assets por GitHub Pages
└── .github/workflows/ Configuración de despliegue con GitHub Actions
```

---

## Paleta de Colores

| Color | Hex | Uso |
|---|---|---|
| Rojo profundo | `#B71F3E` | Color primario (títulos, acentos) |
| Crema | `#FDF5F0` | Fondos claros |
| Dorado | `#E8A34B` | Detalles decorativos |
| Verde hoja | `#3D6B4F` | Elementos naturales, footer |
| Tinta | `#1A1412` | Texto principal |

**Tipografía:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) para títulos, [Inter](https://fonts.google.com/specimen/Inter) para cuerpo de texto.

---

## Desarrollo Local

Requisitos previos:
- Ruby 3.2+
- Bundler

```bash
# Instalar dependencias
bundle install

# Ejecutar servidor de desarrollo
bundle exec jekyll serve

# El sitio estará disponible en: http://localhost:4000/
```

---

## Mantenimiento y Modificaciones

### Editar contenido existente
Modifica los archivos `.md` correspondientes a cada sección:

| Archivo | Sección |
|---|---|
| `index.md` | Página de inicio |
| `beneficios.md` | Beneficios para la salud |
| `composicion.md` | Información nutricional |
| `apariencia.md` | Características visuales |
| `usos.md` | Aplicaciones culinarias/médicas |
| `donde-comprar.md` | Puntos de venta |
| `contacto.md` | Información de contacto |
| `testimonios.md` | Testimonios de usuarios |
| `glosario.md` | Diccionario de términos |
| `recetas.md` | Recetas con videos de YouTube |
| `faq.md` | Preguntas frecuentes |
| `blog/*.md` | Artículos de blog |

### Agregar una nueva página
1. Crea un archivo `.md` en la raíz con este `front matter`:
 ```yaml
 ---
 layout: page
 title: "Título de la página"
 description: "Meta descripción breve (máximo 160 caracteres)"
 image: /assets/images/slider/campo-hibiscus.webp
 ---
 ```
2. Agrega el enlace en `_includes/header.html`
3. Haz commit y push

### Agregar un artículo de blog
1. Crea un archivo `.md` dentro de `blog/`
2. Usa `layout: post` en el `front matter`
3. Agrega `date:` en el front matter para orden cronológico

---

## Configuración de Recursos Interactivos

El sitio utiliza archivos JSON para datos dinámicos:

| Archivo | Función |
|---|---|
| `assets/data/glossary-data.json` | Glosario técnico interactivo |
| `assets/data/recetas-data.json` | Recetas con videos tutoriales |
| `assets/data/faq-data.json` | Preguntas frecuentes |

Los scripts JavaScript (`glossary.js`, `recetas.js`, `faq.js`) cargan estos JSON dinámicamente y renderizan el contenido.

---

## Despliegue (GitHub Pages)

El sitio se publica automáticamente en GitHub Pages mediante GitHub Actions (`.github/workflows/deploy.yml`). Cada push a `main` reconstruye el sitio y lo publica en `https://1inquisidor1.github.io/flor-de-jamaica/`.

**Para habilitar GitHub Pages (una sola vez):**
1. En GitHub Settings Pages
2. Build and deployment Source: **"GitHub Actions"**
3. El workflow construye con `bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"`

---

## Licencia

Contenido educativo e informativo sobre la Flor de Jamaica. Uso libre con atribución. 

Los datos empíricos y testimonios son observaciones no verificables y no constituyen consejo médico. Siempre consulta con un profesional de la salud antes de modificar tu dieta.

---

> **Nota sobre `AUDITORIA-PROBLEMAS.md`:** está fechada del 14 de agosto de 2026 y documenta bugs que **ya fueron corregidos**. No refleja el estado actual del sitio; considérala histórica.