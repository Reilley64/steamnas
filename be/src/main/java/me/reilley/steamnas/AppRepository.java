package me.reilley.steamnas;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRepository extends JpaRepository<App, String> {
}
