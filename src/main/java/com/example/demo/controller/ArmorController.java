package com.example.demo.controller;

import com.example.demo.errorManager.IResult;
import com.example.demo.models.Armors;
import com.example.demo.services.ArmorService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/app/armors")
public class ArmorController {

    @Autowired
    ArmorService armorService;

    /**
     * get all armor
     *
     * @return list of armors
     */
    @GetMapping
    public List<Armors> list(){
        return this.armorService.getAll();
    }

    /**
     * get one armor by id
     *
     * @param id
     * @return armor or error list
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id){
        IResult iResult = armorService.getById(id);
        return getResponseEntity(iResult);
    }

    /**
     * add an armor
     *
     * @param armors
     * @return reponse entity with a weapon or error list
     */
    @PostMapping
    @ResponseBody
    @ApiOperation(httpMethod = "POST", value = "Ajout d'une armure")
    public ResponseEntity<?> save(@ApiParam(value = "Ajout Armure", required = true) @RequestBody Armors armors) {
        IResult interfaceResult = armorService.save(armors, false);
        return getResponseEntity(interfaceResult);
    }

    /**
     * update an armor
     *
     * @param armors
     * @param id
     * @return response entity with a weapon or error list
     */
    @PutMapping("/{id}")
    @ResponseBody
    @ApiOperation(httpMethod = "PUT", value = "Mise à jour d'une armure")
    public ResponseEntity<?> update(@ApiParam(value = "Mise à jour d'une armure", required = true) @RequestBody Armors armors, @PathVariable("id") int id){
        IResult iResult = armorService.update(armors, id);
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
