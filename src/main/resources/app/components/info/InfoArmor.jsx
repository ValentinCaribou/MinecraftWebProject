import React from "react";
import InputDiv from "../inputs/input-div";
import {AjoutButton, CancelButton, ConfirmButton, EditButton} from "../buttons/Buttons";
import InputName from "../inputs/input-name/input-name";
import SelectInput from "../inputs/SelectInput/selectInput";
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
            categorie:['Arme', 'Armure', 'Outil', 'Bloc']
        };
        this.persistArmor = this.persistArmor.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            this.setState({newArmor: {...this.props.armors}})
        }
    }

    persistArmor = (name, value) => {
        const newArmor = {...this.state.newArmor};
        newArmor[name] = value;
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

    render() {
        const {creatingArmor, verifFormatImage} = this.props;
        const {newArmor, inEdit, isUpdated, isFormatPortrait, categorie} = this.state;
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
                        valeurDefaut="Armure"
                        onChange={this.handleOnChange}
                        boucle={categorie}
                    />

                    <InputDiv name="resistance" label="resistance :" type="number" readOnly={!inEdit}
                              value={newArmor.resistance}
                              onChange={this.handleOnChange} required/>

                    <InputDiv name="pointOfDefense" label="Point de défence :" type="number" readOnly={!inEdit}
                              value={newArmor.pointOfDefense}
                              onChange={this.handleOnChange} required/>

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
                            (!creatingArmor && inEdit && isUpdated) &&
                            <CancelButton callback={this.handleCancelOnClick} label="Annuler"/>
                        }
                    </div>
                </div>
            </>
        )
    }
}