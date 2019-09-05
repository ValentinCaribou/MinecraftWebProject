import {
    getArmorList,
    getArmorById,
    addArmor
} from "../../services/gestionArmor";

import action from "./action";

export const getArmors = () => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getArmorList()
            .then(armors => {
                    dispatch(action.setWeapons(armors));
                    dispatch(action.setPending(false));
                    return Promise.resolve();
                }
            ).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
    }
};

export const getArmor = (id) => {
    return (dispatch) => {
        dispatch(action.setPending(true));
        getArmorById(id)
            .then(armor => {
                    dispatch(action.setWeapons(armor));
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
                    dispatch(action.setWeapon(armor));
                    dispatch(action.setPending(false));
                }
            ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
            return Promise.reject(error);
        })
    }
};