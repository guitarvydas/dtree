:- use_module(library(http/json)).

save_json(File, Data) :-
    open(File, write, Stream),
    json_write(Stream, Data),
    close(Stream).
read_json_dict(File, Data) :-
    open(File, read, Stream),
    json_read_dict(Stream, Data),
    close(Stream).

falseEdge(c5).
source(c5,c9).
target(c5,c11).


pt:-
    %% json_write(current_output, point{x:1,y:2}).
    %% falseEdge(ID),
    %% source(ID,S),
    %% target(ID,T),
    %% D=cell{id:ID,source:S,target:T},
    %% D = point{x:1,y:2},
    %% D=cell{
    %% 	  id: c5,
    %% 	  drawio_id: "zTViIhP_tUskBqKQNT3X-42",
    %% 	  parent: 1,
    %% 	  source: "zTViIhP_tUskBqKQNT3X-46",
    %% 	  target: "dRkQnjKu9n-pmXYVSlKa-6",
    %% 	  kind: falseEdge
    %%   },
    read_json_dict('out3.json',E),
    json_write(current_output, E).
    %% save_json('out2.json',D).

		     
