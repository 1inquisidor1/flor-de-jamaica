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
    <h2>📩 Envíanos un Mensaje</h2>
    <form action="https://formspree.io/f/mqkndjkr" method="POST">
      <div class="form-grid">
        <input type="text" name="nombre" placeholder="Tu nombre completo" required>
        <input type="email" name="_replyto" placeholder="Tu correo electrónico" required>
      </div>
      <input type="tel" name="telefono" placeholder="Tu número de teléfono (opcional)">
      <textarea name="mensaje" rows="5" placeholder="¿En qué podemos ayudarte?" required></textarea>
      <button type="submit" class="boton boton-primario">Enviar mensaje</button>
    </form>

    <!-- Enlace a WhatsApp -->
    <h2>📱 Contáctanos por WhatsApp</h2>
    <p>Habla directamente con nuestro equipo para consultas rápidas o pedidos por mensaje:</p>
    <a href="https://wa.me/5215551234567" class="boton boton-primario">Abrir WhatsApp</a>

    <!-- Descarga de Recursos Gratis -->
    <h2>🎁 Recursos Gratis</h2>
    <p>Además de contactarnos, puedes acceder a nuestros materiales educativos descargables:</p>
    <ul>
      <li><a href="{{ '/assets/docs/recetario-jamaica.md' | relative_url }}">📖 Descargar Recetario Exclusivo (PDF)</a></li>
      <li><a href="{{ '/assets/docs/catalogo-flor-de-jamaica.md' | relative_url }}">📦 Descargar Catálogo de Productos (PDF)</a></li>
    </ul>

    <!-- Información Adicional -->
    <h2>📧 Correo Electrónico</h2>
    <p>
      Si lo prefieres, envíanos una consulta a: 
      <a href="mailto:contacto@flordejamaica.com">contacto@flordejamaica.com</a>
    </p>

    <!-- Redes Sociales -->
    <h2>📷 Síguenos</h2>
    <ul class="redes-sociales">
      <li><strong>Instagram:</strong> <a href="https://instagram.com/flor_jamaica_oficial">@flor_jamaica_oficial</a></li>
      <li><strong>Facebook:</strong> <a href="https://facebook.com/FlorJamaicaMX">Flor Jamaica MX</a></li>
    </ul>

  </div>
</div>
