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
import AddEnchantement from "../../components/addEnchantement/addEnchantement";
import Enchantement from "../../components/Enchantement/Enchantement";


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
            bonusResistance:0,
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
        let bonusResistance = 0;
        if(enchantement.nom.toLowerCase().includes("unbreaking")){
            let level = enchantement.nom.split(" ");
            if(level[1] === "I"){
                bonusResistance = Math.round(this.props.armor.resistance * 0.25);
                console.log(bonusResistance)
            } else if(level[1] === "II"){
                bonusResistance = Math.round(this.props.armor.resistance * 0.36);
            } else {
                bonusResistance = Math.round(this.props.armor.resistance * 0.47);
            }
        }
        this.setState({bonusResistance});
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
        let {isLoading, dispatch, armor, enchantements, enchantement} = this.props;
        let {value, inEdit, degatsSubisComplet, listeEnchantementEquiper, degatsSubis, impair, impairComplet, bonusResistance} = this.state;
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
                                            bonusResistance={bonusResistance}
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
        armor: state.armorsReducers.armor,
        enchantements: state.enchantementReducer.enchantements,
        enchantement: state.enchantementReducer.enchantement,
    }
};
export default connect(mapStateToProps)(Item);
