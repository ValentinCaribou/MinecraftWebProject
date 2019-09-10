import {
    getWeaponList,
    getWeaponById,
    addWeapon
} from "../../services/gestionWeapon";

import action from "./action";
import {balanceTonToast} from "../toast/dispatch";

export const getWeapons = () => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getWeaponList()
            .then(weapons => {
                dispatch(action.setWeapons(weapons));
                dispatch(action.setPending(false));
                return Promise.resolve();
            }
        ).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
    }
};

export const getWeapon = (id) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getWeaponById(id)
            .then(weapon => {
                dispatch(action.setWeapon(weapon));
                dispatch(action.setPending(false));
            }
        ).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
    }
};

export const ajoutWeapon = (weapon) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        addWeapon(weapon)
            .then(weapon1 => {
                dispatch(action.setWeapon(weapon));
                dispatch(action.setPending(false));
                dispatch(balanceTonToast("success", "Ajout réussi"));
            }
        ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
            dispatch(balanceTonToast("success", "Erreur lors de l'ajout"));
            return Promise.reject(error);
        })
    }
};

export const updateWeapon = (weapon) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        addWeapon(weapon)
            .then(weapon1 => {
                    dispatch(action.setWeapon(weapon));
                    dispatch(action.setPending(false));
                    dispatch(balanceTonToast("success", "Modification réussi"));
                }
            ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
            dispatch(balanceTonToast("error", "Erreur lors de la modification"));
            return Promise.reject(error);
        })
    }
};