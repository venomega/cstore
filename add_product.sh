#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PRODUCTOS_DIR="$SCRIPT_DIR/productos"
MANIFEST="$PRODUCTOS_DIR/lista.json"

slugify() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9]/-/g' \
    | sed 's/--*/-/g' \
    | sed 's/^-//;s/-$//'
}

next_id() {
  local max=0
  for f in "$PRODUCTOS_DIR"/*.yml; do
    [ -f "$f" ] || continue
    local id
    id=$(grep -E '^id:' "$f" | head -1 | sed 's/^id:[[:space:]]*//')
    if [ -n "$id" ] && [ "$id" -gt "$max" ]; then
      max=$id
    fi
  done
  echo $((max + 1))
}

echo "=== Nuevo producto - La Madeja ==="
echo ""

read -r -p "Nombre del producto: " NAME
[ -z "$NAME" ] && { echo "El nombre es obligatorio"; exit 1; }

read -r -p "Descripción: " DESC
[ -z "$DESC" ] && { echo "La descripción es obligatoria"; exit 1; }

read -r -p "Precio (ej: 85000): " PRICE
[ -z "$PRICE" ] && { echo "El precio es obligatorio"; exit 1; }

read -r -p "Badge (opcional, ej: Popular/Nuevo): " BADGE

read -r -p "Badge type (opcional, ej: hot): " BADGE_TYPE

read -r -p "Color HEX (opcional, ej: #C4704A): " COLOR
[ -z "$COLOR" ] && COLOR="#A0522D"

read -r -p "Pattern (opcional, ej: sweater/hat/scarf/blanket/bag/socks/vest/cushion): " PATTERN
[ -z "$PATTERN" ] && PATTERN="sweater"

read -r -p "Imagen URL (opcional, ruta o URL): " IMAGE

ID=$(next_id)
SLUG=$(slugify "$NAME")
FILENAME="$SLUG.yml"
FILEPATH="$PRODUCTOS_DIR/$FILENAME"

if [ -f "$FILEPATH" ]; then
  echo ""
  echo "Ya existe un archivo para este producto: $FILENAME"
  read -r -p "¿Sobrescribir? (s/N): " CONFIRM
  [ "$CONFIRM" != "s" ] && { echo "Cancelado"; exit 1; }
fi

{
  echo "id: $ID"
  echo "name: \"$NAME\""
  echo "desc: \"$DESC\""
  echo "price: $PRICE"
  if [ -n "$BADGE" ]; then
    echo "badge: \"$BADGE\""
    echo "badgeType: \"$BADGE_TYPE\""
  fi
  echo "color: \"$COLOR\""
  echo "pattern: \"$PATTERN\""
  if [ -n "$IMAGE" ]; then
    echo "image: \"$IMAGE\""
  fi
} > "$FILEPATH"

echo "$FILENAME agregado al manifiesto"
python3 -c "
import json
with open('$MANIFEST') as f:
    data = json.load(f)
if '$FILENAME' not in data:
    data.append('$FILENAME')
with open('$MANIFEST', 'w') as f:
    json.dump(data, f)
"

echo ""
echo "✓ Producto creado: $FILEPATH"
echo "  ID: $ID"
