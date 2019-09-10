import types from "./types";

const defaultState = {
    weapon: {
        id:'',
        nom:'',
        categorie:'',
        image:'',
        damage:0,
        range:0,
        DPS:0
    },
    weapons: [],
    isPending: false
};

const weaponReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_WEAPON:
            return {
                ...state,
                weapon: action.weapon,
            };
        case types.SET_WEAPONS:
            return {
                ...state,
                weapons: action.weapons,
            };
        case types.SET_PENDING:
            return {
                ...state,
                pending: action.pending,
            };
        default :
            return state;
    }
};

export default weaponReducer;