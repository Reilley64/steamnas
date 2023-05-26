package me.reilley.steamnas;

import lombok.AllArgsConstructor;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.stream.Collectors;

@AllArgsConstructor

@Service
public class SteamnasService {
    private final AsyncTaskExecutor taskExecutor;

    private final AppRepository appRepository;

    void update(App... apps) {
        taskExecutor.execute(() -> {
            ProcessBuilder pb = new ProcessBuilder(
                    "steamcmd",
                    String.format("+login %s %s", System.getenv("STEAM_USERNAME"), System.getenv("STEAM_PASSWORD")),
                    Arrays.stream(apps).map((app) -> String.format("+app_update %s", app.getId())).collect(Collectors.joining()),
                    "+quit"
            );
            try {
                Process p = pb.start();
                BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }

                int exitCode = p.waitFor();
                if (exitCode == 0) {
                    for (App app : apps) {
                        if (!appRepository.existsById(app.getId())) {
                            appRepository.save(app);
                        }
                    }
                }
            } catch (IOException | InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }
}