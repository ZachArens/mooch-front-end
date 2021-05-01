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
                    <input type="text" value={this.props.title} name="title" placeholder="Title" onChange={this.props.updateFields}/>
                    <input type="text" value={this.props.desc} name="description" placeholder="Enter a description here" onChange={this.props.updateFields}/>
                    <input type="number" value={this.props.itemRate} name="itemRate" placeholder="$5/day" onChange={this.props.updateFields}/>
                </div>
            </div>
        );
    }
}

export default EditTitleDesc;