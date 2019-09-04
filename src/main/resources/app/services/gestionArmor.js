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