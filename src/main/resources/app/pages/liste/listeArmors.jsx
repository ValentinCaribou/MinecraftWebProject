import React, {Component} from "react";
import Item from './item/item';
import IsPending from "../../components/isPending/isPending";
import {connect} from "react-redux";
import './liste.scss'
import {getArmors} from "../../redux/armors/dispatch"

class ListeArmors extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getArmors());
    }

    render() {
        const {isLoading, armors} = this.props;
        return (
            <div className="table-search">
                <div className="list-repas">
                    {
                        isLoading ? (
                                <IsPending className="repas-pending"/>
                            )
                            :
                            (<>
                                    {
                                        armors !== undefined &&
                                        <section className="card">
                                            {
                                                armors.length > 0 ?
                                                    armors.map((item) => {
                                                        return <Item key={item.id}
                                                                     dispatch={this.props.dispatch}
                                                                     item={item}/>
                                                    })
                                                    :
                                                    <div className="container-white no-results"> Aucun résultat trouvé !</div>
                                            }
                                        </section>
                                    }
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
        armors: state.armorsReducers.armors,
    }
};

export default connect(mapStateToProps)(ListeArmors);