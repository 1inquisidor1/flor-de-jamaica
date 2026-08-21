/* ============================================================================
   FLOR DE JAMAICA - RECETAS.JS (Optimizado para GitHub Pages)
   ============================================================================
   Gestiona la página de recetas filtrables con:
   - Búsqueda en tiempo real
   - Filtrado por categorías
   - Renderizado dinámico desde JSON
   - Enlaces a videos de YouTube verificados
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

  var RECETAS_DATA_URL = basePath + 'assets/data/recetas-data.json';
  
  var recetasData = null;

  // Inicialización
  function initRecetas() {
    fetch(RECETAS_DATA_URL)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        recetasData = data;
        initRecetasPage();
      })
      .catch(function(error) {
        console.error('Error cargando datos de recetas:', error);
        console.error('URL intentada:', RECETAS_DATA_URL);
        console.error('Base path detectado:', basePath);

        var container = document.getElementById('recetas-container');
        if (container) {
          container.innerHTML = '<p class="recetas-error">Error al cargar las recetas. Por favor, recarga la página.</p>';
        }
      });
  }

  // Inicializar página de recetas
  function initRecetasPage() {
    var container = document.getElementById('recetas-container');
    var searchInput = document.getElementById('recetas-search');
    var clearBtn = document.getElementById('recetas-clear-search');
    var filterBtns = document.querySelectorAll('.recetas-filter-btn');
    
    if (!container) return;
    
    renderRecetas(recetasData.categories);
    
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var query = this.value.toLowerCase().trim();
        if (query) {
          filterRecetasBySearch(query);
        } else {
          var activeFilter = document.querySelector('.recetas-filter-btn.active').dataset.filter;
          filterRecetasByCategory(activeFilter);
        }
      });
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        var activeFilter = document.querySelector('.recetas-filter-btn.active').dataset.filter;
        filterRecetasByCategory(activeFilter);
        clearBtn.style.display = 'none';
      });
    }
    
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        
        var filter = this.dataset.filter;
        var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        
        if (query) {
          filterRecetasBySearchAndCategory(query, filter);
        } else {
          filterRecetasByCategory(filter);
        }
        
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
      });
    });
  }

  // Renderizar todas las recetas
  function renderRecetas(categories) {
    var container = document.getElementById('recetas-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (categories.length === 0) {
      container.innerHTML = '<p class="recetas-no-results">No se encontraron recetas.</p>';
      return;
    }
    
    var html = '<div class="recetas-grid">';
    
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
    var ingredientsList = '<ul class="receta-ingredientes">';
    recipe.ingredients.forEach(function(ing) {
      ingredientsList += '<li>' + ing + '</li>';
    });
    ingredientsList += '</ul>';
    
    var stepsList = '<ol class="receta-pasos">';
    recipe.steps.forEach(function(step) {
      stepsList += '<li>' + step + '</li>';
    });
    stepsList += '</ol>';
    
    var videoHtml = '';
    if (recipe.youtube_url) {
      var embedUrl = getYoutubeEmbedUrl(recipe.youtube_url);
      videoHtml = '<div class="receta-video">' +
        '<h4>Video Tutorial</h4>' +
        '<iframe width="100%" height="200" src="' + embedUrl + '" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        '<small class="receta-video-fuente">Fuente: ' + (recipe.youtube_title || recipe.source) + '</small>' +
        '</div>';
    }
    
    return '<article class="receta-card animar-entrada" data-category="' + category.id + '" data-title="' + recipe.title.toLowerCase() + '" data-ingredients="' + recipe.ingredients.join(' ').toLowerCase() + '">' +
      '<div class="receta-contenido">' +
        '<div class="receta-header">' +
          '<h3 class="receta-titulo">' + recipe.title + '</h3>' +
          '<div class="receta-meta">' +
            '<span class="receta-tiempo">' + recipe.time + '</span>' +
            '<span class="receta-dificultad">' + recipe.difficulty + '</span>' +
          '</div>' +
        '</div>' +
        '<p class="receta-descripcion">' + recipe.description + '</p>' +
        '<div class="receta-seccion">' +
          '<h4>Ingredientes</h4>' +
          ingredientsList +
        '</div>' +
        '<div class="receta-seccion">' +
          '<h4>Preparación</h4>' +
          stepsList +
        '</div>' +
        videoHtml +
        '<div class="receta-source">' +
          '<small>🔗 ' + (recipe.source || 'Fuente pública') + '</small>' +
        '</div>' +
      '</div>' +
    '</article>';
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

  // Filtrar recetas
  function filterRecetasByCategory(categoryId) {
    var container = document.getElementById('recetas-container');
    var cards = container.querySelectorAll('.receta-card');
    cards.forEach(function(card) {
      card.style.display = (categoryId === 'all' || card.dataset.category === categoryId) ? '' : 'none';
    });
  }

  function filterRecetasBySearch(query) {
    var container = document.getElementById('recetas-container');
    var cards = container.querySelectorAll('.receta-card');
    cards.forEach(function(card) {
      var title = card.dataset.title || '';
      var ingredients = card.dataset.ingredients || '';
      var matches = title.indexOf(query) !== -1 || ingredients.indexOf(query) !== -1;
      card.style.display = matches ? '' : 'none';
    });
  }

  function filterRecetasBySearchAndCategory(query, categoryId) {
    var container = document.getElementById('recetas-container');
    var cards = container.querySelectorAll('.receta-card');
    cards.forEach(function(card) {
      var matchesCategory = categoryId === 'all' || card.dataset.category === categoryId;
      var title = card.dataset.title || '';
      var ingredients = card.dataset.ingredients || '';
      var matchesSearch = title.indexOf(query) !== -1 || ingredients.indexOf(query) !== -1;
      card.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
  }

  // Inicializar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecetas);
  } else {
    initRecetas();
  }
  
  console.log('🍳 Recetas inicializadas | Base path:', basePath);
})();
