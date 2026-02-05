#!/bin/bash
echo >/tmp/pbplog.md
echo >>/tmp/pbplog.md
echo '--- in DTREE ---' >&2 >>/tmp/pbplog.md
echo >&2 >>/tmp/pbplog.md
export PBP=~/projects/pbp-dev
export PBPWD=$(pwd)
export PYTHONPATH="${PBP}/kernel:${PYTHONPATH}"
export PBPCALLER=$PBPWD
./RUN "example" $PBWD $PBPCALLER
echo >&2 >>/tmp/pbplog.md
echo '--- done DTREE ---' >&2 >>/tmp/pbplog.md
echo >&2 >>/tmp/pbplog.md
