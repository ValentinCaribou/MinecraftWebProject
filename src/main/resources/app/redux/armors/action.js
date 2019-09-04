import types from "./types"

const setArmor = (armor) => ({
    type: types.SET_ARMOR,
    armor
});

const setArmors = (armors) => ({
    type: types.SET_ARMORS,
    armors
});

const setPending = (pending) => ({
    type: types.SET_PENDING,
    pending
});

export default {
    setArmor,
    setArmors,
    setPending,
}