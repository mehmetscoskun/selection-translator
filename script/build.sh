#!/bin/bash

build() {
    echo '###Building React###'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    export GOOGLE_APPLICATION_CREDENTIALS="E:\Programss\projects\react-selection-translator\selection-translator-305219-1d03c9bf3ef2.json"

    react-scripts build

    mkdir -p dist
    cp -r build/* dist

    mv dist/index.html dist/popup.html
    cp -r src/background dist/background
}

build