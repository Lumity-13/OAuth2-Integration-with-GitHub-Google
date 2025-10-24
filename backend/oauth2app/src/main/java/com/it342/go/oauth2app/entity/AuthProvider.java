package com.it342.go.oauth2app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "auth_providers", indexes = {
        @Index(name = "idx_provider_user", columnList = "provider, providerUserId")
})
public class AuthProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String provider; // "GOOGLE" or "GITHUB"

    @Column(nullable = false)
    private String providerUserId;

    private String providerEmail;

    public AuthProvider() {}

    // getters + setters

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public String getProvider() {
        return provider;
    }
    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderUserId() {
        return providerUserId;
    }
    public void setProviderUserId(String providerUserId) {
        this.providerUserId = providerUserId;
    }

    public String getProviderEmail() {
        return providerEmail;
    }
    public void setProviderEmail(String providerEmail) {
        this.providerEmail = providerEmail;
    }
}