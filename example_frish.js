if (found_p ()) {
    if (incompilingstate()_p ()) {
        if (foundimmediate_p ()) {
            return exec(item);
        } else {
            return compileword(item);
        }
        
    } else {
        return exec(item);
    }
    
} else {
    if (incompilingstate()_p ()) {
        if (isinteger(item)_p ()) {
            return compileinteger(item);
        } else {
            if (isfloat(item)_p ()) {
                return compilefloat(item);
            } else {
                return returnFalse;
            }
            
        }
        
    } else {
        if (isinteger(item)_p ()) {
            return pushasinteger(item);
        } else {
            if (isfloat(item)_p ()) {
                return pushasfloat(item);
            } else {
                return returnFalse;
            }
            
        }
        
    }
    
}