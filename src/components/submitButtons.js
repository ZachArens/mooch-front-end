import React from 'react';

class SubmitButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="actionButtons">
                <input type="submit" id="addItemButton" value={this.props.submitTitle} onClick={this.props.submitFn} />
                <input type="reset" id="cancelAddItem" value={this.props.cancelTitle} onClick={this.props.cancelFn} />
            </div>
        )
    }
}

export default SubmitButtons;