package com.example.demo.errorManager;

public class Failure<F> implements IResult<Object, F> {
    private F failure;

    public Failure(F failure) {
        this.failure = failure;
    }

    @Override
    public Object success() {
        return null;
    }

    @Override
    public F failure() {
        return failure;
    }

    public F getFailure() {
        return failure;
    }

    public void setFailure(F failure) {
        this.failure = failure;
    }
}
