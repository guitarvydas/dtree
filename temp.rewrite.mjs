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

main : function (cs,) {
enter_rule ("main");
    set_return (`${cs.rwr ().join ('')}`);
return exit_rule ("main");
},
char_commanlbrace : function (_,) {
enter_rule ("char_commanlbrace");
    set_return (`\n}`);
return exit_rule ("char_commanlbrace");
},
char_commabrace : function (_,) {
enter_rule ("char_commabrace");
    set_return (`}`);
return exit_rule ("char_commabrace");
},
char_bracecommabracket : function (_,) {
enter_rule ("char_bracecommabracket");
    set_return (`}]`);
return exit_rule ("char_bracecommabracket");
},
char_c : function (c,) {
enter_rule ("char_c");
    set_return (`${c.rwr ()}`);
return exit_rule ("char_c");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
