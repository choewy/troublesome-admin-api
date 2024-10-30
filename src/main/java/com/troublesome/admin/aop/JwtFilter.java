package com.troublesome.admin.aop;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.troublesome.admin.exception.ServiceException;
import com.troublesome.admin.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {
  private final JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    String authorization = request.getHeader("Authorization");

    if (authorization.equals(null) == true || authorization.startsWith("Bearer ") == false) {
      throw new ServiceException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    String accessToken = authorization.substring(7);

    if (this.jwtUtil.validateAccessToken(accessToken) == false) {
      throw new ServiceException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // TODO get admin profile by id
    // TODO set admin profile into request context authentication
    SecurityContextHolder.getContext().setAuthentication(null);

    filterChain.doFilter(request, response);
  }
}
