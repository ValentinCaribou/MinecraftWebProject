import React from 'react';
import ListeItems from "../liste/liste";
import {connect} from "react-redux";
import weaponsReducers from "../../redux/weapons/reducers";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <ListeItems {...props}/>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            listeWeapon: state.weaponsReducers.listeWeapon,
            isPending:state.weaponsReducers.isPending,
        }
    };


export default connect(mapStateToProps) (Home);