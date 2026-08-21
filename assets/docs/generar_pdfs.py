#!/usr/bin/env python3
"""Genera PDFs a partir de archivos markdown para el proyecto Flor de Jamaica."""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

# Paleta de colores
ROJO_PROFUNDO = HexColor("#B71F3E")
VERDE_HOJA = HexColor("#3D6B4F")
TINTA = HexColor("#1A1412")

# Estilos personalizados
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name='TituloPrincipal',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=24,
    textColor=ROJO_PROFUNDO,
    alignment=TA_CENTER,
    spaceAfter=30,
    leading=28
))

styles.add(ParagraphStyle(
    name='Subtitulo',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=18,
    textColor=VERDE_HOJA,
    spaceBefore=20,
    spaceAfter=12,
    leading=22
))

styles.add(ParagraphStyle(
    name='Cuerpo',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=12,
    textColor=TINTA,
    leading=18,
    alignment=TA_LEFT,
    spaceAfter=12
))

styles.add(ParagraphStyle(
    name='Lista',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=12,
    textColor=TINTA,
    leading=18,
    leftIndent=20,
    spaceAfter=6
))

styles.add(ParagraphStyle(
    name='Destacado',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=12,
    textColor=ROJO_PROFUNDO,
    leading=18,
    spaceAfter=12
))

styles.add(ParagraphStyle(
    name='Centro',
    parent=styles['Normal'],
    fontSize=11,
    textColor=HexColor("#777777"),
    alignment=TA_CENTER
))

