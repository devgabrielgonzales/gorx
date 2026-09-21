#!/bin/bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
DOMAIN="gorx.com.br"
EMAIL="contato@gorx.com.br"
CONF_SRC="$APP_DIR/deploy/nginx-gorx.conf"
CONF_NAME="gorx.com.br.conf"

host_root() {
  docker run --rm --privileged --pid=host -v /:/host alpine chroot /host "$@"
}

echo "==> Build e start do Gorx"
cd "$APP_DIR"
docker compose up -d --build

echo "==> Instalando vhost nginx"
host_root cp "$CONF_SRC" "/etc/nginx/sites-available/$CONF_NAME"
host_root ln -sfn "/etc/nginx/sites-available/$CONF_NAME" "/etc/nginx/sites-enabled/$CONF_NAME"
host_root nginx -t
host_root nginx -s reload

echo "==> Tentando emitir certificado SSL"
if getent hosts "$DOMAIN" >/dev/null 2>&1; then
  host_root certbot --nginx \
    --non-interactive --agree-tos --no-eff-email \
    --redirect \
    -m "$EMAIL" \
    -d "$DOMAIN" -d "www.$DOMAIN"
  echo "==> Deploy concluído: https://$DOMAIN"
else
  echo "==> DNS de $DOMAIN ainda não aponta para este servidor."
  echo "    Crie no Registro.br:"
  echo "      A    @      152.53.118.186"
  echo "      A    www    152.53.118.186"
  echo "    Depois rode de novo: $APP_DIR/deploy.sh"
  echo "==> App no ar em http://127.0.0.1:3010 (HTTP no nginx assim que o DNS propagar)"
fi
