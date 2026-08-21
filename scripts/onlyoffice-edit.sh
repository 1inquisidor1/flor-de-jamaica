#!/bin/bash
# === ONLYOFFICE WRAPPER PARA FLOR DE JAMAICA ===
# Uso: onlyoffice-edit <archivo>
# Abre el archivo en ONLYOFFICE Desktop Editors (Flatpak)
# Soporta: .docx, .odt, .xlsx, .ods, .pptx, .odp, .pdf (solo lectura), .txt, .rtf

set -e

if [[ $# -eq 0 ]]; then
  echo "Uso: onlyoffice-edit <archivo>"
  echo ""
  echo "Archivos soportados:"
  echo "  - Documentos: .docx, .odt, .txt, .rtf, .pdf"
  echo "  - Hojas de cálculo: .xlsx, .ods"
  echo "  - Presentaciones: .pptx, .odp"
  echo ""
  echo "NOTA: Para archivos de código (.md, .html, .scss, .js, .yml, .json),"
  echo "      usar editores de texto como vim, code, nvim o nano."
  exit 1
fi

archivo="$1"

if [[ ! -f "$archivo" ]]; then
  echo "Error: El archivo '$archivo' no existe."
  exit 1
fi

# Detectar tipo de archivo
ext="${archivo##*.}"
ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

# Lista de extensiones soportadas por ONLYOFFICE
case "$ext_lower" in
  docx|odt|txt|rtf|pdf)
    flatpak run org.onlyoffice.desktopeditors "$archivo" 2>/dev/null &
    ;;
  xlsx|ods|csv)
    flatpak run org.onlyoffice.desktopeditors "$archivo" 2>/dev/null &
    ;;
  pptx|odp)
    flatpak run org.onlyoffice.desktopeditors "$archivo" 2>/dev/null &
    ;;
  *)
    # Archivos no soportados por onlyOffice
    echo "ADVERTENCIA: '$archivo' (.$ext) no es soportado por ONLYOFFICE."
    echo "Archivos soportados: .docx, .odt, .xlsx, .ods, .pptx, .odp, .pdf, .txt, .rtf"
    echo ""
    echo "Sugerencia: para archivos de código (.md, .html, .scss, .js, .yml, .json),"
    echo "usa un editor de texto como:"
    echo "  nvim $archivo"
    echo "  vim $archivo"
    echo "  code $archivo  (si VS Code está instalado)"
    echo "  nano $archivo"
    exit 1
    ;;
esac

echo "ONLYOFFICE abriendo: $archivo"
