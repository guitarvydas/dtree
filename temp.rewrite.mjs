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
Process : function (_at,proc,lb,param,rb,) {
enter_rule ("Process");
    set_return (`\n${proc.rwr ()} (${param.rwr ()})`);
return exit_rule ("Process");
},
Arg : function (lb,name,rb,) {
enter_rule ("Arg");
    set_return (`(${name.rwr ()})`);
return exit_rule ("Arg");
},
metaSymbol : function (_pct,name,) {
enter_rule ("metaSymbol");
    set_return (`${name.rwr ()}`);
return exit_rule ("metaSymbol");
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
name : function (letter,alnum,) {
enter_rule ("name");
    set_return (`${letter.rwr ()}${alnum.rwr ().join ('')}`);
return exit_rule ("name");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
