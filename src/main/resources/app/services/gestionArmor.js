import {checkStatus} from "./utils";

const url = "/app/armors";

export function getArmorList(){
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
}

export function getArmorById(id){
    return fetch(url + "/" + id)
        .then(checkStatus)
        .then(response => response.json())
}

export function addArmor(armor){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(armor),
        headers: {
            'content-types':'application/json',
        }
    })
        .then(checkStatus)
        .then(response => response.json())
}