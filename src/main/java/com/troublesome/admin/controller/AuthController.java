package com.troublesome.admin.controller;

import org.springframework.web.bind.annotation.RestController;

import com.troublesome.admin.dto.JwtDTO;
import com.troublesome.admin.dto.LoginDTO;
import com.troublesome.admin.service.AuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController("auth")
@RequiredArgsConstructor
public class AuthController {
  final private AuthService authService;

  @PostMapping("login")
  public JwtDTO postMethodName(@RequestBody LoginDTO loginDTO) {
    return this.authService.login(loginDTO);
  }

}
