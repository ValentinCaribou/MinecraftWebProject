import React, { Component } from 'react';
import BurgerButton from './components/burger-menu/burger-button';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import {connect} from 'react-redux';
import addWeapons from "./pages/addWeapon";
import addArmors from "./pages/addArmors";
import Home from "./pages/home/home";
import './index.css';
import Item from "./pages/fiche/Item";

class Main extends Component {

    render() {

        const {dispatch} = this.props;

        return (
            <div id="body">
                <header>
                    <div className="nav-container">
                        <h1>Minecraft Web Project</h1>
                    </div>
                </header>

                <Menu pageWrapId="page-wrap" width="auto"
                      menuClassName="my-menu"
                      outerContainerId="body" customBurgerIcon={<BurgerButton/>}
                      burgerButtonClassName="burger-button"
                      customCrossIcon={<BurgerButton menu={true} cross="cross"/>} disableAutoFocus>


                    <div className="h1">Menu</div>
                    <label className="label">Minecraft Web Project</label>

                    <span />

                    <a id="listeArme" className="bm-item menu-item" href="/"><i className="fas fa-list-ul"/> Liste des
                        items</a>

                    <a id="listeArme" className="bm-item menu-item" href="/armes"><i className="fas fa-list-ul"/> Liste des
                        Armes</a>

                    <a id="listeArmure" className="bm-item menu-item" href="/armures"><i className="fas fa-history" /> Liste des Armures</a>

                    <span />

                    <a id="ajoutArme" className="bm-item menu-item" href="/armes/add"><i className="fas fa-cocktail"/> Ajouter une arme</a>

                    <a id="ajoutArmure" className="bm-item menu-item" href="/armures/add"><i className="fas fa-cocktail"/> Ajouter une Armure</a>
                </Menu>

                <main>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/armes/add" component={addWeapons}/>
                            <Route exact path="/armures/add" component={addArmors}/>
                            <Route exact path="/armes/:id" component={Item}/>
                            {/*<Route exact path="/armures/:id" component={Armures}/>*/}
                            {/*<Route component={Error404}/>*/}
                        </Switch>
                    </Router>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // toast: state.toastReducer.toast,
    }
};

export default connect(mapStateToProps)(Main);
