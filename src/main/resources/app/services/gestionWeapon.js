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

export function addWeapon(weapon){
    console.log(weapon);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(weapon),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkStatus)
        .then(response => response.json())
}