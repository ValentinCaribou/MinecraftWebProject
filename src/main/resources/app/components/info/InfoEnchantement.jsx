import React from "react";
import InputDiv from "../inputs/input-div";
import {AjoutButton, CancelButton, ConfirmButton, EditButton} from "../buttons/Buttons";
import InputName from "../inputs/input-name/input-name";
import SelectInput from "../inputs/SelectInput/selectInput";
import {TextAreaInput} from "../inputs/TextAreaInput/TextAreaInput";
import Enchantement from "../Enchantement/Enchantement";

const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE = 1000;
const WIDTH_IMAGE = 1000;

export class InfoEnchantement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newEnchantement: {...this.props.enchantements},
            ListeEnchantement: {...this.props.listeDesEnchantement},
            inEdit: this.props.createEnchantement,
            isFormatPortrait: true,
            isUpdated: false,
            nbCoeur:0,
            impair: false,
            categorie:['Arme', 'Armure', 'Outil', 'Multi Support'],
            incompatible: [],
            listeDesIncompatible: this.props.enchantements.incompatible,
        };
        this.persistEnchantement = this.persistEnchantement.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            this.setState({newEnchantement: {...this.props.enchantements}});
            this.setState({listeDesIncompatible: this.props.enchantements.incompatible});
            this.setState({ListeEnchantement: {...this.props.listeDesEnchantement}});
            this.getListeIncompatible();
        }
    }

    persistEnchantement = (name, value) => {
        const newEnchantement = {...this.state.newEnchantement};
        if(name === "incompatible"){
            this.state.listeDesIncompatible.push(value);
            newEnchantement[name] = this.state.listeDesIncompatible;
        } else {
            newEnchantement[name] = value;
        }
        this.setState({newEnchantement, isUpdated: true});
        this.state.newEnchantement.incompatible = this.state.listeDesIncompatible;
    };

    handleOnChange = (e) => {
        const target = e.currentTarget;
        this.persistEnchantement(target.name, target.value);
    };

    handleEditOnClick = () => {
        const edit = !this.state.inEdit;
        this.setState({inEdit: edit});
    };

    //A appeler avec la propriété "callback" du bouton submit
    handleSubmitOnclick = () => {
        this.props.updateEnchantement(this.state.newEnchantement);
        if(!this.props.createEnchantement)
            this.setState({inEdit: false});
    };

    handleCancelOnClick = () => {
        const enchantement = {...this.props.enchantements};
        this.setState({newEnchantement: enchantement, inEdit: false});
    };

    getListeIncompatible = () => {
        let {listeDesEnchantement} = this.props;
        let listeEnchantementIncompatible = this.state.incompatible;
        if(listeDesEnchantement !== undefined){
            listeDesEnchantement.map(enchantement => {
                let nomEnchantement = enchantement.nom.split(" ");
                if(!listeEnchantementIncompatible.includes(nomEnchantement[0].toLowerCase())){
                    if(nomEnchantement[0].toLowerCase() === "fire"){
                        if (!listeEnchantementIncompatible.includes("fire aspect")){
                            listeEnchantementIncompatible.push(nomEnchantement[0].toLowerCase() + " " + nomEnchantement[1].toLowerCase());
                        }
                    } else if(nomEnchantement[0].toLowerCase() === "bane"){
                        if (!listeEnchantementIncompatible.includes("bane of arthropods")){
                            listeEnchantementIncompatible.push(nomEnchantement[0].toLowerCase() + " " + nomEnchantement[1].toLowerCase() + " " + nomEnchantement[2].toLowerCase())
                        }
                    } else {
                        listeEnchantementIncompatible.push(nomEnchantement[0].toLowerCase());
                    }
                }
            });
            this.setState({incompatible: listeEnchantementIncompatible});
            return listeEnchantementIncompatible;
        }
    };

    getImage = (e) => {
        const files = e.currentTarget.files;
        const {newEnchantement} = this.state;
        let reader = new FileReader();
        let s = {...newEnchantement};
        if (files[0] !== undefined) {
            const imageName = files[0].name;
            if (files[0].size <= TAILLE_IMAGE_MAX) {
                reader.readAsDataURL(files[0]);
                reader.onload = (e) => {
                    s.image = e.target.result;
                    const i = new Image();
                    i.src = newEnchantement.image;
                    let resultPortrait = false;
                    i.onload = function () {
                        resultPortrait = i.width <= i.height;
                    };
                    this.setState({setIsFormatPortrait: resultPortrait, newEnchantement: s});
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
                                i.src = this.props.enchantements.image;
                                let resultPortrait = false;
                                i.onload = function () {
                                    resultPortrait = i.width <= i.height;
                                };
                                this.setState({setIsFormatPortrait: resultPortrait, newEnchantement: s});
                                // this.props.updatePicture(s);
                            }
                        }, 'image/jpeg');
                    }
                };
                reader.readAsDataURL(files[0]);
            }

        }
    };

    render() {
        const {creatingEnchantement, verifFormatImage, listeDesEnchantement} = this.props;
        const {newEnchantement, inEdit, isUpdated, isFormatPortrait, categorie, incompatible, listeDesIncompatible} = this.state;
        let categorieObtenable = newEnchantement.obtenable;
        if (categorieObtenable === null || categorieObtenable === ''){
            categorieObtenable = "-- Selectionner une catégorie --"
        }

        return (
            <>
                <div className="div-info">
                    <label className="button-image">
                        <div className="container-image is-edit">
                            <div className="roundedImageFiche">
                                <img src={newEnchantement.image} onLoad={verifFormatImage}
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

                    <InputName name="nom" className="nom-repas-container" value={newEnchantement.nom}
                               placeholder="Nom de l'enchantement"
                               readOnly={!inEdit} onChange={this.handleOnChange} required/>

                </div>
                <div className="personal-info">

                    <SelectInput
                        className="input-div"
                        label="Obtenable sur :"
                        type="text"
                        id="categorieItem"
                        name="obtenable"
                        valeurDefaut={categorieObtenable}
                        onChange={this.handleOnChange}
                        boucle={categorie}
                    />

                    <SelectInput
                        className="input-div"
                        label="Incompatible avec :"
                        type="text"
                        id="categorieItem"
                        name="incompatible"
                        valeurDefaut="-- Selectionner une catégorie --"
                        onChange={this.handleOnChange}
                        boucle={incompatible}
                    />

                    <div className="chips">
                        <label>Enchantement incompatible avec : </label>
                        <div className="enchantement">
                            {
                                !listeDesIncompatible.empty() ?
                                    listeDesIncompatible.sort(function (a, b) {
                                        return !a ? 1 : !b;
                                    }).map((enchantement, index) => {
                                        return (
                                            <label className="nomEnchantement">{enchantement}</label>
                                        )
                                    })
                                    :
                                    <i>Aucun enchantement attribuer pour le moment.</i>
                            }
                        </div>
                    </div>

                    <InputDiv name="niveau" label="Niveau :" type="number" readOnly={!inEdit}
                              value={newEnchantement.niveau}
                              onChange={this.handleOnChange} required/>

                    <InputDiv name="damage" label="Dégàt :" type="number" readOnly={!inEdit}
                              value={newEnchantement.damage}
                              onChange={this.handleOnChange} required/>

                    <TextAreaInput
                        label="Description :"
                        content={newEnchantement.description}
                        alterContent={"Aucune description renseignée..."}
                        targetPropName="description"
                        handleChange={this.persistEnchantement}
                        readOnly={!inEdit}
                        withResume={true}
                    />

                    <div className="button-container">
                        {
                            (!creatingEnchantement && inEdit && isUpdated) &&
                            <ConfirmButton callback={this.handleSubmitOnclick} label="Valider"/>
                        }

                        {
                            (creatingEnchantement) &&
                            <AjoutButton callback={this.handleSubmitOnclick}/>
                        }

                        {
                            !inEdit &&
                            // <div className="action-modif-profil">
                                <EditButton callback={this.handleEditOnClick}/>
                            //</div>
                        }

                        {
                            (!creatingEnchantement && inEdit) &&
                            <CancelButton callback={this.handleCancelOnClick} label="Annuler"/>
                        }
                    </div>
                </div>
            </>
        )
    }
}