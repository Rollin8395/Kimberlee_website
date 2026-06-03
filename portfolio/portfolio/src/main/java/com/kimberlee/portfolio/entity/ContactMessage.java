package com.kimberlee.portfolio.entity;

import jakarta.persistence.*;

@Entity
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    @Column(length = 3000)
    private String message;

    public ContactMessage() {}

    // Generate getters and setters
}