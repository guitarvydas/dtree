Given the script below, I get the output below. It culminates in an error on line 26 of the script, but I wonder why I don't see a trace for 2 lines that precede line 26, namely the "wsupport" line and the "node ... temp.rewrite.mjs" line.
script:

```
#!/bin/bash
set -ex

echo "$@" >${PBPHERE}/temp.t2t.args

if [ "$#" -eq 1 ]; then
  grammar="${PBPHERE}/$1.ohm"
  rewrite="${PBPHERE}/$1.rwr"
elif [ "$#" -eq 2 ]; then
  grammar="${PBPHERE}/$1.ohm"
  rewrite="${PBPHERE}/$2.rwr"
else
  echo "Usage: $0 base            # uses base.ohm and base.rwr" >&2
  echo "   or: $0 grammar-base rewrite-base" >&2
  exit 1
fi
src=-

# t2tlibd is the lib directory for t2t
t2tlibd="${PBP}/t2td/lib"
# wsupport is support.js in the current working directory
wsupport="${PBPHERE}/support.js

node "${t2tlibd}/rwr.mjs" "${rewrite}" >"${PBPHERE}/temp.rewrite.mjs"

sed -e 's/`/` + "`" + String.raw`/g' <"${grammar}" >$"{PBPHERE}/temp.grammar"

echo cat "${t2tlibd}/front.part.js" "${PBPHERE}/temp.grammar" "${t2tlibd}/middle.part.js" "${t2tlibd}/args.part.js" "${wsupport}" "${PBPHERE}/temp.rewrite.mjs" "${t2tlibd}/tail.part.js" >"${PBPHERE}/temp.nanodsl.mjs"

cat "${t2tlibd}/front.part.js" "${PBPHERE}/temp.grammar" "${t2tlibd}/middle.part.js" "${t2tlibd}/args.part.js" "${wsupport}" "${PBPHERE}/temp.rewrite.mjs" "${t2tlibd}/tail.part.js" >"${PBPHERE}/temp.nanodsl.mjs"

node "${PBPHERE}/temp.nanodsl.mjs" "${src}"
```

output:

```
$ ./BUILD.bash 
/Users/paultarvydas/projects/pbp-dev/kernel:
+ echo dtree
+ '[' 1 -eq 1 ']'
+ grammar=/Users/paultarvydas/projects/dtree/dtree.ohm
+ rewrite=/Users/paultarvydas/projects/dtree/dtree.rwr
+ src=-
+ t2tlibd=/Users/paultarvydas/projects/pbp-dev/t2td/lib
/Users/paultarvydas/projects/pbp-dev/t2t: line 26: unexpected EOF while looking for matching `''%                                           $ 
```






```
/Users/paultarvydas/projects/pbp-dev/t2t: line 25: unexpected EOF while looking for matching `''
```

on this line in a bash script
```
sed -e 's/`/` + "`" + String.raw`/g' <${grammar} >temp.grammar
```








Running my bash script, I get the error
```
/Users/paultarvydas/projects/pbp-dev/das2json: line 3: PTYHONPATH: unbound variable
```

Here is the script
```
#!/bin/bash
rm -f out.*
rm -f *.json
set -x
export SHELLOPTS
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

```

and here is ${PBP}/das2json
```
#!/bin/bash
set -e
echo ${PTYHONPATH}
node "${PBP}/das/das2json.mjs" "$1"
```
