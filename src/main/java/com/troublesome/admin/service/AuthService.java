package com.troublesome.admin.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.troublesome.admin.dto.JwtDTO;
import com.troublesome.admin.dto.LoginDTO;
import com.troublesome.admin.exception.ServiceException;
import com.troublesome.admin.repository.AdminRepository;
import com.troublesome.admin.util.JwtUtil;
import com.troublesome.admin.util.PasswordUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final PasswordUtil passwordUtil;
  private final JwtUtil jwtUtil;
  private final AdminRepository adminRepository;

  public JwtDTO login(LoginDTO loginDTO) {
    return this.adminRepository.findAdminByEmail(loginDTO.getEmail())
        .filter(admin -> this.passwordUtil.matches(loginDTO.getPassword(), admin.getPassword()))
        .map((admin) -> JwtDTO.builder()
            .accessToken(this.jwtUtil.issueAccessToken(admin))
            .refreshToken(this.jwtUtil.issueRefreshToken(admin))
            .build())
        .orElseThrow(() -> new ServiceException("Unauthorized", HttpStatus.UNAUTHORIZED));
  }
}
