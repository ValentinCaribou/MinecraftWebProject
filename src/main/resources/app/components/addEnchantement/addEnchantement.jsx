import React, {Component} from 'react';
import './addEnchantement.scss';
import {connect} from 'react-redux';
import SelectInputEnchantement from "../inputs/SelectInput/selectInputEnchantement";
import {TextAreaInput} from "../inputs/TextAreaInput/TextAreaInput";
import {AjoutButtonAlt} from "../buttons/Buttons";
import {getEnchantement} from "../../redux/enchantement/dispatch";
import {balanceTonToast} from "../../redux/toast/dispatch";


class AddEnchantement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ajoutEnchantement: "",
            EnchantementVide: false,
            EnchantementDejaPresent: [],
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

    handleSubmit() {
        let {enchantements, enchantement} = this.state;
        if (this.state.EnchantementVide){
            if (enchantement === undefined){
                this.props.dispatch(balanceTonToast("error", "Veuillez saisir un enchantement valide"));
            } else {
                if (this.state.EnchantementDejaPresent.length !== 0){
                    this.state.EnchantementDejaPresent.map((unEnchantement, index) => {
                        let nomEnchantement = unEnchantement.nom.split(" ");
                        let nomNewEnchantement = enchantement.nom.split(" ");
                        if(((nomEnchantement[0].includes("Sharpness")) && (nomNewEnchantement[0].includes("Smite") || nomNewEnchantement[0].includes("smite"))) ||
                            ((nomEnchantement[0].includes("Smite") || nomEnchantement[0].includes("smite")) && nomNewEnchantement[0].includes("Sharpness")) ||
                            ((nomEnchantement[0].includes("Smite") || nomEnchantement[0].includes("smite")) && (nomNewEnchantement[0].includes("Bane") || nomNewEnchantement[0].includes("bane"))) ||
                            ((nomEnchantement[0].includes("Bane") || nomEnchantement[0].includes("bane")) && (nomNewEnchantement[0].includes("smite") || nomNewEnchantement[0].includes("Smite"))) ||
                            ((nomEnchantement[0].includes("Sharpness")) && (nomNewEnchantement[0].includes("bane") || nomNewEnchantement[0].includes("Bane"))) ||
                            ((nomEnchantement[0].includes("bane") || nomEnchantement[0].includes("Bane")) && nomNewEnchantement[0].includes("Sharpness"))){
                            this.props.dispatch(balanceTonToast("error", "Enchantement incompatible"));
                        } else {
                            this.state.EnchantementDejaPresent.push(enchantement);
                            enchantements.map((unEnchantement, index) => {
                                if (unEnchantement.id === enchantement.id){
                                    enchantements.splice(index, 1);
                                }
                            });
                            this.setState({enchantements});
                            this.props.dispatch(balanceTonToast("success", "Enchantement ajouter"));
                            this.props.onChange(enchantement);
                        }
                    });
                } else {
                    this.state.EnchantementDejaPresent.push(enchantement);
                    this.setState({enchantements});
                    this.props.dispatch(balanceTonToast("success", "Enchantement ajouter"));
                    this.props.onChange(enchantement);
                }
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

export default connect(mapStateToProps)(AddEnchantement);
