# translateIds - Simple Visual Guide

## The Big Picture

```
┌─────────────────────────────────────────────────────────┐
│                    translateIds()                        │
│                                                          │
│  Input: [diagram1, diagram2, map_object]                │
│                                                          │
│  ┌────────────────────────────────────────────┐         │
│  │  PHASE 1: Build Lookup Table               │         │
│  │                                             │         │
│  │  map_object.map = [                        │         │
│  │    {drawio_id: "old1", id: "new1"},        │         │
│  │    {drawio_id: "old2", id: "new2"}         │         │
│  │  ]                                          │         │
│  │                   ↓                         │         │
│  │  lookup = {                                 │         │
│  │    "old1": "new1",                          │         │
│  │    "old2": "new2"                           │         │
│  │  }                                          │         │
│  └────────────────────────────────────────────┘         │
│                                                          │
│  ┌────────────────────────────────────────────┐         │
│  │  PHASE 2: Transform Diagrams               │         │
│  │                                             │         │
│  │  For each cell:                            │         │
│  │    parent: "old1" → lookup["old1"] → "new1"│         │
│  │    source: "old2" → lookup["old2"] → "new2"│         │
│  │                                             │         │
│  │  Keep map_object unchanged                 │         │
│  └────────────────────────────────────────────┘         │
│                                                          │
│  Output: [diagram1_transformed, diagram2_transformed,   │
│           map_object]                                    │
└─────────────────────────────────────────────────────────┘
```

## Core Operations Explained

### 1. Building the Lookup

```javascript
const mapObj = data.find(item => item.map);
// Find the object that has a "map" property

const lookup = {};
mapObj.map.forEach(entry => {
    lookup[entry.drawio_id] = entry.id;
});
// Create a dictionary: old_id → new_id
```

**Visual:**

```
Array of mappings        →    Object for fast lookup
[                              {
  {drawio_id: "A", id: "1"},     "A": "1",
  {drawio_id: "B", id: "2"}      "B": "2"
]                              }
```

### 2. The Spread Operator

```javascript
{
    ...item,
    cells: newCells
}
```

**Means:** Copy everything from `item`, but replace `cells`

**Visual:**

```
Original:                    Result:
{                           {
  type: "diagram",            type: "diagram",    ← Copied
  name: "d1",                 name: "d1",         ← Copied
  cells: [old]                cells: [new]        ← Replaced
}                           }
```

### 3. The OR Fallback

```javascript
lookup[cell.parent] || cell.parent
```

**Means:** Try lookup first, if undefined use original

**Visual:**

```
Case 1: Found in lookup
  lookup["A"] → "1"
  "1" || "A" → "1" ✓

Case 2: Not found
  lookup["unknown"] → undefined
  undefined || "unknown" → "unknown" ✓
```

## Data Flow

```
Input Cell:
{
  id: "c5",
  parent: "zTViIhP_tUskBqKQNT3X-46",
  source: "dRkQnjKu9n-pmXYVSlKa-5"
}
        ↓
Look up in table:
  lookup["zTViIhP_tUskBqKQNT3X-46"] = "c9"
  lookup["dRkQnjKu9n-pmXYVSlKa-5"] = "c10"
        ↓
Output Cell:
{
  id: "c5",
  parent: "c9",    ← Translated!
  source: "c10"    ← Translated!
}
```

## Processing Each Item

```
data.map(item => {...})

Item 1: Diagram
  type === "diagram" ✓
  → Transform cells
  → Return new diagram

Item 2: Diagram  
  type === "diagram" ✓
  → Transform cells
  → Return new diagram

Item 3: Map
  type !== "diagram" ✓
  → Return unchanged
```

## The Three Key Methods

### 1. `.find()` - Find one item

```javascript
array.find(item => item.map)
// Returns first item where item.map exists
```

### 2. `.forEach()` - Loop (no return value)

```javascript
array.forEach(item => {
    console.log(item);
});
// Just does something for each item
```

### 3. `.map()` - Transform all items

```javascript
array.map(item => item * 2)
// Returns new array with each item transformed
```

## Quick Reference

|Line|What It Does|
|---|---|
|`data.find(item => item.map)`|Find the map object|
|`lookup[entry.drawio_id] = entry.id`|Build lookup table|
|`data.map(item => {...})`|Transform each item|
|`if (item.type !== "diagram")`|Skip non-diagrams|
|`...item`|Copy all properties|
|`cells: item.cells.map(...)`|Transform all cells|
|`...cell`|Copy all cell properties|
|`lookup[cell.parent] \| cell.parent`|Translate or keep original|

## Summary in One Sentence

**"Build a translation dictionary from the map, then use it to replace old IDs with new IDs in every cell of every diagram."**

That's it!