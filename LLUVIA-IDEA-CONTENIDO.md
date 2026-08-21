# Lluvia de Ideas: Mejora de Contenido "Flor de Jamaica"
> **Estrategia comercial adaptada a GitHub Pages**  
> Inspirado en sitios de divulgación científica (Botanipedia, Herbario Virtual FCO, Infografías IBUNAM, NomenPlantor) y e-commerce natural, **adaptada a las restricciones de GitHub Pages** (sin checkout directo).

---

##  Objetivo Comercial (Actualizado)
Convertir el sitio web estático en un **showroom digital de confianza** que:
1. Posicione la **Flor de Jamaica como producto premium y confiable**.
2. Eduque al usuario (inspirado en divulgación científica).
3. Genere **leads y conversión indirecta** (WhatsApp, Instagram, newsletter).
4. Mantenga el sitio dentro de las **TOS de GitHub Pages** (sin e-commerce directo).

---

##  Inspiración por Tipo de Sitio

| Tipo de Sitio | Uso en el Proyecto |
|---|---|
| **Botanipedia** | Glosario técnico, fichas de especie |
| **Herbario Virtual FCO** | Tablas de datos, formato académico |
| **Infografías IBUNAM** | Infografías visuales, entrevistas |
| **NomenPlantor** | Narrativa educativa, asequible |
| **E-commerce natural** | Storytelling, social proof, CTAs |

---

##  Mejoras Comerciales Implementadas

###  FASE 1: Web como Showroom (COMPLETADA)

#### 1. **Nueva página: `/donde-comprar/`**
- Lista de tiendas físicas simuladas
- Enlace a WhatsApp comercial
- Botón de descarga del catálogo PDF
- Integración con Instagram

#### 2. **Nueva página: `/contacto/`**
- Formulario de contacto con Formspree.io
- Enlaces a WhatsApp e Instagram
- Lead magnets: catálogo PDF y recetario gratuito

#### 3. **Lead Magnets generados**
-  `catalogo-flor-de-jamaica.pdf` — catálogo de productos
-  `recetario-jamaica.pdf` — 10 recetas exclusivas

#### 4. **Blog científico-comercial** (nueva sección `/blog/`)
Artículos que posicionan el producto indirectamente:
- `comparativa-jamaica-natural.md` — diferencial vs. competencia
- `receta-agua-jamaica.md` — guía de uso premium
- `beneficios-cientificos-jamaica.md` — validación científica
- `identificar-jamaica-autentica.md` — guía de identificación con tabla comparativa

#### 5. **CTA principal en homepage**
- Sección destacada: "¿Quieres probar la diferencia?"  enlaza a `/donde-comprar/`

#### 6. **Header y Footer actualizados**
- Enlaces a: Inicio, Explorar, Dónde Comprar, Blog, Contacto
- Footer con mapa del sitio, redes sociales y contacto directo

---

###  FASE 2: Funcionalidades Interactivas (COMPLETADA)

#### 1. **Popup de Newsletter** (`popup-newsletter.html`)
- Mostrado después de 2 segundos
- Cookie de 30 días para no molestar
- Integración con Formspree.io
- Lead magnet: recetario gratis

#### 2. **Sección de Testimonios** (`/testimonios/`)
- 5 testimonios empíricos ficticios con ratings
- Aviso legal claro sobre observaciones empíricas
- CTA a WhatsApp y catálogo PDF

#### 3. **Glosario Técnico Interactivo** (`/glosario/`)
- 16 términos categorizados: Botánica, Nutrición, Salud, Gastronomía
- Tooltips interactivos con `data-glossary`
- Búsqueda en tiempo real
- Filtrado por categorías
- JavaScript dedicado (`glossary.js`)

#### 4. **Sección de Recetas Validadas** (`/recetas/`)
- 7 recetas organizadas en 4 categorías
- Videos tutoriales de YouTube embebidos
- Buscador y filtrado por tipo
- JavaScript dedicado (`recetas.js`)

