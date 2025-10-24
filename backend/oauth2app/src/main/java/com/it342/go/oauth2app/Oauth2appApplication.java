package com.it342.go.oauth2app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Oauth2appApplication {

	public static void main(String[] args) {
        SpringApplication.run(Oauth2appApplication.class, args);
        System.out.println("OAuth2App Successfully Started!");
	}
}
