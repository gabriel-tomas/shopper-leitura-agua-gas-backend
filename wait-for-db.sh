#!/bin/sh
# wait-for-it.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

clear

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  >&2 echo -e "${YELLOW}Esperando conexão com banco de dados MariaDB...${NC}"
  clear
  sleep 1
done

>&2 echo -e "${GREEN}Banco de dados MariaDB está pronto. Executando App...${NC}"
exec $cmd
