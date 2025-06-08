#!/bin/bash

# Script de inicialização para o Render
cd /opt/render/project/src

# Tentar iniciar a aplicação
echo "Iniciando aplicação FastAPI..."
uvicorn main:app --host 0.0.0.0 --port $PORT 