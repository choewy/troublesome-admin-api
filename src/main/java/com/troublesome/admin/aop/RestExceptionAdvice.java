package com.troublesome.admin.aop;

import java.util.Date;
import java.time.ZoneOffset;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.troublesome.admin.dto.ExceptionDTO;
import com.troublesome.admin.exception.ServiceException;

@RestControllerAdvice
public class RestExceptionAdvice extends ResponseEntityExceptionHandler {

  @ExceptionHandler(ServiceException.class)
  public ResponseEntity<ExceptionDTO> handleCustomException(ServiceException exception) {
    ExceptionDTO exceptionDTO = ExceptionDTO.builder()
        .statusCode(exception.getStatusCode().value())
        .message(exception.getMessage())
        .timestamp(new Date().toInstant().atOffset(ZoneOffset.UTC))
        .build();

    return ResponseEntity
        .status(exceptionDTO.getStatusCode())
        .body(exceptionDTO);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ExceptionDTO> handleGenericException(Exception exception) {
    ExceptionDTO exceptionDTO = ExceptionDTO.builder()
        .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
        .message(exception.getMessage())
        .timestamp(new Date().toInstant().atOffset(ZoneOffset.UTC))
        .build();

    return ResponseEntity
        .status(exceptionDTO.getStatusCode())
        .body(exceptionDTO);
  }
}
