package me.reilley.steamnas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({SteamnasAppConfig.class, SteamnasWebSocketConfig.class})
public class SteamnasApplication {
	public static void main(String[] args) {
		SpringApplication.run(SteamnasApplication.class, args);
	}
}
