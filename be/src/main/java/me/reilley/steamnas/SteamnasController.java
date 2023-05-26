package me.reilley.steamnas;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import me.reilley.steamnas.ext.steam.SteamFeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@AllArgsConstructor

@RestController
public class SteamnasController {
    private final AppRepository appRepository;

    private final SteamFeignClient steamFeignClient;

    private final SteamnasService steamnasService;

    @GetMapping("/installed")
    List<App> installed() {
        return appRepository.findAll();
    }

    @PostMapping("/install/{appId}")
    App install(@PathVariable String appId) {
        JsonNode appDetails = steamFeignClient.getAppDetails(appId);

        App app = new App();
        app.setId(appId);
        app.setName(appDetails.get(appId).get("data").get("name").asText());
        app.setDescription(appDetails.get(appId).get("data").get("short_description").asText());
        app.setGenres(appDetails.get(appId).get("data").get("genres").findValuesAsText("description"));
        app.setDevelopers(IntStream.range(0, appDetails.get(appId).get("data").get("developers").size()).mapToObj(i -> appDetails.get(appId).get("data").get("developers").get(i).asText()).collect(Collectors.toList()));
        app.setPublishers(IntStream.range(0, appDetails.get(appId).get("data").get("publishers").size()).mapToObj(i -> appDetails.get(appId).get("data").get("developers").get(i).asText()).collect(Collectors.toList()));
        app.setImage(appDetails.get(appId).get("data").get("header_image").asText());

        steamnasService.update(app);

        return app;
    }
}
