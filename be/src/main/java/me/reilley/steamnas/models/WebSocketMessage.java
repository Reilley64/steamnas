package me.reilley.steamnas.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class WebSocketMessage {
    private LocalDateTime createdAt;
    private String message;

    @Override
    public String toString() {
        return String.format("%s: %s", createdAt, message);
    }
}
