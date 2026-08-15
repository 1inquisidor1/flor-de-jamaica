# 🔍 Auditoría de Problemas — Flor de Jamaica

Fecha: 2026-08-14 · Alcance: código completo del repositorio (Jekyll + CSS + JS) comparado contra prácticas estándar de sitios web modernos (Lighthouse, WCAG, patrones de sitios de producto/contenido similares).

---

## 🔴 CRÍTICOS (rompen funcionalidad o construcción del sitio)

### 1. `index.md` declara `layout: home` pero ese layout **no existe**
Solo existen `_layouts/default.html` y `_layouts/page.html`. Nunca se creó `_layouts/home.html`.

**Efecto real:** Jekyll no encuentra el layout `home` y renderiza la página de inicio **sin ningún layout** — es decir, sin `<head>` (sin CSS, sin fuentes, sin meta tags), sin header ni footer. Esto explica por qué la home puede verse "rota" o distinta al resto del sitio.

**Solución:** crear `_layouts/home.html` que herede de `default` (`layout: default` en su front matter), o cambiar `index.md` para usar `layout: default` directamente.

---

### 2. `assets/css/style.scss` no tiene *front matter* de Jekyll
Un archivo `.scss` necesita como mínimo:
```
---
---
```
al inicio para que Jekyll lo reconozca y lo compile a CSS.

**Efecto real:** sin ese front matter, Jekyll trata el archivo como un asset estático y lo copia tal cual (`style.scss`), **nunca genera `style.css`**. El `<link rel="stylesheet" href=".../style.css">` en `default.html` apunta a un archivo que no existe → **el sitio se ve sin ningún estilo aplicado** (HTML plano).

---

### 3. Uso de `darken()` de Sass sobre variables CSS (`var(--color)`)
Aparece en 4 lugares del CSS:
```scss
color: darken($color: var(--rojo-profundo), $amount: 15%);   // a:hover
background: ... darken($color: var(--verde-hoja), $amount: 10%) ...;  // .footer
background: darken($color: var(--rojo-profundo), $amount: 15%);  // .tarjeta-boton:hover
background: ... darken($color: var(--rojo-profundo), $amount: 10%) ...;  // .page-hero
```

**Efecto real:** la función `darken()` de Sass necesita un color literal de Sass (`#B71F3E`), no una variable CSS en tiempo de ejecución. Esto **hace fallar la compilación de Sass** con un error tipo *"$color: var(...) is not a color"*. Incluso si se corrige el problema #2 (agregando el front matter), el sitio seguiría sin generar CSS por este error.

**Solución:** declarar los colores también como variables Sass (`$rojo-profundo: #B71F3E;`) y usar `darken($rojo-profundo, 15%)`, reservando las CSS custom properties solo para uso en el HTML/inline.

---

### 4. `url:` comentado en `_config.yml`
```yaml
# url: "https://1inquisidor1.github.io"
```

**Efecto real:** el filtro `absolute_url` (usado en Open Graph, Twitter Cards y por los plugins `jekyll-seo-tag`/`jekyll-sitemap`) necesita `site.url` + `site.baseurl` para construir URLs completas. Sin `url`, esas URLs quedan **relativas o incompletas**, por lo que las vistas previas al compartir el sitio en WhatsApp/Facebook/X **no van a funcionar correctamente** (imagen y enlace rotos), y el `sitemap.xml` puede generarse con URLs inválidas.

**Solución:** descomentar y establecer `url: "https://1inquisidor1.github.io"`.

---

### 5. `z-index: var(--z-header) + 1;` es CSS inválido
Aparece en `.menu-toggle` y `.hamburguesa`.

**Efecto real:** en CSS no se puede sumar directamente a una variable sin `calc()`. Esta línea se interpreta como texto inválido y el navegador la ignora, dejando esos elementos con z-index por defecto — pueden quedar **por detrás de otros elementos** en ciertas condiciones de scroll/overlap.

**Solución:** `z-index: calc(var(--z-header) + 1);`

---

