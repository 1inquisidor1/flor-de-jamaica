---
layout: home
title: "Flor de Jamaica - Elegancia Natural"
description: "Descubre la belleza, propiedades y usos de la Flor de Jamaica: bebidas, recetas, beneficios y más. ¡Naturaleza pura en cada sorbo!"
image: /assets/images/slider/campo-hibiscus.webp
---

<!-- Sección Hero: Slider de Imágenes -->
<section class="hero-slider" id="hero-slider" role="group" aria-label="Carrusel de imágenes destacadas" aria-roledescription="carousel" tabindex="0">
 <div class="slider-contenedor">
 
 <!-- Slide 1: Campo con flores -->
 <div class="slide slide-activa" role="group" aria-label="Slide 1 de 3" aria-hidden="false">
 <img src="{{ '/assets/images/slider/campo-hibiscus.webp' | relative_url }}" alt="Flores de Jamaica en campo" width="1920" height="800">
 <div class="slide-texto">
 <h1 class="slide-titulo">La flor que cautiva</h1>
 <p class="slide-subtitulo">Belleza natural en su máxima expresión</p>
 </div>
 </div>

 <!-- Slide 2: Flor individual close-up -->
 <div class="slide" role="group" aria-label="Slide 2 de 3" aria-hidden="true">
 <img src="{{ '/assets/images/slider/flor-hibiscus-jamaica.webp' | relative_url }}" alt="Flor de Jamaica close-up" loading="lazy" width="1920" height="800">
 <div class="slide-texto">
 <h1 class="slide-titulo">Naturaleza en cada pétalo</h1>
 <p class="slide-subtitulo">Descubre su estructura única</p>
 </div>
 </div>

 <!-- Slide 3: Bebida (Agua de Jamaica) -->
 <div class="slide" role="group" aria-label="Slide 3 de 3" aria-hidden="true">
 <img src="{{ '/assets/images/slider/agua-de-jamaica.webp' | relative_url }}" alt="Agua de Jamaica en vaso" loading="lazy" width="1920" height="800">
 <div class="slide-texto">
 <h1 class="slide-titulo">Tradición y salud</h1>
 <p class="slide-subtitulo">Una bebida milenaria para tu bienestar</p>
 </div>
 </div>

 </div>

 <!-- Controles: Indicadores (dots) -->
 <div class="slider-controles" role="tablist" aria-label="Controles del carrusel de imágenes">
  <button class="dot dot-activo" data-slide="0" role="tab" aria-label="Ir al slide 1" aria-selected="true" tabindex="0"></button>
  <button class="dot" data-slide="1" role="tab" aria-label="Ir al slide 2" aria-selected="false" tabindex="-1"></button>
  <button class="dot" data-slide="2" role="tab" aria-label="Ir al slide 3" aria-selected="false" tabindex="-1"></button>
 </div>
</section>

<!-- Sección: Mensaje de Bienvenida -->
<section class="seccion-bienvenida animar-entrada">
 <div class="contenedor-seccion">
 <h2>Bienvenido a Flor de Jamaica</h2>
 <p class="intro-texto">
 La flor de Jamaica no solo es un espectáculo visual; su cáliz rojo encierra <strong>siglos de tradición</strong>, 
 una <strong>riqueza nutricional excepcional</strong> y múltiples <strong>beneficios para tu bienestar</strong>. 
 Acompáñanos a descubrirla.
 </p>
 </div>
</section>

<!-- Sección: Tarjetas de Exploración Rápida -->
<section class="seccion-tarjetas">
 <div class="contenedor-seccion">
 <h2 class="animar-entrada">Explora la Flor de Jamaica</h2>
 
 <div class="grid-tarjetas">
 
 <!-- Tarjeta 1: Apariencia -->
 <article class="tarjeta animar-entrada">
 
 <h3 class="tarjeta-titulo">Apariencia</h3>
 <p class="tarjeta-descripcion">
 De 1.5 a 3 metros de altura y un cáliz rojo intenso que cautiva a primera vista.
 </p>
 <a href="{{ '/apariencia/' | relative_url }}" class="tarjeta-boton">Explorar </a>
 </article>

 <!-- Tarjeta 2: Composición -->
 <article class="tarjeta animar-entrada">
 
 <h3 class="tarjeta-titulo">Composición</h3>
 <p class="tarjeta-descripcion">
 Rica en calcio, potasio, vitamina C y potentes compuestos bioactivos.
 </p>
 <a href="{{ '/composicion/' | relative_url }}" class="tarjeta-boton">Explorar </a>
 </article>

 <!-- Tarjeta 3: Beneficios -->
 <article class="tarjeta animar-entrada">
 <div class="tarjeta-icono"></div>
 <h3 class="tarjeta-titulo">Beneficios</h3>
 <p class="tarjeta-descripcion">
 Regulación de presión arterial, poder antioxidante y efectos terapéuticos comprobados.
 </p>
 <a href="{{ '/beneficios/' | relative_url }}" class="tarjeta-boton">Explorar </a>
 </article>

 <!-- Tarjeta 4: Usos -->
 <article class="tarjeta animar-entrada">
 
 <h3 class="tarjeta-titulo">Usos</h3>
 <p class="tarjeta-descripcion">
 Gastronomía, medicina tradicional e industria: versátil y valiosa.
 </p>
 <a href="{{ '/usos/' | relative_url }}" class="tarjeta-boton">Explorar </a>
 </article>

 </div>

 <!-- CTA: Dónde comprar -->
 <div class="cta-compra animar-entrada" style="text-align: center; margin-top: 48px; padding: 32px; background: var(--crema); border-radius: 12px;">
 <h3 style="color: var(--rojo-profundo); font-family: var(--font-titulo); margin-bottom: 16px;">¿Quieres probar la diferencia?</h3>
 <p style="margin-bottom: 24px;">Descubre dónde encontrar nuestra Flor de Jamaica 100% natural y lleva su pureza a tu hogar.</p>
 <a href="{{ '/donde-comprar/' | relative_url }}" class="tarjeta-boton">Ver puntos de venta </a>
 </div>
 </div>
</section>

<!-- Nota: La lógica del slider (rotación automática, controles, pausa al
 hover/touch) se gestiona centralmente en assets/js/main.js (FASE 4). -->

