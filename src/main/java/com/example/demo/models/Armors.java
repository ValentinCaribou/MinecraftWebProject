package com.example.demo.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Armors extends Items {
    @Id
    private String id;
    private int resistance;
    private int pointOfDefense;
    private List<Enchantement> enchantements;

    public Armors(String nom, String categorie, String image, int resistance, int pointOfDefense) {
        super(nom, categorie, image);
        this.resistance = resistance;
        this.pointOfDefense = pointOfDefense;
    }

    public Armors(String nom, String categorie, String image, String id, int resistance, int pointOfDefense) {
        super(nom, categorie, image);
        this.id = id;
        this.resistance = resistance;
        this.pointOfDefense = pointOfDefense;
    }

    public Armors(String nom, String categorie, String image, int resistance, int pointOfDefense, List<Enchantement> enchantements) {
        super(nom, categorie, image);
        this.resistance = resistance;
        this.pointOfDefense = pointOfDefense;
        this.enchantements = enchantements;
    }

    public Armors() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public List<Enchantement> getEnchantements() {
        return enchantements;
    }

    public void setEnchantements(List<Enchantement> enchantements) {
        this.enchantements = enchantements;
    }

    @Override
    public String toString() {
        return "Armors{" +
                "id=" + id +
                ", nom=" + getNom() +
                ", resistance=" + resistance +
                ", pointOfDefense=" + pointOfDefense +
                '}';
    }
}
