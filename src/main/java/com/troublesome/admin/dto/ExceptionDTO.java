package com.troublesome.admin.dto;

import java.time.OffsetDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ExceptionDTO {
  private int statusCode;
  private String message;
  private OffsetDateTime timestamp;
}
