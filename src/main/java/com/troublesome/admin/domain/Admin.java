package com.troublesome.admin.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "admin")
public class Admin {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
  @Comment(value = "관리자 PK")
  private Long id;

  @Column(name = "email", length = 340)
  @Comment(value = "이메일")
  private String email;

  @Column(name = "password", length = 255)
  @Comment(value = "비밀번호")
  private String password;

  @Column(name = "name")
  @Comment(value = "이름")
  private String name;

  @Column(name = "is_root", columnDefinition = "BOOLEAN DEFAULT false")
  @Comment(value = "Root 관리자 여부")
  private Boolean isRoot;

  @CreationTimestamp
  @Column(name = "created_at")
  @Comment(value = "생성일시")
  private Timestamp createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  @Comment(value = "수정일시")
  private Timestamp updatedAt;

  @Column(name = "deleted_at", nullable = true, columnDefinition = "TIMESTAMP DEFAULT NULL")
  @Comment(value = "삭제일시")
  private Timestamp deletedAt;
}
