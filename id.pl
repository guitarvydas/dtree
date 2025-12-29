:- use_module(library(http/json)).
load_json(File, Data) :-
    open(File, read, Stream),
    json_read(Stream, Data),
    close(Stream).

save_json(File, Data) :-
    open(File, write, Stream),
    json_write(Stream, Data),
    close(Stream).

main :-
    load_json('out1.json', NewData),

    
