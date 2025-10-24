package com.it342.go.oauth2app.security;

import com.it342.go.oauth2app.entity.User;
import com.it342.go.oauth2app.repository.UserRepository;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOidcUserService extends OidcUserService {

    private final UserRepository userRepository;

    public CustomOidcUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) {
        System.out.println("=== START OIDC loadUser ===");

        try {
            OidcUser oidcUser = super.loadUser(userRequest);
            String provider = userRequest.getClientRegistration().getRegistrationId();

            Map<String, Object> attributes = oidcUser.getAttributes();
            System.out.println("OIDC ATTRIBUTES: " + attributes);

            String email = oidcUser.getEmail();
            System.out.println("EMAIL EXTRACTED: " + email);

            String name = oidcUser.getFullName();
            String avatarUrl = (String) attributes.get("picture");

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

            System.out.println("=== END OIDC loadUser SUCCESS ===");

            return new DefaultOidcUser(
                    oidcUser.getAuthorities(),
                    oidcUser.getIdToken(),
                    oidcUser.getUserInfo()
            );
        } catch (Exception e) {
            System.err.println("=== ERROR in OIDC loadUser ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}