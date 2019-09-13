import React, {Component} from "react";
import {AddButton, AjoutButtonAlt, BackButtonArrow, RemoveButton} from "../../components/buttons/Buttons";
import {connect} from "react-redux";
import './item.scss'
import IsPending from "../../components/isPending/isPending";
import {InfoWeapon} from "../../components/info/InfoWeapon";
import {updateWeapon,getWeapon} from "../../redux/weapons/dispatch";
import {getEnchantementObtention, getEnchantement} from "../../redux/enchantement/dispatch";
import SelectInputEnchantement from "../../components/inputs/SelectInput/selectInputEnchantement";
import {TextAreaInput} from "../../components/inputs/TextAreaInput/TextAreaInput";


class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormatPortrait: true,
            inAdd: false,
            inEdit: false,
            isShowPopup: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(getWeapon(this.props.match.params.id));
        this.props.dispatch(getEnchantementObtention("Arme"));
    }

    updateWeapon = (weapon) => {
        this.props.dispatch(updateWeapon(weapon));
    };

    handleOnChange = (e) => {
        const target = e.currentTarget;
        console.log(target.name, target.value);
        this.props.dispatch(getEnchantement(target.value));
    };

    render() {
        let {weapon, isLoading, dispatch, enchantements, enchantement} = this.props;
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
                                            <label>Enchantement : </label>
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
                                                        <AjoutButtonAlt callback={this.handleSubmitOnclick}/>
                                                    </div>
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
