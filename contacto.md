---
layout: page
title: "Contacto"
description: "Contáctanos para más información sobre la Flor de Jamaica"
image: /assets/images/slider/campo-hibiscus.webp
---

<section class="page-hero">
 <div class="page-hero-contenido">
 <h1 class="page-titulo">Contáctanos</h1>
 <div class="page-linea-decorativa"></div>
 </div>
</section>

<div class="page-contenido">
 <div class="page-wrapper animar-entrada">

 <p class="intro-texto">
 ¿Tienes preguntas sobre nuestros productos, necesitas información de distribución o deseas recibir más recursos gratuitos? 
 Llena el siguiente formulario o escríbenos directamente por WhatsApp.
 </p>

 <hr>

 <!-- Formulario de Contacto -->
 <h2> Envíanos un Mensaje</h2>
 <form action="https://formspree.io/f/mqkndjkr" method="POST">
  <div class="form-grid">
    <div>
      <label for="nombre" class="sr-only">Tu nombre completo</label>
      <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required aria-label="Tu nombre completo" autocomplete="name">
    </div>
    <div>
      <label for="email" class="sr-only">Tu correo electrónico</label>
      <input type="email" id="email" name="_replyto" placeholder="Tu correo electrónico" required aria-label="Tu correo electrónico" autocomplete="email">
    </div>
  </div>
  <div>
    <label for="telefono" class="sr-only">Tu número de teléfono (opcional)</label>
    <input type="tel" id="telefono" name="telefono" placeholder="Tu número de teléfono (opcional)" aria-label="Tu número de teléfono (opcional)" autocomplete="tel">
  </div>
  <div>
    <label for="mensaje" class="sr-only">¿En qué podemos ayudarte?</label>
    <textarea id="mensaje" name="mensaje" rows="5" placeholder="¿En qué podemos ayudarte?" required aria-label="Tu mensaje"></textarea>
  </div>
  <button type="submit" class="boton boton-primario">Enviar mensaje</button>
 </form>

 <!-- Enlace a WhatsApp -->
 <h2>Contáctanos por WhatsApp</h2>
 <p>Habla directamente con nuestro equipo para consultas rápidas o pedidos por mensaje:</p>
 <a href="https://wa.me/5215551234567" class="boton boton-primario">Abrir WhatsApp</a>

 <!-- Descarga de Recursos Gratis -->
 <h2> Recursos Gratis</h2>
 <p>Además de contactarnos, puedes acceder a nuestros materiales educativos descargables:</p>
 <ul>
 <li><a href="{{ '/assets/docs/recetario-jamaica.pdf' | relative_url }}"> Descargar Recetario de Recetas (PDF)</a></li>
 <li><a href="{{ '/assets/docs/catalogo-flor-de-jamaica.pdf' | relative_url }}"> Descargar Catálogo de Productos (PDF)</a></li>
 </ul>

 <!-- Información Adicional -->
 <h2> Correo Electrónico</h2>
 <p>
 Si lo prefieres, envíanos una consulta a: 
 <a href="mailto:contacto@flordejamaica.com">contacto@flordejamaica.com</a>
 </p>

 <!-- Redes Sociales -->
 <h2> Síguenos</h2>
 <ul class="redes-sociales">
 <li><strong>Instagram:</strong> <a href="https://instagram.com/flor_jamaica_oficial">@flor_jamaica_oficial</a></li>
 <li><strong>Facebook:</strong> <a href="https://facebook.com/FlorJamaicaMX">Flor Jamaica MX</a></li>
 </ul>

 </div>
</div>
