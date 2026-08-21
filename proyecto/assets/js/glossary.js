/* ============================================================================
   FLOR DE JAMAICA - GLOSSARY.JS
   ============================================================================
   Funcionalidades:
   - Tooltips interactivos para términos técnicos (data-glossary attribute)
   - Renderizado dinámico de la página de glosario desde JSON
   - Búsqueda en tiempo real de términos
   - Navegación por categorías
   ============================================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const GLOSSARY_DATA_URL = '/assets/data/glossary-data.json';
  
  // Almacenar datos del glosario globalmente
  let glossaryData = null;

  // ============================================================================
  // 1. INICIALIZACIÓN
  // ============================================================================
  async function initGlossary() {
    try {
      const response = await fetch(GLOSSARY_DATA_URL);
      glossaryData = await response.json();
      
      // Inicializar tooltips en páginas que usan términos técnicos
      initTooltips();
      
      // Inicializar página de glosario si existe
      initGlossaryPage();
    } catch (error) {
      console.error('Error cargando datos del glosario:', error);
    }
  }

  // ============================================================================
  // 2. TOOLTIPS INTERACTIVOS
  // ============================================================================
  function initTooltips() {
    // Buscar todos los elementos con data-glossary
    const glossaryTerms = document.querySelectorAll('[data-glossary]');
    
    if (glossaryTerms.length === 0) return;
    
    glossaryTerms.forEach(function(element) {
      const termId = element.getAttribute('data-glossary');
      const definition = findTermDefinition(termId);
      
      if (definition) {
        element.classList.add('glossary-term');
        element.setAttribute('data-definition', definition.definition);
        element.setAttribute('aria-describedby', 'glossary-tooltip-' + termId);
        
        // Agregar indicador visual
        if (!element.querySelector('.glossary-icon')) {
          const icon = document.createElement('span');
          icon.className = 'glossary-icon';
          icon.textContent = 'ⓘ';
          element.appendChild(icon);
        }
        
        // Event listeners para tooltip
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
    
    for (const category of glossaryData.categories) {
      for (const term of category.terms) {
        if (term.id === termId) {
          return term;
        }
      }
    }
    return null;
  }

  function showTooltip(element, termData) {
    hideTooltip(); // Ocultar tooltip anterior
    
    const tooltip = document.createElement('div');
    tooltip.id = 'glossary-tooltip';
    tooltip.className = 'glossary-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    
    // Posicionar tooltip
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    let tooltipTop = rect.top + scrollTop - 60;
    let tooltipLeft = rect.left + (rect.width / 2);
    
    // Ajustar si se sale de la pantalla
    if (tooltipLeft < 150) tooltipLeft = rect.left + rect.width + 10;
    if (tooltipLeft > window.innerWidth - 350) tooltipLeft = rect.right - 340;
    
    tooltip.style.top = tooltipTop + 'px';
    tooltip.style.left = tooltipLeft + 'px';
    
    // Contenido del tooltip
    let html = '<div class="glossary-tooltip-header">';
    html += '<strong class="glossary-tooltip-title">' + termData.term + '</strong>';
    html += '</div>';
    html += '<div class="glossary-tooltip-body">';
    html += '<p class="glossary-tooltip-definition">' + termData.definition + '</p>';
    if (termData.example) {
      html += '<p class="glossary-tooltip-example"><small><em>' + termData.example + '</em></small></p>';
    }
    html += '</div>';
    html += '<div class="glossary-tooltip-footer">';
    html += '<a href="/glosario/" class="glossary-link">Ver glosario completo →</a>';
    html += '</div>';
    
    tooltip.innerHTML = html;
    document.body.appendChild(tooltip);
    
    // Mostrar con animación
    setTimeout(function() {
      tooltip.classList.add('visible');
    }, 10);
  }

  function hideTooltip() {
    const tooltip = document.getElementById('glossary-tooltip');
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

  // ============================================================================
  // 3. PÁGINA DE GLOSARIO DINÁMICO
  // ============================================================================
  function initGlossaryPage() {
    const glossaryContainer = document.getElementById('glossary-container');
    const searchInput = document.getElementById('glossary-search');
    const categoryButtons = document.querySelectorAll('.glossary-category-btn');
    
    if (!glossaryContainer) return; // No estamos en la página de glosario
    
    // Renderizar glosario completo
    renderGlossary(glossaryData);
    
    // Evento de búsqueda
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        renderFilteredGlossary(query);
      });
    }
    
    // Eventos de filtro por categoría
    categoryButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Remover active de todos
        categoryButtons.forEach(b => b.classList.remove('active'));
        // Agregar active al clickeado
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        renderFilteredByCategory(category);
      });
    });
  }

  function renderGlossary(data) {
    const container = document.getElementById('glossary-container');
    if (!container || !data) return;
    
    container.innerHTML = '';
    
    data.categories.forEach(function(category) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'glossary-category';
      
      let html = '<h3 class="glossary-category-title">' + category.name + '</h3>';
      html += '<div class="glossary-terms-grid">';
      
      category.terms.forEach(function(term) {
        html += renderTermCard(term);
      });
      
      html += '</div>';
      categoryDiv.innerHTML = html;
      container.appendChild(categoryDiv);
    });
  }

  function renderTermCard(term) {
    return `
      <div class="glossary-term-card" data-term-id="${term.id}">
        <div class="glossary-term-header">
          <h4 class="glossary-term-name">${term.term}</h4>
          <span class="glossary-category-badge">${getCategoryName(term.id)}</span>
        </div>
        <p class="glossary-term-definition">${term.definition}</p>
        ${term.example ? `<p class="glossary-term-example"><strong>Ejemplo:</strong> ${term.example}</p>` : ''}
      </div>
    `;
  }

  function getCategoryName(termId) {
    if (!glossaryData) return '';
    for (const cat of glossaryData.categories) {
      if (cat.terms.some(t => t.id === termId)) {
        return cat.name;
      }
    }
    return '';
  }

  function renderFilteredGlossary(query) {
    const container = document.getElementById('glossary-container');
    if (!container || !glossaryData) return;
    
    if (!query) {
      renderGlossary(glossaryData);
      return;
    }
    
    container.innerHTML = '<div class="glossary-search-results">Buscando: "' + query + '"</div>';
    
    let foundAny = false;
    
    glossaryData.categories.forEach(function(category) {
      const matchingTerms = category.terms.filter(function(term) {
        return term.term.toLowerCase().includes(query) ||
               term.definition.toLowerCase().includes(query);
      });
      
      if (matchingTerms.length > 0) {
        foundAny = true;
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'glossary-category';
        
        let html = '<h3 class="glossary-category-title">' + category.name + '</h3>';
        html += '<div class="glossary-terms-grid">';
        
        matchingTerms.forEach(function(term) {
          html += renderTermCard(term);
        });
        
        html += '</div>';
        categoryDiv.innerHTML = html;
        container.appendChild(categoryDiv);
      }
    });
    
    if (!foundAny) {
      container.innerHTML += '<p class="glossary-no-results">No se encontraron términos que coincidan con tu búsqueda.</p>';
    }
  }

  function renderFilteredByCategory(categoryName) {
    const container = document.getElementById('glossary-container');
    if (!container || !glossaryData) return;
    
    if (categoryName === 'all') {
      renderGlossary(glossaryData);
      return;
    }
    
    const category = glossaryData.categories.find(c => 
      c.name.toLowerCase() === categoryName.toLowerCase()
    );
    
    if (!category) return;
    
    container.innerHTML = '';
    
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'glossary-category';
    
    let html = '<h3 class="glossary-category-title">' + category.name + '</h3>';
    html += '<div class="glossary-terms-grid">';
    
    category.terms.forEach(function(term) {
      html += renderTermCard(term);
    });
    
    html += '</div>';
    categoryDiv.innerHTML = html;
    container.appendChild(categoryDiv);
  }

  // ============================================================================
  // 4. INICIALIZAR
  // ============================================================================
  initGlossary();
  
  // Para debugging
  console.log('📚 Glosario de la Flor de Jamaica inicializado');
});
