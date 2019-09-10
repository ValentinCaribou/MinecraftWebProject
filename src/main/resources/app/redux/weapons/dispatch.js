import {
    getWeaponList,
    getWeaponById,
    addWeapon
} from "../../services/gestionWeapon";

import action from "./action";

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
            }
        ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
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
                }
            ).catch((error) => {
            console.log(error);
            dispatch(action.setPending(false));
            return Promise.reject(error);
        })
    }
};