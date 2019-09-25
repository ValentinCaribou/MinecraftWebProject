import React, {Component} from 'react';
import './addEnchantementItem.scss';
import {connect} from 'react-redux';
import SelectInputEnchantement from "../inputs/SelectInput/selectInputEnchantement";
import {TextAreaInput} from "../inputs/TextAreaInput/TextAreaInput";
import {AjoutButtonAlt} from "../buttons/Buttons";
import {getEnchantement} from "../../redux/enchantement/dispatch";
import {balanceTonToast} from "../../redux/toast/dispatch";
import {Link} from "react-router-dom";


class AddEnchantementItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ajoutEnchantement: "",
            EnchantementVide: false,
            EnchantementDejaPresent: [],
            enchantementAjouter: [],
            enchantements: this.props.enchantements,
            enchantement: this.props.enchantement,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            this.setState({enchantements: this.props.enchantements});
            this.setState({enchantement: {...this.props.enchantement}});
        }
    }

    // handleSubmit() {
    //     let {enchantements, enchantement} = this.state;
    //     if (this.state.EnchantementVide){
    //         if (enchantement === undefined){
    //             this.props.dispatch(balanceTonToast("error", "Veuillez saisir un enchantement valide"));
    //         } else {
    //             if (this.state.EnchantementDejaPresent.length !== 0){
    //                 this.state.EnchantementDejaPresent.map((unEnchantement, index) => {
    //                     let nomEnchantement = unEnchantement.nom.split(" ");
    //                     let nomNewEnchantement = enchantement.nom.split(" ");
    //                     if(((nomEnchantement[0].includes("Sharpness")) && (nomNewEnchantement[0].includes("Smite") || nomNewEnchantement[0].includes("smite"))) ||
    //                         ((nomEnchantement[0].includes("Smite") || nomEnchantement[0].includes("smite")) && nomNewEnchantement[0].includes("Sharpness")) ||
    //                         ((nomEnchantement[0].includes("Smite") || nomEnchantement[0].includes("smite")) && (nomNewEnchantement[0].includes("Bane") || nomNewEnchantement[0].includes("bane"))) ||
    //                         ((nomEnchantement[0].includes("Bane") || nomEnchantement[0].includes("bane")) && (nomNewEnchantement[0].includes("smite") || nomNewEnchantement[0].includes("Smite"))) ||
    //                         ((nomEnchantement[0].includes("Sharpness")) && (nomNewEnchantement[0].includes("bane") || nomNewEnchantement[0].includes("Bane"))) ||
    //                         ((nomEnchantement[0].includes("bane") || nomEnchantement[0].includes("Bane")) && nomNewEnchantement[0].includes("Sharpness"))){
    //                         this.props.dispatch(balanceTonToast("error", "Enchantement incompatible"));
    //                     } else {
    //                         this.state.EnchantementDejaPresent.map(enchantementPresent => {
    //                             if(enchantementPresent.id !== unEnchantement.id){
    //                                 this.state.EnchantementDejaPresent.push(enchantement);
    //                             }
    //                         });
    //                         enchantements.map((unEnchantement, index) => {
    //                             if (unEnchantement.id === enchantement.id){
    //                                 enchantements.splice(index, 1);
    //                             }
    //                         });
    //                         this.setState({enchantements});
    //                         this.props.dispatch(balanceTonToast("success", "Enchantement ajouter"));
    //                         this.props.onChange(enchantement);
    //                     }
    //                 });
    //             } else {
    //                 this.state.EnchantementDejaPresent.push(enchantement);
    //                 enchantements.map((unEnchantement, index) => {
    //                     if (unEnchantement.id === enchantement.id){
    //                         enchantements.splice(index, 1);
    //                     }
    //                 });
    //                 this.setState({enchantements});
    //                 this.props.dispatch(balanceTonToast("success", "Enchantement ajouter"));
    //                 this.props.onChange(enchantement);
    //             }
    //         }
    //     } else {
    //         this.props.dispatch(balanceTonToast("error", "Veuillez saisir un enchantement valide"));
    //     }
    // }

    handleSubmit() {
        let {enchantements, enchantement, enchantementAjouter} = this.state;
        let enchantementIncompatible = [];
        if (this.state.EnchantementVide){
            if (enchantement === undefined){
                this.props.dispatch(balanceTonToast("error", "Veuillez saisir un enchantement valide"));
            } else {
                this.state.EnchantementDejaPresent.push(enchantement);
                enchantements.map((unEnchantement, index) => {
                    let nomEnchantement = unEnchantement.nom.toLowerCase().split(" ");
                    if (unEnchantement.id === enchantement.id){
                        enchantements.splice(index, 1);
                        console.log(unEnchantement.nom);
                        // enchantementAjouter.push(enchantement);
                    }
                    this.state.EnchantementDejaPresent.map(EnchantementPresent => {
                        let newEnchantementPresent = EnchantementPresent.nom.split(" ");
                        if (newEnchantementPresent[0].includes("smite") || newEnchantementPresent[0].includes("sharpness") || newEnchantementPresent[0].includes("bane")){
                            if (nomEnchantement[0].includes("sharpness") || nomEnchantement[0].includes("bane") || nomEnchantement[0].includes("smite")){
                                // Faire l'inverse pour retourner la bonne liste
                            } else {
                                enchantementIncompatible.push(unEnchantement);
                            }
                        }
                    });
                });
                if (enchantementIncompatible.length !== 0){
                    enchantementIncompatible.map(enchantement => {
                        enchantementAjouter.push(enchantement);
                    });
                }
                console.log(enchantementAjouter);
                this.setState({enchantements: enchantementAjouter});
                this.setState({enchantementAjouter});
                this.props.dispatch(balanceTonToast("success", "Enchantement ajouter"));
                this.props.onChange(enchantement);
            }
        } else {
            this.props.dispatch(balanceTonToast("error", "Veuillez saisir un enchantement valide"));
        }
    }

    handleOnChange = (e) => {
        const target = e.currentTarget;
        if (target.value !== "1"){
            this.setState({EnchantementVide: true});
            this.props.dispatch(getEnchantement(target.value));
        } else {
            this.setState({EnchantementVide: false});
        }
    };

    _handleCancelOnClick = () => {
        this.props.cancel();
    };

    render() {
        let enchantements = '';
        let {enchantement} = this.props;
        if (this.state.enchantements === undefined){
            enchantements = this.props.enchantements
        } else {
            enchantements = this.state.enchantements
        }

        return (
            <>
                <div className="input-ingredient-container">
                    <div className="enchantement-info">
                        {
                            enchantements !== undefined &&
                            <SelectInputEnchantement
                                className="input-select-enchantement"
                                label="Enchantement disponible :"
                                type="text"
                                id="enchantement"
                                name="enchantement"
                                valeurDefaut="-- Sélectionner un enchantement --"
                                onChange={this.handleOnChange}
                                boucle={enchantements}
                            />
                        }
                        <div className="input-description-enchantement">
                            {
                                enchantement !== undefined &&
                                <TextAreaInput
                                    label="Description de l'enchantement :"
                                    content={enchantement.description}
                                    alterContent={"Ancun enchantement attribuer..."}
                                    targetPropName="description"
                                    handleChange={this.persistEnchantement}
                                    readOnly={true}
                                    withResume={true}
                                />
                            }
                        </div>
                        {
                            <div className="button-container">
                                <AjoutButtonAlt callback={this.handleSubmit}/>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        enchantement: state.enchantementReducer.enchantement,
    }
};

export default connect(mapStateToProps)(AddEnchantementItem);
