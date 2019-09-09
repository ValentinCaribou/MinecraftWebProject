import React, {Component} from "react";
import Item from './item/item';
import IsPending from "../../components/isPending/isPending";
import weaponsReducers from "../../redux/weapons/reducers";
import {connect} from "react-redux";

class ListeItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {listeItem, isLoading} = this.props;
        console.log(this.props);
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
                                            listeItem !== undefined &&
                                                listeItem.length > 0 ?
                                                    listeItem.map((item) => {
                                                        return <Item key={item.id}
                                                                           dispatch={this.props.dispatch}
                                                                           repas={item}/>
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
    }
};

export default connect(mapStateToProps)(ListeItems);