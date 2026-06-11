#!/bin/bash

echo "Revertendo tema de Dia dos Namorados..."

# Arquivo alvo
INDEX_FILE="index.html"

if [ ! -f "$INDEX_FILE" ]; then
    echo "Erro: $INDEX_FILE não encontrado no diretório atual."
    exit 1
fi

# 1. Remove a classe tema-namorados da tag body
sed -i 's/ class="tema-namorados"//g' "$INDEX_FILE"

# 2. Remove a importação do CSS do tema de namorados
sed -i '/<link rel="stylesheet" href="tema-namorados.css">/d' "$INDEX_FILE"

# 3. Remove a importação do JavaScript do tema de namorados
sed -i '/<script src="tema-namorados.js" defer><\/script>/d' "$INDEX_FILE"

echo "Concluído! Tema revertido com sucesso. O site voltou à estética original."
