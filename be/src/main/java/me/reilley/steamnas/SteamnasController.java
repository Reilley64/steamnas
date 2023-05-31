package me.reilley.steamnas;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import me.reilley.steamnas.ext.steam.SteamFeignClient;
import me.reilley.steamnas.models.App;
import me.reilley.steamnas.models.AppRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@AllArgsConstructor

@RestController
@CrossOrigin(origins = "*")
public class SteamnasController {
    private final AppRepository appRepository;
    private final SteamFeignClient steamFeignClient;
    private final SteamnasService steamnasService;

    @GetMapping("/apps")
    List<App> installed() {
        return appRepository.findAllByOrderByName();
    }

    @GetMapping("/apps/{app-id}")
    App get(@PathVariable("app-id") String appId) {
        JsonNode appDetails = steamFeignClient.getAppDetails(appId);

        App app = new App();
        app.setId(appId);
        app.setName(appDetails.get(appId).get("data").get("name").asText());
        app.setDescription(appDetails.get(appId).get("data").get("short_description").asText());
        app.setGenres(appDetails.get(appId).get("data").get("genres").findValuesAsText("description"));
        app.setDevelopers(IntStream.range(0, appDetails.get(appId).get("data").get("developers").size()).mapToObj(i -> appDetails.get(appId).get("data").get("developers").get(i).asText()).collect(Collectors.toList()));
        app.setPublishers(IntStream.range(0, appDetails.get(appId).get("data").get("publishers").size()).mapToObj(i -> appDetails.get(appId).get("data").get("publishers").get(i).asText()).collect(Collectors.toList()));
        app.setImage(appDetails.get(appId).get("data").get("header_image").asText());
        app.setInstalled(appRepository.existsById(appId));

        return app;
    }

    @PostMapping("/apps/{appId}")
    App install(@PathVariable String appId) {
        App app = this.get(appId);
        steamnasService.update(app);

        return app;
    }

    @DeleteMapping("/apps/{appId}")
    App uninstall(@PathVariable String appId) {
        App app = this.get(appId);
        steamnasService.uninstall(app);

        return app;
    }
}
