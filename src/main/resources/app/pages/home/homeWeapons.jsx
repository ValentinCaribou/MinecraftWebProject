import React from 'react';
import ListeWeapons from "../liste/listeWeapons";
import {connect} from "react-redux";

class HomeWeapons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <ListeWeapons {...props}/>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            weapons: state.armorsReducers.weapons,
            isPending:state.weaponsReducers.isPending,
        }
    };


export default connect(mapStateToProps) (HomeWeapons);