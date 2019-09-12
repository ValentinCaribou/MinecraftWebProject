import {checkStatus} from "./utils";

const url = "/app/enchantement";

export function getEnchantementList(){
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
}

export function getEnchantementById(id){
    return fetch(url + "/" + id)
        .then(checkStatus)
        .then(response => response.json())
}

export function addEnchantement(armor){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(armor),
        headers: {
            'Content-Type':'application/json',
        }
    })
        .then(checkStatus)
        .then(response => response.json())
}