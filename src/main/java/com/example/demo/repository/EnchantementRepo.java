package com.example.demo.repository;

import com.example.demo.models.Enchantement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnchantementRepo extends MongoRepository<Enchantement, String> {
    Optional<Enchantement> findByObtenable(String obtenable);
}
