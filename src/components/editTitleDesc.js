import React from 'react';

class EditTitleDesc extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="titleBox form-group">
                <input type="text" id="itemTitle" defaultValue={this.props.title} name="title"
                        placeholder="Title" className="form-control" onChange={this.props.updateFields} />
                <input type="text" id="itemDesc" defaultValue={this.props.desc} name="description"
                        placeholder="Enter a description here" className="form-control" onChange={this.props.updateFields} />
                <input type="number" id="itemRate" defaultValue={this.props.itemRate} name="itemRate"
                        placeholder="rate ($/hr)" className="form-control" onChange={this.props.updateFields} />
            </div>
        );
    }
}

export default EditTitleDesc;