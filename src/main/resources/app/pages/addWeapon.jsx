import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ajoutWeapon} from "../../app/redux/weapons/dispatch";
import {AddButton, CancelButton, BackButtonArrow} from "../components/buttons/Buttons";
import {InfoWeapon} from "../components/info/InfoWeapon"
import IsPending from "../components/isPending/isPending";

const defaultWeapon = {
    nom: "",
    categorie: "",
    image: "",
    damage: 0,
    range: 0,
    DPS: 0
};
const TAILLE_IMAGE_MAX = 2000000;
const HEIGHT_IMAGE_RATIO = 1.5;
const WIDTH_IMAGE_RATIO = 1.5;

class AddWeapon extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            weapon: defaultWeapon,
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

    createWeapons = (weapons) => {
        const {dispatch} = this.props;
        if (this.state.isShowPopup) {
            this.togglePopup();
        } else {
            dispatch(ajoutWeapon(weapons))
                .then((response) => {
                    document.location.href = `/weapons/${response.id}`;
                    this.setState({weapon: defaultWeapon});
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    render() {
        let {isLoading} = this.props;
        let {inAdd, weapon} = this.state;
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
                                        <InfoWeapon
                                            dispatch={this.props.dispatch}
                                            weapons={weapon}
                                            isFormatPortrait={this.state.isFormatPortrait}
                                            // getImage={this.getImage}
                                            updateWeapon={this.createWeapons}
                                            creatingWeapon={true}
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
        weapon: state.weaponsReducers.weapon,
    }
};
export default connect(mapStateToProps)(AddWeapon);