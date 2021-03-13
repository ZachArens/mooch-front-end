import React from 'react';
import Firebase from '../firebase';

class TitlePhotoDesc extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                {/*<Photos/>*/}
                <div className="titleBox"></div>
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>

            </div>
        );
    }
}

export default TitlePhotoDesc;