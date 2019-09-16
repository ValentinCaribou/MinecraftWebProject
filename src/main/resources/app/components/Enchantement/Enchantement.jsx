import React, {useState} from 'react';
import "./Enchantement.scss";

const Enchantement = ({idEnchantement, onDelete, readOnly, enchantement}) => {

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup)
    };

    const textHaut = `Souhaitez-vous vraiment supprimer l'enchantement ${enchantement} ?` ;

    return (
        <div className="chip" key={idEnchantement}>
            {/*<Popup show={showPopup}*/}
            {/*       onClose={togglePopup}*/}
            {/*       onClick={() => {onDelete(idEnchantement); togglePopup()} }*/}
            {/*       textHaut={textHaut}*/}
            {/*/>*/}
            <div className="chip-content">
                <span className="capitalize">{enchantement.nom}</span>
                {
                    readOnly &&
                    <span className="closebtn" onClick={() => {onDelete(idEnchantement)}}>&times;</span>
                }
            </div>
        </div>
    )
};

export default Enchantement;