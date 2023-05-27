package me.reilley.steamnas;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@AllArgsConstructor

@Service
public class SchedulerService {
    final SteamnasService steamnasService;
    final AppRepository appRepository;

    @Scheduled(cron = "0 4 * * *")
    public void update() {
        steamnasService.update(appRepository.findAll().toArray(new App[0]));
    }
}
