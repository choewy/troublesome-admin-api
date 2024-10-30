package com.troublesome.admin;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import com.troublesome.admin.domain.Admin;
import com.troublesome.admin.repository.AdminRepository;
import com.troublesome.admin.util.PasswordUtil;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TroublesomeAdminApiApplicationListener implements ApplicationListener<ApplicationReadyEvent> {
  final private PasswordUtil passwordUtil;
  final private AdminRepository adminRepository;

  @Override
  public void onApplicationEvent(@NonNull ApplicationReadyEvent event) {
    Admin admin = Admin
        .builder()
        .email("admin@troublesome.com")
        .name("시스템관리자")
        .isRoot(true)
        .build();

    this.adminRepository.findAdminByEmail(admin.getEmail()).ifPresentOrElse((entity) -> {
    }, () -> {
      admin.setPassword(this.passwordUtil.encode("password"));

      this.adminRepository.save(admin);
    });
  }
}
