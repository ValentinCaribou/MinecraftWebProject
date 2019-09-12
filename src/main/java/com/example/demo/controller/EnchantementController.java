package com.example.demo.controller;

import com.example.demo.errorManager.IResult;
import com.example.demo.models.Enchantement;
import com.example.demo.services.EnchantementService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/enchantement")
public class EnchantementController {

    @Autowired
    EnchantementService enchantementService;

    /**
     * Get all enchantement
     *
     * @return list of enchantement
     */
    @GetMapping
    public List<Enchantement> list(){
        return this.enchantementService.getAll();
    }

    /**
     * get one enchantement
     *
     * @param id
     * @return enchantement or error list
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id){
        IResult iResult = this.enchantementService.getById(id);
        return getResponseEntity(iResult);
    }

    /**
     * add a enchantement
     *
     * @param enchantement
     * @return reponse entity with a enchantement or error list
     */
    @PostMapping
    @ResponseBody
    @ApiOperation(httpMethod = "POST", value = "Ajout d'un enchantement")
    public ResponseEntity<?> save(@ApiParam(value = "Ajout enchantement", required = true) @RequestBody Enchantement enchantement) {
        IResult interfaceResult = enchantementService.save(enchantement, false);
        return getResponseEntity(interfaceResult);
    }

    /**
     * update a enchantement
     *
     * @param enchantement
     * @param id
     * @return response entity with a enchantement or error list
     */
    @PutMapping("/{id}")
    @ResponseBody
    @ApiOperation(httpMethod = "PUT", value = "Mise à jour d'un enchantement")
    public ResponseEntity<?> update(@ApiParam(value = "Mise à jour d'un enchantement", required = true) @RequestBody Enchantement enchantement, @PathVariable("id") String id){
        IResult iResult = enchantementService.update(enchantement, id);
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
