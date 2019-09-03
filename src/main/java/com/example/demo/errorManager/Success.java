package com.example.demo.errorManager;

import java.util.Collections;

public class Success<S> implements IResult<Object, S> {

    private S value;
    @Override
    public S success() {
        return value;
    }

    public Success(S value) {
        this.value = value;
    }

    @Override
    public Object failure() {
        return Collections.emptyList();
    }

    public S getValue() {
        return value;
    }

    public void setValue(S value) {
        this.value = value;
    }
}
