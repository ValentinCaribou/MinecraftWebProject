package com.example.demo.repository;

import com.example.demo.models.Weapons;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WeaponRepo extends MongoRepository<Weapons, Integer> {
    Optional<Weapons> findByNom(String nom);
}
