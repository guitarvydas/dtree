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
name : function (nameNoWs,nameWithWs,) {
enter_rule ("name");
    set_return (`${nameNoWs.rwr ()}${nameWithWs.rwr ().join ('')}`);
return exit_rule ("name");
},
nameWithWs : function (spaces,nameNoWs,) {
enter_rule ("nameWithWs");
    set_return (`_${nameNoWs.rwr ()}`);
return exit_rule ("nameWithWs");
},
nameNoWs : function (letter,cs,) {
enter_rule ("nameNoWs");
    set_return (`${letter.rwr ()}${cs.rwr ().join ('')}`);
return exit_rule ("nameNoWs");
},
nametail_alnum : function (c,) {
enter_rule ("nametail_alnum");
    set_return (`${c.rwr ()}`);
return exit_rule ("nametail_alnum");
},
nametail_other : function (c,) {
enter_rule ("nametail_other");
    set_return (`_`);
return exit_rule ("nametail_other");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
