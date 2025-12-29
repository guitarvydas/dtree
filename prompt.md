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
