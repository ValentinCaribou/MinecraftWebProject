import React from 'react';
import ListeEnchantement from "../liste/listeEnchantement";
import {connect} from "react-redux";

class HomeEnchantement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <ListeEnchantement {...props}/>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            enchantements: state.enchantementReducer.enchantements,
            isPending:state.enchantementReducer.isPending,
        }
    };


export default connect(mapStateToProps) (HomeEnchantement);