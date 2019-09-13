import {
    getEnchantementList,
    getEnchantementById,
    addEnchantement,
    getEnchantementWhereObtention
} from "../../services/gestionEnchantement";
import {balanceTonToast} from "../toast/dispatch";

import action from "./action";

export const getEnchantements = () => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getEnchantementList()
            .then(enchantements => {
                    dispatch(action.setEnchantements(enchantements));
                    dispatch(action.setPending(false));
                    return Promise.resolve();
                }
            ).catch((error) => {
            console.log(error);
            dispatch(balanceTonToast("error", "Echec lors de la récupération des enchantements"));
            return Promise.reject(error);
        })
    }
};

export const getEnchantement = (id) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getEnchantementById(id)
            .then(armor => {
                    dispatch(action.setEnchantement(armor));
                    dispatch(action.setPending(false));
                    return Promise.resolve();
                }
            ).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
    }
};

export const getEnchantementObtention = (obtention) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getEnchantementWhereObtention(obtention)
            .then(enchantement => {
                    dispatch(action.setEnchantements(enchantement));
                    dispatch(action.setPending(false));
                    return Promise.resolve();
                }
            ).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
    }
};

export const ajoutEnchantement = (enchantement) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        addEnchantement(enchantement)
            .then(armor1 => {
                    dispatch(action.setEnchantement(enchantement));
                    dispatch(action.setPending(false));
                    dispatch(balanceTonToast("success", "Ajout réussie"));
                }
            ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
            dispatch(balanceTonToast("error", "Erreur lors de l'ajout"));
            return Promise.reject(error);
        })
    }
};

export const updateEnchantement = (enchantement) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        addEnchantement(enchantement)
            .then(enchatement1 => {
                    dispatch(action.setEnchantement(enchantement));
                    dispatch(action.setPending(false));
                    dispatch(balanceTonToast("success", "Mise à jour réussie"));
                }
            ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
            dispatch(balanceTonToast("error", "Erreur lors de la mise à jour"));
            return Promise.reject(error);
        })
    }
};