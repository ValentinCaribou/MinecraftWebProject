package com.example.demo.controller;

import com.example.demo.errorManager.IResult;
import com.example.demo.models.Armors;
import com.example.demo.services.ArmorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/app/armors")
public class ArmorController {

    @Autowired
    ArmorService armorService;

    @GetMapping
    public List<Armors> list(){
        return this.armorService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id){
        IResult iResult = armorService.getById(id);
        return getResponseEntity(iResult);
    }

    /**
     * handle the interface result
     *
     * @param interfaceResult
     * @return a response entity with a success code and an object or an error code and an error list
     */
    private ResponseEntity<?> getResponseEntity(IResult interfaceResult) {
        if (interfaceResult.success() != null) {
            return new ResponseEntity<>(interfaceResult.success(), HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body(((List<String>) interfaceResult.failure()).stream().reduce("", (a, b) -> a + b));
        }
    }
}
