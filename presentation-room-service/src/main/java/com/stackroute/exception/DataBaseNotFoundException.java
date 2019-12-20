package com.stackroute.exception;

public class DataBaseNotFoundException extends Exception {
    private String message;
    public DataBaseNotFoundException(){};

    public DataBaseNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
