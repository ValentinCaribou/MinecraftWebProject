import React, {Component} from "react";
import Item from './item/item';
import IsPending from "../../components/isPending/isPending";
import {connect} from "react-redux";
import './liste.scss'
import {getEnchantements} from "../../redux/enchantement/dispatch";

class ListeEnchantements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            target:''
        }
    }

    componentDidMount() {
        this.props.dispatch(getEnchantements());
    }

    updateInput = (event) => {
        const props = this.props;
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({value, target});
    };

    filter = () => {
        const {enchantements} = this.props;
        const {value, target} = this.state;
        let filteredEnchantement = enchantements;

        filteredEnchantement = filteredEnchantement.filter(enchantement => enchantement.nom.toUpperCase().includes(value.toUpperCase()));

        return filteredEnchantement;
    };

    render() {
        const {enchantements, isPending} = this.props;
        let {value} = this.state;
        let filteredEnchantement;
        if(enchantements !== undefined){
            filteredEnchantement = this.filter();
            console.log(filteredEnchantement);
        }
        return (
            <div className="table-search">
                <div>
                    <input className="input-search" type="text" name="critere"
                           placeholder="Nom de l'enchantement"
                           onChange={this.updateInput}
                           value={value}
                    />
                </div>
                <div className="list-repas">
                    {
                        isPending ? (
                                <IsPending className="repas-pending"/>
                            )
                            :
                            (<>
                                    <section className="card">
                                        {
                                            filteredEnchantement !== undefined ?
                                                filteredEnchantement.length > 0 ?
                                                    filteredEnchantement.map((item) => {
                                                    return <Item key={item.id}
                                                                 dispatch={this.props.dispatch}
                                                                 item={item}/>
                                                })
                                                :
                                                <div className="container-white no-results"> Aucun résultat trouvé !</div>
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
        isPending: state.enchantementReducer.isPending,
        enchantements: state.enchantementReducer.enchantements,
    }
};

export default connect(mapStateToProps)(ListeEnchantements);