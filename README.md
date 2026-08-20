# 🌺 Flor de Jamaica — Elegancia Natural

Sitio web estático construido con [Jekyll](https://jekyllrb.com/) y desplegado en GitHub Pages, dedicado a la Flor de Jamaica (*Hibiscus sabdariffa*): su apariencia botánica, composición nutricional, beneficios respaldados científicamente y usos gastronómicos, medicinales e industriales.

**Sitio en vivo:** https://1inquisidor1.github.io/flor-de-jamaica/

## Estructura del repositorio

El sitio web completo (proyecto Jekyll) vive dentro de la carpeta `proyecto/`.
La raíz del repositorio solo contiene documentación/instrucciones:

```
├── README.md                  Este archivo
├── AUDITORIA-PROBLEMAS.md     Auditoría de calidad (ver nota abajo)
├── .gitignore
└── proyecto/                  Proyecto Jekyll completo (el sitio web)
    ├── _config.yml            Configuración global de Jekyll
    ├── _layouts/              default.html (base), home.html, page.html
    ├── _includes/            header.html (navegación) y footer.html
    ├── assets/
    │   ├── css/style.scss     Estilos maestros (paleta, tipografía, responsive)
    │   ├── js/main.js          Slider, menú móvil y efectos de scroll
    │   └── images/            slider/, posts/, iconos/ (todas en WebP optimizado)
    ├── index.md              Página de inicio con slider
    ├── apariencia.md         Descripción botánica
    ├── composicion.md        Perfil nutricional y compuestos bioactivos
    ├── beneficios.md          Beneficios con respaldo científico
    ├── usos.md               Gastronomía, medicina tradicional e industria
    ├── 404.html               Página de error personalizada
    ├── robots.txt             Directivas para motores de búsqueda
    └── Gemfile / Gemfile.lock Dependencias de Jekyll
```

> **Nota sobre `AUDITORIA-PROBLEMAS.md`:** está fechada el 2026-08-14 y documenta
> bugs que **ya fueron corregidos** en el código actual (falta de `_layouts/home.html`,
> front matter en `style.scss`, y uso de `darken()` sobre `var()`). No refleja el estado
> presente del sitio; considérala histórica.

## Paleta de colores

| Color | Hex | Uso |
|---|---|---|
| Rojo profundo | `#B71F3E` | Marca principal, acentos |
| Crema | `#FDF5F0` | Fondos claros |
| Dorado | `#E8A34B` | Detalles decorativos |
| Verde hoja | `#3D6B4F` | Elementos naturales, footer |
| Tinta | `#1A1412` | Texto principal |

Tipografía: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) para títulos, [Inter](https://fonts.google.com/specimen/Inter) para el cuerpo del texto.

## Desarrollo local

El sitio se construye desde dentro de `proyecto/`:

```bash
cd proyecto
bundle install
bundle exec jekyll serve
```

El sitio quedará disponible en `http://localhost:4000/`.

## Mantenimiento

- **Actualizar un texto:** edita el `.md` correspondiente dentro de `proyecto/`, haz commit y push.
- **Cambiar una imagen del slider:** reemplaza el archivo en `proyecto/assets/images/slider/` manteniendo el mismo nombre (o actualiza la referencia en `proyecto/index.md` si cambias el nombre). Usa WebP, 1920×800px, menos de 200KB.
- **Añadir una nueva subpágina:** copia el front matter de `proyecto/apariencia.md` (`layout: page`), crea el archivo `.md` en `proyecto/`, y añade el enlace correspondiente en `proyecto/_includes/header.html`.

## Licencia

Contenido educativo/informativo sobre la Flor de Jamaica. Uso libre con atribución.
