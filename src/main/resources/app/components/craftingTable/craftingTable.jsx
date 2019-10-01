import React, {Component} from "react";
import './craftingTable.scss'
import Diamond from '../../assets/image/item/Diamond.png'
import Fer from '../../assets/image/item/Iron_Ingot.png'
import Or from '../../assets/image/item/Gold_Ingot.png'
import Pierre from '../../assets/image/item/Cobblestone.png'
import Bois from '../../assets/image/item/wooden_plank.png'
import Stick from '../../assets/image/item/Stick.png'
import DiamondSword from '../../assets/image/item/Sword/276.png'
import CobbleSword from '../../assets/image/epeePierre.png'
import GoldenSword from '../../assets/image/item/Sword/Golden_Sword.png'
import IronSword from '../../assets/image/item/Sword/epeeFer.png'
import WoodenSword from '../../assets/image/item/Sword/Wooden_Sword.png'
import CasqueDiamant from '../../assets/image/item/Armor/diamondhelmet_icon32.png'
import PlastronDiamant from '../../assets/image/item/Armor/diamondchestplate_icon32.png'
import LeggingDiamant from '../../assets/image/item/Armor/diamondleggings_icon32.png'
import BootsDiamant from '../../assets/image/item/Armor/Diamond_boots.png'
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

    transformeItem = (item, type, sousType) =>{
        let itemTransforme;
        let Result;
        switch(item){
            case "Diamant":
                itemTransforme = Diamond;
                Result = DiamondSword;
                break;
            case "Fer":
                itemTransforme = Fer;
                Result = IronSword;
                break;
            case "Or":
                itemTransforme = Or;
                Result = GoldenSword;
                break;
            case "Pierre":
                itemTransforme = Pierre;
                Result = CobbleSword;
                break;
            case "Bois":
                itemTransforme = Bois;
                Result = WoodenSword;
                break;
            case "Stick":
                itemTransforme = Stick;
                break;
        }
        if (type === "item"){
            return itemTransforme;
        } else if (type === "épée"){
            return Result;
        } else if (type === "armor"){
            if(sousType === "casque"){
                Result = CasqueDiamant;
            } else if (sousType === "plastron"){
                Result = PlastronDiamant;
            } else if (sousType === "pantalon"){
                Result = LeggingDiamant;
            } else if (sousType === "chaussures"){
                Result = BootsDiamant
            }
            return Result;
        }
    };

    render() {
        let materiaux = this.props.materiauxFinal;
        let craft = this.props.craft;
        let nom = this.props.nom;
        let sousType;
        if(this.props.sousType !== undefined){
            sousType = this.props.sousType;
        }
        let item1 = this.transformeItem(craft[0], "item");
        let item2 = this.transformeItem(craft[1], "item");
        let item3 = this.transformeItem(craft[2], "item");
        let item4 = this.transformeItem(craft[3], "item");
        let item5 = this.transformeItem(craft[4], "item");
        let item6 = this.transformeItem(craft[5], "item");
        let item7 = this.transformeItem(craft[6], "item");
        let item8 = this.transformeItem(craft[7], "item");
        let item9 = this.transformeItem(craft[8], "item");
        let Result;
        if(sousType !== undefined){
            Result = this.transformeItem(materiaux, "armor", sousType);
        } else {
            Result = this.transformeItem(materiaux, "épée");
        }

        return (
            <div className="craftingZone">
                <div className="craftingTable">
                    <div className="crafting">Craft : </div>

                    <div className='grid'>
                        <div className='grid-element'>
                            <div className="testDiv">
                                <span className="tooltiptext">{craft[0]}</span>
                                <img className="displayed" src={item1}/>
                            </div>
                        </div>

                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item2}/>
                                <span className="tooltiptext">{craft[1]}</span>
                            </div>
                        </div>

                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item3}/>
                                <span className="tooltiptext">{craft[2]}</span>
                            </div>
                        </div>

                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item4}/>
                                <span className="tooltiptext">{craft[3]}</span>
                            </div>
                        </div>

                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item5}/>
                                <span className="tooltiptext">{craft[4]}</span>
                            </div>
                        </div>

                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item6}/>
                                <span className="tooltiptext">{craft[5]}</span>
                            </div>
                        </div>


                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item7}/>
                                <span className="tooltiptext">{craft[6]}</span>
                            </div>
                        </div>

                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item8}/>
                                <span className="tooltiptext">{craft[7]}</span>
                            </div>
                        </div>

                        <div className='grid-element'>
                            <div className="testDiv">
                                <img className="displayed" src={item9}/>
                                <span className="tooltiptext">{craft[8]}</span>
                            </div>
                        </div>

                    </div>
                    <div className="arrow">
                        <i className="fa fa-arrow-right fa-3x"></i>
                    </div>
                    <div className='result'>
                        <div className="testDiv">
                            <img className="displayed" src={Result}/>
                            <span className="tooltiptext">{nom}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}