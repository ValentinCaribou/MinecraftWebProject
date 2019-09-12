package com.example.demo.repository;

import com.example.demo.models.Enchantement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnchantementRepo extends MongoRepository<Enchantement, String> {

}
