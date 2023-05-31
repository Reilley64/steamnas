package me.reilley.steamnas;

import lombok.AllArgsConstructor;
import me.reilley.steamnas.models.App;
import me.reilley.steamnas.models.AppRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@AllArgsConstructor

@Service
public class SteamnasSchedulerService {
    final SteamnasService steamnasService;
    final AppRepository appRepository;

    @Scheduled(cron = "0 0 14 * * *")
    public void update() {
        steamnasService.update(appRepository.findAll().toArray(new App[0]));
    }
}
