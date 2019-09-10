import React, {Component} from "react";
import {AddButton, BackButtonArrow, RemoveButton} from "../../components/buttons/Buttons";
import {connect} from "react-redux";
import './item.scss'
import IsPending from "../../components/isPending/isPending";
import {InfoWeapon} from "../../components/info/InfoWeapon";
import {updateWeapon} from "../../redux/weapons/dispatch";


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
                                    <InfoWeapon
                                        dispatch={this.props.dispatch}
                                        weapons={weapon}
                                        isFormatPortrait={this.state.isFormatPortrait}
                                        // getImage={this.getImage}
                                        updateWeapon={this.updateWeapon}
                                        creatingWeapon={false}
                                    />
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
    }
};
export default connect(mapStateToProps)(Item);
