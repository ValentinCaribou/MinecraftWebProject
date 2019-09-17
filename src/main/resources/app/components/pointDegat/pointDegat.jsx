import React from "react";
import Heart from "../../assets/image/coeur/Heart.png";
import HalfHeart from "../../assets/image/coeur/Half_Heart.png";
import './pointDegat.css'

const PointDegat = ({nbCoeur, impair}) => {
    let rows = [];
    for (let i = 0; i < nbCoeur; i++) {
        rows.push(<img key={i} className="imageHeart" src={Heart}/>);
    }
    return (
        <div className="input-div">
            {
               nbCoeur !== 0 &&
               rows
            }
            {
                impair &&
                    <img className="imageHeart" src={HalfHeart}/>
            }
        </div>
    )
};

export default PointDegat;