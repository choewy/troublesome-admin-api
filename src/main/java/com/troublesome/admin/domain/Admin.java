package com.troublesome.admin.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Builder
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity(name = "admin")
@Comment(value = "관리자")
public class Admin {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
  @Comment(value = "관리자 PK")
  private Long id;

  @Column(name = "email", length = 340, unique = true)
  @Comment(value = "이메일")
  private String email;

  @Column(name = "password", length = 255)
  @Comment(value = "비밀번호")
  private String password;

  @Column(name = "name")
  @Comment(value = "이름")
  private String name;

  @Column(name = "is_root", columnDefinition = "BOOLEAN")
  @ColumnDefault(value = "false")
  @Comment(value = "Root 관리자 여부")
  private boolean isRoot;

  @Column(name = "created_at", columnDefinition = "TIMESTAMP")
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "생성일시")
  private Timestamp createdAt;

  @Column(name = "updated_at", columnDefinition = "TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "수정일시")
  private Timestamp updatedAt;

  @Column(name = "deleted_at", nullable = true, columnDefinition = "TIMESTAMP")
  @ColumnDefault(value = "NULL")
  @Comment(value = "삭제일시")
  private Timestamp deletedAt;
}
