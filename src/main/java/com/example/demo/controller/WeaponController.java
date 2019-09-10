package com.example.demo.controller;

import com.example.demo.errorManager.IResult;
import com.example.demo.models.Weapons;
import com.example.demo.services.WeaponService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/weapons")
public class WeaponController {

    @Autowired
    WeaponService weaponService;

    /**
     * Get all weapon
     *
     * @return list of weapons
     */
    @GetMapping
    public List<Weapons> list(){
        return this.weaponService.getAll();
    }

    /**
     * get one weapon
     *
     * @param id
     * @return weapon or error list
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id){
        IResult iResult = this.weaponService.getById(id);
        return getResponseEntity(iResult);
    }

    /**
     * add a weapon
     *
     * @param weapons
     * @return reponse entity with a weapon or error list
     */
    @PostMapping
    @ResponseBody
    @ApiOperation(httpMethod = "POST", value = "Ajout d'une armes")
    public ResponseEntity<?> save(@ApiParam(value = "Ajout Armes", required = true) @RequestBody Weapons weapons) {
        IResult interfaceResult = weaponService.save(weapons, false);
        return getResponseEntity(interfaceResult);
    }

    /**
     * update a weapon
     *
     * @param weapons
     * @param id
     * @return response entity with a weapon or error list
     */
    @PutMapping("/{id}")
    @ResponseBody
    @ApiOperation(httpMethod = "PUT", value = "Mise à jour d'une arme")
    public ResponseEntity<?> update(@ApiParam(value = "Mise à jour d'une arme", required = true) @RequestBody Weapons weapons, @PathVariable("id") int id){
        IResult iResult = weaponService.update(weapons, id);
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
