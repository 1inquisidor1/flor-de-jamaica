---
layout: home
title: "Flor de Jamaica - Elegancia Natural"
description: "Descubre la belleza, propiedades y usos de esta flor excepcional"
---

<!-- Sección Hero: Slider de Imágenes -->
<section class="hero-slider" id="hero-slider">
  <div class="slider-contenedor">
    
    <!-- Slide 1: Campo con flores -->
    <div class="slide slide-activa">
      <img src="{{ '/assets/images/slider/florCampos.jpeg' | relative_url }}" alt="Flores de Jamaica en campo" loading="lazy">
      <div class="slide-texto">
        <h1 class="slide-titulo">La flor que cautiva</h1>
        <p class="slide-subtitulo">Belleza natural en su máxima expresión</p>
      </div>
    </div>

    <!-- Slide 2: Flor individual close-up -->
    <div class="slide">
      <img src="{{ '/assets/images/slider/florIndividual.jpeg' | relative_url }}" alt="Flor de Jamaica close-up" loading="lazy">
      <div class="slide-texto">
        <h1 class="slide-titulo">Naturaleza en cada pétalo</h1>
        <p class="slide-subtitulo">Descubre su estructura única</p>
      </div>
    </div>

    <!-- Slide 3: Bebida (Agua de Jamaica) -->
    <div class="slide">
      <img src="{{ '/assets/images/slider/JugoJamaica.jpeg' | relative_url }}" alt="Agua de Jamaica en vaso" loading="lazy">
      <div class="slide-texto">
        <h1 class="slide-titulo">Tradición y salud</h1>
        <p class="slide-subtitulo">Una bebida milenaria para tu bienestar</p>
      </div>
    </div>

  </div>

  <!-- Controles: Indicadores (dots) -->
  <div class="slider-controles">
    <button class="dot dot-activo" data-slide="0" aria-label="Ir a slide 1"></button>
    <button class="dot" data-slide="1" aria-label="Ir a slide 2"></button>
    <button class="dot" data-slide="2" aria-label="Ir a slide 3"></button>
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
<section class="seccion-tarjetas animar-entrada">
  <div class="contenedor-seccion">
    <h2>Explora la Flor de Jamaica</h2>
    
    <div class="grid-tarjetas">
      
      <!-- Tarjeta 1: Apariencia -->
      <article class="tarjeta animar-entrada">
        <div class="tarjeta-icono">🌿</div>
        <h3 class="tarjeta-titulo">Apariencia</h3>
        <p class="tarjeta-descripcion">
          De 1.5 a 3 metros de altura y un cáliz rojo intenso que cautiva a primera vista.
        </p>
        <a href="{{ '/apariencia/' | relative_url }}" class="tarjeta-boton">Explorar →</a>
      </article>

      <!-- Tarjeta 2: Composición -->
      <article class="tarjeta animar-entrada">
        <div class="tarjeta-icono">🧪</div>
        <h3 class="tarjeta-titulo">Composición</h3>
        <p class="tarjeta-descripcion">
          Rica en calcio, potasio, vitamina C y potentes compuestos bioactivos.
        </p>
        <a href="{{ '/composicion/' | relative_url }}" class="tarjeta-boton">Explorar →</a>
      </article>

      <!-- Tarjeta 3: Beneficios -->
      <article class="tarjeta animar-entrada">
        <div class="tarjeta-icono">❤️</div>
        <h3 class="tarjeta-titulo">Beneficios</h3>
        <p class="tarjeta-descripcion">
          Regulación de presión arterial, poder antioxidante y efectos terapéuticos comprobados.
        </p>
        <a href="{{ '/beneficios/' | relative_url }}" class="tarjeta-boton">Explorar →</a>
      </article>

      <!-- Tarjeta 4: Usos -->
      <article class="tarjeta animar-entrada">
        <div class="tarjeta-icono">🍹</div>
        <h3 class="tarjeta-titulo">Usos</h3>
        <p class="tarjeta-descripcion">
          Gastronomía, medicina tradicional e industria: versátil y valiosa.
        </p>
        <a href="{{ '/usos/' | relative_url }}" class="tarjeta-boton">Explorar →</a>
      </article>

    </div>
  </div>
</section>

<!-- Script para control del slider -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.getElementById('hero-slider');
    let indiceActual = 0;
    let intervalo;

    // Función para mostrar un slide específico
    function mostrarSlide(indice) {
      slides.forEach((slide, idx) => {
        slide.classList.remove('slide-activa');
        dots[idx].classList.remove('dot-activo');
      });
      slides[indice].classList.add('slide-activa');
      dots[indice].classList.add('dot-activo');
      indiceActual = indice;
    }

    // Cambiar al siguiente slide
    function siguienteSlide() {
      const siguiente = (indiceActual + 1) % slides.length;
      mostrarSlide(siguiente);
    }

    // Iniciar rotación automática
    function iniciarRotacion() {
      intervalo = setInterval(siguienteSlide, 4000); // Cambiar cada 4 segundos
    }

    // Detener rotación
    function detenerRotacion() {
      clearInterval(intervalo);
    }

    // Controles interactivos
    dots.forEach((dot) => {
      dot.addEventListener('click', function() {
        const indice = parseInt(this.getAttribute('data-slide'));
        mostrarSlide(indice);
        detenerRotacion();
        iniciarRotacion();
      });
    });

    // Pausar al hover (escritorio)
    slider.addEventListener('mouseenter', detenerRotacion);
    slider.addEventListener('mouseleave', iniciarRotacion);

    // Pausar al tocar (móvil)
    slider.addEventListener('touchstart', detenerRotacion);
    slider.addEventListener('touchend', iniciarRotacion);

    // Iniciar rotación
    iniciarRotacion();
  });
</script>
