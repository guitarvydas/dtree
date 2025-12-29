#!/bin/bash
set -x
# ./pbp/t2t.bash . ./pbp test2.ohm test2.rwr test2support.mjs - <test2.txt
./pbp/t2t.bash . ./pbp dtree.ohm drawio2pl.rwr support.mjs - <test.drawio >test.pl
