import types from "./types";

const defaultState = {
    toast: undefined
}

const toastReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SHOW_TOAST:
            return {
                ...state,
                toast: action.toast,
            };
        case types.HIDE_TOAST:
            return {
                ...state,
                toast: undefined
            };
        default:
            return state;
    }
};

export default toastReducer;