% Usage Guide for querying Draw.io diagrams in SWI-Prolog
% =========================================================

% To use this file interactively in SWI-Prolog:
% 1. Start swipl: swipl
% 2. Load the file: ?- [query_diagrams].
% 3. Run queries as shown below

% EXAMPLE QUERIES:
% ================

% 1. Load and display all diagrams:
%    ?- load_diagrams('dtree-transmogrifier_drawio.json', Diagrams),
%       member(D, Diagrams), D = json(Props),
%       member(name=Name, Props),
%       format('Diagram: ~w~n', [Name]), fail ; true.

% 2. Get all children of "main" diagram:
%    ?- get_diagram_children_list('dtree-transmogrifier_drawio.json', main, Children).
%
%    Result: Children = [child(':$Â ./t2t dtree',6), child(':$Â ./t2t cleanup',10), ...]

% 3. Get all children of "ir" diagram:
%    ?- get_diagram_children_list('dtree-transmogrifier_drawio.json', ir, Children).

% 4. Find specific child by name in "main" diagram:
%    ?- load_diagrams('dtree-transmogrifier_drawio.json', Diagrams),
%       find_diagram(Diagrams, main, Diagram),
%       get_children(Diagram, Children),
%       member(Child, Children),
%       child_info(Child, 'Read Text File', Id).
%
%    Result: Id = 18

% 5. Count children in each diagram:
%    ?- load_diagrams('dtree-transmogrifier_drawio.json', Diagrams),
%       member(D, Diagrams), D = json(Props),
%       member(name=Name, Props),
%       member(children=Children, Props),
%       length(Children, Count),
%       format('~w has ~w children~n', [Name, Count]), fail ; true.

% 6. Query all diagrams and display results:
%    ?- query_all_diagrams('dtree-transmogrifier_drawio.json').

% 7. Find all children with a specific pattern in their name:
%    ?- load_diagrams('dtree-transmogrifier_drawio.json', Diagrams),
%       find_diagram(Diagrams, main, Diagram),
%       get_children(Diagram, Children),
%       member(Child, Children),
%       child_info(Child, Name, Id),
%       sub_string(Name, _, _, _, "jq"),
%       format('Found: ~w (ID: ~w)~n', [Name, Id]).

% INTERACTIVE SESSION EXAMPLE:
% ============================
% $ swipl
% ?- [query_diagrams].
% true.
%
% ?- get_diagram_children_list('dtree-transmogrifier_drawio.json', main, Children).
% Children = [child(':$Â ./t2t dtree', 6), child(':$Â ./t2t cleanup', 10), 
%             child(':$Â ./process_json_jq.bash', 14), child('Read Text File', 18), 
%             child(':$ jq .', 22), child(':$ jq .', 26)].
%
% ?- get_diagram_children_list('dtree-transmogrifier_drawio.json', ir, Children).
% Children = [child(':$ ./t2t2 dt dtfrish', 6), child(':$ ./t2t2 dt dtpython', 10), 
%             child('Read Text File', 14), child('Indent', 18), child('Indent', 22)].
