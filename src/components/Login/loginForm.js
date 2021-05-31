import React, { Component } from 'react';



export default class LoginForm extends Component {
    render() {
        return (
            <div>
                <label data-testid="emailLabel">Email
                    <input type="text" data-testid={this.props.emailName} placeholder="email" 
                    name={this.props.emailName} onChange={this.props.updateFields}/>
                </label>
                <label data-testid="passwordLabel">Password
                    <input type="password" data-testid={this.props.passwordName} 
                    name={this.props.passwordName} placeholder="********" onChange={this.props.updateFields}/>
                </label>
            </div>
        )
    }
}
