/* ============================================================================
   FLOR DE JAMAICA - FAQ.JS (Optimizado para GitHub Pages)
   ============================================================================
   Gestiona la sección de Preguntas Frecuentes con:
   - Búsqueda en tiempo real
   - Filtrado por categorías
   - Renderizado dinámico desde JSON
   - Acordeón interactivo
   ============================================================================ */

(function() {
  'use strict';

  // Detectar base path automáticamente para soportar subcarpetas en GitHub Pages
  var basePath = (function() {
    var path = window.location.pathname;
    var parts = path.split('/');
    if (parts.length > 1 && parts[1] && parts[1] !== '') {
      return '/' + parts[1] + '/';
    }
    return '/';
  })();

  var FAQ_DATA_URL = basePath + 'assets/data/faq-data.json';
  
  var faqData = null;

  // Inicialización
  function initFaq() {
    fetch(FAQ_DATA_URL)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        faqData = data;
        initFaqPage();
      })
      .catch(function(error) {
        console.error('Error cargando datos de FAQ:', error);
        console.error('URL intentada:', FAQ_DATA_URL);
        console.error('Base path detectado:', basePath);

        var container = document.getElementById('faq-container');
        if (container) {
          container.innerHTML = '<p class="faq-error">Error al cargar las preguntas frecuentes. Por favor, recarga la página.</p>';
        }
      });
  }

  // Inicializar página de FAQ
  function initFaqPage() {
    var container = document.getElementById('faq-container');
    var searchInput = document.getElementById('faq-search');
    var clearBtn = document.getElementById('faq-clear-search');
    var categoryBtns = document.querySelectorAll('.faq-category-btn');
    
    if (!container) return;
    
    renderFaq(faqData.categories);
    
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var query = this.value.toLowerCase().trim();
        if (query) {
          filterFaqBySearch(query);
        } else {
          var activeCategory = document.querySelector('.faq-category-btn.active').dataset.category;
          filterFaqByCategory(activeCategory);
        }
      });
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        var activeCategory = document.querySelector('.faq-category-btn.active').dataset.category;
        filterFaqByCategory(activeCategory);
        clearBtn.style.display = 'none';
      });
    }
    
    categoryBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        categoryBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        
        var category = this.dataset.category;
        var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        
        if (query) {
          filterFaqBySearchAndCategory(query, category);
        } else {
          filterFaqByCategory(category);
        }
        
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
      });
    });
  }

  // Renderizar todas las FAQs
  function renderFaq(categories) {
    var container = document.getElementById('faq-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (categories.length === 0) {
      container.innerHTML = '<p class="faq-no-results">No se encontraron preguntas.</p>';
      return;
    }
    
    var html = '';
    categories.forEach(function(category) {
      html += '<div class="faq-category" data-category="' + category.id + '">';
      html += '<h2 class="faq-category-title">' + (category.icon || '') + ' ' + category.name + '</h2>';
      html += '<div class="faq-accordion">';
      
      category.faqs.forEach(function(faq, index) {
        html += renderFaqItem(faq, category, index);
      });
      
      html += '</div>';
      html += '</div>';
    });
    
    container.innerHTML = html;
    
    initAccordion();
  }

  // Renderizar item de FAQ
  function renderFaqItem(faq, category, index) {
    var isOpen = index === 0;
    var answerHtml = faq.answer;
    
    if (faq.youtube_ref) {
      var videoUrl = getYoutubeEmbedUrl(faq.youtube_ref);
      answerHtml += '<div class="faq-video">' +
        '<iframe width="100%" height="180" src="' + videoUrl + '" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        '<small class="faq-video-fuente">Tutorial: ' + (faq.youtube_title || '') + '</small>' +
        '</div>';
    }
    
    return '<div class="faq-item" data-category="' + category.id + '" data-search="' + (faq.question + ' ' + faq.answer).toLowerCase() + '">' +
      '<button class="faq-question ' + (isOpen ? 'open' : '') + '" aria-expanded="' + isOpen + '" aria-controls="faq-answer-' + faq.id + '">' +
        '<span class="faq-question-text">' + faq.question + '</span>' +
        '<span class="faq-icon">' + (isOpen ? '−' : '+') + '</span>' +
      '</button>' +
      '<div id="faq-answer-' + faq.id + '" class="faq-answer ' + (isOpen ? 'open' : '') + '" aria-hidden="' + !isOpen + '">' +
        '<p class="faq-answer-text">' + answerHtml + '</p>' +
      '</div>' +
    '</div>';
  }

  // Inicializar eventos del acordeón
  function initAccordion() {
    var faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
      question.addEventListener('click', function() {
        var faqItem = this.parentElement;
        var answer = faqItem.querySelector('.faq-answer');
        var isOpen = this.classList.contains('open');
        
        if (isOpen) {
          this.classList.remove('open');
          this.setAttribute('aria-expanded', 'false');
          answer.classList.remove('open');
          answer.setAttribute('aria-hidden', 'true');
        } else {
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
      var urlObj = new URL(url);
      if (urlObj.hostname.indexOf('youtube.com/embed') !== -1) {
        return url;
      }
      if (urlObj.hostname.indexOf('youtube.com') !== -1 || urlObj.hostname.indexOf('youtu.be') !== -1) {
        var videoId = '';
        if (urlObj.hostname.indexOf('youtu.be') !== -1) {
          videoId = urlObj.pathname.substring(1);
        } else {
          videoId = urlObj.searchParams.get('v') || '';
        }
        if (videoId) {
          return 'https://www.youtube.com/embed/' + videoId;
        }
      }
      return url;
    } catch (e) {
      return url;
    }
  }

  // Filtrar FAQ
  function filterFaqByCategory(categoryId) {
    var categoryDivs = document.querySelectorAll('.faq-category');
    if (categoryId === 'all') {
      categoryDivs.forEach(function(div) { div.style.display = ''; });
    } else {
      categoryDivs.forEach(function(div) {
        div.style.display = div.dataset.category === categoryId ? '' : 'none';
      });
    }
  }

  function filterFaqBySearch(query) {
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
      var searchContent = item.dataset.search || '';
      var matches = searchContent.indexOf(query) !== -1;
      item.style.display = matches ? '' : 'none';
    });
    checkCategoryVisibility();
  }

  function filterFaqBySearchAndCategory(query, categoryId) {
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
      var matchesCategory = categoryId === 'all' || item.dataset.category === categoryId;
      var searchContent = item.dataset.search || '';
      var matchesSearch = searchContent.indexOf(query) !== -1;
      item.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
    checkCategoryVisibility();
  }

  function checkCategoryVisibility() {
    var categoryDivs = document.querySelectorAll('.faq-category');
    categoryDivs.forEach(function(div) {
      var items = div.querySelectorAll('.faq-item');
      var hasVisibleItems = false;
      items.forEach(function(item) {
        if (item.style.display !== 'none') hasVisibleItems = true;
      });
      div.style.display = hasVisibleItems ? '' : 'none';
    });
  }

  // Inicializar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaq);
  } else {
    initFaq();
  }
  
  console.log('❓ FAQ inicializada | Base path:', basePath);
})();
