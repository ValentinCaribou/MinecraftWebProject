import React from "react";
import InputDiv from "../inputs/input-div";
import {AjoutButton, CancelButton, ConfirmButton, EditButton} from "../buttons/Buttons";
import InputName from "../inputs/input-name/input-name";
import SelectInput from "../inputs/SelectInput/selectInput";
import PointDefence from "../pointdeDefence/pointDefence";
import {CraftingTable} from "../craftingTable/craftingTable";
// import {balanceTonToast} from "../../redux/toast/dispatch";

const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE = 1000;
const WIDTH_IMAGE = 1000;

export class InfoArmor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newArmor: {...this.props.armors},
            inEdit: this.props.creatingArmor,
            isFormatPortrait: true,
            isUpdated: false,
            nbArmor:0,
            impair: false,
            resistance:this.props.armors.resistance,
            categorie:['Arme', 'Armure', 'Outil', 'Bloc']
        };
        this.persistArmor = this.persistArmor.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            this.setState({newArmor: {...this.props.armors}});
            let numberDamage = Number(this.props.armors.resistance) + Number(this.props.bonusResistance);
            this.setState({resistance: numberDamage});
            this.transformeNumber(this.props.armors.pointOfDefense);
        }
    }

    persistArmor = (name, value) => {
        const newArmor = {...this.state.newArmor};
        newArmor[name] = value;
        if (name === "pointOfDefense"){
            this.transformeNumber(value);
        }
        this.setState({newArmor, isUpdated: true});
    };

    handleOnChange = (e) => {
        const target = e.currentTarget;
        this.persistArmor(target.name, target.value);
    };

    handleEditOnClick = () => {
        const edit = !this.state.inEdit;
        this.setState({inEdit: edit});
    };

    //A appeler avec la propriété "callback" du bouton submit
    handleSubmitOnclick = () => {
        this.props.updateArmor(this.state.newArmor);
        if(!this.props.creatingArmor)
            this.setState({inEdit: false});
    };

    handleCancelOnClick = () => {
        const armors = {...this.props.armors};
        this.setState({newArmor: armors, inEdit: false});
    };

    transformeNumber = (number) => {
        let nombreFinal = number;
        if (number !== 0){
            if (number%2 === 0){
                nombreFinal = number / 2;
                this.setState({nbArmor: nombreFinal});
                this.setState({impair: false});
            }
            else{
                nombreFinal = (number - 1) /2;
                this.setState({nbArmor: nombreFinal});
                this.setState({impair: true});
            }
        }
    };

    getImage = (e) => {
        const files = e.currentTarget.files;
        const {newArmor} = this.state;
        let reader = new FileReader();
        let s = {...newArmor};
        if (files[0] !== undefined) {
            const imageName = files[0].name;
            if (files[0].size <= TAILLE_IMAGE_MAX) {
                reader.readAsDataURL(files[0]);
                reader.onload = (e) => {
                    s.image = e.target.result;
                    const i = new Image();
                    i.src = newArmor.image;
                    let resultPortrait = false;
                    i.onload = function () {
                        resultPortrait = i.width <= i.height;
                    };
                    this.setState({setIsFormatPortrait: resultPortrait, newArmor: s});
                    // this.props.updatePicture(s);
                };
            } else {
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        const elem = document.createElement('canvas');
                        elem.width = WIDTH_IMAGE;
                        elem.height = HEIGHT_IMAGE;
                        const ctx = elem.getContext('2d');
                        ctx.drawImage(img, 0, 0, WIDTH_IMAGE, HEIGHT_IMAGE);
                        ctx.canvas.toBlob((blob) => {
                            const imgCompress = new File([blob], imageName, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            reader.readAsDataURL(imgCompress);
                            reader.onload = (e) => {
                                s.image = e.target.result;
                                const i = new Image();
                                i.src = this.props.armors.image;
                                let resultPortrait = false;
                                i.onload = function () {
                                    resultPortrait = i.width <= i.height;
                                };
                                this.setState({setIsFormatPortrait: resultPortrait, newArmor: s});
                                // this.props.updatePicture(s);
                            }
                        }, 'image/jpeg');
                    }
                };
                reader.readAsDataURL(files[0]);
            }

        }
    };

    MaterielFinal = (newArmor) => {
        let materiaux;
        let materiauxFinal;
        if (newArmor.nom !== ""){
            let nomArmure = newArmor.nom.split(" ");
            if (nomArmure[2] !== undefined){
                materiaux = nomArmure[2].toLowerCase();
                switch (materiaux) {
                    case "diamant":
                        materiauxFinal = "Diamant";
                        break;
                    case "fer":
                        materiauxFinal = "Fer";
                        break;
                    case "or":
                        materiauxFinal = "Or";
                        break;
                    case "pierre" :
                        materiauxFinal = "Pierre";
                        break;
                    case "bois" :
                        materiauxFinal = "Bois";
                        break;
                }
            }
            if(materiauxFinal !== undefined){
                return materiauxFinal;
            }
        }
    };

    craftFinal = (nomArmure, materiauxFinal) => {
        let nomPiece = nomArmure[0].toLowerCase();
        let craft;
        switch(nomPiece){
            case "casque":
                craft = [materiauxFinal,materiauxFinal,materiauxFinal,materiauxFinal,"vide",materiauxFinal, "vide", "vide","vide"];
                break;
            case "plastron":
                craft = [materiauxFinal,"vide",materiauxFinal,materiauxFinal,materiauxFinal,materiauxFinal, materiauxFinal, materiauxFinal,materiauxFinal];
                break;
            case "pantalon":
                craft = [materiauxFinal,materiauxFinal,materiauxFinal,materiauxFinal,"vide",materiauxFinal, materiauxFinal, "vide",materiauxFinal];
                break;
            case "chaussures":
                craft = [materiauxFinal,"vide",materiauxFinal,materiauxFinal,"vide",materiauxFinal, "vide", "vide","vide"];
                break;
        }
        return craft;
    };

    render() {
        const {creatingArmor, verifFormatImage} = this.props;
        const {newArmor, inEdit, isUpdated, isFormatPortrait, categorie, impair, nbArmor} = this.state;
        let resistance;
        let nomArmure = newArmor.nom.split(" ");
        let nomPiece = nomArmure[0].toLowerCase();
        const materielFinal = this.MaterielFinal(newArmor);
        const craftFinal = this.craftFinal(nomArmure, materielFinal);
        if (this.state.resistance === 0){
            resistance = this.props.armors.resistance;
        } else {
            resistance = this.state.resistance;
        }
        return (

            <>
                <div className="div-info">
                    <label className="button-image">
                        <div className="container-image is-edit">
                            <div className="roundedImageFiche">
                                <img src={newArmor.image} onLoad={verifFormatImage}
                                     className={(isFormatPortrait ? 'formatPortrait' : 'formatPaysage')}/>
                                <div className="middle">
                                    <p className="text"><i
                                        className="fa fa-camera-retro fa-lg"/><br/>Modifier
                                        l'image
                                    </p>
                                </div>
                            </div>
                                <input id="file"
                                       type="file"
                                       accept="image/*"
                                       onChange={this.getImage}
                                       hidden
                                />
                        </div>
                    </label>

                    <InputName name="nom" className="nom-repas-container" value={newArmor.nom}
                               placeholder="Nom de l'armure"
                               readOnly={!inEdit} onChange={this.handleOnChange} required/>

                </div>
                <div className="personal-info">

                    <SelectInput
                        className="input-div"
                        label="Categorie :"
                        type="text"
                        id="categorieItem"
                        name="categorie"
                        valeurDefaut="-- Sectionner une catégorie --"
                        onChange={this.handleOnChange}
                        boucle={categorie}
                    />

                    <InputDiv name="resistance" label="resistance :" type="number" readOnly={!inEdit}
                              value={resistance}
                              onChange={this.handleOnChange} required/>

                    <InputDiv name="pointOfDefense" label="Point de défence :" type="number" readOnly={!inEdit}
                              value={newArmor.pointOfDefense}
                              onChange={this.handleOnChange} required/>

                    {
                        nbArmor !== 0 &&
                        <PointDefence nbArmor={nbArmor} impair={impair}/>
                    }

                    <div className="button-container">
                        {
                            (!creatingArmor && inEdit && isUpdated) &&
                            <ConfirmButton callback={this.handleSubmitOnclick} label="Valider"/>
                        }

                        {
                            (creatingArmor) &&
                            <AjoutButton callback={this.handleSubmitOnclick}/>
                        }

                        {
                            !inEdit &&
                            <EditButton callback={this.handleEditOnClick}/>

                        }

                        {
                            (!creatingArmor && inEdit) &&
                            <CancelButton callback={this.handleCancelOnClick} label="Annuler"/>
                        }
                    </div>
                    {
                        craftFinal !== undefined &&
                        <CraftingTable
                            materiauxFinal={materielFinal}
                            craft={craftFinal}
                            sousType={nomPiece}
                            nom={newArmor.nom}
                        />
                    }
                </div>
            </>
        )
    }
}