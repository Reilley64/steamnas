package me.reilley.steamnas.ext.steam;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "steam", url = "https://store.steampowered.com/api")
public interface SteamFeignClient {
    @GetMapping("/appdetails")
    JsonNode getAppDetails(@RequestParam("appids") String appids);
}
