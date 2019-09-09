package com.example.demo.models;

public class Weapons extends Items {

    private int damage;
    private float range;
    private int DPS;

    public Weapons(int id, String nom, String categorie, String image, int damage, float range, int DPS) {
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

    public float getRange() {
        return range;
    }

    public void setRange(float range) {
        this.range = range;
    }

    public int getDPS() {
        return DPS;
    }

    public void setDPS(int DPS) {
        this.DPS = DPS;
    }
}
