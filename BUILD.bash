#!/bin/bash
export PBP=~/projects/pbp-dev
export PBPHERE=$(pwd)
export PYTHONPATH="${PBP}/kernel:${PYTHONPATH}"
export PBPCALLER=$PBPHERE
./RUN "example" $PBHERE $PBPCALLER