## 🟠 IMPORTANTES (afectan rendimiento, accesibilidad o SEO)

### 6. Las 3 imágenes del slider usan `loading="lazy"`, incluida la primera (visible de inmediato)
La imagen que se ve al cargar la página (el LCP — *Largest Contentful Paint*) **nunca debe llevar `lazy`**, porque retrasa su descarga y penaliza el puntaje de Performance en Lighthouse. Solo las imágenes 2 y 3 (fuera de la vista inicial) deberían ser lazy.

### 7. El slider entrega la misma imagen de 1920×800 a todos los dispositivos
Un teléfono de 375px de ancho descarga la misma imagen pesada que un monitor 4K. Sitios modernos usan `<picture>` con `srcset`/`sizes` para servir versiones más pequeñas en móvil.

### 8. Los indicadores ("dots") del slider miden 12–16px
Muy por debajo del mínimo de accesibilidad táctil de 44×44px que la propia Fase 5 se propuso cumplir. En móvil son difíciles de tocar con precisión.

### 9. La página de inicio tiene **3 etiquetas `<h1>`** (una por cada slide)
Debe haber **un solo `<h1>` por página** (buena práctica SEO/accesibilidad). Los títulos de cada slide deberían usar `<p>` o `<span>` con `aria-live`, no `<h1>`.

### 10. La clase `.skip-link` está definida en el CSS pero **nunca se usa** en el HTML
Es una utilidad de accesibilidad (permite saltar al contenido principal con teclado) que quedó a medio implementar.

### 11. El carrusel solo se pausa con mouse/touch, no con teclado
Un usuario que navega con `Tab` hacia un enlace dentro de un slide no detiene la rotación automática — puede perder el enfoque si el slide cambia mientras interactúa.

### 12. Falta `apple-touch-icon`
En iOS, al guardar el sitio en pantalla de inicio, se usará un ícono genérico en lugar del favicon de la marca.

---

## 🟡 MEJORAS (comparado con sitios de referencia similares — blogs de salud/producto natural, ej. Traditional Medicinals, Numi Tea, AeroPress)

| # | Observación | Por qué importa |
|---|---|---|
| 13 | No hay un botón de llamada a la acción (CTA) claro en el hero — solo texto decorativo | Sitios similares suelen tener un botón inmediato ("Descubre más", "Ver beneficios") sobre el hero |
| 14 | No hay indicador de "desplázate hacia abajo" en el hero | Frecuente en sitios de una sola página larga, ayuda a que el usuario sepa que hay más contenido |
| 15 | El footer tiene enlaces `href="#"` a redes sociales (aún sin canales reales) | Visualmente puede parecer un enlace roto a un visitante nuevo — considera ocultarlos hasta tener las URLs reales |
| 16 | No hay "breadcrumbs" (Inicio › Apariencia) en las subpáginas | Común en sitios de contenido informativo/educativo, ayuda a la navegación y al SEO |
| 17 | No hay botones de compartir en las subpáginas | Sitios de salud/nutrición similares casi siempre incluyen compartir en redes al final del artículo |
| 18 | El "logo" es solo texto con emoji (🌺 Jamaica) | Funcional, pero se ve amateur frente a sitios con logotipo gráfico diseñado |
| 19 | No hay modo oscuro (ni siquiera respetando `prefers-color-scheme`) | Cada vez más esperado como estándar en sitios de 2026 |
| 20 | Solo se generó WebP, no AVIF | La Fase 5 original sugería AVIF como el formato ideal (mejor compresión), quedó pendiente |

---

## ✅ Resumen por prioridad de arreglo

1. **Ahora mismo (rompen el sitio):** #1, #2, #3, #4, #5
2. **Pronto (rendimiento/accesibilidad):** #6, #7, #8, #9, #10, #11, #12
3. **Cuando haya tiempo (pulido/comparativo):** #13 a #20

¿Quieres que arregle directamente los 5 problemas críticos ahora? Son los que probablemente están causando que el sitio se vea mal o no cargue estilos.
