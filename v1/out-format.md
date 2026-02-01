# Understanding out1.json as json() Functors in SWI-Prolog

## Top-Level Structure

Your JSON file becomes a **list of two elements** in Prolog:

```prolog
[
  json([...]),    % First element: the diagram object
  json([...])     % Second element: the map object
]
```

## First Element: The Diagram Object

```prolog
json([
  type = diagram,
  attributes = json([...]),    % Nested json() for the attributes object
  cells = [...]                % A list of json() terms
])
```

### Breaking it down layer by layer:

```
json([                                      ← Outer json() wrapper
  type = diagram,                           ← Simple key=value
  attributes = json([                       ← NESTED json() for sub-object
    id = d2,
    name = dtree,
    drawio_id = brDq65to_PZeKpkbbApS
  ]),
  cells = [                                 ← List of json() terms
    json([type=cell, attributes=json([...])]),   ← Each cell is json()
    json([type=cell, attributes=json([...])]),
    json([type=cell, attributes=json([...])]),
    ...
  ]
])
```

## Nested json() Example: A Single Cell

One cell from the `cells` array:

```prolog
json([
  type = cell,
  attributes = json([           ← Another nested json()!
    id = c5,
    drawio_id = 'zTViIhP_tUskBqKQNT3X-42',
    parent = '1',
    source = 'zTViIhP_tUskBqKQNT3X-46',
    target = 'dRkQnjKu9n-pmXYVSlKa-6',
    kind = falseEdge
  ])
])
```

## Second Element: The Map Object

```prolog
json([
  map = [                       ← The map field contains a list
    json([                      ← Each mapping is a json() term
      drawio_id = '0',
      id = c3
    ]),
    json([
      drawio_id = '1',
      id = c4
    ]),
    json([
      drawio_id = brDq65to_PZeKpkbbApS,
      id = d2
    ]),
    ...
  ]
])
```

## The Pattern: json() Nesting

Notice how `json()` can be nested multiple levels deep:

```
Level 1: json([type=diagram, attributes=..., cells=...])
           │                     │            │
Level 2:   └──────────────json([...])     [json([...]), json([...]), ...]
                                              │
Level 3:                            json([type=cell, attributes=...])
                                                           │
Level 4:                                        json([id=..., drawio_id=...])
```

## Accessing the Data

### Get the diagram attributes:

```prolog
Data = [First|_],                      % Get first element
First = json(Props),                   % Unwrap outer json()
member(attributes=Attrs, Props),       % Get attributes field
Attrs = json(AttrProps),               % Unwrap attributes json()
member(name=Name, AttrProps).          % Name = dtree
```

### Get all cells:

```prolog
Data = [First|_],
First = json(Props),
member(cells=Cells, Props).            % Cells = [json([...]), ...]
```

### Get info from a specific cell:

```prolog
member(Cell, Cells),                   % Pick a cell
Cell = json(CellProps),                % Unwrap cell json()
member(type=Type, CellProps),          % Type = cell
member(attributes=CellAttrs, CellProps), % Get attributes
CellAttrs = json(CellAttrProps),       % Unwrap attributes json()
member(id=Id, CellAttrProps),          % Get the id
member(kind=Kind, CellAttrProps).      % Get the kind
```

### Find a cell by id:

```prolog
member(Cell, Cells),
Cell = json(CellProps),
member(attributes=Attrs, CellProps),
Attrs = json(AttrProps),
member(id=c5, AttrProps).              % Find cell with id=c5
```

### Get the map entries:

```prolog
Data = [_, Second],                    % Get second element
Second = json(SecondProps),            % Unwrap json()
member(map=MapEntries, SecondProps).   % MapEntries = [json([...]), ...]
```

## Key Observations

### 1. Objects become json([...])
Every JSON object `{...}` becomes `json([key=value, ...])`

### 2. Arrays become lists
JSON arrays `[...]` become regular Prolog lists `[...]`
BUT: if the array contains objects, each object is a `json(...)` term

### 3. Nested objects = nested json()
```json
{"attributes": {"id": "c5"}}
```
becomes:
```prolog
attributes = json([id=c5])
```

### 4. The unwrapping pattern
Every time you encounter a `json([...])`, you need to:
1. Bind it to a variable
2. Pattern match: `json(Props)`
3. Use `member/2` to access properties

## Complete Example Query

Find all cells that have a "kind" attribute:

```prolog
% Load the file
load_diagrams('out1.json', Data),

% Get the diagram
Data = [Diagram|_],
Diagram = json(DiagramProps),

% Get the cells
member(cells=Cells, DiagramProps),

% For each cell...
member(Cell, Cells),
Cell = json(CellProps),
member(attributes=Attrs, CellProps),
Attrs = json(AttrProps),

% ...that has a kind attribute
member(kind=Kind, AttrProps),
member(id=Id, AttrProps),

% Display it
format('Cell ~w has kind: ~w~n', [Id, Kind]).
```

Result:
```
Cell c5 has kind: falseEdge
Cell c7 has kind: trueEdge
Cell c9 has kind: rhombus
Cell c10 has kind: process
Cell c11 has kind: process
```

## Visual Summary

```
Your JSON:
{                              →  json([
  "type": "diagram",           →    type=diagram,
  "attributes": {              →    attributes=json([
    "id": "d2"                 →      id=d2
  },                           →    ]),
  "cells": [                   →    cells=[
    {                          →      json([
      "type": "cell",          →        type=cell,
      "attributes": {          →        attributes=json([
        "id": "c3"             →          id=c3
      }                        →        ])
    }                          →      ])
  ]                            →    ]
}                              →  ])
```

The `json()` functor appears **at every level** where there's a JSON object `{...}` 
