import React, {Component} from "react";
import {AddButton, BackButtonArrow, RemoveButton} from "../../components/buttons/Buttons";
import {connect} from "react-redux";
import './item.scss'
import IsPending from "../../components/isPending/isPending";
import {InfoArmor} from "../../components/info/InfoArmor";
import {updateWeapon} from "../../redux/weapons/dispatch";
import {getArmor, updateArmor} from "../../redux/armors/dispatch";


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
        this.props.dispatch(getArmor(this.props.match.params.id));
    }

    updateArmor = (armor) => {
        this.props.dispatch(updateArmor(armor))
    };

    render() {
        let {isLoading, dispatch, armor} = this.props;
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
