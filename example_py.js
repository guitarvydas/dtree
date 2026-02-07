if (found ()) {
    if (incompilingstate ()) {
        if (foundimmediate ()) {
            return exec(item);
        } else {
            return compileword(item);
        }
        
    } else {
        return exec(item);
    }
    
} else {
    if (incompilingstate ()) {
        if (isinteger(item) ()) {
            return compileinteger(item);
        } else {
            if (isfloat(item) ()) {
                return compilefloat(item);
            } else {
                return fail();
            }
            
        }
        
    } else {
        if (isinteger(item) ()) {
            return pushasinteger(item);
        } else {
            if (isfloat(item) ()) {
                return pushasfloat(item);
            } else {
                return fail();
            }
            
        }
        
    }
    
}