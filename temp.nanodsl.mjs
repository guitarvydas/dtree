'use strict'

import * as ohm from 'ohm-js';

let verbose = false;

function top (stack) { let v = stack.pop (); stack.push (v); return v; }

function set_top (stack, v) { stack.pop (); stack.push (v); return v; }

let return_value_stack = [];
let rule_name_stack = [];
let depth_prefix = ' ';

function enter_rule (name) {
    if (verbose) {
	console.error (depth_prefix, ["enter", name]);
	depth_prefix += ' ';
    }
    return_value_stack.push ("");
    rule_name_stack.push (name);
}

function set_return (v) {
    set_top (return_value_stack, v);
}

function exit_rule (name) {
    if (verbose) {
	depth_prefix = depth_prefix.substr (1);
	console.error (depth_prefix, ["exit", name]);
    }
    rule_name_stack.pop ();
    return return_value_stack.pop ()
}

const grammar = String.raw`
dt {
  Main = YesNo
  YesNo =
    | "[" metaSymbol Arg? YesBranch NoBranch "]" -- meta
    | "[" symbol     YesBranch NoBranch "]" -- expr

  YesBranch = "|" "yes" ":" (YesNo | Process)
  NoBranch = "|" "no" ":" (YesNo | Process)

  Process = 
    | "@"? processName Actual -- withactual
    | "@"? processName -- withoutactual
  Actual = "(" actual ")"

  Arg =  "(" actual ")"
  metaSymbol =
    | "%" name -- percent
    | name "?" -- question
  symbol = name
  actual = name
  processName = name
  name = letter (~"[" ~"]" ~"|" ~"yes" ~"no" ~"@" ~"(" ~")" ~"%" ~"?" any)*
}
`;

let args = {};
function resetArgs () {
    args = {};
}
function memoArg (name, accessorString) {
    args [name] = accessorString;
};
function fetchArg (name) {
    return args [name];
}

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

let parameters = {};
function pushParameter (name, v) {
    if (!parameters [name]) {
        parameters [name] = [];
    }
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    let top = parameters [name].pop ();
    parameters [name].push (top);
    return top;
}


let _rewrite = {

Main : function (YesNo,) {
enter_rule ("Main");
    set_return (`def junk ():⤷\n${YesNo.rwr ()}`);
return exit_rule ("Main");
},
YesNo_meta : function (lb,sym,arg,y,n,rb,) {
enter_rule ("YesNo_meta");
    set_return (`if ${sym.rwr ()} ${arg.rwr ().join ('')}:⤷${y.rwr ()}⤶\n else: ⤷${n.rwr ()}⤶\n`);
return exit_rule ("YesNo_meta");
},
YesNo_expr : function (lb,sym,y,n,rb,) {
enter_rule ("YesNo_expr");
    set_return (`if ${sym.rwr ()}:⤷${y.rwr ()}⤶\n else:⤷${n.rwr ()}⤶\n`);
return exit_rule ("YesNo_expr");
},
YesBranch : function (_or,_yes,_,x,) {
enter_rule ("YesBranch");
    set_return (`\n${x.rwr ()}`);
return exit_rule ("YesBranch");
},
NoBranch : function (_or,_no,_,x,) {
enter_rule ("NoBranch");
    set_return (`\n${x.rwr ()}`);
return exit_rule ("NoBranch");
},
Process_withactual : function (_at,proc,actual,) {
enter_rule ("Process_withactual");
    set_return (`\n${proc.rwr ()} ${actual.rwr ()}`);
return exit_rule ("Process_withactual");
},
Process_withoutactual : function (_at,proc,) {
enter_rule ("Process_withoutactual");
    set_return (`\n${proc.rwr ()} ()`);
return exit_rule ("Process_withoutactual");
},
Actual : function (lp,actual,rp,) {
enter_rule ("Actual");
    set_return (`(${actual.rwr ()})`);
return exit_rule ("Actual");
},
Arg : function (lb,name,rb,) {
enter_rule ("Arg");
    set_return (`(${name.rwr ()})`);
return exit_rule ("Arg");
},
metaSymbol_percent : function (_pct,name,) {
enter_rule ("metaSymbol_percent");
    set_return (`pct_${name.rwr ()}`);
return exit_rule ("metaSymbol_percent");
},
metaSymbol_question : function (name,_q,) {
enter_rule ("metaSymbol_question");
    set_return (`${name.rwr ()}_q`);
return exit_rule ("metaSymbol_question");
},
symbol : function (name,) {
enter_rule ("symbol");
    set_return (`${name.rwr ()}`);
return exit_rule ("symbol");
},
actual : function (name,) {
enter_rule ("actual");
    set_return (`${name.rwr ()}`);
return exit_rule ("actual");
},
processName : function (name,) {
enter_rule ("processName");
    set_return (`${name.rwr ()}`);
return exit_rule ("processName");
},
name : function (letter,cs,) {
enter_rule ("name");
    set_return (`${letter.rwr ()}${cs.rwr ().join ('')}`);
return exit_rule ("name");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
import * as fs from 'fs';

let terminated = false;

function xbreak () {
    terminated = true;
    return '';
}

function xcontinue () {
    terminated = false;
    return '';
}
    
function is_terminated () {
    return terminated;
}
function expand (src, parser) {
    let cst = parser.match (src);
    if (cst.failed ()) {
	//th  row Error (`${cst.message}\ngrammar=${grammarname (grammar)}\nsrc=\n${src}`);
	throw Error (cst.message);
    }
    let sem = parser.createSemantics ();
    sem.addOperation ('rwr', _rewrite);
    return sem (cst).rwr ();
}

function grammarname (s) {
    let n = s.search (/{/);
    return s.substr (0, n).replaceAll (/\n/g,'').trim ();
}

try {
    const argv = process.argv.slice(2);
    let srcFilename = argv[0];
    if ('-' == srcFilename) { srcFilename = 0 }
    let src = fs.readFileSync(srcFilename, 'utf-8');
    try {
	let parser = ohm.grammar (grammar);
	let s = src;
	xcontinue ();
	while (! is_terminated ()) {
	    xbreak ();
	    s = expand (s, parser);
	}
	console.log (s);
	process.exit (0);
    } catch (e) {
	//console.error (`${e}\nargv=${argv}\ngrammar=${grammarname (grammar)}\src=\n${src}`);
	console.error (`${e}\n\ngrammar = "${grammarname (grammar)}"`);
	process.exit (1);
    }
} catch (e) {
    console.error (`${e}\n\ngrammar = "${grammarname (grammar)}`);
    process.exit (1);
}

