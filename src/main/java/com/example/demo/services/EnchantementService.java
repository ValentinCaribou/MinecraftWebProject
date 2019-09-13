package com.example.demo.services;

import com.example.demo.errorManager.Failure;
import com.example.demo.errorManager.IResult;
import com.example.demo.errorManager.Success;
import com.example.demo.exception.CodeErreurAppli;
import com.example.demo.models.Enchantement;
import com.example.demo.repository.EnchantementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

@Service
public class EnchantementService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    EnchantementRepo enchantementRepo;

    Logger LOGGER = LoggerFactory.getLogger(EnchantementService.class);

    /**
     * get all enchantement
     *
     * @return list of enchantement
     */
    public List<Enchantement> getAll(){
        return this.enchantementRepo.findAll();
    }

    /**
     * get one enchantement by id
     *
     * @param id
     * @return response entity with enchantement or a list of error
     */
    public IResult<Enchantement, List<String>> getById(String id){
        List<String> errors = new ArrayList<>();
        Optional<Enchantement> enchantement = this.enchantementRepo.findById(id);

        if (id.equals("") || !enchantement.isPresent()) {
            String message = "Id not found";
            errors.add(message);
        }
        return handleResult(enchantement, errors, Optional::get);
    }

    /**
     * get enchantement by obtenable
     *
     * @param obtenable
     * @return response entity with enchantement or a list of error
     */
    public IResult<Enchantement, List<String>> getByObtenable(String obtenable){
        List<String> errors = new ArrayList<>();
        Optional<Enchantement> enchantement = this.enchantementRepo.findByObtenable(obtenable);

        if (obtenable.equals("") || !enchantement.isPresent()) {
            String message = "obtenable not found";
            errors.add(message);
        }
        return handleResult(enchantement, errors, Optional::get);
    }

    /**
     * Save an enchantement
     *
     * @param enchantement
     * @return an enchantement or errors list
     */
    @Transactional
    public IResult<Enchantement, List<String>> save(Enchantement enchantement, boolean verif){
        LOGGER.info("Add new Enchantement");
        System.out.println(enchantement);
        List<String> errorList = Collections.emptyList();
        if (!verif){
            errorList.addAll(validateEnchantement(enchantement));
        }

        Function<Enchantement, Enchantement> function = (enchantement1) -> {
//            if (enchantement1.getImage() != null) {
//                if (enchantement1.getImage().indexOf("data:image") == 0) {
//                    if (!verifTailleImage(convertStringToImageByteArray(enchantement1.getImage()))) {
//                        enchantement1.setImage(null);
//                    }
//                }
//            }
            return enchantementRepo.save(enchantement1);
        };
        return handleResult(enchantement, errorList, function);
    }

    /**
     * update armor
     *
     * @param enchantement
     * @param id
     * @return a weapon or error list
     */
    @Transactional
    public IResult<Enchantement, List<String>> update(Enchantement enchantement, String id){
        LOGGER.info("Mise à jour d'un enchantement");
        List<String> errorList = validateEnchantement(enchantement);
        return handleResult(enchantement, errorList, enchantement1 -> enchantementRepo.save(enchantement1));
    }

    /**
     * call method of check error
     *
     * @param enchantement
     * @return a list of errors
     */
    public List<String> validateEnchantement(Enchantement enchantement) {
        List<Optional<String>> erreurs = new ArrayList<>();

        if (enchantement != null) {
            erreurs.add(checkGenerique(enchantement.getNom(), StringUtils::isEmpty, CodeErreurAppli.XDC));
            erreurs.add(checkGenerique(enchantement.getDescription(), StringUtils::isEmpty, CodeErreurAppli.XDD));
            erreurs.add(checkGenerique(enchantement.getObtenable(), StringUtils::isEmpty, CodeErreurAppli.XDE));
            erreurs.add(checkGenerique(enchantement.getNiveau(), StringUtils::isEmpty, CodeErreurAppli.XDF));
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
     * check informations of armor
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
