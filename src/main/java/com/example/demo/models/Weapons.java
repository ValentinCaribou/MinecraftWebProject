package com.example.demo.models;

public class Weapons extends Items {

    private int damage;
    private int range;
    private int DPS;

    public Weapons(int id, String nom, String categorie, String image, int damage, int range, int DPS) {
        super(id, nom, categorie, image);
        this.damage = damage;
        this.range = range;
        this.DPS = DPS;
    }

    public int getDamage() {
        return damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }

    public int getRange() {
        return range;
    }

    public void setRange(int range) {
        this.range = range;
    }

    public int getDPS() {
        return DPS;
    }

    public void setDPS(int DPS) {
        this.DPS = DPS;
    }
}
