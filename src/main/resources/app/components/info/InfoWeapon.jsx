import React from "react";
import InputDiv from "../inputs/input-div";
import {AjoutButton, CancelButton, ConfirmButton, EditButton} from "../buttons/Buttons";
import InputName from "../inputs/input-name/input-name";
import SelectInput from "../inputs/SelectInput/selectInput";
// import {balanceTonToast} from "../../redux/toast/dispatch";

const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE = 1000;
const WIDTH_IMAGE = 1000;

export class InfoWeapon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newWeapon: {...this.props.weapons},
            inEdit: this.props.creatingWeapon,
            isFormatPortrait: true,
            isUpdated: false,
            categorie:['Arme', 'Armure', 'Outil', 'Bloc']
        };
        this.persistWeapon = this.persistWeapon.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            this.setState({newWeapon: {...this.props.weapons}})
        }
    }

    persistWeapon = (name, value) => {
        const newWeapon = {...this.state.newWeapon};
        newWeapon[name] = value;
        this.setState({newWeapon, isUpdated: true});
    };

    handleOnChange = (e) => {
        const target = e.currentTarget;
        this.persistWeapon(target.name, target.value);
    };

    handleEditOnClick = () => {
        const edit = !this.state.inEdit;
        this.setState({inEdit: edit});
    };

    //A appeler avec la propriété "callback" du bouton submit
    handleSubmitOnclick = () => {
        this.props.updateWeapon(this.state.newWeapon);
        if(!this.props.creatingWeapon)
            this.setState({inEdit: false});
    };

    handleCancelOnClick = () => {
        const weapons = {...this.props.weapons};
        this.setState({newWeapon: weapons, inEdit: false});
    };

    getImage = (e) => {
        const files = e.currentTarget.files;
        const {newWeapon} = this.state;
        let reader = new FileReader();
        let s = {...newWeapon};
        if (files[0] !== undefined) {
            const imageName = files[0].name;
            if (files[0].size <= TAILLE_IMAGE_MAX) {
                reader.readAsDataURL(files[0]);
                reader.onload = (e) => {
                    s.image = e.target.result;
                    const i = new Image();
                    i.src = newWeapon.image;
                    let resultPortrait = false;
                    i.onload = function () {
                        resultPortrait = i.width <= i.height;
                    };
                    this.setState({setIsFormatPortrait: resultPortrait, newWeapon: s});
                    this.props.updatePicture(s);
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
                                i.src = this.props.weapons.image;
                                let resultPortrait = false;
                                i.onload = function () {
                                    resultPortrait = i.width <= i.height;
                                };
                                this.setState({setIsFormatPortrait: resultPortrait, newWeapon: s});
                                this.props.updatePicture(s);
                            }
                        }, 'image/jpeg');
                    }
                };
                reader.readAsDataURL(files[0]);
            }

        }
    };

    render() {
        const {creatingWeapon, verifFormatImage} = this.props;
        const {newWeapon, inEdit, isUpdated, isFormatPortrait, categorie} = this.state;
        console.log(this.props.weapons);
        console.log(newWeapon);
        return (

            <>
                <div className="div-info">
                    <label className="button-image">
                        <div className="container-image is-edit">
                            <div className="roundedImageFiche">
                                <img src={newWeapon.image} onLoad={verifFormatImage}
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

                    <InputName name="nom" className="nom-repas-container" value={newWeapon.nom}
                               placeholder="Nom de l'arme"
                               readOnly={!inEdit} onChange={this.handleOnChange} required/>

                </div>
                <div className="personal-info">
                    {
                        !inEdit &&
                        <div className="action-modif-profil">
                            <EditButton callback={this.handleEditOnClick}/>
                        </div>
                    }

                    <SelectInput
                        className="input-div"
                        label="Categorie :"
                        type="text"
                        id="categorieItem"
                        name="categorie"
                        valeurDefaut="-- Sélectionner une catégorie --"
                        onChange={this.handleOnChange}
                        boucle={categorie}
                    />

                    <InputDiv name="damage" label="Dégat :" type="number" readOnly={false}
                              value={newWeapon.damage}
                              onChange={this.handleOnChange} required/>

                    <InputDiv name="range" label="Porté de l'arme :" type="number" readOnly={false}
                              value={newWeapon.range}
                              onChange={this.handleOnChange} required/>

                    <InputDiv name="DPS" label="DPS :" type="number" readOnly={false}
                              value={newWeapon.DPS}
                              onChange={this.handleOnChange} required/>

                    <div className="button-container">
                        {
                            (!creatingWeapon) &&
                            <ConfirmButton callback={this.handleSubmitOnclick} label="Valider"/>
                        }

                        {
                            (creatingWeapon) &&
                            <AjoutButton callback={this.handleSubmitOnclick}/>
                        }

                        {
                            (!creatingWeapon) &&
                            <CancelButton callback={this.handleCancelOnClick} label="Annuler"/>
                        }
                    </div>
                </div>
            </>
        )
    }
}