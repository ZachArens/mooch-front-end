import React from 'react';
// import FireAuthWidget from './fireAuthWidget';

import firebase from '../utils/firebase';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', errMsg: ''};

        this.submitEmailPass = this.submitEmailPass.bind(this);
        this.updateFields = this.updateFields.bind(this);
    }

    updateFields = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value})
        document.getElementById('loginError').setAttribute('hidden', false);
        this.setState({errMsg: ""});
    }

    submitEmailPass = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                //Signed in
                var user = userCredential.user;
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.message
                });
                let errorBox = document.getElementById('loginError');
                errorBox.removeAttribute("hidden");
                console.log(error.message);
                // errorBox.getElementsByTagName('h2')[0].innerText = this.state.
            });
        //TODO - delete this comment for production
        // console.log(`email: ${this.state.email} \n password: ${this.state.password}`);
        // alert('The link was clicked');
    }

    render() {

        // ui.start('#firebaseui-auth-container', uiConfig);

        return (
            <div data-testid="login">
                <div id="loginError" hidden ><h2>{this.state.errMsg}</h2></div>
                <form>
                    <title>Login</title>
                    <label data-testid="email">Email
                        <input type="text" placeholder="email" name="email" onChange={this.updateFields}/>
                    </label>
                    <label data-testid="password">Password
                        <input type="password" name="password" placeholder="********" onChange={this.updateFields}/>
                    </label>
                    <div className="submitButtons">
                        <input type="submit" value="Submit" data-testid="submit" onClick={(e) => this.submitEmailPass(e)}/>
                        <input type="button" value="Cancel" data-testid="cancel"/>
                    </div>


                    {/*TODO: link to create account page*/}
                    <a href="https://www.google.com" data-testid="createAccount"><p>Don't have an account?  Create one.</p></a>

                    {/*<div id="firebaseui-auth-container"/>*/}
                    {/*<div id="loader">Loading...</div>*/}

                </form>
                {/*<FireAuthWidget/>*/}
            </div>

        );
    }
}

export default Login;