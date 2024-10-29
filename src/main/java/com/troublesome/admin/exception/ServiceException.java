package com.troublesome.admin.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.Setter;

@Getter()
@Setter()
public class ServiceException extends IllegalStateException {
  private String message;
  private HttpStatus statusCode;

  public ServiceException(String message, HttpStatus statusCode) {
    super();

    this.message = message;
    this.statusCode = statusCode;
  }
}
