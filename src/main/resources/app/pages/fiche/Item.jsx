import React, {Component} from "react";
import {AddButton, AjoutButtonAlt, BackButtonArrow, RemoveButton} from "../../components/buttons/Buttons";
import {connect} from "react-redux";
import './item.scss'
import IsPending from "../../components/isPending/isPending";
import {InfoWeapon} from "../../components/info/InfoWeapon";
import {updateWeapon,getWeapon} from "../../redux/weapons/dispatch";
import {getEnchantementObtention, getEnchantement} from "../../redux/enchantement/dispatch";
import AddEnchantement from '../../components/addEnchantement/addEnchantement'
import Enchantement from "../../components/Enchantement/Enchantement";


class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormatPortrait: true,
            inAdd: false,
            inEdit: false,
            isShowPopup: false,
            listeEnchantementEquiper: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(getWeapon(this.props.match.params.id));
        this.props.dispatch(getEnchantementObtention("Arme"));
    }

    _deleteEnchantement = (index) => {
        const {dispatch, enchantement} = this.props;
    };

    updateWeapon = (weapon) => {
        this.props.dispatch(updateWeapon(weapon));
    };

    handleOnChange = (e) => {
        const target = e.currentTarget;
        if (target.value !== 1 || target.value !== "1"){
            this.props.dispatch(getEnchantement(target.value));
        }
    };

    addEnchantement = (enchantement) => {
        console.log(enchantement);
        this.state.listeEnchantementEquiper.push(enchantement);
    };

    render() {
        let {weapon, isLoading, dispatch, enchantements, enchantement} = this.props;
        const {inAdd, listeEnchantementEquiper} = this.state;
        return (
            <>
                <div id="white-pattern"></div>
                <div id="page-wrap" className="details-repas">
                    {
                        isLoading ?
                            <IsPending className="repas-pending"/>
                        :
                            <>
                                <div className="repas-fiche container-white responsive-witdh-fiche">
                                    <BackButtonArrow/>
                                    {
                                        weapon !== undefined &&
                                        <InfoWeapon
                                            dispatch={this.props.dispatch}
                                            weapons={weapon}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            updateWeapon={this.updateWeapon}
                                            creatingWeapon={false}
                                        />
                                    }
                                </div>
                                <div className="repas-fiche-deuxiemeColonne">
                                    <div className="repas-participant container-white">
                                        <div className="chips">
                                            <label>Enchantement disponible : </label>
                                            <AddEnchantement
                                                dispatch={this.props.dispatch}
                                                enchantements={enchantements}
                                                enchantement={enchantement}
                                                onChange={this.addEnchantement}
                                                />
                                        </div>
                                        <div className="chips">
                                            <label>Enchantement ajouter : </label>
                                            <div className="ingredient">
                                                {
                                                    !listeEnchantementEquiper.empty() ?
                                                        listeEnchantementEquiper.sort(function (a, b) {
                                                            return !a ? 1 : !b;
                                                        }).map((enchantement, index) => {
                                                            return (
                                                                <Enchantement
                                                                    key={index}
                                                                    idEnchantement={index}
                                                                    onDelete={this._deleteEnchantement}
                                                                    readOnly={inAdd}
                                                                    enchantement={enchantement}
                                                                />
                                                            )
                                                        })
                                                        :
                                                        <i>Aucun enchantement attribuer pour le moment.</i>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        weapon: state.weaponsReducers.weapon,
        enchantements: state.enchantementReducer.enchantements,
        enchantement: state.enchantementReducer.enchantement,
    }
};
export default connect(mapStateToProps)(Item);
