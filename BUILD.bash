#!/bin/bash
echo >&2
echo '--- in DTREE ---' >&2
echo >&2
export PBP=~/projects/pbp-dev
export PBPWD=$(pwd)
export PYTHONPATH="${PBP}/kernel:${PYTHONPATH}"
export PBPCALLER=$PBPWD
./RUN "example" $PBWD $PBPCALLER
echo >&2
echo '--- done DTREE ---' >&2
echo >&2
