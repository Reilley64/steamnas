package me.reilley.steamnas;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor

@Component
public class SteamnasStartup {
    private SteamnasService service;

    @PostConstruct
    public void init() {
        service.login();
    }
}
