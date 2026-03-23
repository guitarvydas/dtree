# dtree
decision tree diagram --> python

use the generated code as a snippet of code to be inserted into a python program

# usage
## top level
`@make`
## as a sub-project
`@make <$1> <$2> <$3>`
- $1 is callee's working dir
- $2 is basename of the caller's file to be processed
- $3 is caller's working dir
- processes a drawing specified by `$2.drawio` and creates `$2.frish`, `$2.dt`, `$2.py`, `$2.js` in callee's working dir

# miscellaneous
The `frish.drawio` program demonstrates the use of pre- and peephole- optimization.

The pre optimizer changes `frish` code to "better" `frish` code. The improved `forthish.frish` code is transmogrified to Python (`forthish.0.py`).

The post optimizer (peephole_py) applies Python-specific optimizations to result in the final code `forthish.1.py`.

The final generated code `forthish.1.py` can be run by a Python compiler/interpreter.

