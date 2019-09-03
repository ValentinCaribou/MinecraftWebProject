package com.example.demo.services;

import com.example.demo.exception.CodeErreurAppli;
import com.example.demo.errorManager.Failure;
import com.example.demo.errorManager.IResult;
import com.example.demo.errorManager.Success;
import com.example.demo.models.Armors;
import com.example.demo.repository.ArmorRepo;
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
public class ArmorService {

    Logger LOGGER = LoggerFactory.getLogger(ArmorService.class);

    @Autowired
    ArmorRepo armorRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    /**
     * get all armor
     *
     * @return list of armor
     */
    public List<Armors> getAll(){
        return this.armorRepo.findAll();
    }

    /**
     * get one armor by id
     *
     * @param id
     * @return response entity with armor or a list of error
     */
    public IResult<Armors, List<String>> getById(int id){
        List<String> errors = new ArrayList<>();
        Optional<Armors> weapon = this.armorRepo.findById(id);

        if (id == 0 || !weapon.isPresent()) {
            String message = "Id not found";
            errors.add(message);
        }
        return handleResult(weapon, errors, Optional::get);
    }

    /**
     * Save an armor
     *
     * @param armors
     * @return an armor or errors list
     */
    @Transactional
    public IResult<Armors, List<String>> save(Armors armors, boolean verif){
        LOGGER.info("Add new Armors");
        List<String> errorList = Collections.emptyList();
        if (!verif){
            errorList.addAll(validateArmor(armors));
        }
        checkGenerique(armors.getId(), weapon -> armorRepo.findById(weapon).isPresent(), CodeErreurAppli.XBB)
                .ifPresent((codeError) -> errorList.add(codeError));

        Function<Armors, Armors> function = (armors1) -> {
            if (armors1.getImage() != null) {
                if (armors1.getImage().indexOf("data:image") == 0) {
                    if (!verifTailleImage(convertStringToImageByteArray(armors1.getImage()))) {
                        armors1.setImage(null);
                    }
                }
            }
            return armorRepo.save(armors1);
        };
        return handleResult(armors, errorList, function);
    }

    /**
     * update weapon
     *
     * @param armor
     * @param id
     * @return a weapon or error list
     */
    @Transactional
    public IResult<Armors, List<String>> update(Armors armor, int id){
        LOGGER.info("Mise à jour d'une arme");
        List<String> errorList = validateArmor(armor);
        return handleResult(armor, errorList, weapons1 -> armorRepo.save(weapons1));
    }

    /**
     * call method of check error
     *
     * @param armor
     * @return a list of errors
     */
    public List<String> validateArmor(Armors armor) {
        List<Optional<String>> erreurs = new ArrayList<>();

        if (armor != null) {
            erreurs.add(checkGenerique(armor.getNom(), StringUtils::isEmpty, CodeErreurAppli.XCC));
            erreurs.add(checkGenerique(armor.getCategorie(), StringUtils::isEmpty, CodeErreurAppli.XCD));
            erreurs.add(checkGenerique(armor.getResistance(), StringUtils::isEmpty, CodeErreurAppli.XCE));
            erreurs.add(checkGenerique(armor.getPointOfDefense(), StringUtils::isEmpty, CodeErreurAppli.XCF));
        } else
            erreurs.add(Optional.ofNullable(CodeErreurAppli.XBH.getCode()));
        return erreurs.stream()
                .filter((opt) -> opt.isPresent())
                .map((opt) -> opt.get())
                .distinct()
                .collect(Collectors.toList());
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
