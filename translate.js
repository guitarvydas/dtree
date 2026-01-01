#!/usr/bin/env node
const fs = require('fs');

function translateIds(data) {
    // Build lookup map from drawio_id to id
    const mapObj = data.find(item => item.map);
    if (!mapObj) throw new Error('No map object found in data');
    
    const lookup = {};
    mapObj.map.forEach(entry => {
        lookup[entry.drawio_id] = entry.id;
    });
    
    console.log(`Built lookup with ${mapObj.map.length} entries`);
    
    // Transform each diagram
    return data.map(item => {
        if (item.type !== "diagram") return item;
        
        console.log(`Translating diagram: ${item.attributes.name}`);
        
        return {
            ...item,
            cells: item.cells.map(cell => {
                const newCell = { ...cell };
                
                // Translate parent, source, target if they exist
                if (cell.parent && lookup[cell.parent]) {
                    newCell.parent = lookup[cell.parent];
                }
                if (cell.source && lookup[cell.source]) {
                    newCell.source = lookup[cell.source];
                }
                if (cell.target && lookup[cell.target]) {
                    newCell.target = lookup[cell.target];
                }
                
                return newCell;
            })
        };
    });
}

// Main execution
if (require.main === module) {
    const inputFile = process.argv[2] || '/home/claude/test_data.json';
    const outputFile = process.argv[3] || '/home/claude/js_result.json';
    
    console.log(`Reading from: ${inputFile}`);
    console.log(`Writing to: ${outputFile}\n`);
    
    try {
        const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        const result = translateIds(data);
        //fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
        console.log (JSON.stringify(result, null, 2));
        
        // Count translated cells
        const cellCount = result
            .filter(x => x.type === "diagram")
            .reduce((sum, d) => sum + d.cells.length, 0);
        
        console.log(`\n✓ Success! Translated ${cellCount} cells`);
        console.log(`Output written to: ${outputFile}`);
        
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

module.exports = { translateIds };
