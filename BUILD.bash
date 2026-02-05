#!/bin/bash
echo
echo '--- in DTREE ---'
echo
export PBP=~/projects/pbp-dev
export PBPWD=$(pwd)
export PYTHONPATH="${PBP}/kernel:${PYTHONPATH}"
export PBPCALLER=$PBPWD
./RUN "example" $PBWD $PBPCALLER
