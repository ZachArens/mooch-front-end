import React from 'react';

class EditTitleDesc extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className="titleBox form-group">
                    <input type="text" id="itemTitle" value={this.props.title} name="title"
                           placeholder="Title" className="form-control" onChange={this.props.updateFields} />
                    <input type="text" id="itemDesc" value={this.props.desc} name="description"
                           placeholder="Enter a description here" className="form-control" onChange={this.props.updateFields} />
                    <input type="number" id="itemRate" value={this.props.itemRate} name="itemRate"
                           placeholder="rate ($/hr)" className="form-control" onChange={this.props.updateFields} />
                </div>
            </div>
        );
    }
}

export default EditTitleDesc;