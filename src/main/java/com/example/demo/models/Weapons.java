package com.example.demo.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Weapons extends Items {

    @Id
    private String id;
    private int damage;
    private float range;
    private float DPS;
    private List<Enchantement> enchantement;

    public Weapons(String nom, String categorie, String image, int damage, float range, float DPS) {
        super(nom, categorie, image);
        this.damage = damage;
        this.range = range;
        this.DPS = DPS;
    }

    public Weapons(String nom, String categorie, String image, String id, int damage, float range, float DPS) {
        super(nom, categorie, image);
        this.id = id;
        this.damage = damage;
        this.range = range;
        this.DPS = DPS;
    }

    public Weapons(String nom, String categorie, String image, int damage, float range, float DPS, List<Enchantement> enchantement) {
        super(nom, categorie, image);
        this.damage = damage;
        this.range = range;
        this.DPS = DPS;
        this.enchantement = enchantement;
    }

    public Weapons() {

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

    public float getDPS() {
        return DPS;
    }

    public void setDPS(float DPS) {
        this.DPS = DPS;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Enchantement> getEnchantement() {
        return enchantement;
    }

    public void setEnchantement(List<Enchantement> enchantement) {
        this.enchantement = enchantement;
    }

    @Override
    public String toString() {
        return "Weapons{" +
                "id=" + id +
                ", nom=" + getNom() +
                ", categorie=" + getCategorie() +
                ", damage=" + damage +
                ", range=" + range +
                ", DPS=" + DPS +
                '}';
    }
}
