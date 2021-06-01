import React, { Component } from 'react';
import LoginForm from './loginForm';

//Call with props - updateFields function

export default class CreateLogin extends Component {

    render() {
        return (
            <div>
                <label>Verify email and password
                    <LoginForm emailName="verifyEmail" passwordName="verifyPassword" updateFields={this.props.updateFields} />
                </label>
                <div className="userDetails">
                    <label>Full Name
                        <input id="fullName" data-testid="fullName" name="fullName" type="text" onChange={this.props.updateFields}></input>
                    </label>
                    <label>Street Address
                        <input id="streetAddress" data-testid="streetAddress" name="streetAddress" type="text" onChange={this.props.updateFields}></input>
                    </label>
                    <label>City
                        <input id="city" data-testid="city" name="city" type="text" onChange={this.props.updateFields}></input>
                    </label>
                    <label>State (2 Letter)
                        <input id="st" data-testid="st" type="text" name="st" onChange={this.props.updateFields}></input>
                    </label>
                    <label>Zip
                        <input id="zip" data-testid="zip" type="text" name="zip" onChange={this.props.updateFields}></input>
                    </label>
                    <label>Phone
                        <input id="phone" data-testid="phone" type="text" name="phone" onChange={this.props.updateFields}></input>
                    </label>
                </div>
                
            </div>
        )
    }
}
