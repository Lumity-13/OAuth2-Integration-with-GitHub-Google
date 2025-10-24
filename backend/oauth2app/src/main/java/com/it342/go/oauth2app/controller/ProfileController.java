package com.it342.go.oauth2app.controller;

import com.it342.go.oauth2app.entity.User;
import com.it342.go.oauth2app.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProfileController {
    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private String extractEmail(Authentication auth) {
        if (auth == null) return null;

        Object principal = auth.getPrincipal();
        if (principal instanceof org.springframework.security.oauth2.core.user.OAuth2User oauthUser) {
            // Try email first
            Object email = oauthUser.getAttribute("email");
            if (email != null) return email.toString();

            // For GitHub users with private emails
            Object login = oauthUser.getAttribute("login");
            if (login != null) return login.toString() + "@users.noreply.github.com";

            return oauthUser.getName();
        }

        return auth.getName();
    }

    @GetMapping
    public ResponseEntity<?> getProfile(Authentication auth) {
        String email = extractEmail(auth);
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "user not found"));
        }
        User u = userOpt.get();
        return ResponseEntity.ok(Map.of(
                "id", u.getId(),
                "email", u.getEmail(),
                "displayName", u.getDisplayName(),
                "avatarUrl", u.getAvatarUrl(),
                "bio", u.getBio(),
                "createdAt", u.getCreatedAt(),
                "updatedAt", u.getUpdatedAt()
        ));
    }

    @PostMapping
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> body, Authentication auth) {
        String email = extractEmail(auth);
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "user not found"));
        }
        User u = userOpt.get();
        if (body.containsKey("displayName")) u.setDisplayName(body.get("displayName"));
        if (body.containsKey("bio")) u.setBio(body.get("bio"));
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
}
