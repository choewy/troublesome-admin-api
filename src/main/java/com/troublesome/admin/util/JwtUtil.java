package com.troublesome.admin.util;

import java.security.Key;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.troublesome.admin.domain.Admin;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
  private String appName;
  private String appDomain;
  private Key accessTokenSecretKey;
  private Key refreshTokenSecretKey;
  private long accessTokenExpirationSeconds;
  private long refreshTokenExpirationSeconds;

  public JwtUtil(
      @Value("${spring.application.name}") String appName,
      @Value("${spring.application.domain}") String appDomain,
      @Value("${jwt.access.secret}") String accessTokenSecret,
      @Value("${jwt.refresh.secret}") String refreshTokenSecret,
      @Value("${jwt.access.expiration-seconds}") long accessTokenExpirationSeconds,
      @Value("${jwt.refresh.expiration-seconds}") long refreshTokenExpirationSeconds) {
    this.appName = appName;
    this.appDomain = appDomain;
    this.accessTokenSecretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(accessTokenSecret));
    this.refreshTokenSecretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(refreshTokenSecret));
    this.accessTokenExpirationSeconds = accessTokenExpirationSeconds;
    this.refreshTokenExpirationSeconds = refreshTokenExpirationSeconds;
  }

  public String issueAccessToken(Admin admin) {
    Claims claims = Jwts.claims();

    claims.put("id", admin.getId());
    claims.put("email", admin.getEmail());
    claims.put("name", admin.getName());

    OffsetDateTime issuedAt = new Date().toInstant().atOffset(ZoneOffset.UTC);
    OffsetDateTime expiredAt = issuedAt.plusSeconds(this.accessTokenExpirationSeconds);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(Date.from(issuedAt.toInstant()))
        .setExpiration(Date.from(expiredAt.toInstant()))
        .setAudience(this.appName)
        .setIssuer(this.appDomain)
        .signWith(this.accessTokenSecretKey, SignatureAlgorithm.HS256)
        .compact();
  }

  public String issueRefreshToken(Admin admin) {
    Claims claims = Jwts.claims();

    claims.put("id", admin.getId());
    claims.put("email", admin.getEmail());
    claims.put("name", admin.getName());

    OffsetDateTime issuedAt = new Date().toInstant().atOffset(ZoneOffset.UTC);
    OffsetDateTime expiredAt = issuedAt.plusSeconds(this.refreshTokenExpirationSeconds);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(Date.from(issuedAt.toInstant()))
        .setExpiration(Date.from(expiredAt.toInstant()))
        .setAudience(this.appName)
        .setIssuer(this.appDomain)
        .signWith(this.refreshTokenSecretKey, SignatureAlgorithm.HS256)
        .compact();
  }

  public boolean validateAccessToken(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(this.accessTokenSecretKey)
          .build()
          .parseClaimsJws(token);

      return true;
    } catch (ExpiredJwtException e) {
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public Claims getAccessTokenClaims(String token) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(this.accessTokenSecretKey)
          .build()
          .parseClaimsJws(token)
          .getBody();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }

  public boolean validateRefreshToken(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(this.accessTokenSecretKey)
          .build()
          .parseClaimsJws(token);

      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public Claims getRefreshTokenClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(this.refreshTokenSecretKey)
        .build()
        .parseClaimsJws(token)
        .getBody();
  }
}
