import React, { Component } from 'react'

export default class LoginForm extends Component {
    render() {
        return (
            <div>
                <label data-testid="email">Email
                    <input type="text" placeholder="email" name="email" onChange={this.props.updateFields}/>
                </label>
                <label data-testid="password">Password
                    <input type="password" name="password" placeholder="********" onChange={this.props.updateFields}/>
                </label>
            </div>
        )
    }
}
