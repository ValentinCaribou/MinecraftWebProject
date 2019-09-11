import React, { Component } from 'react';
import BurgerButton from './components/burger-menu/burger-button';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import {connect} from 'react-redux';
import addWeapons from "./pages/addWeapon";
import addArmors from "./pages/addArmors";
import Home from "./pages/home/home";
import HomeArmor from "./pages/home/homeArmor";
import HomeWeapons from "./pages/home/homeWeapons";
import './index.css';
import Item from "./pages/fiche/Item";
import ItemArmor from "./pages/fiche/ItemArmor";
import Toast from "./components/toast";
import Error404 from "./pages/error/error404";
import Sword from "./assets/image/epeePierre.png"
import Armor from "./assets/image/diamondchestplate_icon32.png"


class Main extends Component {

    render() {

        const {dispatch, toast} = this.props;

        return (
            <div id="body">
                <header>
                    <div className="nav-container">
                        <h1>Minecraft Web Project</h1>
                    </div>
                </header>

                {
                    toast &&
                    <Toast type={toast.type} message={toast.message} timeout={toast.timeout}
                           closeCallback={toast.closeCallback}
                           dispatch={dispatch}/>
                }

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

                    <a id="listeArme" className="bm-item menu-item" href="/armes"><img className="imageEpee" src={Sword}/> Liste des
                        Armes</a>

                    <a id="listeArmure" className="bm-item menu-item" href="/armures"><img className="imageEpee" src={Armor}/> Liste des Armures</a>

                    <span />

                    <a id="ajoutArme" className="bm-item menu-item" href="/armes/add"><img className="imageEpee" src={Sword}/> Ajouter une arme</a>

                    <a id="ajoutArmure" className="bm-item menu-item" href="/armures/add"><img className="imageEpee" src={Armor}/> Ajouter une Armure</a>
                </Menu>

                <main>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/armes" component={HomeWeapons}/>
                            <Route exact path="/armures" component={HomeArmor}/>
                            <Route exact path="/armes/add" component={addWeapons}/>
                            <Route exact path="/armures/add" component={addArmors}/>
                            <Route exact path="/armes/:id" component={Item}/>
                            <Route exact path="/armure/:id" component={ItemArmor}/>
                            <Route component={Error404}/>
                        </Switch>
                    </Router>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toast: state.toastReducer.toast,
    }
};

export default connect(mapStateToProps)(Main);
