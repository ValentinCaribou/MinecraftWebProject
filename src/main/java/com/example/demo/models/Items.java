package com.example.demo.models;

import org.springframework.data.annotation.Id;

public abstract class Items {
    private String nom;
    private String categorie;
    private String image;

    public Items(String nom, String categorie, String image) {
        this.nom = nom;
        this.categorie = categorie;
        this.image = image;
    }

    public Items() {
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
