import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ajoutArmor} from "../../app/redux/armors/dispatch";
import {AddButton, CancelButton, BackButtonArrow} from "../components/buttons/Buttons";
import {InfoWeapon} from "../components/info/InfoWeapon"
import IsPending from "../components/isPending/isPending";
import {InfoArmor} from "../components/info/InfoArmor";

const defaultArmor = {
    nom: "",
    categorie: "",
    image: "",
    resistance: 0,
    pointOfDefense: 0
};
const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE_RATIO = 1.5;
const WIDTH_IMAGE_RATIO = 1.5;

class AddArmor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            armor: defaultArmor,
            isShowPopup: false,
            setIsFormatPortrait: true,
            isFormatPortrait: true,
            inAdd: false,
            inEdit: false,
        };
    }

    togglePopup() {
        this.setState({isShowPopup: !this.state.isShowPopup})
    };

    createArmors = (armors) => {
        const {dispatch} = this.props;
        if (this.state.isShowPopup) {
            this.togglePopup();
        } else {
            dispatch(ajoutArmor(armors))
                .then((response) => {
                    document.location.href = `/weapons/${response.id}`;
                    this.setState({armor: defaultArmor});
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    render() {
        let {isLoading} = this.props;
        let {inAdd, armor} = this.state;
        return (
            <>
                <div id="white-pattern"></div>
                <div id="page-wrap" className="details-repas">
                    {
                        isLoading
                            ? <IsPending className="repas-pending"/>
                            : (
                                <>
                                    <div className="repas-fiche container-white responsive-witdh-fiche">
                                        <BackButtonArrow/>
                                        <InfoArmor
                                            dispatch={this.props.dispatch}
                                            armors={armor}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            // getImage={this.getImage}
                                            updateArmor={this.createArmors}
                                            creatingArmor={true}
                                        />
                                    </div>
                                </>
                            )
                    }
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        weapon: state.armorsReducers.armor,
    }
};
export default connect(mapStateToProps)(AddArmor);