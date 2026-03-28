/////// <pbp logging>
//const fs = require('fs');
//const path = require('path');
import * as path from 'path';

function pbplog(message) {
  const baseDir = process.env.PBPCALLER;
  if (!baseDir) throw new Error('PBPCALLER env var not set');
  
  const logFile = path.join(baseDir, 'pbplog.txt');
  fs.appendFileSync(logFile, `${message}\n`, 'utf8');
}

//fs.writeFileSync('/tmp/@pbplog.txt', new Date().toISOString() + '\n');
/////// </pbp logging>

let counter = 2;
let dict = {};

function newid (prefix) {
    let id = counter;
    let newname = `${prefix}${id}`;
    counter += 1;
    return `${newname}`;
}
function memoid (name, id) {
    dict [name] = id;
    return "";
}
function reset () {
    dict = {};
}

function fetchid (name) {
    let id = dict[name];
    if (id) {
	return id;
    } else {
	return name;
    }
}


function maptojson () {
    let s = "";
    for (let name in dict) {
	if (s !== "") {
	    s += ",";  // Add comma before appending
	}
	s += `\n"${name}":"${dict[name]}"`;
    }
    return `{${s}\n}`;
}

function maptopl () {
    let s = "";
    for (let name in dict) {
    	s += `\nid("${name}",${dict[name]}).`;
    }
    return `${s}\n`;
}

