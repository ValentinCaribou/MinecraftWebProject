import types from "./types"

const setEnchantement = (enchantement) => ({
    type: types.SET_ENCHANTEMENT,
    enchantement
});

const setEnchantements = (enchantement) => ({
    type: types.SET_ENCHANTEMENTS,
    enchantement
});

const setPending = (pending) => ({
    type: types.SET_PENDING,
    pending
});

export default {
    setEnchantement,
    setEnchantements,
    setPending,
}