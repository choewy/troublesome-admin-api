package com.troublesome.admin;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import com.troublesome.admin.domain.Admin;
import com.troublesome.admin.repository.AdminRepository;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TroublesomeAdminApiApplicationListener implements ApplicationListener<ApplicationReadyEvent> {
  final private AdminRepository adminRepository;

  @Override
  public void onApplicationEvent(@NonNull ApplicationReadyEvent event) {
    Admin admin = Admin
        .builder()
        .email("admin@troublesome.com")
        .name("시스템관리자")
        .isRoot(true)
        .build();

    this.adminRepository.findByEmail(admin.getEmail()).ifPresentOrElse((entity) -> {
    }, () -> {
      this.adminRepository.save(admin.setPassword("password"));
    });
  }
}
