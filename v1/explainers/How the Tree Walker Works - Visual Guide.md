# How the Tree Walker Works - Visual Guide

## The Recursive Process

### Example Tree

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

### Recursion Steps

```
Step 1: Start at root (Is it weekend?)
  Type: rhombus
  ↓
  Find yes branch → Is it sunny?
  Find no branch → Go to work

Step 2a: Process yes branch (Is it sunny?)
  Type: rhombus
  ↓
  Find yes branch → Go hiking
  Find no branch → Read a book

Step 3a: Process yes.yes (Go hiking)
  Type: process
  ↓
  Return: "Go hiking"

Step 3b: Process yes.no (Read a book)
  Type: process
  ↓
  Return: "Read a book"

Step 2a Result:
  Combine: [ Is it sunny? | yes: Go hiking | no: Read a book ]

Step 2b: Process no branch (Go to work)
  Type: process
  ↓
  Return: "Go to work"

Step 1 Result:
  Combine: [ Is it weekend? | yes: [ Is it sunny? | yes: Go hiking | no: Read a book ] | no: Go to work ]
```

## Call Stack Visualization

```
walk_tree(Is it weekend?)
  ├─ walk_tree(Is it sunny?)        [yes branch]
  │    ├─ walk_tree(Go hiking)      [yes branch]
  │    │    └─ return "Go hiking"
  │    ├─ walk_tree(Read a book)    [no branch]
  │    │    └─ return "Read a book"
  │    └─ return "[ Is it sunny? | yes: Go hiking | no: Read a book ]"
  │
  ├─ walk_tree(Go to work)           [no branch]
  │    └─ return "Go to work"
  │
  └─ return "[ Is it weekend? | yes: [ Is it sunny? | yes: Go hiking | no: Read a book ] | no: Go to work ]"
```

## Code Flow

### For Process Node

```prolog
walk_tree(Node, Cells, Result) :-
    Node.type = "process",
    Node.value = "Go hiking",
    Result = "Go hiking".        % Base case - just return text
```

### For Rhombus Node

```prolog
walk_tree(Node, Cells, Result) :-
    Node.type = "rhombus",
    Node.value = "Is it sunny?",
    
    % Find branches
    find_branch(Node.id, "yes", Cells, YesNode),    % → "Go hiking"
    find_branch(Node.id, "no", Cells, NoNode),      % → "Read a book"
    
    % Recurse (these call walk_tree again)
    walk_tree(YesNode, Cells, YesResult),           % → "Go hiking"
    walk_tree(NoNode, Cells, NoResult),             % → "Read a book"
    
    % Combine
    Result = "[ Is it sunny? | yes: Go hiking | no: Read a book ]".
```

## Edge Following

```
Cells:
  n1: {id: "n1", type: "rhombus", value: "Is it sunny?"}
  n2: {id: "n2", type: "process", value: "Go hiking"}
  n3: {id: "n3", type: "process", value: "Read a book"}
  e1: {source: "n1", target: "n2", value: "yes"}
  e2: {source: "n1", target: "n3", value: "no"}

find_branch("n1", "yes", Cells, YesNode):
  1. Find edge where source="n1" AND value="yes"  → e1
  2. Get target from e1  → "n2"
  3. Find node with id="n2"  → n2
  4. YesNode = {id: "n2", type: "process", value: "Go hiking"}
```

## Data Flow Diagram

```
Input JSON
    ↓
Read & Parse (json_read_dict)
    ↓
Extract Cells
    ↓
Find Root Node (no incoming edges)
    ↓
walk_tree(Root, Cells, Result)
    │
    ├─ if type = "process" → return text
    │
    └─ if type = "rhombus"
         ├─ find_branch(..., "yes", ..., YesNode)
         ├─ find_branch(..., "no", ..., NoNode)
         ├─ walk_tree(YesNode, ..., YesResult)  [RECURSE]
         ├─ walk_tree(NoNode, ..., NoResult)    [RECURSE]
         └─ format("[ text | yes: YesResult | no: NoResult ]")
    ↓
Output String
```

## Pattern Matching Example

### Finding Root

```prolog
% Get all targets
Targets = ["n2", "n3", "n4", "n5"]

% Find node not in Targets
Nodes = [n1, n2, n3, n4, n5]

member(n1, Nodes)  → n1.id = "n1"
\+ member("n1", Targets)  → true! ✓

Root = n1
```

### Following Edge

```prolog
% Looking for yes branch from n1

member(Edge, Cells)  → try e1: {source: "n1", target: "n2", value: "yes"}

Edge.source = "n1"  ✓
Edge.value = "yes"  ✓
Edge.target = "n2"  

% Now find node n2
member(Node, Cells)  → try n2: {id: "n2", type: "process", value: "Go hiking"}

Node.id = "n2"  ✓
is_node(Node)  → \+ has 'source' field  ✓

YesNode = {id: "n2", type: "process", value: "Go hiking"}
```

## Complete Example Trace

### Input

```json
{
  "cells": [
    {"id": "n1", "type": "rhombus", "value": "Q?"},
    {"id": "n2", "type": "process", "value": "A"},
    {"id": "n3", "type": "process", "value": "B"},
    {"source": "n1", "target": "n2", "value": "yes"},
    {"source": "n1", "target": "n3", "value": "no"}
  ]
}
```

### Execution

```
1. find_root(Cells, Root)
   → Root = n1 (no incoming edges)

2. walk_tree(n1, Cells, Result)
   → n1.type = "rhombus"
   → n1.value = "Q?"

3. find_branch("n1", "yes", Cells, YesNode)
   → YesNode = n2

4. find_branch("n1", "no", Cells, NoNode)
   → NoNode = n3

5. walk_tree(n2, Cells, YesResult)
   → n2.type = "process"
   → YesResult = "A"

6. walk_tree(n3, Cells, NoResult)
   → n3.type = "process"
   → NoResult = "B"

7. format(atom(Result), '[ ~w | yes: ~w | no: ~w ]', ["Q?", "A", "B"])
   → Result = "[ Q? | yes: A | no: B ]"

8. Output: [ Q? | yes: A | no: B ]
```

## Key Insights

1. **Base Case**: Process nodes stop recursion
2. **Recursive Case**: Rhombus nodes recurse on both branches
3. **Tree Structure**: Defined by edges (source → target)
4. **Edge Labels**: "yes" and "no" determine branch direction
5. **Root Finding**: Node with no incoming edges
6. **Text Extraction**: Tries value → label → text fields