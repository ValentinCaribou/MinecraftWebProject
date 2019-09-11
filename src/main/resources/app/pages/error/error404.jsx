import React from 'react';
import './error404.css';

class Error404 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <div id="page-wrap">
                    <div className="white-container">
                        <h1 className="error-title">404</h1>
                        <span className="error-text">Vous êtes sûr d'être au bon endroit ?</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error404;