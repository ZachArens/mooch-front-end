import React from 'react';
import Firebase from '../utils/firebase';

class EditTitleDesc extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <div className="titleBox">
                    <input type="text" id="itemTitle" value={this.props.title} name="title"
                           placeholder="Title" onChange={this.props.updateFields} />
                    <input type="text" id="itemDesc" value={this.props.desc} name="description"
                           placeholder="Enter a description here" onChange={this.props.updateFields} />
                    <input type="number" id="itemRate" value={this.props.itemRate} name="itemRate"
                           placeholder="3" onChange={this.props.updateFields} />
                </div>
            </div>
        );
    }
}

export default EditTitleDesc;