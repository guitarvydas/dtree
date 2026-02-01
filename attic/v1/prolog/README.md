# SWI-Prolog Queries for Draw.io JSON Files

This solution provides SWI-Prolog predicates to query Draw.io diagram files exported as JSON.

## Files Created

1. **query_diagrams.pl** - Main query predicates
2. **USAGE_GUIDE.pl** - Interactive examples and usage patterns
3. **test_queries.pl** - Automated test script

## Core Predicates

### `load_diagrams(File, Diagrams)`
Loads and parses a JSON file containing Draw.io diagrams.

**Example:**
```prolog
?- load_diagrams('dtree-transmogrifier_drawio.json', Diagrams).
```

### `find_diagram(Diagrams, DiagramName, Diagram)`
Finds a specific diagram by name from the loaded diagrams.

**Example:**
```prolog
?- load_diagrams('file.json', Diagrams),
   find_diagram(Diagrams, main, MainDiagram).
```

### `get_children(Diagram, Children)`
Extracts all children from a diagram.

**Example:**
```prolog
?- load_diagrams('file.json', Diagrams),
   find_diagram(Diagrams, main, Diagram),
   get_children(Diagram, Children).
```

### `child_info(Child, Name, Id)`
Extracts the name and ID from a child node.

**Example:**
```prolog
?- child_info(ChildNode, Name, Id).
```

### `query_diagram_children(File, DiagramName)`
Convenience predicate to display all children of a named diagram.

**Example:**
```prolog
?- query_diagram_children('file.json', main).
```

### `get_diagram_children_list(File, DiagramName, ChildrenList)`
Returns all children as a list of `child(Name, Id)` terms.

**Example:**
```prolog
?- get_diagram_children_list('file.json', main, Children).
Children = [child(':$ ./t2t dtree', 6), 
            child(':$ ./t2t cleanup', 10), ...].
```

## Your Specific Queries

### Query 1: Get all children of "main" diagram with names and IDs

```prolog
?- get_diagram_children_list('dtree-transmogrifier_drawio.json', main, Children).
```

**Result:**
```
Children = [
    child(':$ ./t2t dtree', 6),
    child(':$ ./t2t cleanup', 10),
    child(':$ ./process_json_jq.bash', 14),
    child('Read Text File', 18),
    child(':$ jq .', 22),
    child(':$ jq .', 26)
]
```

### Query 2: Get all children of "ir" diagram with names and IDs

```prolog
?- get_diagram_children_list('dtree-transmogrifier_drawio.json', ir, Children).
```

**Result:**
```
Children = [
    child(':$ ./t2t2 dt dtfrish', 6),
    child(':$ ./t2t2 dt dtpython', 10),
    child('Read Text File', 14),
    child('Indent', 18),
    child('Indent', 22)
]
```

## Alternative Query Patterns

### Pattern 1: Find children and iterate through them

```prolog
?- load_diagrams('file.json', Diagrams),
   find_diagram(Diagrams, main, Diagram),
   get_children(Diagram, Children),
   member(Child, Children),
   child_info(Child, Name, Id),
   format('Name: ~w, ID: ~w~n', [Name, Id]).
```

### Pattern 2: Find a specific child by name

```prolog
?- load_diagrams('file.json', Diagrams),
   find_diagram(Diagrams, main, Diagram),
   get_children(Diagram, Children),
   member(Child, Children),
   child_info(Child, 'Read Text File', Id).
```

### Pattern 3: Filter children by name pattern

```prolog
?- load_diagrams('file.json', Diagrams),
   find_diagram(Diagrams, main, Diagram),
   get_children(Diagram, Children),
   member(Child, Children),
   child_info(Child, Name, Id),
   sub_string(Name, _, _, _, "jq"),
   format('Found: ~w (ID: ~w)~n', [Name, Id]).
```

### Pattern 4: Count children in each diagram

```prolog
?- load_diagrams('file.json', Diagrams),
   member(D, Diagrams),
   D = json(Props),
   member(name=DName, Props),
   member(children=Children, Props),
   length(Children, Count),
   format('~w has ~w children~n', [DName, Count]),
   fail ; true.
```

## How to Use

### Command Line (One-off queries)

```bash
swipl -g "consult('query_diagrams.pl'), query_all_diagrams('file.json'), halt."
```

### Interactive Session

```bash
$ swipl
?- [query_diagrams].
true.

?- get_diagram_children_list('dtree-transmogrifier_drawio.json', main, Children).
Children = [child(':$ ./t2t dtree', 6), child(':$ ./t2t cleanup', 10), ...].

?- get_diagram_children_list('dtree-transmogrifier_drawio.json', ir, Children).
Children = [child(':$ ./t2t2 dt dtfrish', 6), child(':$ ./t2t2 dt dtpython', 10), ...].
```

### Using the Test Script

```bash
swipl test_queries.pl
```

This will display all children from both diagrams in a formatted output.

## Understanding the JSON Structure

The Draw.io JSON file has this structure:

```json
[
  {
    "name": "main",
    "children": [
      {"name": "...", "id": 6},
      {"name": "...", "id": 10}
    ],
    "connections": [...],
    "file": "..."
  },
  {
    "name": "ir",
    "children": [...],
    ...
  }
]
```

SWI-Prolog parses this as:

```prolog
[
  json([
    name=main,
    children=[json([name='...', id=6]), json([name='...', id=10])],
    connections=[...],
    file='...'
  ]),
  json([
    name=ir,
    children=[...],
    ...
  ])
]
```

## Notes

- The `\uFFFD` characters in the output are encoding issues from special characters (the "Â" bytes) in the original JSON - these don't affect the functionality
- The predicates work with SWI-Prolog's `json(...)` term format
- All predicates are deterministic when used correctly
- The code uses member/2 for list traversal and pattern matching for structure extraction
