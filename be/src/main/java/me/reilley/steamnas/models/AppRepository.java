package me.reilley.steamnas.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppRepository extends JpaRepository<App, String> {
    List<App> findAllByOrderByName();
}
