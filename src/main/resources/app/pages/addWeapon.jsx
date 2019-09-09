import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ajoutWeapon} from "../../app/redux/weapons/dispatch";
import {AddButton, CancelButton, BackButtonArrow} from "../components/buttons/Buttons";
import {InfoWeapon} from "../components/info/InfoWeapon"
import IsPending from "../components/isPending/isPending";
import "./add.scss"

const defaultWeapon = {
    nom: "",
    categorie: "",
    image: "",
    damage: "",
    range: "",
    DPS:""
};
const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE_RATIO = 1.5;
const WIDTH_IMAGE_RATIO = 1.5;

class AddWeapon extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            weapon: defaultWeapon,
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

    createWeapons = (weapons) => {
        const {dispatch} = this.props;
        console.log(weapons);
        if (this.state.isShowPopup) {
            this.togglePopup();
        } else {
            dispatch(ajoutWeapon(weapons))
                .then((response) => {
                    document.location.href = `/weapons/${response.id}`;
                    this.setState({weapon: defaultWeapon});
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    render() {
        let {isLoading} = this.props;
        let {inAdd, weapon} = this.state;
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
                                        <InfoWeapon
                                            dispatch={this.props.dispatch}
                                            weapons={weapon}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            // getImage={this.getImage}
                                            updateWeapon={this.createWeapons}
                                            creatingWeapon={true}
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
        weapon: state.weaponsReducers.weapon,
    }
};
export default connect(mapStateToProps)(AddWeapon);