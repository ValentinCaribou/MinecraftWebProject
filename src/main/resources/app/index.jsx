import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import App from './app';

dotenv.config();
function addScript() {
    if (process.env.NODE_ENV === "development") {
        if(!process.env.URL_DEV){
            throw new Error("Veuillez spécifier l'url de développement dans le champ Environments (Edits Configurations du watch) comme suit URL_DEV=votreAdresseIP");
        }
        let script = document.createElement("script");
        script.src = `http://${process.env.URL_DEV}:35729/livereload.js`;
        console.log(process.env.URL_DEV);
        document.body.appendChild(script);
        script.onload = (loadPage) => {
            ReactDOM
                .render(
                    <App/>,
                    document
                        .getElementById(
                            'app'
                        )
                )
            ;
        }
    }else{
        ReactDOM
            .render(
                <App/>,
                document
                    .getElementById(
                        'app'
                    )
            )
        ;
    }
    console.log("test");
}

addScript();