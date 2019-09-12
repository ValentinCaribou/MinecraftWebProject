import React, {Component} from "react";
import Item from './item/item';
import IsPending from "../../components/isPending/isPending";
import {connect} from "react-redux";
import './liste.scss'
import {getEnchantements} from "../../redux/enchantement/dispatch";

class ListeEnchantements extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getEnchantements());
    }

    render() {
        const {enchantements, isLoading} = this.props;
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
                                            enchantements !== undefined &&
                                            enchantements.length > 0 ?
                                                enchantements.map((item) => {
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
        isLoading: state.enchantementReducer.isLoading,
        enchantements: state.enchantementReducer.enchantements,
    }
};

export default connect(mapStateToProps)(ListeEnchantements);