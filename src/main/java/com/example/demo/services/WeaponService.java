package com.example.demo.services;

import com.example.demo.exception.CodeErreurAppli;
import com.example.demo.errorManager.Failure;
import com.example.demo.errorManager.IResult;
import com.example.demo.errorManager.Success;
import com.example.demo.models.Weapons;
import com.example.demo.repository.WeaponRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class WeaponService {
    Logger LOGGER = LoggerFactory.getLogger(WeaponService.class);

    @Autowired
    WeaponRepo weaponRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    /**
     * get all weapon
     *
     * @return list of weapon
     */
    public List<Weapons> getAll(){
        return this.weaponRepo.findAll();
    }

    /**
     * get one weapon by id
     *
     * @param id
     * @return response entity with weapon or a list of error
     */
    public IResult<Weapons, List<String>> getById(String id){
        List<String> errors = new ArrayList<>();
        Optional<Weapons> weapon = this.weaponRepo.findById(id);

        if (!weapon.isPresent()) {
            String message = "Id not found";
            errors.add(message);
        }
        return handleResult(weapon, errors, Optional::get);
    }

    /**
     * Save a weapon
     *
     * @param weapons
     * @return a weapons or errors list
     */
    @Transactional
    public IResult<Weapons, List<String>> save(Weapons weapons, boolean verif){
        LOGGER.info("Add new Weapons");
        System.out.println(weapons);
        List<String> errorList = Collections.emptyList();
        if (!verif){
            errorList.addAll(validateWeapon(weapons));
        }
//        checkGenerique(weapons.getId(), weapon -> weaponRepo.findById(weapon).isPresent(), CodeErreurAppli.XBB)
//                .ifPresent((codeError) -> errorList.add(codeError));

        Function<Weapons, Weapons> function = (weapons1) -> {
//            if (weapons1.getImage() != null) {
//                if (weapons1.getImage().indexOf("data:image") == 0) {
//                    if (!verifTailleImage(convertStringToImageByteArray(weapons1.getImage()))) {
//                        weapons1.setImage(null);
//                    }
//                }
//            }
            return weaponRepo.save(weapons);
        };
        return handleResult(weapons, errorList, function);
    }

    /**
     * update weapon
     *
     * @param weapons
     * @param id
     * @return a weapon or error list
     */
    @Transactional
    public IResult<Weapons, List<String>> update(Weapons weapons, int id){
        LOGGER.info("Mise à jour d'une arme");
        List<String> errorList = validateWeapon(weapons);
        return handleResult(weapons, errorList, weapons1 -> weaponRepo.save(weapons1));
    }

    /**
     * handle result of different checks
     *
     * @param param
     * @param errors
     * @param function
     * @param <T>
     * @param <R>
     * @return a success or a failure
     */
    private <T, R> IResult<R, List<String>> handleResult(T param, List<String> errors, Function<T, R> function) {
        if (errors == null || errors.isEmpty()) {
            R result = function.apply(param);
            return new Success(result);
        } else {
            return new Failure(errors);
        }
    }

    /**
     * check informations of weapon
     *
     * @param donneeAVerifier
     * @param function
     * @param codeErreurAppli
     * @param <T>
     * @return error or nothing
     */
    private <T> Optional<String> checkGenerique(T donneeAVerifier, Function<T, Boolean> function, CodeErreurAppli codeErreurAppli) {

        if (function.apply(donneeAVerifier)) {
            return Optional.ofNullable(codeErreurAppli.getMessage());
        }

        return Optional.empty();
    }

    /**
     * call method of check error
     *
     * @param weapon
     * @return a list of errors
     */
    public List<String> validateWeapon(Weapons weapon) {
        List<Optional<String>> erreurs = new ArrayList<>();

        if (weapon != null) {
            erreurs.add(checkGenerique(weapon.getNom(), StringUtils::isEmpty, CodeErreurAppli.XBC));
            erreurs.add(checkGenerique(weapon.getCategorie(), StringUtils::isEmpty, CodeErreurAppli.XBD));
            erreurs.add(checkGenerique(weapon.getDamage(), StringUtils::isEmpty, CodeErreurAppli.XBE));
            erreurs.add(checkGenerique(weapon.getRange(), StringUtils::isEmpty, CodeErreurAppli.XBF));
            erreurs.add(checkGenerique(weapon.getDPS(), StringUtils::isEmpty, CodeErreurAppli.XBG));
        } else
            erreurs.add(Optional.ofNullable(CodeErreurAppli.XBH.getCode()));
        return erreurs.stream()
                .filter((opt) -> opt.isPresent())
                .map((opt) -> opt.get())
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * verify the size of an image
     *
     * @param image
     * @return test
     */
    public boolean verifTailleImage(BufferedImage image) {
        ByteArrayOutputStream tmp = new ByteArrayOutputStream();
        boolean test = false;
        try {
            ImageIO.write(image, "jpeg", tmp);
            tmp.close();
            Integer contentLength = tmp.size();
            if (contentLength < 2000000) {
                test = true;
            }
        } catch (IOException e) {
            e.printStackTrace();
            test = false;
        }
        return test;
    }

    /**
     * decode a 64base string to an image
     *
     * @param imageString
     * @return image
     */
    private static BufferedImage convertStringToImageByteArray(String imageString) {
        if (imageString != null) {
            String[] parts = imageString.split(",");
            String imageStringPart = parts[1];
            BufferedImage image = null;
            byte[] imageByte;

            try {
                imageByte = Base64.getDecoder().decode(imageStringPart);
                ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
                image = ImageIO.read(bis);
                bis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return image;
        }
        return null;
    }
}
