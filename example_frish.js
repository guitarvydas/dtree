if (found_p) {
    if (incompilingstate_p) {
        if (foundimmediate_p) {
            exec(item)
        } else {
            compileword(item)
        }
        
    } else {
        exec(item)
    }
    
} else {
    if (incompilingstate_p) {
        if (isinteger(item)_p) {
            compileinteger(item)
        } else {
            if (isfloat(item)_p) {
                compilefloat(item)
            } else {
                returnFalse
            }
            
        }
        
    } else {
        if (isinteger(item)_p) {
            push_as_integer(item)
        } else {
            if (isfloat(item)_p) {
                push_as_float(item)
            } else {
                return_False
            }
            
        }
        
    }
    
}