#### 5. **Sección de Preguntas Frecuentes** (`/faq/`)
- 16 preguntas organizadas en 4 categorías:
  - Producto y Compra (4 FAQ)
  - Recetas y Preparación (4 FAQ)
  - Salud y Beneficios (4 FAQ)
  - Gastronomía y Usos (4 FAQ)
- Buscador en tiempo real
- Acordeón interactivo
- Videos tutoriales embebidos
- Aviso legal sobre no responsabilidad

---

## ️ Próximas Etapas (Pendientes)

1. **Más artículos de blog avanzados** — Serie sobre ciencia de los antioxidantes
2. **Infografía visual** — "Ciclo de la Jamaica: planta a vaso"
3. **Modo oscuro** — Toggle en el header

---

##  Mejoras de UX/Técnicas Pendientes

| Elemento | Acción |
|---|---|
| **Modo oscuro** | Toggle en el header para modo noche |
| **Contador de tiempo lectura** | En blog: "Artículo leído en X minutos" |
| **Open Graph optimizado** | Imágenes compartibles para redes |
| **Schema.org FAQ markup** | Para SEO de preguntas frecuentes |

---

##  Métricas de Conversión a Medir

| Métrica | Herramienta | Objetivo |
|---|---|---|
| Visitas a `/donde-comprar/` | GitHub Analytics | Confirmar interés comercial |
| Descargas de PDFs | Contador local | Medir engagement |
| Clics en WhatsApp | WhatsApp Business UTM | Medir intención de compra |
| Interacciones en blog | Tiempo en página | Medir valor del contenido |
| Uso de glosario/tooltips | Eventos JS | Medir engagement técnico |
| Búsquedas en FAQ/recetas | Eventos JS | Identificar dudas frecuentes |

---

##  Checklist de Estado Actual

| Tarea | Estado |
|---|---|
|  Crear `/donde-comprar/` | COMPLETADO |
|  Crear `/contacto/` | COMPLETADO |
|  Generar catálogo PDF | COMPLETADO |
|  Generar recetario PDF | COMPLETADO |
|  Crear blog con 4 artículos | COMPLETADO |
|  Actualizar header y footer | COMPLETADO |
|  Agregar CTA principal en homepage | COMPLETADO |
|  Popup newsletter con lead magnet | COMPLETADO |
|  Sección `/testimonios/` con aviso legal | COMPLETADO |
|  Artículo avanzado del blog | COMPLETADO |
|  Glosario técnico interactivo | COMPLETADO |
|  Sección `/recetas/` filtrable | COMPLETADO |
|  Sección `/faq/` con acordeón | COMPLETADO |

---

##  Registro de Decisiones Clave

| Fecha | Decisión | Justificación |
|---|---|---|
| 2025-04-05 | Usar Formspree.io para formularios | Compatible con GitHub Pages, sin backend |
| 2025-04-05 | PDFs como lead magnet | Formato profesional, fácil de compartir |
| 2025-04-05 | Enfoque indirecto de venta | Respetuoso con TOS de GitHub Pages |
| 2025-04-05 | Blog científico-comercial | Genera autoridad y confianza sin ser agresivo |
| 2025-04-05 | WhatsApp como canal de venta | Alto ROI en LATAM, fácil de integrar |
| 2025-04-05 | Testimonios ficticios con aviso legal | Cumple TOS de GitHub Pages, evita datos reales |
| 2025-04-05 | Referencias a sitios web de divulgación | Fortalece credibilidad científica del contenido |
| 2025-04-05 | Aviso de no responsabilidad en artículos | Cumple con normativas de contenido informativo |
| 2025-04-05 | Glosario interactivo con tooltips | Mejora UX educativa sin sobrecargar |
| 2025-04-05 | Videos tutoriales embebidos en FAQ | Aumenta engagement y credibilidad |
| 2025-04-05 | FAQ con acordeón dinámico | Mejora navegación y reduce esfuerzo de lectura |

---
*Documento actualizado: 2025-04-05*
