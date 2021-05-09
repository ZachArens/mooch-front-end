import React from 'react';
import '../styles/submitButtons.scss';

class SubmitButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="actionButtons col-md-3">
                <input type="submit" id="addItemButton" value={this.props.submitTitle} onClick={this.props.submitFn} />
                <input type="reset" id="cancelAddItem" value={this.props.cancelTitle} onClick={this.props.cancelFn} />
            </div>
        )
    }
}

export default SubmitButtons;