Convert project to drawware. Create before and after jq optimization (out.0.json and out.1.json)
![](dtree-transmogrifier.drawio.png)
![](test.drawio.png)
A simple cross-check. Using the simple test diagram,
At first, there should be
	[x] 2 "process" nodes
	[x] 1 rhombus nodes
	[x] 2 edges
	[x] 2 branchLabels

OK on visual inspection.

---
After the jq optimization, there should be
	[x] 2 "process" nodes
	[x] 1 rhombus nodes
	[x] 1 falseEdge
	[x] 1 trueEdge

OK on visual inspection.

Note that there is 1 diagram node, and 2 parent nodes (0 and 1) in addition to the above. "Map" still contains nodes that have been optimized out (c6 and c8) - probably OK, but redundant.

---



![](xinterpret-dtree.drawio.png)
A simple cross-check. Using the full diagram,
At first, there should be
	[ x] 9 "process" nodes
	[ x] 8 rhombus nodes
	[ x] 16 edges
	[ x] 16 branchLabels

OK on visual inspection.

---
After the jq optimization, there should be
	[x] 9 "process" nodes
	[x] 8 rhombus nodes
	[x] 8 trueEdges
	[x] 8 falseEdges

OK on visual inspection.

