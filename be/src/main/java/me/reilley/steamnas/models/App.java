package me.reilley.steamnas.models;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "apps")
public class App {
    @Id
    private String id;

    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Type(ListArrayType.class)
    private List<String> genres = new ArrayList<>();

    @Type(ListArrayType.class)
    private List<String> developers = new ArrayList<>();

    @Type(ListArrayType.class)
    private List<String> publishers = new ArrayList<>();

    private String image;
}
