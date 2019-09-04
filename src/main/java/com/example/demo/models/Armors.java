package com.example.demo.models;

public class Armors extends Items {
    private int resistance;
    private int pointOfDefense;

    public Armors(int id, String nom, String categorie, String image, int resistance, int pointOfDefense) {
        super(id, nom, categorie, image);
        this.resistance = resistance;
        this.pointOfDefense = pointOfDefense;
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
}
