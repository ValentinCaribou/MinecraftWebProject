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

        return (
            <Link to={{
                pathname: `/armes/${item.id}`,
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