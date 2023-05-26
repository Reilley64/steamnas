package me.reilley.steamnas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SteamnasApplication {
	public static void main(String[] args) {
		SpringApplication.run(SteamnasApplication.class, args);
	}
}
