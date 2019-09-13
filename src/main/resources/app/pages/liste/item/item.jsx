import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    verifFormatImage() {
        let i = new Image();
        i.src = this.props.item.image;
        i.onload = function () {
            if (i.width > i.height) {
                // this.setState({setIsFormatPortrait:false})
            }
        };
    };

    render() {
        const {item} = this.props;
        let url = "";
        const categorie = item.categorie;
        if (categorie === "Arme"){
            url = "armes"
        } else if(categorie === "Armure"){
            url = "armure"
        } else if (categorie === undefined){
            url = "enchantements"
        }

        return (
            <Link to={{
                pathname: `/${url}/${item.id}`,
            }}>
                <div key={item.id} className="repas-unique">
                    <div className="container-image">
                        <div className="rounded-image-repas">
                            <img src={item.image} onLoad={this.verifFormatImage()} className="image-repas" />
                        </div>
                    </div>
                    <div className="container-informations">
                        <div className="nom-repas">
                            <span className="capitalize">{item.nom}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Item;