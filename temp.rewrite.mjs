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

Main : function (choice,) {
enter_rule ("Main");
    set_return (`${choice.rwr ()}`);
return exit_rule ("Main");
},
Choice : function (lb,pred,or1,yes,colon1,yesbranch,or2,no,colon2,nobranch,rb,) {
enter_rule ("Choice");
    set_return (`if (${pred.rwr ()}) {⤷\n${yesbranch.rwr ()}⤶\n} else {⤷\n${nobranch.rwr ()}⤶\n}\n`);
return exit_rule ("Choice");
},
Branch : function (x,) {
enter_rule ("Branch");
    set_return (`${x.rwr ()}`);
return exit_rule ("Branch");
},
Predicate : function (function_call,) {
enter_rule ("Predicate");
    set_return (`${function_call.rwr ()}`);
return exit_rule ("Predicate");
},
Action : function (function_call,) {
enter_rule ("Action");
    set_return (`${function_call.rwr ()}`);
return exit_rule ("Action");
},
function_call : function (cs,) {
enter_rule ("function_call");
    set_return (`${cs.rwr ().join ('')}`);
return exit_rule ("function_call");
},
char_newline : function (_,) {
enter_rule ("char_newline");
    set_return (`_`);
return exit_rule ("char_newline");
},
char_questionmark : function (_,) {
enter_rule ("char_questionmark");
    set_return (``);
return exit_rule ("char_questionmark");
},
char_percent : function (_,) {
enter_rule ("char_percent");
    set_return (`%`);
return exit_rule ("char_percent");
},
char_begindiv : function (_,) {
enter_rule ("char_begindiv");
    set_return (``);
return exit_rule ("char_begindiv");
},
char_enddiv : function (_,) {
enter_rule ("char_enddiv");
    set_return (``);
return exit_rule ("char_enddiv");
},
char_beginspan : function (lb,cs,rb,) {
enter_rule ("char_beginspan");
    set_return (``);
return exit_rule ("char_beginspan");
},
char_endspan : function (_,) {
enter_rule ("char_endspan");
    set_return (``);
return exit_rule ("char_endspan");
},
char_at : function (_,) {
enter_rule ("char_at");
    set_return (`@`);
return exit_rule ("char_at");
},
char_space : function (_,) {
enter_rule ("char_space");
    set_return (``);
return exit_rule ("char_space");
},
char_nonbreakingspace : function (_,) {
enter_rule ("char_nonbreakingspace");
    set_return (``);
return exit_rule ("char_nonbreakingspace");
},
char_other : function (c,) {
enter_rule ("char_other");
    set_return (`${c.rwr ()}`);
return exit_rule ("char_other");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
