import React from "react";
import './index.scss';

const InputDiv = ({label, type, className, ...others}) => {

    const clazz = others.readOnly ? "read-only" : "";
    className = className || "input-div";

    return (
        <div className={className}>
                <span>{label}</span>
                <input {...others} type={type} className={clazz}/>
        </div>
    )
};

export default InputDiv;