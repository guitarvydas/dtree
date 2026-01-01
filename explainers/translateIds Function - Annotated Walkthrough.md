# translateIds Function - Annotated Walkthrough

## The Function with Line Numbers

```javascript
1  function translateIds(data) {
2      // Build lookup
3      const mapObj = data.find(item => item.map);
4      const lookup = {};
5      mapObj.map.forEach(entry => {
6          lookup[entry.drawio_id] = entry.id;
7      });
8      
9      // Transform
10     return data.map(item => {
11         if (item.type !== "diagram") return item;
12         
13         return {
14             ...item,
15             cells: item.cells.map(cell => ({
16                 ...cell,
17                 parent: lookup[cell.parent] || cell.parent,
18                 source: lookup[cell.source] || cell.source,
19                 target: lookup[cell.target] || cell.target
20             }))
21         };
22     });
23 }
```

## Execution Trace with Real Data

### Input

```javascript
data = [
  {
    type: "diagram",
    attributes: {id: "d1"},
    cells: [
      {id: "c5", parent: "1", source: "xyz-46", target: "abc-6"}
    ]
  },
  {
    map: [
      {drawio_id: "1", id: "c4"},
      {drawio_id: "xyz-46", id: "c9"},
      {drawio_id: "abc-6", id: "c11"}
    ]
  }
]
```

### Line-by-Line Execution

---

**Line 3:** `const mapObj = data.find(item => item.map);`

```
Testing each item:
  data[0] → {type: "diagram", ...} → has .map property? NO
  data[1] → {map: [...]} → has .map property? YES! ✓

Result:
  mapObj = {
    map: [
      {drawio_id: "1", id: "c4"},
      {drawio_id: "xyz-46", id: "c9"},
      {drawio_id: "abc-6", id: "c11"}
    ]
  }
```

---

**Line 4:** `const lookup = {};`

```
Create empty object:
  lookup = {}
```

---

**Lines 5-7:** Build the lookup table

```javascript
mapObj.map.forEach(entry => {
    lookup[entry.drawio_id] = entry.id;
});
```

**Iteration 1:**

```
entry = {drawio_id: "1", id: "c4"}
lookup["1"] = "c4"

lookup = {"1": "c4"}
```

**Iteration 2:**

```
entry = {drawio_id: "xyz-46", id: "c9"}
lookup["xyz-46"] = "c9"

lookup = {
  "1": "c4",
  "xyz-46": "c9"
}
```

**Iteration 3:**

```
entry = {drawio_id: "abc-6", id: "c11"}
lookup["abc-6"] = "c11"

lookup = {
  "1": "c4",
  "xyz-46": "c9",
  "abc-6": "c11"
}
```

✓ **Lookup table complete!**

---

**Line 10:** `return data.map(item => {...})`

Now we process EACH item in the data array.

### Processing Item 0 (Diagram)

**Line 11:** `if (item.type !== "diagram") return item;`

```
item = {type: "diagram", attributes: {...}, cells: [...]}
item.type = "diagram"
"diagram" !== "diagram" ? NO

So we DON'T return early, we continue to line 13
```

**Lines 13-21:** Transform the diagram

```javascript
return {
    ...item,
    cells: item.cells.map(cell => ({...}))
};
```

**Line 14:** `...item` spreads all properties:

```
Starting with:
{
  type: "diagram",
  attributes: {id: "d1"},
  cells: [...]  ← This will be REPLACED
}
```

**Line 15:** Transform each cell

```javascript
cells: item.cells.map(cell => ({...}))
```

The diagram has 1 cell:

```
cell = {id: "c5", parent: "1", source: "xyz-46", target: "abc-6"}
```

**Line 16:** `...cell` spreads all cell properties:

```
Starting with:
{
  id: "c5",
  parent: "1",         ← Will be REPLACED
  source: "xyz-46",    ← Will be REPLACED
  target: "abc-6"      ← Will be REPLACED
}
```

**Line 17:** `parent: lookup[cell.parent] || cell.parent`

```
cell.parent = "1"
lookup["1"] = "c4"

lookup[cell.parent] || cell.parent
    ↓
lookup["1"] || "1"
    ↓
"c4" || "1"
    ↓
"c4"  ✓ (first truthy value)

Result: parent: "c4"
```

**Line 18:** `source: lookup[cell.source] || cell.source`

```
cell.source = "xyz-46"
lookup["xyz-46"] = "c9"

lookup["xyz-46"] || "xyz-46"
    ↓
"c9" || "xyz-46"
    ↓
"c9"  ✓

Result: source: "c9"
```

**Line 19:** `target: lookup[cell.target] || cell.target`

```
cell.target = "abc-6"
lookup["abc-6"] = "c11"

lookup["abc-6"] || "abc-6"
    ↓
"c11" || "abc-6"
    ↓
"c11"  ✓

Result: target: "c11"
```

**Transformed cell:**

```javascript
{
  id: "c5",
  parent: "c4",     // ← Translated!
  source: "c9",     // ← Translated!
  target: "c11"     // ← Translated!
}
```

**Transformed diagram:**

```javascript
{
  type: "diagram",
  attributes: {id: "d1"},
  cells: [
    {id: "c5", parent: "c4", source: "c9", target: "c11"}
  ]
}
```

### Processing Item 1 (Map)

**Line 11:** `if (item.type !== "diagram") return item;`

```
item = {map: [...]}
item.type = undefined
undefined !== "diagram" ? YES ✓

Return item unchanged
```

**Result:**

```javascript
{
  map: [
    {drawio_id: "1", id: "c4"},
    {drawio_id: "xyz-46", id: "c9"},
    {drawio_id: "abc-6", id: "c11"}
  ]
}
```

---

## Final Return Value

**Line 10-22** returns the transformed array:

```javascript
[
  {
    type: "diagram",
    attributes: {id: "d1"},
    cells: [
      {id: "c5", parent: "c4", source: "c9", target: "c11"}
    ]
  },
  {
    map: [
      {drawio_id: "1", id: "c4"},
      {drawio_id: "xyz-46", id: "c9"},
      {drawio_id: "abc-6", id: "c11"}
    ]
  }
]
```

## What Changed?

### Before:

```javascript
{id: "c5", parent: "1", source: "xyz-46", target: "abc-6"}
```

### After:

```javascript
{id: "c5", parent: "c4", source: "c9", target: "c11"}
```

**All the long IDs were translated to short IDs!** ✓

## Memory State Throughout Execution

```
Start:
  data = [diagram, map]
  
After line 3:
  mapObj = {map: [...]}
  
After line 4:
  lookup = {}
  
After line 7:
  lookup = {"1": "c4", "xyz-46": "c9", "abc-6": "c11"}
  
After line 22:
  return [transformed_diagram, unchanged_map]
```

## Key Insights

1. **Two phases:** Build lookup, then transform
2. **Non-destructive:** Creates new objects, doesn't modify originals
3. **Safe fallback:** If ID not in lookup, keeps original
4. **Preserves structure:** Map object passes through unchanged
5. **Functional style:** Uses `.map()` instead of loops

That's the complete execution trace!