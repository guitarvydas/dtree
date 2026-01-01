# Decision Tree Walker - SWI-Prolog

## Overview

Recursively walks a decision tree from JSON and generates a string representation.

## Node Types

### Process Node

A simple action or step. Returns just the text.

```json
{
  "id": "n1",
  "type": "process",
  "value": "Take umbrella"
}
```

**Result:** `Take umbrella`

### Rhombus Node

A decision point with yes/no branches. Returns formatted string with both branches.

```json
{
  "id": "n1",
  "type": "rhombus",
  "value": "Is it raining?"
}
```

**Result:** `[ Is it raining? | yes: <yes_branch> | no: <no_branch> ]`

## Input Format

```json
[
  {
    "type": "diagram",
    "cells": [
      {"id": "n1", "type": "rhombus", "value": "Question?"},
      {"id": "n2", "type": "process", "value": "Action 1"},
      {"id": "n3", "type": "process", "value": "Action 2"},
      {"id": "e1", "source": "n1", "target": "n2", "value": "yes"},
      {"id": "e2", "source": "n1", "target": "n3", "value": "no"}
    ]
  }
]
```

## Usage

```bash
# Basic usage
cat tree.json | swipl tree_walk.pl

# Save to file
cat tree.json | swipl tree_walk.pl > output.txt

# Inline
swipl tree_walk.pl < tree.json
```

## Examples

### Example 1: Simple Decision

**Input:**

```json
[
  {
    "type": "diagram",
    "cells": [
      {"id": "n1", "type": "rhombus", "value": "Is it raining?"},
      {"id": "n2", "type": "process", "value": "Take umbrella"},
      {"id": "n3", "type": "process", "value": "Wear sunglasses"},
      {"id": "e1", "source": "n1", "target": "n2", "value": "yes"},
      {"id": "e2", "source": "n1", "target": "n3", "value": "no"}
    ]
  }
]
```

**Output:**

```
[ Is it raining? | yes: Take umbrella | no: Wear sunglasses ]
```

### Example 2: Nested Decisions

**Input:**

```json
[
  {
    "type": "diagram",
    "cells": [
      {"id": "n1", "type": "rhombus", "value": "Is it weekend?"},
      {"id": "n2", "type": "rhombus", "value": "Is it sunny?"},
      {"id": "n3", "type": "process", "value": "Go to work"},
      {"id": "n4", "type": "process", "value": "Go hiking"},
      {"id": "n5", "type": "process", "value": "Read a book"},
      {"id": "e1", "source": "n1", "target": "n2", "value": "yes"},
      {"id": "e2", "source": "n1", "target": "n3", "value": "no"},
      {"id": "e3", "source": "n2", "target": "n4", "value": "yes"},
      {"id": "e4", "source": "n2", "target": "n5", "value": "no"}
    ]
  }
]
```

**Output:**

```
[ Is it weekend? | yes: [ Is it sunny? | yes: Go hiking | no: Read a book ] | no: Go to work ]
```

### Example 3: Tree Visualization

```
                Is it weekend?
                /            \
              yes            no
              /                \
      Is it sunny?          Go to work
        /        \
      yes        no
      /            \
  Go hiking    Read a book
```

**Output:**

```
[ Is it weekend? | yes: [ Is it sunny? | yes: Go hiking | no: Read a book ] | no: Go to work ]
```

## How It Works

### 1. Read JSON from stdin

```prolog
json_read_dict(In, Data)
```

### 2. Extract diagram cells

```prolog
get_diagram_cells(Data, Cells)
```

### 3. Find root node

The root is the node with no incoming edges (no cell has it as a target).

```prolog
find_root(Cells, Root)
```

### 4. Recursive tree walk

```prolog
walk_tree(Node, Cells, Result)
```

For each node:

- **Process node:** Return the text
- **Rhombus node:**
    1. Find yes branch (edge with value="yes")
    2. Find no branch (edge with value="no")
    3. Recursively walk both branches
    4. Combine: `[ text | yes: yes_result | no: no_result ]`

### 5. Output result

```prolog
format('~w~n', [Result])
```

## Key Predicates

### walk_tree(Node, Cells, Result)

Main recursive predicate. Dispatches to appropriate handler based on node type.

### walk_by_type("process", Text, _Node, _Cells, Text)

Process nodes simply return their text.

### walk_by_type("rhombus", Text, Node, Cells, Result)

Rhombus nodes:

1. Find yes/no branches
2. Recursively walk each
3. Format result

### find_branch(SourceId, Label, Cells, TargetNode)

Finds the target node of an edge with a specific label ("yes" or "no").

### get_text(Node, Text)

Extracts text from node, trying fields: value, label, text.

## Edge Cases

- **Missing branches:** Code will fail if yes/no branch is missing
- **Multiple roots:** Uses first node found with no incoming edges
- **Unknown types:** Returns text directly
- **Empty text:** Returns empty string

## Extending

To add new node types, add clauses to `walk_by_type/5`:

```prolog
walk_by_type("my_type", Text, Node, Cells, Result) :-
    % Custom logic here
    format(atom(Result), 'Custom: ~w', [Text]),
    !.
```

## Testing

```bash
# Simple test
echo '[{"type":"diagram","cells":[{"id":"n1","type":"process","value":"Hello"}]}]' | swipl tree_walk.pl
# Output: Hello

# Decision test
cat sample_tree.json | swipl tree_walk.pl
# Output: [ Is it raining? | yes: Take umbrella | no: Wear sunglasses ]
```