import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ajoutArmor} from "../../app/redux/armors/dispatch";
import {AddButton, CancelButton, BackButtonArrow} from "../components/buttons/Buttons";
import {InfoWeapon} from "../components/info/InfoWeapon"
import IsPending from "../components/isPending/isPending";
import {InfoArmor} from "../components/info/InfoArmor";

const defaultArmor = {
    nom: "",
    categorie: "",
    image: "",
    resistance: 0,
    pointOfDefense: 0
};
const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE_RATIO = 1.5;
const WIDTH_IMAGE_RATIO = 1.5;

class AddArmor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            armor: defaultArmor,
            isShowPopup: false,
            setIsFormatPortrait: true,
            isFormatPortrait: true,
            inAdd: false,
            inEdit: false,
        };
    }

    // getImage = (e) => {
    //     const files = e.currentTarget.files;
    //     let reader = new FileReader();
    //     const {repas} = this.state;
    //     if (files[0] !== undefined) {
    //         const imageName = files[0].name;
    //         if (files[0].size <= TAILLE_IMAGE_MAX) {
    //             reader.readAsDataURL(files[0]);
    //             reader.onload = (e) => {
    //                 repas.image = e.target.result;
    //                 const i = new Image();
    //                 i.src = serlien.image;
    //                 i.onload = () => {
    //                     if (i.width > i.height) {
    //                         this.setState({repas, isFormatPortrait: false})
    //                     } else {
    //                         this.setState({repas, isFormatPortrait: true})
    //                     }
    //                 };
    //             };
    //         } else {
    //             reader.onload = (e) => {
    //                 const img = new Image();
    //                 img.src = e.target.result;
    //                 img.onload = () => {
    //                     const elem = document.createElement('canvas');
    //                     elem.width = img.width / WIDTH_IMAGE_RATIO;
    //                     elem.height = img.height / HEIGHT_IMAGE_RATIO;
    //                     const ctx = elem.getContext('2d');
    //                     ctx.drawImage(img, 0, 0, elem.width, elem.height);
    //                     ctx.canvas.toBlob((blob) => {
    //                         const imgCompress = new File([blob], imageName, {
    //                             type: 'image/jpeg',
    //                             lastModified: Date.now()
    //                         });
    //                         reader.readAsDataURL(imgCompress);
    //                         reader.onload = (e) => {
    //                             repas.image = e.target.result;
    //                             const i = new Image();
    //                             i.src = repas.image;
    //                             i.onload = () => {
    //                                 if (i.width > i.height) {
    //                                     this.setState({repas, isFormatPortrait: false})
    //                                 } else {
    //                                     this.setState({repas, isFormatPortrait: true})
    //
    //                                 }
    //                             };
    //                         }
    //                     }, 'image/jpeg');
    //                 }
    //             };
    //             reader.readAsDataURL(files[0]);
    //         }
    //     }
    // };

    togglePopup() {
        this.setState({isShowPopup: !this.state.isShowPopup})
    };

    // ajouterArme = () => {
    //     const {dispatch} = this.props;
    //     const {weapon} = this.state;
    //
    //     if (this.state.isShowPopup) {
    //         this.togglePopup();
    //     } else {
    //         dispatch(addWeapon(weapon))
    //             .then(() => {
    //                 this.setState({weapon: defaultWeapon});
    //             })
    //     }
    // };

    createArmors = (armors) => {
        const {dispatch} = this.props;
        if (this.state.isShowPopup) {
            this.togglePopup();
        } else {
            dispatch(ajoutArmor(armors))
                .then((response) => {
                    document.location.href = `/weapons/${response.id}`;
                    this.setState({armor: defaultArmor});
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    render() {
        let {isLoading} = this.props;
        let {inAdd, armor} = this.state;
        return (
            <>
                <div id="white-pattern"></div>
                <div id="page-wrap" className="details-repas">
                    {
                        isLoading
                            ? <IsPending className="repas-pending"/>
                            : (
                                <>
                                    <div className="repas-fiche container-white responsive-witdh-fiche">
                                        <BackButtonArrow/>
                                        <InfoArmor
                                            dispatch={this.props.dispatch}
                                            armors={armor}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            // getImage={this.getImage}
                                            updateArmor={this.createArmors}
                                            creatingArmor={true}
                                        />
                                    </div>
                                </>
                            )
                    }
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        weapon: state.armorsReducers.armor,
    }
};
export default connect(mapStateToProps)(AddArmor);