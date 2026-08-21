/* ============================================================================
   FLOR DE JAMAICA - RECETAS.JS
   ============================================================================
   Gestiona la página de recetas filtrables con:
   - Búsqueda en tiempo real
   - Filtrado por categorías
   - Renderizado dinámico desde JSON
   - Enlaces a videos de YouTube verificados
   ============================================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const RECETAS_DATA_URL = '/assets/data/recetas-data.json';
  
  let recetasData = null;

  // Inicialización
  async function initRecetas() {
    try {
      const response = await fetch(RECETAS_DATA_URL);
      recetasData = await response.json();
      
      initRecetasPage();
    } catch (error) {
      console.error('Error cargando datos de recetas:', error);
      const container = document.getElementById('recetas-container');
      if (container) {
        container.innerHTML = '<p class="recetas-error">Error al cargar las recetas. Por favor, recarga la página.</p>';
      }
    }
  }

  // Inicializar página de recetas
  function initRecetasPage() {
    const container = document.getElementById('recetas-container');
    const searchInput = document.getElementById('recetas-search');
    const clearBtn = document.getElementById('recetas-clear-search');
    const filterBtns = document.querySelectorAll('.recetas-filter-btn');
    
    if (!container) return;
    
    // Renderizar todas las recetas
    renderRecetas(recetasData.categories);
    
    // Evento de búsqueda
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query) {
          filterRecetasBySearch(query);
        } else {
          const activeFilter = document.querySelector('.recetas-filter-btn.active').dataset.filter;
          filterRecetasByCategory(activeFilter);
        }
      });
    }
    
    // Botón de limpiar búsqueda
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        const activeFilter = document.querySelector('.recetas-filter-btn.active').dataset.filter;
        filterRecetasByCategory(activeFilter);
        clearBtn.style.display = 'none';
      });
    }
    
    // Eventos de filtro por categoría
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Remover active de todos
        filterBtns.forEach(b => b.classList.remove('active'));
        // Agregar active al clickeado
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        
        if (query) {
          // Aplicar ambos filtros: búsqueda + categoría
          filterRecetasBySearchAndCategory(query, filter);
        } else {
          filterRecetasByCategory(filter);
        }
        
        // Mostrar/ocultar botón de limpiar
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
      });
    });
  }

  // Renderizar todas las recetas
  function renderRecetas(categories) {
    const container = document.getElementById('recetas-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (categories.length === 0) {
      container.innerHTML = '<p class="recetas-no-results">No se encontraron recetas.</p>';
      return;
    }
    
    let html = '<div class="recetas-grid">';
    
    categories.forEach(function(category) {
      category.recipes.forEach(function(recipe) {
        html += renderRecipeCard(recipe, category);
      });
    });
    
    html += '</div>';
    container.innerHTML = html;
  }

  // Renderizar tarjeta de receta
  function renderRecipeCard(recipe, category) {
    let ingredientsList = '<ul class="receta-ingredientes">';
    recipe.ingredients.forEach(function(ing) {
      ingredientsList += '<li>' + ing + '</li>';
    });
    ingredientsList += '</ul>';
    
    let stepsList = '<ol class="receta-pasos">';
    recipe.steps.forEach(function(step) {
      stepsList += '<li>' + step + '</li>';
    });
    stepsList += '</ol>';
    
    return `
      <article class="receta-card animar-entrada" data-category="${category.id}" data-title="${recipe.title.toLowerCase()}" data-ingredients="${recipe.ingredients.join(' ').toLowerCase()}">
        <div class="receta-imagen">
          ${category.icon}
        </div>
        <div class="receta-contenido">
          <div class="receta-header">
            <h3 class="receta-titulo">${recipe.title}</h3>
            <div class="receta-meta">
              <span class="receta-tiempo">${recipe.time}</span>
              <span class="receta-dificultad">${recipe.difficulty}</span>
            </div>
          </div>
          
          <p class="receta-descripcion">${recipe.description}</p>
          
          <div class="receta-seccion">
            <h4><span class="icon">📋</span> Ingredientes</h4>
            ${ingredientsList}
          </div>
          
          <div class="receta-seccion">
            <h4><span class="icon">👨‍🍳</span> Preparación</h4>
            ${stepsList}
          </div>
          
          <div class="receta-video">
            <h4><span class="icon">🎥</span> Video Tutorial</h4>
            ${recipe.youtube_url ? 
              `<iframe width="100%" height="200" src="${getYoutubeEmbedUrl(recipe.youtube_url)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
               <small class="receta-video-fuente">Fuente: ${recipe.youtube_title || recipe.source}</small>` : 
              '<p class="receta-sin-video">No hay video disponible para esta receta.</p>'
            }
          </div>
          
          <div class="receta-source">
            <small class="aviso-pequeno">🔗 ${recipe.source || 'Fuente pública'}</small>
          </div>
        </div>
      </article>
    `;
  }

  // Obtener URL de embed de YouTube
  function getYoutubeEmbedUrl(url) {
    try {
      const urlObj = new URL(url);
      
      // Si ya es un enlace de embed
      if (urlObj.hostname.includes('youtube.com/embed')) {
        return url;
      }
      
      // Extraer ID del video
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

  // Filtrar recetas por categoría
  function filterRecetasByCategory(categoryId) {
    const container = document.getElementById('recetas-container');
    const cards = container.querySelectorAll('.receta-card');
    
    if (categoryId === 'all') {
      cards.forEach(card => card.style.display = '');
    } else {
      cards.forEach(card => {
        card.style.display = card.dataset.category === categoryId ? '' : 'none';
      });
    }
    
    // Verificar si hay resultados visibles
    checkForResults();
  }

  // Filtrar recetas por búsqueda
  function filterRecetasBySearch(query) {
    const container = document.getElementById('recetas-container');
    const cards = container.querySelectorAll('.receta-card');
    
    cards.forEach(card => {
      const title = card.dataset.title || '';
      const ingredients = card.dataset.ingredients || '';
      
      const matches = title.includes(query) || ingredients.includes(query);
      card.style.display = matches ? '' : 'none';
    });
    
    checkForResults();
  }

  // Filtrar por búsqueda y categoría combinadas
  function filterRecetasBySearchAndCategory(query, categoryId) {
    const container = document.getElementById('recetas-container');
    const cards = container.querySelectorAll('.receta-card');
    
    cards.forEach(card => {
      const matchesCategory = categoryId === 'all' || card.dataset.category === categoryId;
      const title = card.dataset.title || '';
      const ingredients = card.dataset.ingredients || '';
      const matchesSearch = title.includes(query) || ingredients.includes(query);
      
      card.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
    
    checkForResults();
  }

  // Verificar si hay resultados visibles
  function checkForResults() {
    const container = document.getElementById('recetas-container');
    const visibleCards = container.querySelectorAll('.receta-card:not([style*="display: none"])');
    
    // No hacer nada por ahora, pero se podría agregar un mensaje de "no results"
  }

  // Inicializar
  initRecetas();
  
  console.log('🍳 Sección de recetas inicializada');
});
