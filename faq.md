---
layout: page
title: "Preguntas Frecuentes"
description: "Resolvemos las dudas más comunes sobre la Flor de Jamaica"
image: /assets/images/slider/campo-hibiscus.webp
---

<section class="page-hero">
  <div class="page-hero-contenido">
    <h1 class="page-titulo">Preguntas Frecuentes</h1>
    <div class="page-linea-decorativa"></div>
    <p style="color: var(--blanco); text-align: center; max-width: 700px; margin: 16px auto 0; font-size: 16px;">
      Resolvemos las dudas más comunes sobre nuestra Flor de Jamaica natural, 
      sus beneficios, recetas y usos.
    </p>
  </div>
</section>

<div class="page-contenido">
  <div class="page-wrapper animar-entrada">

    <!-- Introducción -->
    <blockquote>
      <strong>¿Tienes más preguntas?</strong> No dudes en contactarnos a través de 
      <a href="{{ '/contacto/' | relative_url }}">nuestro formulario</a> o por 
      <a href="https://wa.me/5215551234567">WhatsApp</a>.
    </blockquote>

    <!-- Buscador de FAQ -->
    <div class="faq-search-bar">
      <input 
        type="text" 
        id="faq-search" 
        placeholder="Buscar pregunta por tema o palabra clave..."
        autocomplete="off"
      >
      <button type="button" class="faq-clear-search" id="faq-clear-search" title="Limpiar búsqueda">✕</button>
    </div>

    <!-- Filtros por categoría -->
    <div class="faq-categories-bar">
      <button class="faq-category-btn active" data-category="all">Todas las categorías</button>
      <button class="faq-category-btn" data-category="producto">🛒 Producto y Compra</button>
      <button class="faq-category-btn" data-category="recetas">Recetas y Preparación</button>
      <button class="faq-category-btn" data-category="salud">🩺 Salud y Beneficios</button>
      <button class="faq-category-btn" data-category="gastronomia">🍽️ Gastronomía y Usos</button>
    </div>

    <!-- Contenedor de FAQs -->
    <div id="faq-container" class="faq-container">
      <p class="faq-loading">Cargando preguntas frecuentes...</p>
    </div>

    <!-- Aviso Legal -->
    <div class="aviso-legal-pequeno">
      <p>
        <strong>Aviso Legal:</strong> Esta sección es informativa y no constituye consejo médico. 
        <strong>No somos responsables por la veracidad de los datos empíricos</strong> presentados en estas 
        respuestas, ya que se basan en observaciones generales y no en estudios clínicos controlados. 
        Las referencias a videos de YouTube son de canales externos y su contenido puede variar. 
        Para dudas médicas, consulta siempre con un profesional de la salud.
      </p>
    </div>

  </div>
</div>
