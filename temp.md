process_json_jq.bash:
```
#!/bin/bash

# Process JSON to modify edge kinds based on branchLabel cells
# Reads from stdin, writes to stdout

~/projects/pbp-dev/debug-vars "process_json_jq.bash"

jq '.[0].cells |= (
    # Step 1: Extract branchLabel parent mappings
    # Create a dictionary: {parent_id: branch_value}
    (map(select(.attributes.kind == "branchLabel")) | 
	 map({(.attributes.parent): .attributes.branch})) as $labelMap |
	
	# Step 2: Merge all mappings into one object
	($labelMap | add // {}) as $labels |
	
	# Step 3: Process each cell
	map(
	    # If this is an edge and has a branchLabel child, modify its kind
	    if (.attributes.kind == "edge") and ($labels[.attributes.drawio_id] != null) then
               .attributes.kind = (if $labels[.attributes.drawio_id] then "trueEdge" else "falseEdge" end)
	       else
		   .
		   end
	) |
	
	# Step 4: Remove all branchLabel cells
	map(select(.attributes.kind != "branchLabel"))
)'

```
junk2.json:
```
{
    "type":"diagram",
    "attributes":{
	"id":"d2",
	"name":"dtree",
	"drawio_id":"brDq65to_PZeKpkbbApS"
    },
    "cells":[
	{
	    "type":"cell",
	    "attributes":{
		"id":"c3",
		"drawio_id":"0"
	    }
	},
	{
	    "type":"cell",
	    "attributes":{
		"id":"c53",
		"drawio_id":"dRkQnjKu9n-pmXYVSlKa-9",
		"text":"%return False",
		"kind":"process",
		"parent":"1"
	    }
	}]
}
```
error:
```
$ cat /tmp/junk2.json | ./process_json_jq.bash

*****  process_json_jq.bash  *****
PBP = 
PBPWD = 
PBPCALLER = 
PYTHONPATH = 
*****

jq: error (at <stdin>:26): Cannot index object with number
$ 
```
