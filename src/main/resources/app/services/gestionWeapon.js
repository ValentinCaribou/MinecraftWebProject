import {checkStatus} from "./utils";

const url = "/app/weapons";

export function getWeaponList(){
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
}

export function getWeaponById(id){
    return fetch(url + "/" + id)
        .then(checkStatus)
        .then(response => response.json())
}