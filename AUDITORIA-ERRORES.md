# Auditoría de Errores — Flor de Jamaica

**Fecha:** 21 de agosto de 2026
**Alcance:** Código completo del repositorio Jekyll (configuración, layouts, includes, CSS/SCSS, JavaScript, datos JSON, páginas Markdown y blog).
**Comparado contra:** Mejores prácticas de sitios web modernos (Lighthouse, WCAG, SEO, GitHub Pages).

---

## 🚨 Problemas Críticos (rompen funcionalidad o construcción)

### 1. `index.md` declara `layout: home` pero **no existe `_layouts/home.html`**

Solo existen `_layouts/default.html` y `_layouts/page.html`. Jekyll no encuentra el layout `home`.

**Efecto:** Jekyll lanza un error de construcción o renderiza la home **sin layout** — sin `<head>` (CSS, fuentes, meta tags), sin header ni footer. La página de inicio puede verse completamente rota.

**Solución:** Crear `_layouts/home.html` heredando de `default`, o cambiar `index.md` a `layout: default`.

---

### 2. `_config.yml` tiene `url: ""` (vacío / comentado)

```yaml
url: ""  # está vacío, debería ser "https://1inquisidor1.github.io"
```

**Efecto:** El filtro `absolute_url` (usado en Open Graph, Twitter Cards, `jekyll-seo-tag` y `jekyll-sitemap`) necesita `site.url` para construir URLs completas. Sin él:
- Las meta etiquetas OG/Twitter producen URLs **vacías o relativas**.
- Las vistas previas al compartir en WhatsApp/Facebook/X **no funcionan** (imagen y enlace rotos).
- El `sitemap.xml` genera URLs inválidas.

**Solución:** `url: "https://1inquisidor1.github.io"` y establecer `baseurl` si es necesario.

---

### 3. `robots.txt` apunta al sitemap a un dominio incorrecto

```
Sitemap: https://flor-de-jamaica.github.io/sitemap.xml
```

El README indica que el sitio vivo es `https://1inquisidor1.github.io/flor-de-jamaica/`.

**Efecto:** Los motores de búsqueda siguen un sitemap inexistente, lo que genera un error 404 en los logs de Google Search Console y evita el rastreo correcto.

**Solución:** Corregir a `Sitemap: https://1inquisidor1.github.io/flor-de-jamaica/sitemap.xml`.

---

## ⚠️ Problemas Importantes (afectan SEO, accesibilidad, usabilidad o consistencia)

### 4. Emojis en títulos, textos y `console.log` (violan la política del repositorio)

El usuario mantiene un repo **100% libre de emojis/íconos** en títulos y textos (confirmado por 4 commits anteriores de limpieza: "Eliminar todos los iconos", "Quitar iconos restantes"). Sin embargo, persisten:

| Archivo | Emoji | Contexto |
|---|---|---|
| `assets/js/main.js` | `🍺` | `console.log('🍺 Flor de Jamaica - main.js cargado correctamente')` |
| `assets/js/glossary.js` | `📚` | `console.log('📚 Glosario inicializado ...')` |
| `assets/js/recetas.js` | `🍳` | `console.log('🍳 Recetas inicializadas ...')` |
| `assets/js/faq.js` | `❓` | `console.log('❓ FAQ inicializada ...')` |
| `assets/js/recetas.js` | `🔗` | `'<small>🔗 ' + (recipe.source || 'Fuente pública')` |
| `assets/data/recetas-data.json` | `🥤 🍰 🧴 🍸` | Campos `icon` en cada categoría |
| `assets/data/faq-data.json` | `🛒 👨‍🍳 🩺 🍽️` | Campos `icon` en cada categoría |
| `assets/css/style.scss` | `📖` | Fallback emoji en `renderTermCard` (`category.icon \|\| '📖'`) |
| `_includes/footer.html` | SVGs inline | Íconos SVG de Instagram/Facebook/TikTok (como texto visible) |

**Efecto:** Contradicción con la política del repositorio. Los `console.log` con emoji aparecen en la consola del desarrollador; los emojis de los JSON se renderizan como texto visible en la interfaz de usuario (títulos de categorías de recetas/FAQ). Los SVGs del footer son íconos que el usuario considera "restos" que deben limpiarse.

**Solución:**
- Quitar todos los emojis de los `console.log`.
- Quitar los campos `icon` de los JSON o reemplazarlos con texto plano.
- Quitar el fallback emoji `📖` en `glossary.js`.
- Quitar los SVGs/íconos del footer y el emoji `🔗` en `recetas.js`.
- Eliminar el SVG `icono-chevron` del header si se considera un ícono.

---

### 5. `404.html` usa `href="/"` en lugar de `{{ '/' | relative_url }}`

```html
<a href="/" class="boton boton-primario">Volver al Inicio</a>
```

**Efecto:** En despliegues con subdirectorio (GitHub Pages con `baseurl`), los enlaces internos quedan rotos. El archivo `404.html` no usa layouts de Jekyll, así que no hereda `baseurl`.

**Solución:** Usar `{{ '/' | relative_url }}` si se convierte en página Jekyll, o dejar como `/` siempre que el sitio no use `baseurl`.

