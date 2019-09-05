import React from 'react';
import './burger-button.scss';

export default props => {

    return (
        <div className={"btn burger-icon " + props.cross}>
            <span></span>
            <span></span>
            {!props.menu && <span></span>}
        </div>
    )
}