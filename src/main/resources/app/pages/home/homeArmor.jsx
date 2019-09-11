import React from 'react';
import ListeArmors from "../liste/listeArmors";
import {connect} from "react-redux";

class HomeArmor extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        return (
            <ListeArmors {...props}/>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            armors: state.armorsReducers.armors,
            isPending:state.weaponsReducers.isPending,
        }
    };


export default connect(mapStateToProps) (HomeArmor);