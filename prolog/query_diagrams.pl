:- use_module(library(http/json)).

% Load the JSON file and parse it
load_diagrams(File, Diagrams) :-
    open(File, read, Stream),
    json_read(Stream, Diagrams),
    close(Stream).

% Find a diagram by name
find_diagram(Diagrams, DiagramName, Diagram) :-
    member(Diagram, Diagrams),
    Diagram = json(Props),
    member(name=DiagramName, Props).

% Get all children of a diagram
get_children(json(Props), Children) :-
    member(children=Children, Props).

% Extract name and id from a child
child_info(json(Props), Name, Id) :-
    member(name=Name, Props),
    member(id=Id, Props).

% Query to find all children of a specific diagram
query_diagram_children(DiagramsFile, DiagramName) :-
    load_diagrams(DiagramsFile, Diagrams),
    find_diagram(Diagrams, DiagramName, Diagram),
    get_children(Diagram, Children),
    format('~nChildren of diagram "~w":~n', [DiagramName]),
    format('~w~n', ['=' * 50]),
    forall(
        (member(Child, Children),
         child_info(Child, Name, Id)),
        format('Name: ~w~nID: ~w~n~n', [Name, Id])
    ).

% Query both diagrams
query_all_diagrams(DiagramsFile) :-
    query_diagram_children(DiagramsFile, main),
    query_diagram_children(DiagramsFile, ir).

% Alternative: Get children as a list of name-id pairs
get_diagram_children_list(DiagramsFile, DiagramName, ChildrenList) :-
    load_diagrams(DiagramsFile, Diagrams),
    find_diagram(Diagrams, DiagramName, Diagram),
    get_children(Diagram, Children),
    findall(
        child(Name, Id),
        (member(Child, Children), child_info(Child, Name, Id)),
        ChildrenList
    ).