def generar_catalogo_pdf():
    """Genera el catálogo de productos PDF."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, 'catalogo-flor-de-jamaica.pdf')

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )

    story = []

    # Portada
    story.append(Paragraph("Catalogo de Productos", styles['TituloPrincipal']))
    story.append(Paragraph("Flor de Jamaica Natural - Premium", styles['Subtitulo']))
    story.append(Spacer(1, 0.3 * inch))

    story.append(Paragraph("-" * 50, styles['Centro']))
    story.append(Spacer(1, 0.3 * inch))

    # Sobre Nosotros
    story.append(Paragraph("Sobre Nosotros", styles['Subtitulo']))
    story.append(Paragraph(
        "La <b>Flor de Jamaica</b> (<i>Hibiscus sabdariffa</i>) ha sido apreciada por siglos por sus "
        "multiples beneficios. Nuestra Flor de Jamaica es cultivada de forma sostenible, sin pesticidas "
        "ni agroquimicos, garantizando la maxima calidad y pureza.",
        styles['Cuerpo']
    ))

    # Por qué elegir
    story.append(Paragraph("Por que elegir nuestra Jamaica?", styles['Subtitulo']))

    beneficios = [
        "<b>100% Natural:</b> Sin aditivos, colorantes ni conservadores",
        "<b>Cultivo Sostenible:</b> Respeta el medio ambiente",
        "<b>Riqueza Nutricional:</b> Rica en vitamina C, calcio, potasio y antioxidantes",
        "<b>Versatilidad:</b> Ideal para bebidas, infusiones, postres y cosmetica casera",
        "<b>Tradicion y Ciencia:</b> Basada en usos ancestrales validados por la ciencia moderna"
    ]

    for b in beneficios:
        story.append(Paragraph("- " + b, styles['Lista']))

    story.append(PageBreak())

    # Productos
    story.append(Paragraph("Productos Disponibles", styles['Subtitulo']))

    productos = [
        ("Flor de Jamaica Suelta (Organica)", "Bolsa de 500g o 1kg - Bolsa kraft sellada al vacio", "Consultar precio"),
        ("Kit de Bienvenida", "500g de Jamaica + taza + recetario", "Precio especial"),
        ("Suplemento de Jamaica en Cápsulas", "60 cápsulas vegetales - Sin gluten, sin lactosa", "Disponible"),
        ("Edicion Premium", "Flor seleccionada de ciclo corto - Certificada", "Edicion limitada")
    ]

    for prod, desc, info in productos:
        story.append(Paragraph("<b>" + prod + "</b>", styles['Destacado']))
        story.append(Paragraph(desc, styles['Cuerpo']))
        story.append(Paragraph("<b>Info:</b> " + info, styles['Cuerpo']))
        story.append(Spacer(1, 0.15 * inch))

    story.append(Spacer(1, 0.3 * inch))

    # Beneficios
    story.append(Paragraph("Beneficios Destacados", styles['Subtitulo']))

    beneficios_data = [
        ("Regulacion de Presion Arterial", "Rico en acido rosamínico, ayuda a mantener presion saludable"),
        ("Poder Antioxidante", "Mas fuerte que el te verde convencional"),
        ("Efecto Diurético Natural", "Favorece la eliminacion de líquidos y toxinas"),
        ("Digestion Saludable", "Estimula la produccion de bilis y mejora la digestión")
    ]

    for ben, desc in beneficios_data:
        story.append(Paragraph("<b>" + ben + "</b>", styles['Destacado']))
        story.append(Paragraph(desc, styles['Cuerpo']))

    story.append(Paragraph("Donde encontrarnos?", styles['Subtitulo']))
    story.append(Paragraph(
        "<b>Telefono/WhatsApp:</b> +52 1 55 5123 4567<br/>"
        "<b>Instagram:</b> @flor_jamaica_oficial<br/>"
        "<b>Email:</b> contacto@flordejamaica.com<br/>"
        "<b>Sitio web:</b> www.flor-de-jamaica.com",
        styles['Cuerpo']
    ))

    doc.build(story)
    print("Catalogo generado: " + output_path)


def generar_recetario_pdf():
    """Genera el recetario PDF."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, 'recetario-jamaica.pdf')

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )

    story = []

    # Portada
    story.append(Paragraph("Recetario Exclusivo", styles['TituloPrincipal']))
    story.append(Paragraph("10 Recetas con Flor de Jamaica", styles['Subtitulo']))
    story.append(Spacer(1, 0.5 * inch))

    story.append(Paragraph("-" * 50, styles['Centro']))
    story.append(Spacer(1, 0.3 * inch))

    recetas = [
        {
            "numero": "1",
            "titulo": "Agua de Jamaica Clásica",
            "ingredientes": [
                "1 taza de cálices de Flor de Jamaica",
                "4 tazas de agua",
                "2 cucharadas de azúcar (opcional)",
                "Rodajas de limón"
            ],
            "preparacion": [
                "Hierve los cálices en el agua durante 5 minutos.",
                "Deja reposar 10 minutos.",
                "Cuela y endulza al gusto.",
                "Sirve frío con hielo y limón."
            ]
        },
        {
            "numero": "2",
            "titulo": "Te de Jamaica Frío",
            "ingredientes": [
                "1 bolsa de te negro",
                "1 taza de cálices de Jamaica",
                "2 tazas de agua",
                "Miel al gusto"
            ],
            "preparacion": [
                "Infusiona el te negro y la Jamaica juntos.",
                "Endulza con miel mientras aún está caliente.",
                "Enfría y sirve con hielo."
            ]
        },
        {
            "numero": "3",
            "titulo": "Smoothie Detox de Jamaica",
            "ingredientes": [
                "½ taza de cálices de Jamaica hidratados",
                "1 plátano congelado",
                "½ taza de yogur natural",
                "1 cucharada de miel"
            ],
            "preparacion": [
                "Licúa todos los ingredientes hasta obtener una textura cremosa.",
                "Sirve inmediatamente y disfruta."
            ]
        },
        {
            "numero": "4",
            "titulo": "Mermelada de Jamaica",
            "ingredientes": [
                "2 tazas de cálices de Jamaica",
                "1 taza de azúcar",
                "Jugo de 1 naranja"
            ],
            "preparacion": [
                "Cocina los cálices con el jugo de naranja hasta que se ablanden.",
                "Añade azúcar y cocina hasta que espese.",
                "Guarda en frascos esterilizados."
            ]
        },
        {
            "numero": "5",
            "titulo": "Cóctel Cosmopolita de Jamaica",
            "ingredientes": [
                "1 taza de agua de Jamaica preparada",
                "100 ml de vodka",
                "50 ml de licor de naranja",
                "Jugo de medio limón"
            ],
            "preparacion": [
                "Mezcla todo en una coctelería con hielo.",
                "Sirve en vaso tipo copa y decora con una rodaja de naranja."
            ]
        },
        {
            "numero": "6",
            "titulo": "Panna Cotta de Jamaica",
            "ingredientes": [
                "2 tazas de crema para batir",
                "½ taza de azúcar",
                "2 cucharaditas de gelatina sin sabor",
                "½ taza de cálices de Jamaica hidratados"
            ],
            "preparacion": [
                "Hidrata la gelatina en agua fría.",
                "Calienta la crema con azúcar e los cálices de Jamaica.",
                "Incorpora la gelatina hidratada y vierte en moldes.",
                "Refrigera hasta que cuaje."
            ]
        },
        {
            "numero": "7",
            "titulo": "Brownie Vegano con Jamaica",
            "ingredientes": [
                "1 taza de harina integral",
                "½ taza de cacao en polvo",
                "½ taza de puré de plátano maduro",
                "¼ taza de aceite de coco",
                "½ taza de cálices de Jamaica molidos finos"
            ],
            "preparacion": [
                "Mezcla todos los ingredientes hasta formar una masa homogénea.",
                "Hornea a 180°C por 25-30 minutos.",
                "Deja enfriar y corta en cuadrados."
            ]
        },
        {
            "numero": "8",
            "titulo": "Gaseosa Natural de Jamaica",
            "ingredientes": [
                "1 taza de cálices de Jamaica",
                "4 tazas de agua con gas",
                "Azúcar morena al gusto",
                "Esencia de vainilla"
            ],
            "preparacion": [
                "Infusiona los cálices como agua normal.",
                "Añade azúcar y deja enfriar.",
                "Mezcla con agua con gas antes de servir."
            ]
        },
        {
            "numero": "9",
            "titulo": "Mascarilla Facial con Jamaica",
            "ingredientes": [
                "2 cucharadas de cálices de Jamaica molidos",
                "1 cucharada de miel",
                "1 cucharadita de yogur natural"
            ],
            "preparacion": [
                "Mezcla todos los ingredientes hasta formar una pasta.",
                "Aplica sobre el rostro y deja actuar 15 minutos.",
                "Retira con agua tibia y seca con toalla suave."
            ]
        },
        {
            "numero": "10",
            "titulo": "Infusión Relajante Nocturna",
            "ingredientes": [
                "1 taza de cálices de Jamaica",
                "1 taza de agua",
                "1 cucharadita de valeriana en polvo (opcional)"
            ],
            "preparacion": [
                "Hierve el agua y viértela sobre los cálices.",
                "Deja infusionar 8-10 minutos.",
                "Cuela y bebe antes de dormir para relajarte."
            ]
        }
    ]

    for receta in recetas:
        story.append(Paragraph(receta['numero'] + ". " + receta['titulo'], styles['Subtitulo']))

        story.append(Paragraph("<b>Ingredientes:</b>", styles['Destacado']))
        for ing in receta['ingredientes']:
            story.append(Paragraph("   - " + ing, styles['Lista']))

        story.append(Paragraph("<b>Preparación:</b>", styles['Destacado']))
        for i, prep in enumerate(receta['preparacion'], 1):
            story.append(Paragraph(str(i) + ". " + prep, styles['Lista']))

        if receta['numero'] != '10':
            story.append(Spacer(1, 0.2 * inch))
        else:
            story.append(Spacer(1, 0.3 * inch))

    # Consejo extra
    story.append(Paragraph("Consejo del Chef", styles['Subtitulo']))
    story.append(Paragraph(
        "Para intensificar el sabor, añade un poco de canela o clavo a cualquier preparación.",
        styles['Cuerpo']
    ))
    story.append(Spacer(1, 0.3 * inch))

    # Footer
    story.append(Paragraph("-" * 50, styles['Centro']))
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph(
        "¿Quieres más recetas o información sobre nuestros productos?<br/>"
        "Visítanos en: www.flor-de-jamaica.com<br/>"
        "Email: contacto@flordejamaica.com",
        styles['Centro']
    ))

    doc.build(story)
    print("Recetario generado: " + output_path)


if __name__ == "__main__":
    generar_catalogo_pdf()
    generar_recetario_pdf()
