if (found_p_) {
    if (%incompilingstate_p_) {
        if (foundimmediate_p_) {
            exec(item)_
        } else {
            compileword(item)_
        }
    } else {
        exec(item)_
    }
} else {
    if (%incompilingstate_p_) {
        if (%isinteger(item)_p_) {
            compileinteger(item)_
        } else {
            if (%isfloat(item)_p_) {
                compilefloat(item)_
            } else {
                %return_False_
            }
        }
    } else {
        if (%isinteger(item)_p_) {
            push_as_integer(item)_
        } else {
            if (%isfloat(item)_p_) {
                push_as_float(item)_
            } else {
                %return_False_
            }
        }
    }
}