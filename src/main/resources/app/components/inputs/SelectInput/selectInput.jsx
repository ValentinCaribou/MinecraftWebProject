import React from "react";
import './selectInput.scss';

const InputSelect = ({label, type, className, boucle, valeurDefaut, ...others}) => {

    const clazz = others.readOnly ? "read-only" : "";
    className = className || "input-div";

    return (
        <div className={className}>
            <span>{label}</span>
            <select {...others}>
                <option key={1} value={1}>{valeurDefaut}</option>
                {
                    boucle.map((value) =>
                        value !== valeurDefaut &&
                        <option value={value.id} key={value.id}>{value}
                        </option>
                    )
                }
            </select>
        </div>
    )
};

export default InputSelect;