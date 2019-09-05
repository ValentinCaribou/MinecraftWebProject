import React from 'react';
import './isPending.css';

const IsPending = ({className}) => {
    className = "is-pending " +(className || "is-pending")
    return (
        <div className={className}>
                <span className="fas fa-spin fa-spinner fa-3x"></span>
        </div>
    )

};

export default IsPending;