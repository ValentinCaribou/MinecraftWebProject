import React from "react";
import './selectInput.scss';

const InputSelect = ({label, type, className, boucle, valeurDefaut, ...others}) => {

    const clazz = others.readOnly ? "read-only" : "";
    className = className || "input-div";

    return (
        <div className={className}>
            <span>{label}</span>
            <select {...others}>
                <option value={1}>valeurDefaut</option>
                {
                    console.log(boucle)
                }
                {
                    boucle.map((value) =>
                        value.libelle !== valeurDefaut &&
                        <option value={value.id} key={value.id}>{value.libelle}
                        </option>)
                }
            </select>
        </div>
    )
};

export default InputSelect;