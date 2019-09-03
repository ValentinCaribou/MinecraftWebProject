package com.example.demo.errorManager;

public interface IResult<S, F> {

    S success();
    Object failure();
}
