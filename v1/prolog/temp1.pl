:- use_module(library(http/json)).

read_json_dict(File, Data) :-
    open(File, read, Stream),
    json_read_dict(Stream, Data),
    close(Stream).


pt:-
    read_json_dict('out1.json',E),
    json_write(current_output, E).

		     
