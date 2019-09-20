import React, {Component} from "react";
import {AddButton, BackButtonArrow, RemoveButton} from "../../components/buttons/Buttons";
import {connect} from "react-redux";
import './item.scss'
import IsPending from "../../components/isPending/isPending";
import {InfoArmor} from "../../components/info/InfoArmor";
import {updateWeapon} from "../../redux/weapons/dispatch";
import {getArmor, updateArmor} from "../../redux/armors/dispatch";
import {getEnchantementObtention} from "../../redux/enchantement/dispatch";
import InputDiv from "../../components/inputs/input-div";
import PointDegat from "../../components/pointDegat/pointDegat";


class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormatPortrait: true,
            inAdd: false,
            inEdit: false,
            isShowPopup: false,
            value:"",
            bonusDefense:0,
            degatsSubisComplet:0,
            degatsSubis:0,
            impair: false,
            impairComplet: false,
            listeEnchantementEquiper: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(getArmor(this.props.match.params.id));
        this.props.dispatch(getEnchantementObtention("Armure, Multi Support"));
    }

    updateArmor = (armor) => {
        this.props.dispatch(updateArmor(armor))
    };

    addEnchantement = (enchantement) => {
        this.state.listeEnchantementEquiper.push(enchantement);
        let defense = 0;
        this.state.listeEnchantementEquiper.forEach(equipement => {
            defense = degat + equipement.damage;
        });
        this.setState({bonusDegat: degat});
    };

    handleOnChange = (e) => {
        const target = e.currentTarget;
        this.setState({value: target.value});
        this.simulationAttaque(target.value);
    };

    simulationAttaque = (damage) => {
        const {armor} = this.props;
        let robustesse = 0;
        let robustesseComplet = 0;
        let pointOfDefenseFull = 0;
        if(armor.nom.toLowerCase().includes("diamant")){
            robustesse = 2;
            robustesseComplet = 8;
            pointOfDefenseFull = 20;
        } else if (armor.nom.toLowerCase().includes("fer")){
            robustesse = 0;
            pointOfDefenseFull = 15;
        } else {
            pointOfDefenseFull = 10;
        }
        let complet = true;
        // Formule pour armure complete OK
        let max = 0.8;
        let degatsSubisComplet = Math.round( damage * ( 1 - max * ( pointOfDefenseFull / 5 + pointOfDefenseFull - damage / ( 2 + robustesseComplet / 4 ) ) / 25 ));
        this.transformeNumber(degatsSubisComplet, complet);
        max = 0;
        for (let i = 0; i < armor.pointOfDefense; i++){
            max = max + 0.08
        }
        complet = false;
        let degatsSubis = Math.round(damage * (1 - max * (armor.pointOfDefense / 5 + armor.pointOfDefense - damage / (2 + robustesse / 4)) / 25));
        this.transformeNumber(degatsSubis, complet);
    };

    transformeNumber = (number, complet) => {
        let nombreFinal = number;
        if (number !== 0){
            if (number%2 === 0){
                nombreFinal = number / 2;
            } else{
                nombreFinal = (number - 1) /2;
            }
            if (complet){
                this.setState({degatsSubisComplet: nombreFinal});
                this.setState({impairComplet: complet});
            } else {
                this.setState({degatsSubis: nombreFinal});
                this.setState({impair: complet});
            }
        }
    };

    render() {
        let {isLoading, dispatch, armor} = this.props;
        let {value, inEdit, degatsSubisComplet, degatsSubis, impair, impairComplet} = this.state;
        const {inAdd} = this.state;
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
                                        armor !== undefined &&
                                        <InfoArmor
                                            dispatch={this.props.dispatch}
                                            armors={armor}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            updateArmor={this.updateArmor}
                                            creatingWeapon={false}
                                        />
                                    }
                                    <div className="personal-info">
                                        <label>Niveau de Protection : </label>
                                        <InputDiv name="value" label="dégat subit :" type="number" readOnly={false}
                                                  value={value}
                                                  onChange={this.handleOnChange} required/>

                                        {
                                            degatsSubis !== 0 &&
                                            <div>
                                                <div>
                                                    <label>Avec une armure complete : </label>
                                                    <PointDegat nbCoeur={degatsSubisComplet} impair={impairComplet}/>
                                                </div>
                                                <div>
                                                    <label>Avec cette pièce seulement : </label>
                                                    <PointDegat nbCoeur={degatsSubis} impair={impair}/>
                                                </div>
                                            </div>
                                        }

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
        armor: state.armorsReducers.armor,
    }
};
export default connect(mapStateToProps)(Item);
