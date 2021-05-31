import React from 'react';
import '../styles/submitButtons.scss';

class SubmitButtons extends React.Component {

    render() {
        return (
            <div className="actionButtons col-md-3">
                <input type="submit" id="submitButton" data-testid="submitButton" value={this.props.submitTitle} onClick={this.props.submitFn} />
                <input type="reset" id="cancelButton" data-testid="cancelButton" value={this.props.cancelTitle} onClick={this.props.cancelFn} />
            </div>
        )
    }
}

export default SubmitButtons;