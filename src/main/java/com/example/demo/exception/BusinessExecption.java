package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class BusinessExecption extends RuntimeException {

    private final String codeMessageApplicatif;
    private final HttpStatus httpStatus;


    /**
     * Construct a Bussiness Exception, with message for technical, CodeMessagApplicatif, and HttpStatus for this error
     * @param message
     * @param codeMessageApplicatif
     * @param httpStatus
     */
    public BusinessExecption(String message, String codeMessageApplicatif, HttpStatus httpStatus) {
        super(message);
        this.codeMessageApplicatif = codeMessageApplicatif;
        this.httpStatus = httpStatus;
    }

    /**
     * Construct a Bussiness Exception, with message for technical, CodeMessagApplicatif, and HttpStatus BAD_REQUEST
     * @param message
     * @param codeMessageApplicatif
     */
    public BusinessExecption(String message, String codeMessageApplicatif) {
        this(message,codeMessageApplicatif,HttpStatus.BAD_REQUEST);
    }
    public String getCodeMessageApplicatif() {
        return codeMessageApplicatif;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
