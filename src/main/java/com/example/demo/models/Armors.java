package com.example.demo.models;

import org.springframework.data.annotation.Id;

public class Armors extends Items {
    @Id
    private int id;
    private int resistance;
    private int pointOfDefense;

    public Armors(String nom, String categorie, String image, int resistance, int pointOfDefense) {
        super(nom, categorie, image);
        this.resistance = resistance;
        this.pointOfDefense = pointOfDefense;
    }

    public Armors(String nom, String categorie, String image, int id, int resistance, int pointOfDefense) {
        super(nom, categorie, image);
        this.id = id;
        this.resistance = resistance;
        this.pointOfDefense = pointOfDefense;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getResistance() {
        return resistance;
    }

    public void setResistance(int resistance) {
        this.resistance = resistance;
    }

    public int getPointOfDefense() {
        return pointOfDefense;
    }

    public void setPointOfDefense(int pointOfDefense) {
        this.pointOfDefense = pointOfDefense;
    }

    @Override
    public String toString() {
        return "Armors{" +
                "id=" + id +
                ", nom=" + getNom() +
                ", image=" + getImage() +
                ", resistance=" + resistance +
                ", pointOfDefense=" + pointOfDefense +
                '}';
    }
}