---

### 6. Enlaces a PDFs inexistentes o incorrectos

| Archivo | Enlace | Estado |
|---|---|---|
| `donde-comprar.md:52` | `/assets/docs/catalogo-flor-de-jamaica.pdf` | ✅ Existe (2584 bytes .md + 4546 .pdf) |
| `contacto.md:46-47` | `/assets/docs/recetario-jamaica.md` y `/assets/docs/catalogo-flor-de-jamaica.md` | ⚠️ Enlaza al `.md` no al `.pdf` |
| `blog/receta-agua-jamaica.md:59` | `/assets/docs/recetario-jamaica.pdf` | ✅ Existe |
| `blog/beneficios-cientificos-jamaica.md:59` | `/assets/docs/catalogo-flor-de-jamaica.pdf` | ✅ Existe |
| `blog/identificar-jamaica-autentica.md:107-108` | PDFs correspondientes | ✅ Existen |
| `blog/comparativa-jamaica-natural.md:49` | `/assets/docs/recetario-jamaica.pdf` | ✅ Existe |

**Problema:** En `contacto.md` se enlazan los archivos `.md` como si fueran "PDF" ("Descargar Recetario Exclusivo (PDF)") pero los enlaces apuntan a los `.md`. Los usuarios descargarían Markdown en lugar de PDF.

**Solución:** Cambiar los `/assets/docs/recetario-jamaica.md` → `.pdf` y `/assets/docs/catalogo-flor-de-jamaica.md` → `.pdf` en `contacto.md`.

---

### 7. Inconsistencia en email y WhatsApp de contacto

| Fuente | Email | WhatsApp | Instagram |
|---|---|---|---|
| `_includes/footer.html` | `contacto@florajamaica.com` | `5215551234567` | `flor_jamaica_oficial` |
| `_layouts/default.html` (Schema) | `contacto@flordejamaica.com` | `5215551234567` | `flor_jamaica_oficial` |
| `contacto.md` | `contacto@flordejamaica.com` | `5215551234567` | `flor_jamaica_oficial` |
| `assets/docs/recetario-jamaica.md` | `contacto@flordejamaica.com` | — | `www.flor-de-jamaica.com` |
| `assets/docs/catalogo-flor-de-jamaica.md` | `contacto@flordejamaica.com` | — | — |

**Efecto:** Dos variantes de email (`florajamaica.com` vs `flordejamaica.com`) y el recetario/catalogo usan `www.flor-de-jamaica.com` como dominio web, pero el footer y el resto usan el email. El dominio `flor-de-jamaica.com` no coincide con el username de Instagram (`flor_jamaica_oficial`) ni con el README (`github.io/flor-de-jamaica`).

**Solución:** Unificar en `contacto@flordejamaica.com` y remover referencias al dominio `flor-de-jamaica.com` o aclarar cuál es el dominio canónico.

---

### 8. `favicon-16x16` faltante

Solo existen en `assets/images/iconos/`:
- `favicon.ico` (contiene múltiples tamaños)
- `favicon-32.png`
- `favicon-64.png`

Falta `favicon-16x16.png`.

**Efecto:** GitHub Pages y algunos navegadores esperan un favicon de 16×16. Algunos sistemas lo generan desde el `.ico`, pero otros no.

**Solución:** Añadir `favicon-16x16.png` o usar `favicon-32.png` con `sizes="16x16"` (no ideal) o servir el `.ico` con múltiples tamaños.

---

### 9. Faltan meta etiquetas `apple-touch-icon` y `theme-color`

- `apple-touch-icon`: No está en `default.html` (ni en `404.html`).
- `theme-color`: Sí está en `default.html` (`#B71F3E`), pero falta en `404.html` (solo define `:root` con el color).

**Efecto:** Al guardar el sitio en pantalla de inicio de iOS, se usa un ícono genérico.

**Solución:** Añadir `<link rel="apple-touch-icon" href="/assets/images/iconos/favicon-64.png">` en `default.html`.

---

## 🔎 Problemas Medios (rendimiento, accesibilidad, calidad de código)

### 10. Emojis usados como fallbacks en JavaScript (`glossary.js`)

```js
html += '<div class="glossary-avatar">' + (category.icon || '📖') + '</div>'
```

**Efecto:** El fallback emoji `📖` se renderiza visiblemente en la UI de usuarios finales cuando el JSON no incluye un `icon`. Los datos del glosario **no tienen campo `icon`** en absoluto, por lo que **todos los avatares del glosario muestran el emoji 📖**.

**Solución:** Reemplazar con un placeholder SVG o texto.

---

### 11. `blog/` no usa colección `_posts/` de Jekyll

Los posts de blog están en `/blog/*.md` (no en `_posts/`), pero usan `layout: post`.

**Efecto:** Jekyll **no trata estos archivos como publicaciones del blog** (no aplican las convenciones de `_posts/`). Funciona porque cada archivo tiene `layout: post` y `date:` en el front matter, pero:
- No aparecen en `site.posts` (colección de posts).
- No se generan correctamente para RSS con `jekyll-feed`.
- Las URLs de permalink pueden no incluir `/blog/`.

