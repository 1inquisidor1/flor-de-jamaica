/* ============================================================================
   FLOR DE JAMAICA - GLOSSARY.JS (Optimizado para GitHub Pages)
   ============================================================================
   Funcionalidades:
   - Tooltips interactivos para términos técnicos (data-glossary attribute)
   - Renderizado dinámico de la página de glosario desde JSON
   - Búsqueda en tiempo real de términos
   - Navegación por categorías
   ============================================================================ */

(function() {
  'use strict';

  // Detectar base path automáticamente para soportar subcarpetas en GitHub Pages
  // Ej: https://usuario.github.io/repo/ -> /repo/
  //     https://usuario.github.io/     -> /
  var basePath = (function() {
    var path = window.location.pathname;
    var parts = path.split('/');
    if (parts.length > 1 && parts[1] && parts[1] !== '') {
      return '/' + parts[1] + '/';
    }
    return '/';
  })();

  var GLOSSARY_DATA_URL = basePath + 'assets/data/glossary-data.json';

  // Almacenar datos del glosario globalmente
  var glossaryData = null;

  // Inicialización
  function initGlossary() {
    // Primero verificar si los datos están inyectados directamente en el HTML
    if (window.GLOSSARY_DATA) {
      glossaryData = window.GLOSSARY_DATA;
      initTooltips();
      initGlossaryPage();
      return;
    }

    // Fallback: cargar desde JSON si no están inyectados
    fetch(GLOSSARY_DATA_URL)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        glossaryData = data;
        initTooltips();
        initGlossaryPage();
      })
      .catch(function(error) {
        console.error('Error cargando datos del glosario:', error);
        console.error('URL intentada:', GLOSSARY_DATA_URL);
        console.error('Base path detectado:', basePath);

        // Mensaje de error en la página de glosario
        var container = document.getElementById('glossary-container');
        if (container) {
          container.innerHTML = '<div class="glossary-error-message">Error al cargar el glosario. Por favor, recarga la página.</div>';
        }
      });
  }

  // Inicializar tooltips
  function initTooltips() {
    var glossaryTerms = document.querySelectorAll('[data-glossary]');
    
    if (glossaryTerms.length === 0) return;
    
    glossaryTerms.forEach(function(element) {
      var termId = element.getAttribute('data-glossary');
      var definition = findTermDefinition(termId);
      
      if (definition) {
        element.classList.add('glossary-term');
        element.setAttribute('aria-describedby', 'glossary-tooltip-' + termId);
        
        // Agregar indicador visual
        if (!element.querySelector('.glossary-icon')) {
          var icon = document.createElement('span');
          icon.className = 'glossary-icon';
          icon.innerHTML = 'ⓘ';
          element.appendChild(icon);
        }
        
        // Event listeners
        element.addEventListener('mouseenter', function() {
          showTooltip(this, definition);
        });
        
        element.addEventListener('mouseleave', function() {
          hideTooltip();
        });
        
        element.addEventListener('focus', function() {
          showTooltip(this, definition);
        });
        
        element.addEventListener('blur', function() {
          hideTooltip();
        });
      }
    });
  }

  function findTermDefinition(termId) {
    if (!glossaryData) return null;
    
    for (var i = 0; i < glossaryData.categories.length; i++) {
      var category = glossaryData.categories[i];
      for (var j = 0; j < category.terms.length; j++) {
        if (category.terms[j].id === termId) {
          return category.terms[j];
        }
      }
    }
    return null;
  }

  function showTooltip(element, termData) {
    hideTooltip();
    
    var tooltip = document.createElement('div');
    tooltip.id = 'glossary-tooltip';
    tooltip.className = 'glossary-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    
    var rect = element.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    var tooltipTop = rect.top + scrollTop - 60;
    var tooltipLeft = rect.left + (rect.width / 2);
    
    if (tooltipLeft < 150) tooltipLeft = rect.left + rect.width + 10;
    if (tooltipLeft > window.innerWidth - 350) tooltipLeft = rect.right - 340;
    
    tooltip.style.top = tooltipTop + 'px';
    tooltip.style.left = tooltipLeft + 'px';
    
    var html = '<div class="glossary-tooltip-header">';
    html += '<strong class="glossary-tooltip-title">' + termData.term + '</strong>';
    html += '</div>';
    html += '<div class="glossary-tooltip-body">';
    html += '<p class="glossary-tooltip-definition">' + termData.definition + '</p>';
    if (termData.example) {
      html += '<p class="glossary-tooltip-example"><small><em>' + termData.example + '</em></small></p>';
    }
    html += '</div>';
    html += '<div class="glossary-tooltip-footer">';
    html += '<a href="' + basePath + 'glosario/" class="glossary-link">Ver glosario completo →</a>';
    html += '</div>';
    
    tooltip.innerHTML = html;
    document.body.appendChild(tooltip);
    
    setTimeout(function() {
      tooltip.classList.add('visible');
    }, 10);
  }

  function hideTooltip() {
    var tooltip = document.getElementById('glossary-tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
      setTimeout(function() {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 200);
    }
  }

  // Ocultar tooltip al hacer click fuera
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.glossary-term') && !e.target.closest('.glossary-tooltip')) {
      hideTooltip();
    }
  });

  // Ocultar tooltip al hacer scroll
  window.addEventListener('scroll', function() {
    hideTooltip();
  });

  // Inicializar página de glosario
  function initGlossaryPage() {
    var container = document.getElementById('glossary-container');
    var searchInput = document.getElementById('glossary-search');
    var clearBtn = document.getElementById('glossary-clear-search');
    var categoryBtns = document.querySelectorAll('.glossary-category-btn');
    
    if (!container) return;
    
    renderGlossary(glossaryData.categories);
    
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var query = this.value.toLowerCase().trim();
        if (query) {
          filterGlossaryBySearch(query);
        } else {
          var activeFilter = document.querySelector('.glossary-category-btn.active').dataset.category;
          filterGlossaryByCategory(activeFilter);
        }
      });
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        var activeFilter = document.querySelector('.glossary-category-btn.active').dataset.category;
        filterGlossaryByCategory(activeFilter);
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
          filterGlossaryBySearchAndCategory(query, category);
        } else {
          filterGlossaryByCategory(category);
        }
        
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
      });
    });
  }

  function renderGlossary(categories) {
    var container = document.getElementById('glossary-container');
    if (!container || !categories) return;
    
    container.innerHTML = '';
    
    if (categories.length === 0) {
      container.innerHTML = '<p class="glossary-no-results">No se encontraron términos.</p>';
      return;
    }
    
    var html = '';
    
    categories.forEach(function(category) {
      html += '<div class="glossary-category">';
      html += '<h3 class="glossary-category-title">' + category.name + '</h3>';
      html += '<div class="glossary-terms-grid">';
      
      category.terms.forEach(function(term) {
        html += renderTermCard(term, category);
      });
      
      html += '</div>';
      html += '</div>';
    });
    
    container.innerHTML = html;
  }

  function renderTermCard(term, category) {
    return '<div class="glossary-term-card" data-term-id="' + term.id + '" data-category="' + category.id + '">' +
      '<div class="glossary-term-header">' +
        '<div class="glossary-avatar">[' + category.name.charAt(0) + ']</div>' +
        '<div class="glossary-info">' +
          '<h4 class="glossary-term-name">' + term.term + '</h4>' +
          '<span class="glossary-category-badge">' + category.name + '</span>' +
        '</div>' +
      '</div>' +
      '<p class="glossary-term-definition">' + term.definition + '</p>' +
      (term.example ? '<p class="glossary-term-example"><strong>Ejemplo:</strong> ' + term.example + '</p>' : '') +
    '</div>';
  }

  function filterGlossaryByCategory(categoryId) {
    var cards = document.querySelectorAll('.glossary-term-card');
    
    cards.forEach(function(card) {
      if (categoryId === 'all' || card.dataset.category === categoryId) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function filterGlossaryBySearch(query) {
    var cards = document.querySelectorAll('.glossary-term-card');
    
    cards.forEach(function(card) {
      var name = card.querySelector('.glossary-term-name').textContent.toLowerCase();
      var definition = card.querySelector('.glossary-term-definition').textContent.toLowerCase();
      
      var matches = name.includes(query) || definition.includes(query);
      card.style.display = matches ? '' : 'none';
    });
  }

  function filterGlossaryBySearchAndCategory(query, categoryId) {
    var cards = document.querySelectorAll('.glossary-term-card');
    
    cards.forEach(function(card) {
      var name = card.querySelector('.glossary-term-name').textContent.toLowerCase();
      var definition = card.querySelector('.glossary-term-definition').textContent.toLowerCase();
      
      var matchesCategory = categoryId === 'all' || card.dataset.category === categoryId;
      var matchesSearch = name.includes(query) || definition.includes(query);
      
      card.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlossary);
  } else {
    initGlossary();
  }
  
  console.log('Glosario inicializado | Base path:', basePath);
})();
