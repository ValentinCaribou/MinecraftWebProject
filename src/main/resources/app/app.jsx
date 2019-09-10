import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import armorsReducers from './redux/armors/reducers';
import weaponsReducers from "./redux/weapons/reducers";
import toastReducer from "./redux/toast/reducers";
import Main from "./main"
import thunk from 'redux-thunk';
import '@fortawesome/fontawesome-free/css/all.min.css';


export function empty(o){
    return (
        ( o === undefined || o === null ) ||
        ( typeof o === "number" && o === 0 ) ||
        ( typeof o === "string" && o.trim().length === 0 ) ||
        ( Array.isArray(o) && o.length === 0) ||
        ( typeof o === "object" && Object.keys(o).length === 0 )
    )
}
//à commenté car crée une erreur/warning dans la console :)
Object.prototype.empty = function(){
    if(null === this || this === undefined)
        return null;
    else
        return Object.keys(this).length === 0;
};
String.prototype.empty = function(){
    return (this === null || this.trim().length === 0);
};
Array.prototype.empty = function(){
    return (this === null || this.length === 0);
};


const reducer = combineReducers({
    armorsReducers,
    weaponsReducers,
    toastReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default class App extends Component {

    render() {
        return(
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    }
}