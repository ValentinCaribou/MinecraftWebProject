import React, {Component} from "react";
import {AddButton, BackButtonArrow, RemoveButton} from "../../components/buttons/Buttons";
import {connect} from "react-redux";
import './item.scss'
import IsPending from "../../components/isPending/isPending";
import {InfoWeapon} from "../../components/info/InfoWeapon";
import {updateWeapon,getWeapon} from "../../redux/weapons/dispatch";
import {} from "../../redux/enchantement/dispatch";
import SelectInput from "../../components/inputs/SelectInput/selectInput";


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
    }

    updateWeapon = (weapon) => {
        this.props.dispatch(updateWeapon(weapon))
    };

    render() {
        let {weapon, isLoading, dispatch} = this.props;
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
                                            <div className="personal-info">
                                                <SelectInput
                                                    className="input-div"
                                                    label="Enchantement disponible"
                                                    type="text"
                                                    id="enchantement"
                                                    name="enchantement"
                                                    valeurDefaut="-- Sélectionner un enchantement --"
                                                    onChange={this.handleOnChange}
                                                    boucle={categorie}
                                                />
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
    }
};
export default connect(mapStateToProps)(Item);
