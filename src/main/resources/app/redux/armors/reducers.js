import types from "./types";

const defaultState = {
    armor: {
        id:'',
        nom:'',
        categorie:'',
        image:'',
        resistance:0,
        pointOfDefense:0
    },
    isPending: false
};

const armorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_ARMOR:
            return {
                ...state,
                armor: action.armor,
            };
        case types.SET_ARMORS:
            return {
                ...state,
                armors: action.armors,
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

export default armorReducer;