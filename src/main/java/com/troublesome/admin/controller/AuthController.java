package com.troublesome.admin.controller;

import org.springframework.web.bind.annotation.RestController;

import com.troublesome.admin.dto.JwtDTO;
import com.troublesome.admin.dto.LoginDTO;
import com.troublesome.admin.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthController {
  final private AuthService authService;

  @PostMapping("login")
  public ResponseEntity<JwtDTO> postMethodName(@RequestBody LoginDTO loginDTO) {
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(this.authService.login(loginDTO));
  }
}
