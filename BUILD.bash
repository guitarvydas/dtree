#!/bin/bash
export PBP=~/projects/pbp-dev
export PBPWD=$(pwd)
export PYTHONPATH="${PBP}/kernel:${PYTHONPATH}"
export PBPCALLER=$PBPWD
${PBP}/resetlog
./RUN "example" $PBWD $PBPCALLER
