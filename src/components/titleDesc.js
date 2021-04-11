import React from 'react';
import Firebase from '../firebase';

class TitleDesc extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className="titleBox">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }
}

export default TitleDesc;