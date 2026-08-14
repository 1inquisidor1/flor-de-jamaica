# 🚀 INSTRUCCIONES PARA SUBIR A GITHUB (Push)

## ⚠️ Importante: No tengo acceso directo a internet desde el sandbox

He creado **TODOS los archivos de FASE 1, 2 y 3** en tu carpeta local. Ahora debes hacer el **push a GitHub desde tu máquina**.

---

## 📋 ARCHIVOS CREADOS Y LISTOS

```
Jamaica "Nacional"/
├── _config.yml                      ✅ Configuración global
├── 404.html                         ✅ Página de error
├── .gitignore                       ✅ Exclusiones Git
├── _layouts/
│   ├── default.html                 ✅ Plantilla base
│   └── page.html                    ✅ Plantilla de subpáginas
├── _includes/
│   ├── header.html                  ✅ Navegación responsiva
│   └── footer.html                  ✅ Pie de página
├── index.md                         ✅ Página de inicio con slider
├── apariencia.md                    ✅ Subpágina Apariencia
├── composicion.md                   ✅ Subpágina Composición
├── beneficios.md                    ✅ Subpágina Beneficios
├── usos.md                          ✅ Subpágina Usos
├── assets/css/
│   └── style.scss                   ✅ Estilos maestros
├── FASE-1-INSTRUCCIONES.md          ✅ Documentación
├── FASE-2-INSTRUCCIONES.md          ✅ Documentación
├── FASE-3-INSTRUCCIONES.md          ✅ Documentación
└── INSTRUCCIONES-GITHUB.md          ✅ Este archivo
```

---

## 🔧 COMANDOS PARA EJECUTAR EN TU TERMINAL

### **Paso 1: Navega a tu carpeta del proyecto**

```bash
cd ~/Claude/Projects/Jamaica\ Nacional/
```

### **Paso 2: Inicializa Git (si no lo has hecho)**

```bash
git init
git config user.name "Tu Nombre"
git config user.email "tu-email@gmail.com"
git branch -M main
```

### **Paso 3: Añade el remote de GitHub**

```bash
git remote add origin https://github.com/1inquisidor1/flor-de-jamaica.git
```

### **Paso 4: Verifica el estado**

```bash
git status
```

Deberías ver todos los archivos creados como "Untracked files".

### **Paso 5: Añade TODOS los archivos**

```bash
git add .
```

### **Paso 6: Haz un commit inicial**

```bash
git commit -m "FASE 1-3: Configuración base, plantillas, navegación, contenido completo y estilos"
```

### **Paso 7: Sube a GitHub**

```bash
git push -u origin main
```

Te pedirá autenticación de GitHub:
- Si usas **HTTPS:** Te pedirá usuario/contraseña o token de acceso
- Si usas **SSH:** Debe estar configurado previamente

---

## 🔐 Autenticación en GitHub

### **Opción A: Token de Acceso (Recomendado)**

1. Ve a **GitHub → Settings → Developer settings → Personal access tokens**
2. Crea un token con permiso `repo`
3. Copia el token
4. En la terminal, cuando pida contraseña, pega el token

### **Opción B: SSH Key (Si ya lo tienes configurado)**

Si ya tienes SSH configurado, el push debería funcionar sin pedir contraseña.

---

## ✅ Verificación Post-Push

Después de hacer `git push`:

1. Ve a https://github.com/1inquisidor1/flor-de-jamaica
2. Verifica que aparezcan todos los archivos
3. Ve a **Settings → Pages**
4. Asegúrate de que esté seleccionado "GitHub Actions" como fuente
5. En pocos minutos, GitHub construirá el sitio automáticamente

---

## 📊 Estructura Final del Repositorio

Una vez subido, verás esto en GitHub:

```
flor-de-jamaica/
├── _config.yml
├── 404.html
├── .gitignore
├── _layouts/
│   ├── default.html
│   └── page.html
├── _includes/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   └── style.scss
│   └── images/
│       ├── slider/ (tus 3 imágenes)
│       └── iconos/ (favicon)
├── index.md
├── apariencia.md
├── composicion.md
├── beneficios.md
├── usos.md
└── FASE-X-INSTRUCCIONES.md
```

---

## 🚨 Si hay errores durante el push

### Error: "Permission denied"
- Verifica tu autenticación (token o SSH)
- Asegúrate de tener permisos en el repositorio

### Error: "fatal: Not a git repository"
- Ejecuta `git init` primero
- Verifica que estés en la carpeta correcta

### Error: "rejected - non-fast-forward"
- Ejecuta: `git pull origin main --rebase`
- Luego: `git push origin main`

---

## 📡 Estado del Despliegue

Después de push:

1. Ve a **Actions** en tu repositorio de GitHub
2. Verás un flujo de trabajo en ejecución (amarillo)
3. En 2-3 minutos, debe ponerse verde (éxito)
4. Tu sitio estará disponible en:
   **https://1inquisidor1.github.io/flor-de-jamaica/**

---

## 📸 Próximo Paso: Agregar Imágenes

Una vez que el sitio esté en GitHub, necesitas:

1. Crear la carpeta `assets/images/slider/` en el repositorio
2. Subir tus 3 imágenes:
   - `florCampos.jpeg`
   - `florIndividual.jpeg`
   - `JugoJamaica.jpeg`
3. Crear `assets/images/iconos/` y subir `favicon.ico`

O, si lo prefieres, lo hacemos en **FASE 4** junto con el JavaScript adicional.

---

## 🎯 FASE 4 (Próxima)

Una vez que FASE 3 esté en GitHub, crearemos:

- **JavaScript avanzado:** Slider mejorado, menú dinámico, scroll effects
- **Open Graph:** Metaetiquetas para redes sociales
- **Optimización:** Favicon, imágenes optimizadas
- **Testing:** Lighthouse score, responsive checks

---

## ❓ ¿Problemas?

Si tienes algún error o problema durante el push:

1. Copia el mensaje de error completo
2. Verifica que estés en la carpeta correcta: `~/Claude/Projects/Jamaica\ Nacional/`
3. Intenta nuevamente con los comandos anteriores

---

**¡Adelante! Tu sitio está casi listo para el mundo.** 🌺
