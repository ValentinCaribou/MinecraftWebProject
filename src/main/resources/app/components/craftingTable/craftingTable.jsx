import React from "react";
import './craftingTable.scss'
import Diamond from '../../assets/image/item/Diamond.png'
import Stick from '../../assets/image/item/Bâton.png'
import Sword from '../../assets/image/item/276.png'
import Transparent from '../../assets/image/item/Transparent.png'

const CraftingTable = () => {
    return (
        <div className="craftingTable">
            <div className="crafting">Craft : </div>

            <div className='grid'>
                <div className='grid-element'>
                    <img className="displayed" src={Transparent}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Diamond}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Transparent}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Transparent}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Diamond}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Transparent}/>
                </div>


                <div className='grid-element'>
                    <img className="displayed" src={Transparent}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Stick}/>
                </div>

                <div className='grid-element'>
                    <img className="displayed" src={Transparent}/>
                </div>

            </div>
            <div className="arrow">
                <i className="fa fa-arrow-right fa-3x"></i>
            </div>
            <div className='result'>
                <img className="displayed" src={Sword}/>
            </div>
        </div>
    )
};

export default CraftingTable;