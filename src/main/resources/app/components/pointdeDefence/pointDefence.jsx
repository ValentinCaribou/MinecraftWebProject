import React from "react";
import Armor from "../../assets/image/armor/Armor.png";
import HalfArmor from "../../assets/image/armor/Half_Armor.png";
import './pointDefence.css'

const PointDefence = ({nbArmor, impair}) => {
    let rows = [];
    for (let i = 0; i < nbArmor; i++) {
        rows.push(<img className="imageHeart" src={Armor}/>);
    }
    return (
        <div className="input-div">
            {
                nbArmor !== 0 &&
               rows
            }
            {
                impair &&
                    <img className="imageHeart" src={HalfArmor}/>
            }
        </div>
    )
};

export default PointDefence;