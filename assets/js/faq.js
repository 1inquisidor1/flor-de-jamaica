/* ============================================================================
   FLOR DE JAMAICA - FAQ.JS
   ============================================================================
   Gestiona la sección de Preguntas Frecuentes con:
   - Búsqueda en tiempo real
   - Filtrado por categorías
   - Renderizado dinámico desde JSON
   - Acordeón interactivo
   ============================================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const FAQ_DATA_URL = '/assets/data/faq-data.json';
  
  let faqData = null;

  // Inicialización
  async function initFaq() {
    try {
      const response = await fetch(FAQ_DATA_URL);
      faqData = await response.json();
      
      initFaqPage();
    } catch (error) {
      console.error('Error cargando datos de FAQ:', error);
      const container = document.getElementById('faq-container');
      if (container) {
        container.innerHTML = '<p class="faq-error">Error al cargar las preguntas frecuentes. Por favor, recarga la página.</p>';
      }
    }
  }

  // Inicializar página de FAQ
  function initFaqPage() {
    const container = document.getElementById('faq-container');
    const searchInput = document.getElementById('faq-search');
    const clearBtn = document.getElementById('faq-clear-search');
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    
    if (!container) return;
    
    // Renderizar todas las FAQs
    renderFaq(faqData.categories);
    
    // Evento de búsqueda
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query) {
          filterFaqBySearch(query);
        } else {
          const activeCategory = document.querySelector('.faq-category-btn.active').dataset.category;
          filterFaqByCategory(activeCategory);
        }
      });
    }
    
    // Botón de limpiar búsqueda
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        const activeCategory = document.querySelector('.faq-category-btn.active').dataset.category;
        filterFaqByCategory(activeCategory);
        clearBtn.style.display = 'none';
      });
    }
    
    // Eventos de filtro por categoría
    categoryBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Remover active de todos
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Agregar active al clickeado
        this.classList.add('active');
        
        const category = this.dataset.category;
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        
        if (query) {
          // Aplicar ambos filtros: búsqueda + categoría
          filterFaqBySearchAndCategory(query, category);
        } else {
          filterFaqByCategory(category);
        }
        
        // Mostrar/ocultar botón de limpiar
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
      });
    });
  }

  // Renderizar todas las FAQs
  function renderFaq(categories) {
    const container = document.getElementById('faq-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (categories.length === 0) {
      container.innerHTML = '<p class="faq-no-results">No se encontraron preguntas.</p>';
      return;
    }
    
    let html = '';
    
    categories.forEach(function(category) {
      html += `
        <div class="faq-category" data-category="${category.id}">
          <h2 class="faq-category-title">${category.icon} ${category.name}</h2>
          <div class="faq-accordion">
      `;
      
      category.faqs.forEach(function(faq, index) {
        html += renderFaqItem(faq, category, index);
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
    
    // Inicializar eventos de acordeón después del renderizado
    initAccordion();
  }

  // Renderizar item de FAQ
  function renderFaqItem(faq, category, index) {
    const isOpen = index === 0; // Primera pregunta abierta por defecto
    
    // Procesar respuesta con HTML (para enlaces)
    let answerHtml = faq.answer;
    
    // Agregar video tutorial si existe
    if (faq.youtube_ref) {
      const videoUrl = getYoutubeEmbedUrl(faq.youtube_ref);
      answerHtml += `
        <div class="faq-video">
          <iframe width="100%" height="180" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <small class="faq-video-fuente">Tutorial: ${faq.youtube_title}</small>
        </div>
      `;
    }
    
    return `
      <div class="faq-item" data-category="${category.id}" data-search="${faq.question.toLowerCase()} ${faq.answer.toLowerCase()}">
        <button class="faq-question ${isOpen ? 'open' : ''}" 
                aria-expanded="${isOpen}" 
                aria-controls="faq-answer-${faq.id}">
          <span class="faq-question-text">${faq.question}</span>
          <span class="faq-icon">${isOpen ? '−' : '+'}</span>
        </button>
        <div id="faq-answer-${faq.id}" 
             class="faq-answer ${isOpen ? 'open' : ''}" 
             aria-hidden="${!isOpen}">
          <p class="faq-answer-text">${answerHtml}</p>
        </div>
      </div>
    `;
  }

  // Inicializar eventos del acordeón
  function initAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const isOpen = this.classList.contains('open');
        
        // Toggle del estado
        if (isOpen) {
          // Cerrar
          this.classList.remove('open');
          this.setAttribute('aria-expanded', 'false');
          answer.classList.remove('open');
          answer.setAttribute('aria-hidden', 'true');
        } else {
          // Abrir
          this.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
          answer.classList.add('open');
          answer.setAttribute('aria-hidden', 'false');
        }
      });
    });
  }

  // Obtener URL de embed de YouTube
  function getYoutubeEmbedUrl(url) {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com/embed')) return url;
      
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        let videoId = '';
        if (urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.substring(1);
        } else {
          videoId = urlObj.searchParams.get('v') || '';
        }
        
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      
      return url;
    } catch (e) {
      return url;
    }
  }

  // Filtrar preguntas por categoría
  function filterFaqByCategory(categoryId) {
    const categoryDivs = document.querySelectorAll('.faq-category');
    
    if (categoryId === 'all') {
      categoryDivs.forEach(div => div.style.display = '');
    } else {
      categoryDivs.forEach(div => {
        div.style.display = div.dataset.category === categoryId ? '' : 'none';
      });
    }
  }

  // Filtrar preguntas por búsqueda
  function filterFaqBySearch(query) {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchTerm = query.toLowerCase();
    
    faqItems.forEach(item => {
      const searchContent = item.dataset.search || '';
      const matches = searchContent.includes(searchTerm);
      item.style.display = matches ? '' : 'none';
    });
    
    // Verificar si hay resultados visibles por categoría
    checkCategoryVisibility();
  }

  // Filtrar por búsqueda y categoría
  function filterFaqBySearchAndCategory(query, categoryId) {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchTerm = query.toLowerCase();
    
    faqItems.forEach(item => {
      const matchesCategory = categoryId === 'all' || item.dataset.category === categoryId;
      const searchContent = item.dataset.search || '';
      const matchesSearch = searchContent.includes(searchTerm);
      
      item.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
    
    checkCategoryVisibility();
  }

  // Verificar visibilidad de categorías
  function checkCategoryVisibility() {
    const categoryDivs = document.querySelectorAll('.faq-category');
    
    categoryDivs.forEach(div => {
      const items = div.querySelectorAll('.faq-item');
      let hasVisibleItems = false;
      
      items.forEach(item => {
        if (item.style.display !== 'none') {
          hasVisibleItems = true;
        }
      });
      
      div.style.display = hasVisibleItems ? '' : 'none';
    });
  }

  // Inicializar
  initFaq();
  
  console.log('❓ Sección de FAQ inicializada');
});
