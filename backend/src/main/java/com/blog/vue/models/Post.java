package com.blog.vue.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime publishedAt;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}
    public LocalDateTime getPublishedAt() {return publishedAt;}
    public void setPublishedAt(LocalDateTime publishedAt) {this.publishedAt = publishedAt;}
    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}
}
