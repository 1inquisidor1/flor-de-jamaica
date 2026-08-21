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
        slide.setAttribute('aria-hidden', idx !== indice ? 'true' : 'false');
        if (dots[idx]) {
          dots[idx].classList.remove('dot-activo');
          dots[idx].setAttribute('aria-selected', idx === indice ? 'true' : 'false');
          dots[idx].setAttribute('tabindex', idx === indice ? '0' : '-1');
        }
      });
      slides[indice].classList.add('slide-activa');
      if (dots[indice]) {
        dots[indice].classList.add('dot-activo');
        dots[indice].setAttribute('aria-selected', 'true');
        dots[indice].setAttribute('tabindex', '0');
      }
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
      // Navegación por teclado: Enter y Space activan el dot
      dot.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const indice = parseInt(this.getAttribute('data-slide'), 10);
          mostrarSlide(indice);
          iniciarRotacion();
        }
      });
    });

    // Pausa inteligente: hover (escritorio) y touch (móvil)
    slider.addEventListener('mouseenter', detenerRotacion);
    slider.addEventListener('mouseleave', iniciarRotacion);
    slider.addEventListener('touchstart', detenerRotacion, { passive: true });
    slider.addEventListener('touchend', iniciarRotacion, { passive: true });

    // Navegación por teclado del slider (flechas izquierda/derecha)
    slider.addEventListener('keydown', function (e) {
      if (e.target.closest('.dot')) {
        // Si el foco está en un dot, dejamos que el keydown del dot lo maneje
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const anterior = (indiceActual - 1 + slides.length) % slides.length;
        mostrarSlide(anterior);
        iniciarRotacion();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const siguiente = (indiceActual + 1) % slides.length;
        mostrarSlide(siguiente);
        iniciarRotacion();
      }
    });

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

  console.log('Flor de Jamaica - main.js cargado correctamente');

  /* ==========================================================================
     MISIÓN D: POPUP NEWSLETTER (CAPTURA DE LEADS)
     ========================================================================== */
  (function initPopupNewsletter() {
    const popup = document.getElementById('popup-newsletter');
    const btnCerrar = document.getElementById('btn-cerrar-popup');
    const formSuscripcion = document.getElementById('form-suscripcion');

    if (!popup || !btnCerrar) return;

    const COOKIE_NAME = 'newsletter_popup_closed';
    const COOKIE_EXPIRES_DAYS = 30;

    // Verificar si el popup fue cerrado recientemente
    function popupFueCerrado() {
      const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
      if (!match) return false;
      
      const expiracion = parseInt(match[2]);
      const ahora = new Date().getTime();
      return (ahora - expiracion) < (COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
    }

    // Establecer cookie de cierre
    function establecerCookieCierre() {
      const expiracion = new Date();
      expiracion.setTime(expiracion.getTime() + (COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000));
      document.cookie = COOKIE_NAME + "=" + expiracion.getTime() + 
                        ";expires=" + expiracion.toUTCString() + 
                        ";path=/;SameSite=Lax";
    }

    // Mostrar popup
    function mostrarPopup() {
      if (popupFueCerrado()) return;
      popup.classList.add('activo');
      document.body.style.overflow = 'hidden';
    }

    // Ocultar popup
    function ocultarPopup() {
      popup.classList.remove('activo');
      document.body.style.overflow = '';
      establecerCookieCierre();
    }

    // Mostrar después de 2 segundos (no intrusivo)
    setTimeout(mostrarPopup, 2000);

    // Eventos de cierre
    btnCerrar.addEventListener('click', ocultarPopup);

    // Cerrar al hacer clic fuera del contenido
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        ocultarPopup();
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('activo')) {
        ocultarPopup();
      }
    });

    // Envío del formulario
    if (formSuscripcion) {
      formSuscripcion.addEventListener('submit', function(e) {
        const emailInput = this.querySelector('[name="_replyto"]');
        const email = emailInput ? emailInput.value.trim() : '';
        
        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          e.preventDefault();
          alert('Por favor, introduce un correo electrónico válido.');
          emailInput.focus();
          return false;
        }

        // El formulario se enviará normalmente a Formspree
        // Opcional: puedes añadir un indicador visual de envío
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Si el envío falla, restaurar el botón
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 5000);
      });
    }
  })();
});
