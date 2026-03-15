#!/bin/bash
cd ${HOME}/projects/dtree
cp *.ohm "$1"
cp *.rwr "$1"
cp dtree-transmogrifier.drawio "$1"
cp main.py "$1"
cp *.pl "$1"
cp -R ./pbp "$1"
cp process_json* "$1"
cp translate.js "$1"
cp normalize.bash "$1"
