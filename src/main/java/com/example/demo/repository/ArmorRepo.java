package com.example.demo.repository;

import com.example.demo.models.Armors;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArmorRepo extends MongoRepository<Armors, Integer> {
    Optional<Armors> findByNom(String nom);
}
