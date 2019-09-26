import React from "react";
import './craftingTable.scss'
import Diamond from '../../assets/image/item/Diamond.png'
import Stick from '../../assets/image/item/Bâton.png'
import Sword from '../../assets/image/item/276.png'

const CraftingTable = () => {
    return (
        <div className="craftingTable">
            <div className="crafting">Craft : </div>

            <div id='grid'>
                <div className='grid-element'>
                    <img className="displayed" src='https://justplayhere.com/MinecraftData/images/0.png'/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Diamond}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src='https://justplayhere.com/MinecraftData/images/0.png'/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src='https://justplayhere.com/MinecraftData/images/0.png'/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Diamond}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src='https://justplayhere.com/MinecraftData/images/0.png'/>
                </div>


                <div className='grid-element'>
                    <img className="displayed" src='https://justplayhere.com/MinecraftData/images/0.png'/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Stick}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src='https://justplayhere.com/MinecraftData/images/0.png'/>
                </div>

            </div>
        </div>
    )
};

export default CraftingTable;