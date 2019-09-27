import React, {Component} from "react";
import './craftingTable.scss'
import Diamond from '../../assets/image/item/Diamond.png'
import Fer from '../../assets/image/item/Iron_Ingot.png'
import Or from '../../assets/image/item/Gold_Ingot.png'
import Pierre from '../../assets/image/item/Cobblestone.png'
import Bois from '../../assets/image/item/wooden_plank.png'
import Stick from '../../assets/image/item/Bâton.png'
import DiamondSword from '../../assets/image/item/276.png'
import CobbleSword from '../../assets/image/epeePierre.png'
import GoldenSword from '../../assets/image/item/Golden_Sword.png'
import IronSword from '../../assets/image/item/epeeFer.png'
import WoodenSword from '../../assets/image/item/Wooden_Sword.png'
import Transparent from '../../assets/image/item/Transparent.png'

export class CraftingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormatPortrait: true,
            inAdd: false,
            inEdit: false,
            isShowPopup: false,
        };
    }

    render() {
        let materiaux = this.props.materiauxFinal;
        let item;
        let Sword;
        if(materiaux === "Diamant"){
            item = Diamond;
            Sword = DiamondSword;
        } else if(materiaux === "Fer"){
            item = Fer;
            Sword = IronSword;
        } else if(materiaux === "Or"){
            item = Or;
            Sword = GoldenSword;
        } else if(materiaux === "Pierre"){
            item = Pierre;
            Sword = CobbleSword;
        } else if(materiaux === "Bois"){
            Sword = WoodenSword;
            item = Bois;
        }
        return (
            <div className="craftingTable">
                <div className="crafting">Craft : </div>

                <div className='grid'>
                    <div className='grid-element'>
                        <img className="displayed" src={Transparent}/>
                    </div>

                    <div className='grid-element'>
                        <img className="displayed" src={item}/>
                    </div>

                    <div className='grid-element'>
                        <img className="displayed" src={Transparent}/>
                    </div>

                    <div className='grid-element'>
                        <img className="displayed" src={Transparent}/>
                    </div>

                    <div className='grid-element'>
                        <img className="displayed" src={item}/>
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
    }
}