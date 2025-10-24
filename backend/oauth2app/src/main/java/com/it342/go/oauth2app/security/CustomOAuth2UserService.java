package com.it342.go.oauth2app.security;

import com.it342.go.oauth2app.entity.User;
import com.it342.go.oauth2app.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        System.out.println("=== START loadUser ===");

        try {
            OAuth2User oAuth2User = super.loadUser(userRequest);
            String provider = userRequest.getClientRegistration().getRegistrationId();

            Map<String, Object> attributes = oAuth2User.getAttributes();
            System.out.println("OAUTH ATTRIBUTES: " + attributes);

            String email = extractEmail(provider, attributes);
            System.out.println("EMAIL EXTRACTED: " + email);

            String name = extractName(provider, attributes);
            String avatarUrl = extractAvatar(provider, attributes);

            // Check if user already exists
            Optional<User> existingUser = userRepository.findByEmail(email);

            User user;
            if (existingUser.isPresent()) {
                // Update existing user
                user = existingUser.get();
                user.setDisplayName(name);
                user.setAvatarUrl(avatarUrl);
                user.setUpdatedAt(Instant.now());
                userRepository.save(user);
                System.out.println("Updated existing user: " + email);
            } else {
                // Create new user
                user = new User();
                user.setEmail(email);
                user.setDisplayName(name);
                user.setAvatarUrl(avatarUrl);
                user.setBio("New " + provider + " user");
                user.setCreatedAt(Instant.now());
                user.setUpdatedAt(Instant.now());
                user = userRepository.save(user);
                System.out.println("Created new user: " + email);
            }

            System.out.println("=== END loadUser SUCCESS ===");

            return new DefaultOAuth2User(
                    oAuth2User.getAuthorities(),
                    Map.of(
                            "email", user.getEmail(),
                            "name", user.getDisplayName(),
                            "avatarUrl", user.getAvatarUrl()
                    ),
                    "email"
            );
        } catch (Exception e) {
            System.err.println("=== ERROR in loadUser ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    private String extractEmail(String provider, Map<String, Object> attributes) {
        if ("google".equalsIgnoreCase(provider)) {
            return (String) attributes.get("email");
        } else if ("github".equalsIgnoreCase(provider)) {
            Object emailObj = attributes.get("email");
            if (emailObj != null) {
                return emailObj.toString();
            } else {
                // GitHub users can have private email
                Object login = attributes.get("login");
                return login + "@users.noreply.github.com";
            }
        }
        return null;
    }

    private String extractName(String provider, Map<String, Object> attributes) {
        if ("google".equalsIgnoreCase(provider)) {
            return (String) attributes.get("name");
        } else if ("github".equalsIgnoreCase(provider)) {
            return (String) attributes.get("name") != null
                    ? (String) attributes.get("name")
                    : (String) attributes.get("login");
        }
        return "Unknown User";
    }

    private String extractAvatar(String provider, Map<String, Object> attributes) {
        if ("google".equalsIgnoreCase(provider)) {
            return (String) attributes.get("picture");
        } else if ("github".equalsIgnoreCase(provider)) {
            return (String) attributes.get("avatar_url");
        }
        return null;
    }
}