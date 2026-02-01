:- consult('query_diagrams.pl').

% Test 1: Get children of main diagram
test_main :-
    format('~n=== Children of MAIN diagram ===~n~n'),
    get_diagram_children_list('dtree-transmogrifier_drawio.json', main, Children),
    forall(member(child(Name, Id), Children),
           format('  ~w (ID: ~w)~n', [Name, Id])),
    length(Children, Count),
    format('~nTotal: ~w children~n', [Count]).

% Test 2: Get children of ir diagram
test_ir :-
    format('~n=== Children of IR diagram ===~n~n'),
    get_diagram_children_list('dtree-transmogrifier_drawio.json', ir, Children),
    forall(member(child(Name, Id), Children),
           format('  ~w (ID: ~w)~n', [Name, Id])),
    length(Children, Count),
    format('~nTotal: ~w children~n', [Count]).


% Run all tests
run_tests :-
    test_main,
    test_ir.

% Entry point
:- initialization(run_tests, main).
