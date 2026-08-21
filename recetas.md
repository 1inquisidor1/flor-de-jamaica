---
layout: page
title: "Recetas con Jamaica"
description: "Descubre las mejores recetas con Flor de Jamaica: bebidas, postres, cócteles y más"
image: /assets/images/slider/campo-hibiscus.webp
---

<section class="page-hero">
 <div class="page-hero-contenido">
 <h1 class="page-titulo">Recetas con Flor de Jamaica</h1>
 <div class="page-linea-decorativa"></div>
 <p style="color: var(--blanco); text-align: center; max-width: 700px; margin: 16px auto 0; font-size: 16px;">
 Explora nuestras recetas cuidadosamente seleccionadas y validadas, 
 acompañadas de videos tutoriales de canales especializados en cocina.
 </p>
 </div>
</section>

<div class="page-contenido">
 <div class="page-wrapper animar-entrada">

 <!-- Introducción -->
 <blockquote>
 <strong>Sabías que:</strong> La Flor de Jamaica no solo es ideal para bebidas, 
 también se puede usar en postres, mermezas y cócteles gourmet. 
 Aquí encontrarás recetas validadas con enlaces a videos tutoriales.
 </blockquote>

 <!-- Buscador de recetas -->
 <div class="recetas-search-bar">
 <input 
 type="text" 
 id="recetas-search" 
 placeholder="Buscar receta por nombre o ingrediente..."
 autocomplete="off"
 >
 <button type="button" class="recetas-clear-search" id="recetas-clear-search" title="Limpiar búsqueda"></button>
 </div>

 <!-- Filtros por categoría -->
 <div class="recetas-filters-bar">
 <button class="recetas-filter-btn active" data-filter="all">Todas las recetas</button>
 <button class="recetas-filter-btn" data-filter="bebida">Bebidas</button>
 <button class="recetas-filter-btn" data-filter="postre">Postres</button>
 <button class="recetas-filter-btn" data-filter="cosmestico">Cosméticos</button>
 <button class="recetas-filter-btn" data-filter="coctel">Cócteles</button>
 </div>

 <!-- Contenedor de recetas -->
 <div id="recetas-container" class="recetas-container">
 <p class="recetas-loading">Cargando recetas...</p>
 </div>

 <!-- Aviso legal -->
 <div class="aviso-legal-pequeno">
 <p>
 <strong>Aviso:</strong> Las recetas presentadas son de uso educativo e informativo, 
 basadas en fuentes públicas confiables. <strong>No constituyen consejos médicos.</strong> 
 Los enlaces de YouTube son de canales externos y pueden cambiar con el tiempo. 
 Nosotros no somos responsables de la veracidad de los contenidos externos ni de las 
 recetas presentadas en los videos enlazados. Siempre consulta con un profesional antes 
 de modificar tu dieta.
 </p>
 </div>

 </div>
</div>
