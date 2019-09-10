import {
    getArmorList,
    getArmorById,
    addArmor
} from "../../services/gestionArmor";
import {balanceTonToast} from "../toast/dispatch";

import action from "./action";

export const getArmors = () => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getArmorList()
            .then(armors => {
                    dispatch(action.setArmors(armors));
                    dispatch(action.setPending(false));
                    return Promise.resolve();
                }
            ).catch((error) => {
            console.log(error);
            dispatch(balanceTonToast("error", "Echec lors de la récupération des armures"));
            return Promise.reject(error);
        })
    }
};

export const getArmor = (id) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getArmorById(id)
            .then(armor => {
                    dispatch(action.setArmor(armor));
                    dispatch(action.setPending(false));
                    return Promise.resolve();
                }
            ).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
    }
};

export const ajoutArmor = (armor) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        addArmor(armor)
            .then(armor1 => {
                    dispatch(action.setArmor(armor));
                    dispatch(action.setPending(false));
                    dispatch(balanceTonToast("success", "Ajout réussi"));
                }
            ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
            dispatch(balanceTonToast("error", "Erreur lors de l'ajout"));
            return Promise.reject(error);
        })
    }
};