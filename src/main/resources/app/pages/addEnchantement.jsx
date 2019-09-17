import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ajoutEnchantement} from "../../app/redux/enchantement/dispatch";
import {AddButton, CancelButton, BackButtonArrow} from "../components/buttons/Buttons";
import IsPending from "../components/isPending/isPending";
import {InfoEnchantement} from "../components/info/InfoEnchantement";

const defaultEnchantement = {
    nom: "",
    description: "",
    obtenable: "",
    niveau: 0,
    damage: 0,
    image: ""
};
const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE_RATIO = 1.5;
const WIDTH_IMAGE_RATIO = 1.5;

class AddEnchantement extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            enchantement: defaultEnchantement,
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

    createEnchantement = (enchantement) => {
        const {dispatch} = this.props;
        if (this.state.isShowPopup) {
            this.togglePopup();
        } else {
            dispatch(ajoutEnchantement(enchantement))
                .then((response) => {
                    document.location.href = `/weapons/${response.id}`;
                    this.setState({enchantement: defaultEnchantement});
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    render() {
        let {isLoading} = this.props;
        let {inAdd, enchantement} = this.state;
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
                                        <InfoEnchantement
                                            dispatch={this.props.dispatch}
                                            enchantements={enchantement}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            // getImage={this.getImage}
                                            updateEnchantement={this.createEnchantement}
                                            createEnchantement={true}
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
        enchantement: state.enchantementReducer.enchantement,
    }
};
export default connect(mapStateToProps)(AddEnchantement);