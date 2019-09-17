package com.example.demo.models;

import org.springframework.data.annotation.Id;

public class Enchantement {
    @Id
    private String id;
    private String nom;
    private String description;
    private String obtenable;
    private int niveau;
    private float damage;
    private String image;

    public Enchantement() {
    }

    public Enchantement(String id, String nom, String description, String obtenable, int niveau, float damage, String image) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.obtenable = obtenable;
        this.niveau = niveau;
        this.damage = damage;
        this.image = image;
    }

    public Enchantement(String nom, String description, String obtenable, int niveau, float damage, String image) {
        this.nom = nom;
        this.description = description;
        this.obtenable = obtenable;
        this.niveau = niveau;
        this.damage = damage;
        this.image = image;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObtenable() {
        return obtenable;
    }

    public void setObtenable(String obtenable) {
        this.obtenable = obtenable;
    }

    public int getNiveau() {
        return niveau;
    }

    public void setNiveau(int niveau) {
        this.niveau = niveau;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public float getDamage() {
        return damage;
    }

    public void setDamage(float damage) {
        this.damage = damage;
    }

    @Override
    public String toString() {
        return "Enchantement{" +
                "id='" + id + '\'' +
                ", nom='" + nom + '\'' +
                ", description='" + description + '\'' +
                ", obtenable='" + obtenable + '\'' +
                ", niveau=" + niveau +
                ", damage=" + damage +
                '}';
    }
}
