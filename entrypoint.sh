#!/bin/sh
set -e

# Executar o script de espera
./wait-for-db.sh db:3306 -- && npm run migrate && npm run dev
