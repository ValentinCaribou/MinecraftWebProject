import React, {Component} from "react";
import Item from './item/item';
import IsPending from "../../components/isPending/isPending";
import {connect} from "react-redux";
import './liste.scss'
import {getWeapons} from "../../redux/weapons/dispatch";

class ListeWeapons extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getWeapons());
    }

    render() {
        const {weapons, isLoading} = this.props;
        return (
            <div className="table-search">
                <div className="list-repas">
                    {
                        isLoading ? (
                                <IsPending className="repas-pending"/>
                            )
                            :
                            (<>
                                    <section className="card">
                                        {
                                            weapons !== undefined &&
                                            weapons.length > 0 ?
                                                weapons.map((item) => {
                                                    return <Item key={item.id}
                                                                 dispatch={this.props.dispatch}
                                                                 item={item}/>
                                                })
                                                :
                                                <div className="container-white no-results"> Aucun résultat trouvé !</div>
                                        }
                                    </section>
                                </>
                            )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.weaponsReducers.isLoading,
        weapons: state.weaponsReducers.weapons,
    }
};

export default connect(mapStateToProps)(ListeWeapons);