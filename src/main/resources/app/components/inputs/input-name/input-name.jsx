import React from "react";
import './input-name.scss';

const InputName = ({className, ...others}) => {

    const clazz = others.readOnly ? "read-only" : "";
    className = className || "input-div";

    return (
        <div className={className}>
            <input {...others} type="text" className={clazz}/>
        </div>
    )
};

export default InputName;