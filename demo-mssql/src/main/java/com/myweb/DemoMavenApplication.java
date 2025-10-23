package com.myweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.myweb"})
@EntityScan({"com.myweb"})
public class DemoMavenApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoMavenApplication.class, args);
	}

}
