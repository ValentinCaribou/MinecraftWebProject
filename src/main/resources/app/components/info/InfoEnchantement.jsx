import React from "react";
import InputDiv from "../inputs/input-div";
import {AjoutButton, CancelButton, ConfirmButton, EditButton} from "../buttons/Buttons";
import InputName from "../inputs/input-name/input-name";
import SelectInput from "../inputs/SelectInput/selectInput";
import {TextAreaInput} from "../inputs/TextAreaInput/TextAreaInput";

const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE = 1000;
const WIDTH_IMAGE = 1000;

export class InfoEnchantement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newEnchantement: {...this.props.enchantements},
            inEdit: this.props.createEnchantement,
            isFormatPortrait: true,
            isUpdated: false,
            nbCoeur:0,
            impair: false,
            categorie:['Arme', 'Armure', 'Outil', 'Multi Support']
        };
        this.persistEnchantement = this.persistEnchantement.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            this.setState({newEnchantement: {...this.props.enchantements}});
        }
    }

    persistEnchantement = (name, value) => {
        const newEnchantement = {...this.state.newEnchantement};
        newEnchantement[name] = value;
        this.setState({newEnchantement, isUpdated: true});
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
        const {creatingEnchantement, verifFormatImage} = this.props;
        const {newEnchantement, inEdit, isUpdated, isFormatPortrait, categorie} = this.state;
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