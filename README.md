# OAuth2-Integration-with-GitHub-Google

This project demonstrates how to implement OAuth2 login using Google and GitHub in a Spring Boot 3.x application using Spring Security and RESTful endpoints. Unlike Thymeleaf-based projects, this one uses a React frontend for profile display and management.

### Architecture Overview

Technologies Used:
- Backend: Spring Boot 3.5+, Java 21
- OAuth2 Providers: Google, GitHub
- Security: Spring Security OAuth2 Client
- Database: MySQL (production) / H2 (optional for development)
- Frontend: React.js (Home & Profile pages)
```
+--------------------+
|    User Browser    |
+--------------------+
          |
          v
+------------------------------+
| React Frontend (Home/Profile)|
+------------------------------+
          |
          v
+-------------------------------------------+
| Spring Boot Backend (OAuth2 Integration) |
|                                           |
|  +------------------------------------+   |
|  | Spring Security OAuth2 Client      |   |
|  |  - Handles login redirects         |   |
|  |  - Fetches access tokens           |   |
|  |  - Loads user info (OIDC/OAuth2)  |   |
|  +----------------+-----------------+   |
|                       |                 |
|                       v                 |
|  +------------------------------------+  |
|  | CustomOAuth2UserService            |  |
|  |  - Maps user info to DB record     |  |
|  |  - Creates new users if not exist  |  |
|  +----------------+-----------------+  |
+-------------------------------------------+
          |
          v
+-------------------------------+
|       MySQL Database          |
|  ┌─────────────────────────┐  |
|  │       users table       │  |
|  │ ─ id, email, name, bio  │  |
|  └─────────────────────────┘  |
+-------------------------------+
```

### Authentication Flow

1. User clicks Login with Google or Login with GitHub from the React frontend.
2. Browser redirects to the respective OAuth2 provider.
3. After successful login, the user is redirected to /profile.
4. Frontend fetches /api/profile (GET) to retrieve user info.
5. User can edit profile and save changes via /api/profile (POST).

### Configuring application.properties

Before running the application, you need to update the application.properties file with your own database credentials and OAuth2 client credentials.

1. Database Configuration

Locate these lines in application.properties:
```
spring.datasource.url=jdbc:mysql://localhost:3306/oauth2db
spring.datasource.username=root
spring.datasource.password=yourpassword
```
- spring.datasource.url → Replace oauth2db with the name of the database you want to create.
- spring.datasource.username → Replace root with your MySQL username.
- spring.datasource.password → Replace yourpassword with your MySQL password.

**Tip:** Make sure the database exists. You can create it manually in MySQL:
```
CREATE DATABASE my_oauth2_db;
```

2. Google OAuth2 Configuration & GitHub OAuth2 Configuration

Locate these lines:
```
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google client-secret=YOUR_GOOGLE_CLIENT_SECRET

spring.security.oauth2.client.registration.github.client-id=YOUR_GITHUB_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_GITHUB_CLIENT_SECRET
```
- YOUR_GOOGLE_CLIENT_ID → Replace with the Client ID from your Google Cloud OAuth2 app.
- YOUR_GOOGLE_CLIENT_SECRET → Replace with the Client Secret from your Google Cloud OAuth2 app.

- YOUR_GITHUB_CLIENT_ID → Replace with the Client ID from your GitHub OAuth App.
- YOUR_GITHUB_CLIENT_SECRET → Replace with the Client Secret from your GitHub OAuth App.

### Additional Notes

- React frontend is located in frontend/src (components: Home.jsx, Profile.jsx).
- MySQL stores user profiles permanently.
- REST endpoints expose user info and allow profile updates.
- Spring Security handles OAuth2 flow and CSRF protection automatically.