**Solución:** Mover archivos a `_posts/` con prefijo de fecha (`2025-04-03-beneficios-cientificos-jamaica.md`) o confirmar que la estructura actual es intencional (si no, el blog no aparece en feeds RSS ni en listados de posts).

---

### 12. `404.html` no incluye los estilos del sitio ni `baseurl`

El `404.html` es una página HTML autónoma con CSS inline. No usa layouts de Jekyll, así que:
- No hereda `header.html` ni `footer.html`.
- No incluye `main.js`, `glossary.js`, etc.
- Los enlaces usan `href="/"` sin `relative_url`.

**Efecto:** La 404 es funcional pero inconsistente con el resto del sitio (no hay navegación, no hay branding de header/footer).

**Solución:** Considerar usar `layout: default` con front matter `---` si Jekyll lo soporta, o mantener el estilo inline pero sincronizar branding.

---

### 13. `console.log` con emoji en archivos JS

| Archivo | Línea | Mensaje |
|---|---|---|
| `main.js` | 189 | `'🍺 Flor de Jamaica - main.js cargado correctamente'` |
| `glossary.js` | 327 | `'📚 Glosario inicializado \| Base path: ...'` |
| `recetas.js` | 242 | `'🍳 Recetas inicializadas \| Base path: ...'` |
| `faq.js` | 261 | `'❓ FAQ inicializada \| Base path: ...'` |

**Efecto:** Aparecen en la consola del navegador. Aunque no afectan funcionalidad, violan la política de "NADA de emoji".

**Solución:** Quitar los emojis de los mensajes de consola.

---

## 📊 Resumen por prioridad

| Prioridad | Problema | Archivo/Área |
|---|---|---|
| **🔴 Crítico** | Layout `home` inexistente → home rota | `index.md`, `_layouts/` |
| **🔴 Crítico** | `url: ""` en `_config.yml` → OG/Twitter/sitemap rotos | `_config.yml` |
| **🔴 Crítico** | `robots.txt` sitemap apunta a dominio falso | `robots.txt` |
| **🟠 Alto** | Emojis en console.log y JSON data | `assets/js/*.js`, `assets/data/*.json` |
| **🟠 Alto** | SVGs/íconos en footer (Instagram, Facebook, TikTok) | `_includes/footer.html` |
| **🟠 Alto** | Emojis como fallback en `glossary.js` + avatar 📖 | `assets/js/glossary.js` |
| **🟠 Alto** | Enlaces a `.md` en lugar de `.pdf` en `contacto.md` | `contacto.md` |
| **🟡 Medio** | Inconsistencia de email (`florajamaica` vs `flordejamaica`) | Múltiples archivos |
| **🟡 Medio** | Blog posts en `/blog/` no en `_posts/` | `blog/` |
| **🟡 Medio** | `href="/"` hardcodeado en `404.html` | `404.html` |
| **🟢 Bajo** | Falta `favicon-16x16.png` | `assets/images/iconos/` |
| **🟢 Bajo** | Falta `apple-touch-icon` en `default.html` | `_layouts/default.html` |
| **🟢 Bajo** | Consola log con emoji | `assets/js/*.js` |

---

## 📋 Checklist de verificación completada

- ✅ Estructura de layouts (`default`, `page`, **falta `home`**)
- ✅ Configuración `_config.yml` (URL vacío, baseurl vacío)
- ✅ CSS/SCSS (front matter ✅, variables Sass ✅, `darken()` corregido ✅)
- ✅ JavaScript (`main.js`, `glossary.js`, `recetas.js`, `faq.js`)
- ✅ Datos JSON (`glossary-data.json`, `recetas-data.json`, `faq-data.json`)
- ✅ Páginas Markdown (todas las secciones principales)
- ✅ Blog posts (4 artículos + index)
- ✅ Includes (`header.html`, `footer.html`, `popup-newsletter.html`)
- ✅ SEO (Open Graph, Twitter Cards, Schema.org, sitemap, robots.txt)
- ✅ Accesibilidad (ARIA, focus, lazy loading)
- ✅ Enlaces internos y externos (rotos, inconsistentes)
- ✅ Consistencia de marca (email, WhatsApp, Instagram, dominio)
- ✅ Política anti-emoji del repositorio

---

## 🛠️ Recomendaciones de acción inmediata

1. **Crear `_layouts/home.html`** heredando de `default` (el layout `home` usado en `index.md` no existe).
2. **Descomentar `url` en `_config.yml`** y establecer `https://1inquisidor1.github.io`.
3. **Corregir `Sitemap:` en `robots.txt`** al dominio real de GitHub Pages.
4. **Eliminar todos los emojis** de `console.log`, JSON data, fallback de glossary.js y footer SVGs.
5. **Corregir enlaces PDF** en `contacto.md` (`.md` → `.pdf`).
6. **Unificar el email** en `contacto@flordejamaica.com` en todos los archivos.
7. **Añadir `apple-touch-icon`** en `_layouts/default.html`.
8. **Revisar estructura de blog** (`blog/` vs `_posts/`) y decidir si migrar para RSS correcto.