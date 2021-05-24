import React from 'react';
// import FireAuthWidget from '../utils/fireAuthWidget';

import firebase from '../../utils/firebase';
import ReserveItem from '../reserveItem';
import SubmitButtons from '../submitButtons';
import LoginForm from './loginForm';
import CreateLogin from './createLogin';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', errMsg: '',
            hasLogin: true,
            buttonText: "Don't have a login? Click here."};

        this.submitEmailPass = this.submitEmailPass.bind(this);
        this.updateFields = this.updateFields.bind(this);
    }

    updateFields = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({name: value})
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
    
    cancelFn = (e) => {
        this.setState = {email: '', password: '', errMsg: ''};
    }

    changeHasLogin = (e) => {
        e.preventDefault();

        this.setState(prevState => ({hasLogin: !prevState.hasLogin}));
        console.log('updated state to: ' + this.state.hasLogin)
        if (!this.state.hasLogin) {
            this.setState = {buttonText: "Don't have a login? Click here."}
        } else if (!this.state.hasLogin) {
            this.setState = {buttonText: "Already have a login? Click here."}
        }

    }

    render() {

        // ui.start('#firebaseui-auth-container', uiConfig);

        const haveOrCreateLogin = () => {
            if (this.state.hasLogin) {
                return <LoginForm updateFields={this.updateFields.bind(this)} />
            } else {
                return <CreateLogin updateFields={this.updateFields.bind(this)} />
            }
        };

        return (
            <div data-testid="login">
                <div id="loginError" hidden ><h2>{this.state.errMsg}</h2></div>
                <form>
                    <title>Login</title>
                    {haveOrCreateLogin()}
                    
                    <SubmitButtons submitTitle="Submit" cancelTitle="Cancel"
                        submitFn={this.submitEmailPass.bind(this)}
                        cancelFn={this.cancelFn.bind(this)} />


                    {/*TODO: link to create account page*/}
                    <button type="button" onClick={this.changeHasLogin} data-testid="createAccount">{this.state.buttonText}</button>

                    {/*<div id="firebaseui-auth-container"/>*/}
                    {/*<div id="loader">Loading...</div>*/}

                </form>
                {/* <FireAuthWidget/> */}
            </div>

        );
    }
}

export default Login;