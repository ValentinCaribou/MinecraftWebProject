import types from "./types"

const setWeapon = (weapon) => ({
    type: types.SET_WEAPON,
    weapon
});

const setWeapons = (weapons) => ({
    type: types.SET_WEAPONS,
    weapons
});

const setPending = (pending) => ({
    type: types.SET_PENDING,
    pending
});

export default {
    setWeapon,
    setWeapons,
    setPending,
}