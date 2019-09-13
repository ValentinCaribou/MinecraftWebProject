import React, {Component} from "react";
import {AddButton, BackButtonArrow, RemoveButton} from "../../components/buttons/Buttons";
import {connect} from "react-redux";
import './item.scss'
import IsPending from "../../components/isPending/isPending";
import {InfoEnchantement} from "../../components/info/InfoEnchantement";
import {getEnchantement, updateEnchantement} from "../../redux/enchantement/dispatch";


class ItemEnchantement extends Component {

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
        this.props.dispatch(getEnchantement(this.props.match.params.id));
    }

    updateEnchantement = (enchantement) => {
        this.props.dispatch(updateEnchantement(enchantement))
    };

    render() {
        let {isLoading, dispatch, enchantement} = this.props;
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
                                        enchantement !== undefined &&
                                        <InfoEnchantement
                                            dispatch={this.props.dispatch}
                                            enchantements={enchantement}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            updateEnchantement={this.updateEnchantement}
                                            createEnchantement={false}
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
        enchantement: state.enchantementReducer.enchantement,
    }
};
export default connect(mapStateToProps)(ItemEnchantement);
