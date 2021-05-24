import React, { Component } from 'react';
import LoginForm from './loginForm';

export default class CreateLogin extends Component {
    render() {
        return (
            <div>
                <LoginForm updateFields={this.props.updateFields} />
                <label>Verify email and password
                    <LoginForm updateFields={this.props.updateFields} />
                </label>
                <label>
                    <input id="Full Name" type="text" onChange={this.props.updateFields}></input>
                </label>
                <label>
                    <input id="Street Address" type="text" onChange={this.props.updateFields}></input>
                </label>
                <label>
                    <input id="City" type="text" onChange={this.props.updateFields}></input>
                </label>
                <label>
                    <input id="ST" type="text" onChange={this.props.updateFields}></input>
                </label>
                <label>
                    <input id="Zip" type="text" onChange={this.props.updateFields}></input>
                </label>
                <label>
                    <input id="Phone" type="text" onChange={this.props.updateFields}></input>
                </label>
            </div>
        )
    }
}
