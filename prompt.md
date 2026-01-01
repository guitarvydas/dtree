I want to use SWIPL Prolog to read in the json file `test.json` (attached) and to make queries against it.

For every cell of `kind` `branchLabel` and `branch` `true`, find the parent and modify it's `kind` from `edge` to `trueEdge`.

Remove all facts related to the `branchLabel` cell.

Likewise for every cell of `kind` `branchLabel` and `branch` `false`, find the parent and modify it's `kind` from `edge` to `falseEdge`.

Remove all facts related to this `branchLabel` cell.

Write the modified information back out as json to file `test1.json`. It should look like the original `test.json`, except for the modified `kind`s of the `edge` cells and the removal of the `branchLabel` cells.

---

I'm going to use SWIPL. I've attached the json file `dtree-transmogrifier.drawio.json`. It's a graphML file saved by draw.io. I contains 2 diagrams `main` and `ir`. Each diagram contains one JSON object containing 4 fields `name`, `children`, `connections` and `dile`. I want to write a query that finds all of the children of the diagram "main" and gives me their name and id. Likewise for the diagram `ir`.

---

write a SWIPL program that inputs out-1.json and outputs out-2.json, rewriting all source and target attributes to use `id`s given by the map. Drop `drawio_id` attributes from each cell. Retain the map in out-2.json. Remove all cells that have parent "0" or parent "1". 

---

given json like
```
[
  {
    "type": "diagram",
    "attributes": {
      "id": "d2",
      "name": "dtree",
      "drawio_id": "brDq65to_PZeKpkbbApS"
    },
    "cells": [
      {
        "id": "c3"
      },
      {
        "id": "c4",
        "parent": "0"
      },
      {
        "id": "c5",
        "parent": "1",
        "source": "zTViIhP_tUskBqKQNT3X-46",
        "target": "dRkQnjKu9n-pmXYVSlKa-6",
        "kind": "falseEdge"
      },
      {
        "id": "c7",
        "parent": "1",
        "source": "zTViIhP_tUskBqKQNT3X-46",
        "target": "dRkQnjKu9n-pmXYVSlKa-5",
        "kind": "trueEdge"
      },
      {
        "id": "c9",
        "text": "float?",
        "kind": "rhombus",
        "parent": "1"
      },
      {
        "id": "c10",
        "text": "compile float",
        "kind": "process",
        "parent": "1"
      },
      {
        "id": "c11",
        "text": "error",
        "kind": "process",
        "parent": "1"
      }
    ]
  },
  {
    "type": "diagram",
    "attributes": {
      "id": "d12",
      "name": "labelled Copy of dtree",
      "drawio_id": "xkearo18fkGN7BDzeqH2"
    },
    "cells": [
      {
        "id": "c13"
      },
      {
        "id": "c14",
        "parent": "ToCHc4KL9KvJzYzUVY1y-0"
      },
      {
        "id": "c15",
        "kind": "edge",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1",
        "source": "ToCHc4KL9KvJzYzUVY1y-6",
        "target": "ToCHc4KL9KvJzYzUVY1y-8"
      },
      {
        "id": "c16",
        "branch": false,
        "kind": "branchLabel",
        "parent": "ToCHc4KL9KvJzYzUVY1y-2"
      },
      {
        "id": "c17",
        "kind": "edge",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1",
        "source": "ToCHc4KL9KvJzYzUVY1y-6",
        "target": "ToCHc4KL9KvJzYzUVY1y-7"
      },
      {
        "id": "c18",
        "branch": true,
        "kind": "branchLabel",
        "parent": "ToCHc4KL9KvJzYzUVY1y-4"
      },
      {
        "id": "c19",
        "text": "float?",
        "kind": "rhombus",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      },
      {
        "id": "c20",
        "text": "compile float",
        "kind": "process",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      },
      {
        "id": "c21",
        "text": "error",
        "kind": "process",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      },
      {
        "id": "c22",
        "text": "c9",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      },
      {
        "id": "c23",
        "text": "c10",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      },
      {
        "id": "c24",
        "text": "c7",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      },
      {
        "id": "c25",
        "text": "c5",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      },
      {
        "id": "c26",
        "text": "c11",
        "parent": "ToCHc4KL9KvJzYzUVY1y-1"
      }
    ]
  },
  {
    "map": [
      {
        "drawio_id": "0",
        "id": "c3"
      },
      {
        "drawio_id": "1",
        "id": "c4"
      },
      {
        "drawio_id": "brDq65to_PZeKpkbbApS",
        "id": "d2"
      },
      {
        "drawio_id": "zTViIhP_tUskBqKQNT3X-42",
        "id": "c5"
      },
      {
        "drawio_id": "zTViIhP_tUskBqKQNT3X-43",
        "id": "c6"
      },
      {
        "drawio_id": "zTViIhP_tUskBqKQNT3X-44",
        "id": "c7"
      },
      {
        "drawio_id": "zTViIhP_tUskBqKQNT3X-45",
        "id": "c8"
      },
      {
        "drawio_id": "zTViIhP_tUskBqKQNT3X-46",
        "id": "c9"
      },
      {
        "drawio_id": "dRkQnjKu9n-pmXYVSlKa-5",
        "id": "c10"
      },
      {
        "drawio_id": "dRkQnjKu9n-pmXYVSlKa-6",
        "id": "c11"
      },
      {
        "drawio_id": "xkearo18fkGN7BDzeqH2",
        "id": "d12"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-0",
        "id": "c13"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-1",
        "id": "c14"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-2",
        "id": "c15"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-3",
        "id": "c16"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-4",
        "id": "c17"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-5",
        "id": "c18"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-6",
        "id": "c19"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-7",
        "id": "c20"
      },
      {
        "drawio_id": "ToCHc4KL9KvJzYzUVY1y-8",
        "id": "c21"
      },
      {
        "drawio_id": "EsB4xGEdaO0uJwA5zD2h-0",
        "id": "c22"
      },
      {
        "drawio_id": "EsB4xGEdaO0uJwA5zD2h-1",
        "id": "c23"
      },
      {
        "drawio_id": "EsB4xGEdaO0uJwA5zD2h-2",
        "id": "c24"
      },
      {
        "drawio_id": "EsB4xGEdaO0uJwA5zD2h-3",
        "id": "c25"
      },
      {
        "drawio_id": "EsB4xGEdaO0uJwA5zD2h-4",
        "id": "c26"
      }
    ]
  }
]
```
what is the minimum amount of SWIPL code (or `jq` code) needed to replace all "parent", "source" and "target" drawio_ids with shorter ids as in the map?

---

Write SWIPL code that effectively does a recursive descent tree-walk of the JSON data.
Each "process" node generates a result string containing the text of the node.
Each "rhombus" node generates a result string that combines the string from the yes branch and the string from the no branch into a new string "[ <text of node> | yes: <yes branch string> | no: <no branch string> ]".
The input JSON data comes in on stdin and the resulting top-most string is printed on stdout.
