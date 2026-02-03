#!/bin/bash
rm -f out.*
rm -f *.json
set -e
export SHELLOPTS
export PBP=~/projects/pbp-dev
export PBPHERE=$(pwd)
export PYTHONPATH="${PBP}/kernel:${PYTHONPATH}"
${PBP}/das2json dtree-transmogrifier.drawio
python main.py 'example.drawio' main dtree-transmogrifier.drawio.json | ${PBP}/splitoutputs
if [ -f out.✗ ]
then
    cat out.✗
fi

