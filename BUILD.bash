#!/bin/bash
rm -f out.*
rm -f *.json
set -x
export set PBP=~/projects/pbp-dev
export set PBPHERE=$(pwd)
export set PBPTOOL="<none>"
export PYTHONPATH="${PBP}/kernel:${PYTHONPATH}"
set -euo pipefail
${PBP}/das2json dtree-transmogrifier.drawio
python main.py 'xinterpret.dt' main dtree-transmogrifier.drawio.json | ${PBP}/splitoutputs
if [ -f out.✗ ]
then
    cat out.✗
fi

