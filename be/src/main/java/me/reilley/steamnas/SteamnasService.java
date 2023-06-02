package me.reilley.steamnas;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import me.reilley.steamnas.models.App;
import me.reilley.steamnas.models.AppRepository;
import me.reilley.steamnas.models.WebSocketMessage;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.stream.Collectors;

@AllArgsConstructor
@Log4j2

@Service
public class SteamnasService {
    private final AsyncTaskExecutor taskExecutor;
    private final AppRepository appRepository;
    private final SimpMessagingTemplate simpleMessagingTemplate;

    private final Queue<Runnable> updateQueue = new LinkedList<>();

    void login() {
        taskExecutor.execute(() -> {
            ProcessBuilder pb = new ProcessBuilder(
                    "steamcmd",
                    "+@NoPromptForPassword 1",
                    String.format("+login %s %s", System.getenv("STEAM_USERNAME"), System.getenv("STEAM_PASSWORD")),
                    "+quit",
                    "-tcp"
            );

            try {
                Process p = pb.start();
                BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    WebSocketMessage message = new WebSocketMessage(LocalDateTime.now(), line);
                    simpleMessagingTemplate.convertAndSend("/topic/console", message);
                    log.info(message.toString());
                }

                p.waitFor();
            } catch (IOException | InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void processQueue() {
        Runnable task;
        synchronized (updateQueue) {
            task = updateQueue.peek();
        }

        if (task != null) {
            taskExecutor.execute(() -> {
                try {
                    task.run();
                } finally {
                    synchronized (updateQueue) {
                        updateQueue.remove();
                        processQueue();
                    }
                }
            });
        }
    }

    void update(App... apps) {
        Runnable task = () -> {
            ProcessBuilder pb = new ProcessBuilder(
                    "steamcmd",
                    "+@NoPromptForPassword 1",
                    "+@sSteamCmdForcePlatformType windows",
                    String.format("+login %s", System.getenv("STEAM_USERNAME")),
                    Arrays.stream(apps).map((app) -> String.format("+app_update %s validate", app.getId())).collect(Collectors.joining()),
                    "+quit",
                    "-tcp"
            );
            try {
                Process p = pb.start();
                BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    WebSocketMessage message = new WebSocketMessage(LocalDateTime.now(), line);
                    simpleMessagingTemplate.convertAndSend("/topic/console", message);
                    log.info(message.toString());
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
        };

        synchronized (updateQueue) {
            updateQueue.add(task);

            if (updateQueue.size() == 1) {
                processQueue();
            }
        }
    }

    void uninstall(App app) {
        taskExecutor.execute(() -> {
            if (appRepository.existsById(app.getId())) {
                ProcessBuilder pb = new ProcessBuilder(
                        "steamcmd",
                        "+@NoPromptForPassword 1",
                        "+@sSteamCmdForcePlatformType windows",
                        String.format("+login %s", System.getenv("STEAM_USERNAME")),
                        String.format("+app_uninstall %s validate", app.getId()),
                        "+quit",
                        "-tcp"
                );
                try {
                    Process p = pb.start();
                    BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        WebSocketMessage message = new WebSocketMessage(LocalDateTime.now(), line);
                        simpleMessagingTemplate.convertAndSend("/topic/console", message);
                        log.info(message.toString());
                    }

                    int exitCode = p.waitFor();
                    if (exitCode == 0) {
                        appRepository.delete(app);
                    }
                } catch (IOException | InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }
}
