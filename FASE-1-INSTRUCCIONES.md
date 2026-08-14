# 🧱 FASE 1: CONFIGURACIÓN BASE - INSTRUCCIONES PASO A PASO

## ✅ Archivos Creados en esta Fase

- ✅ `_config.yml` - Configuración global del sitio
- ✅ `404.html` - Página de error personalizada
- ✅ `.gitignore` - Archivos a excluir de GitHub
- ⏳ Estructura de carpetas (crear manualmente o con comandos)

---

## 📁 ESTRUCTURA DE CARPETAS QUE DEBES CREAR

Crea las siguientes carpetas en la raíz del repositorio (pueden ser vacías por ahora):

```
flor-de-jamaica/
├── _layouts/          # Plantillas maestras de páginas
│   ├── default.html   # (Se creará en Fase 2)
│   └── page.html      # (Se creará en Fase 2)
├── _includes/         # Fragmentos reutilizables
│   ├── header.html    # (Se creará en Fase 2)
│   ├── footer.html    # (Se creará en Fase 2)
│   └── slider.html    # (Se creará en Fase 3)
├── _posts/            # Artículos del blog (vacía por ahora)
├── assets/            # Recursos estáticos
│   ├── css/           # Hojas de estilo
│   │   └── style.scss # (Se creará en Fase 3)
│   ├── js/            # Archivos JavaScript
│   │   └── main.js    # (Se creará en Fase 4)
│   └── images/        # Todas las imágenes
│       ├── slider/    # Imágenes del carrusel
│       │   ├── foto1.jpg
│       │   ├── foto2.jpg
│       │   └── foto3.jpg
│       ├── posts/     # Imágenes de subpáginas
│       │   └── caliz-jamaica.jpg
│       └── iconos/    # Favicon y otros
│           └── favicon.ico
├── _config.yml        # ✅ Configuración global (YA CREADO)
├── 404.html           # ✅ Página de error (YA CREADO)
├── .gitignore         # ✅ Exclusiones Git (YA CREADO)
├── index.md           # (Se creará en Fase 3) - Página de inicio
├── apariencia.md      # (Se creará en Fase 3)
├── composicion.md     # (Se creará en Fase 3)
├── beneficios.md      # (Se creará en Fase 3)
└── usos.md            # (Se creará en Fase 3)
```

---

## 🔧 CÓMO CREAR LA ESTRUCTURA

### **Opción 1: Usar la terminal (Recomendado)**

```bash
# Navega a tu carpeta del proyecto
cd /ruta/a/flor-de-jamaica

# Crea todas las carpetas de una vez
mkdir -p _layouts _includes _posts assets/css assets/js assets/images/slider assets/images/posts assets/images/iconos

echo "✅ Estructura de carpetas creada"
```

### **Opción 2: Crear carpetas manualmente**

Usando el explorador de archivos, crea carpeta por carpeta respetando la jerarquía anterior.

---

## 📤 CÓMO SUBIR A GITHUB

### **PASO 1: Inicializar repositorio Git (si no lo has hecho)**

```bash
cd /ruta/a/flor-de-jamaica
git init
git add .
git commit -m "FASE 1: Configuración base - estructura y config"
```

### **PASO 2: Conectar con tu repositorio remoto**

```bash
# Reemplaza TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/1inquisidor1/flor-de-jamaica.git

# Cambia la rama a 'main' (o 'master' según tu config de GitHub)
git branch -M main

# Sube los cambios
git push -u origin main
```

### **PASO 3: Verificar en GitHub**

1. Ve a https://github.com/1inquisidor1/flor-de-jamaica
2. Verifica que aparezca el archivo `_config.yml` y `404.html`
3. Ve a **Settings → Pages**
4. Asegúrate de que esté seleccionada la opción **"GitHub Actions"** como fuente de despliegue
5. En **Settings → Pages** debería aparecer un mensaje: "Your site is published at https://1inquisidor1.github.io/flor-de-jamaica/"

---

## 📋 VERIFICACIÓN DE LA FASE 1

Antes de pasar a la Fase 2, verifica que:

- ✅ El archivo `_config.yml` existe en la raíz
- ✅ El archivo `404.html` existe en la raíz
- ✅ El archivo `.gitignore` existe
- ✅ La estructura de carpetas está creada
- ✅ El repositorio está en GitHub
- ✅ GitHub Pages está configurado para usar "GitHub Actions"

---

## 🎯 PRÓXIMO PASO: FASE 2

Cuando hayas completado esto, diremos:

> "FASE 1 completada ✅ - Iniciando FASE 2: Plantillas Maestras"

---

## 📝 NOTAS IMPORTANTES

- **baseurl**: En `_config.yml` está configurado como `/flor-de-jamaica` porque el sitio estará en `usuario.github.io/flor-de-jamaica`
- **Imágenes**: Coloca las 3 imágenes del slider en `assets/images/slider/`
- **Jekyll**: GitHub Pages construye automáticamente el sitio cada vez que haces push

¿Alguna duda o estás listo para continuar?
