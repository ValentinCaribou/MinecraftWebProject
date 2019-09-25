import types from "./types";

const defaultState = {
    enchantement: {
        id:'',
        nom:'',
        description:'',
        obtenable:'',
        niveau:0,
        damage:0,
        incompatible: [],
        image:''
    },
    isPending: false
};

const enchantementReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_ENCHANTEMENT:
            return {
                ...state,
                enchantement: action.enchantement,
            };
        case types.SET_ENCHANTEMENTS:
            return {
                ...state,
                enchantements: action.enchantements,
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

export default enchantementReducer;