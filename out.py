def junk ():
    if found:
        if inCompilationState :
            if foundImmediate:
                
                exec (xt)
            else:
                
                compile (xt)
            
        else: 
            
            exec (xt)
        
    else:
        if inCompilationState :
            if isInteger (word):
                
                compileInteger (word)
            else: 
                if isFloat (word):
                    
                    compileFloat (word)
                else: 
                    
                    error (word)
                
            
        else: 
            if isInteger (word):
                
                pushInt (word)
            else: 
                if isFloat (word):
                    
                    pushFloat (word)
                else: 
                    
                    error (word)