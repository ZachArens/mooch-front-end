import React, { Component } from 'react';
import LoginForm from './loginForm';

export default class CreateLogin extends Component {
    constructor(props) {
        super(props);

        this.firstUpdateFields = this.firstUpdateFields.bind(this);

    }

    firstUpdateFields = (e) => {
        //TODO - need to compare email and password fields and verify that they match
        //TODO = add feature to check if password is secure and notify before account creation
    }

    render() {
        return (
            <div>
                <LoginForm updateFields={this.props.updateFields} />
                <label>Verify email and password
                    <LoginForm updateFields={this.props.updateFields} />
                </label>
                <div className="userDetails">
                    <label>Full Name
                        <input id="fullName" name="fullName" type="text" onChange={this.props.updateFields}></input>
                    </label>
                    <label>Street Address
                        <input id="streetAddress" name="streetAddress" type="text" onChange={this.props.updateFields}></input>
                    </label>
                    <label>City
                        <input id="city" name="city" type="text" onChange={this.props.updateFields}></input>
                    </label>
                    <label>State (2 Letter)
                        <input id="st" type="text" name="st" onChange={this.props.updateFields}></input>
                    </label>
                    <label>Zip
                        <input id="zip" type="text" name="zip" onChange={this.props.updateFields}></input>
                    </label>
                    <label>Phone
                        <input id="phone" type="text" name="phone" onChange={this.props.updateFields}></input>
                    </label>
                </div>
                
            </div>
        )
    }
}
