package com.troublesome.admin.service;

import org.springframework.stereotype.Service;

import com.troublesome.admin.domain.Admin;
import com.troublesome.admin.dto.JwtDTO;
import com.troublesome.admin.dto.LoginDTO;
import com.troublesome.admin.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final AdminRepository adminRepository;

  public JwtDTO login(LoginDTO loginDTO) {
    return this.adminRepository.findByEmail(loginDTO.getEmail())
        .filter(entity -> this.validatePassword(entity.getPassword(), loginDTO.getPassword()))
        .map((entity) -> this.issueTokens(entity))
        .orElseThrow(() -> new IllegalStateException("Not Found Admin"));
  }

  private Boolean validatePassword(String adminPassword, String loginPassword) {
    // TODO

    return true;
  }

  private JwtDTO issueTokens(Admin admin) {
    return JwtDTO.builder()
        .accessToken(this.issueAccessToken(admin))
        .refreshToken(this.issueRefreshToken(admin))
        .build();
  }

  private String issueAccessToken(Admin admin) {
    // TODO

    return "accessToken";
  }

  private String issueRefreshToken(Admin admin) {
    // TODO

    return "refreshToken";
  }
}
