import React from "react";
import PropTypes from 'prop-types';
import './button.css'

export const BackButtonArrow = () => {
    return (
        <button
            className="btn back-button"
            onClick={() => window.history.back()}>
            <i className="fas fa-arrow-left fa-2x"/>
        </button>
    )
};

export const ChevronButton = ({more}) => {
    const transition = `chevron ${more ? ' opened' : 'closed'}`;
    return (

        <div className={transition}>
            <i className="fa fa-angle-down"></i>
        </div>

    )
};
ChevronButton.propTypes = {
    more: PropTypes.bool.isRequired,
    context: PropTypes.bool
};

export const AddButton = ({callback}) => {
    return (
        <button
            className="btn btn-circle bg-aqua"
            onClick={callback}
            value="Ajouter"><i className="fas fa-plus"></i>
        </button>
    )
};
AddButton.propType = {
    callback: PropTypes.func
};

export const RemoveButton = ({callback}) => {
    return (
        <button
            className="btn btn-circle bg-aqua"
            onClick={callback}
            value="Supprimer"><i className="fas fa-minus"></i>
        </button>
    )
};
RemoveButton.prototype = {
    callback: PropTypes.func
};

export const EditButton = ({callback}) => {
    return (
        <button
            className="buttonMinecraft"
            onClick={callback}
            value="Editer">
            Editer
        </button>
    )
};
EditButton.propType = {
    callback: PropTypes.func.isRequired
};


export const ConfirmButton = ({callback, label}) => {
    return (
        <button
            className="buttonMinecraftPetit"
            onClick={callback}
        > {label} </button>
    )
};
ConfirmButton.propType = {
    callback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export const CancelButton = ({callback, label}) => {
    return (
        <button
            className="buttonMinecraftPetit"
            onClick={callback}
        > {label} </button>
    )
};
CancelButton.propType = {
    callback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export const AjoutButton = ({callback}) => {
    return (
        <button
            type="submit"
            className="buttonMinecraft"
            onClick={callback}
        > Créer </button>
    )
};
AjoutButton.propType = {
    callback: PropTypes.func.isRequired
};

export const AjoutButtonAlt = ({callback}) => {
    return (
        <button
            type="submit"
            className="buttonMinecraft"
            onClick={callback}
        > Ajouter </button>
    )
};
AjoutButtonAlt.propType = {
    callback: PropTypes.func.isRequired
};









