/* ============================================================================
   FLOR DE JAMAICA - JAVASCRIPT PRINCIPAL
   ============================================================================
   Este archivo gestiona 3 misiones independientes:
   - Misión A: Control del Slider (Carrusel)
   - Misión B: Control del Menú Móvil (Hamburguesa y Acordeón)
   - Misión C: Efectos de Scroll y Header Inteligente
   ============================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================================
     MISIÓN A: CONTROL DEL SLIDER (CARRUSEL CON EFECTO FADE)
     ========================================================================== */
  (function initSlider() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return; // Solo se ejecuta en la página de inicio

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    let indiceActual = 0;
    let intervalo = null;
    const DURACION_SLIDE = 4000; // 4 segundos

    function mostrarSlide(indice) {
      slides.forEach((slide, idx) => {
        slide.classList.remove('slide-activa');
        if (dots[idx]) dots[idx].classList.remove('dot-activo');
      });
      slides[indice].classList.add('slide-activa');
      if (dots[indice]) dots[indice].classList.add('dot-activo');
      indiceActual = indice;
    }

    function siguienteSlide() {
      const siguiente = (indiceActual + 1) % slides.length;
      mostrarSlide(siguiente);
    }

    function iniciarRotacion() {
      detenerRotacion(); // Evita intervalos duplicados
      intervalo = setInterval(siguienteSlide, DURACION_SLIDE);
    }

    function detenerRotacion() {
      if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
      }
    }

    // Controles (dots) - clic para saltar a un slide específico
    dots.forEach((dot) => {
      dot.addEventListener('click', function () {
        const indice = parseInt(this.getAttribute('data-slide'), 10);
        mostrarSlide(indice);
        iniciarRotacion(); // Reinicia el temporizador
      });
    });

    // Pausa inteligente: hover (escritorio) y touch (móvil)
    slider.addEventListener('mouseenter', detenerRotacion);
    slider.addEventListener('mouseleave', iniciarRotacion);
    slider.addEventListener('touchstart', detenerRotacion, { passive: true });
    slider.addEventListener('touchend', iniciarRotacion, { passive: true });

    // Inicializar
    if (slides.length > 0) {
      mostrarSlide(0);
      iniciarRotacion();
    }
  })();

  /* ==========================================================================
     MISIÓN B: CONTROL DEL MENÚ MÓVIL (HAMBURGUESA Y ACORDEÓN "EXPLORAR")
     ========================================================================== */
  (function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const btnExplorar = document.getElementById('btn-explorar');
    const navSubmenu = document.getElementById('nav-submenu');

    if (!menuToggle || !nav) return;

    const navEnlaces = nav.querySelectorAll('.nav-enlace:not(.nav-enlace-dropdown)');
    const navSubenlaces = nav.querySelectorAll('.nav-subenlace');

    // Cerrar menú móvil al hacer clic en un enlace directo (Inicio, etc.)
    navEnlaces.forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        menuToggle.checked = false;
      });
    });

    // Cerrar menú móvil al hacer clic en un subenlace (Apariencia, Composición, etc.)
    navSubenlaces.forEach(function (subenlace) {
      subenlace.addEventListener('click', function () {
        menuToggle.checked = false;
        if (navSubmenu) navSubmenu.classList.remove('submenu-abierto');
        if (btnExplorar) btnExplorar.setAttribute('aria-expanded', 'false');
      });
    });

    // Cierre al hacer clic fuera del menú (en el área principal)
    document.addEventListener('click', function (event) {
      const clicDentroDelNav = nav.contains(event.target);
      const clicEnHamburguesa = event.target.closest('.hamburguesa');
      const clicEnToggle = event.target === menuToggle;

      if (!clicDentroDelNav && !clicEnHamburguesa && !clicEnToggle && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });

    // Acordeón "Explorar" (solo relevante visualmente en móvil, pero funciona en ambos)
    if (btnExplorar && navSubmenu) {
      btnExplorar.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const expandido = btnExplorar.getAttribute('aria-expanded') === 'true';
        btnExplorar.setAttribute('aria-expanded', String(!expandido));
        navSubmenu.classList.toggle('submenu-abierto');
      });
    }

    // Al redimensionar a escritorio, resetear el estado del acordeón/menú móvil
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        menuToggle.checked = false;
        if (navSubmenu) navSubmenu.classList.remove('submenu-abierto');
        if (btnExplorar) btnExplorar.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  /* ==========================================================================
     MISIÓN C: EFECTOS DE SCROLL Y HEADER INTELIGENTE (GLASSMORPHISM)
     ========================================================================== */
  (function initScrollEffects() {
    const header = document.getElementById('header');
    const UMBRAL_SCROLL = 80; // píxeles

    // --- C.1: Header con efecto glassmorphism al bajar ---
    if (header) {
      function actualizarHeader() {
        if (window.scrollY > UMBRAL_SCROLL) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }

      // Ejecutar una vez al cargar (por si la página ya está scrolleada)
      actualizarHeader();
      window.addEventListener('scroll', actualizarHeader, { passive: true });
    }

    // --- C.2: Revelado de elementos al hacer scroll (Intersection Observer) ---
    const elementosAnimados = document.querySelectorAll('.animar-entrada');

    if (elementosAnimados.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Animar solo una vez
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      elementosAnimados.forEach(function (elemento) {
        observer.observe(elemento);
      });
    } else {
      // Fallback: si no hay soporte para Intersection Observer, mostrar todo directamente
      elementosAnimados.forEach(function (elemento) {
        elemento.classList.add('visible');
      });
    }
  })();

  console.log('🌺 Flor de Jamaica - main.js cargado correctamente');
});
