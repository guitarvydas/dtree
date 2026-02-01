def junk ():
    if found_q :
        if inCompilingState_q :
            if immediate_q :
                
                exec ()
            else: 
                
                compile_word ()
            
        else: 
            
            exec ()
        
    else: 
        if inCompilingState_q :
            if int_q :
                
                compile_int ()
            else: 
                if float_q :
                    
                    compile_float ()
                else: 
                    
                    error ()
                
            
        else: 
            if int_q :
                
                push_as_int ()
            else: 
                if float_q :
                    
                    push_as_float ()
                else: 
                    
                    error ()