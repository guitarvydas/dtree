```
inhale_json 'out-2.json' -> j

for each Obj in j {
  if Obj.type == "diagram" {
    let new_cells = []
    for each Cell in Obj.cells {
      id := Cell.id
      drawio_id := get_drawio_id (id)
	  if drawio_id == "0" { pass }
	  else if drawio_id == "1" { pass }
	  else {
        new_cell = {}
        for each Field in Cell {
               if Field == "parent" { new_cell.append ({"parent": get_id (Field.value)}) }
          else if Field == "source" { new_cell.append ({"source": get_id (Field.value)}) }
          else if Field == "target" { new_cell.append ({"target": get_id (Field.value)}) }
          else new_cell.append (Field)
		}
		new_cells.append (new_cell)
	  }
    }
	return {type: Obj.type, attributes: Obj.attributes, cells: new_cells}
  }
}

get_id (did) {
  let map := j.map
  return map.drawio_id [did]
}
get_drawio_id (id) {
  let map := j.map
  return map.id [id]
}

```
