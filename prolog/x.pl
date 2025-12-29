:- use_module(library(http/json)).

load_diagrams(File, Diagrams) :-
    open(File, read, Stream),
    json_read(Stream, Diagrams),
    close(Stream).

test(Diagrams) :-
    load_diagrams('out1.json', Diagrams).
