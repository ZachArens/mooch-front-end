import React from 'react';
// import FireAuthWidget from '../utils/fireAuthWidget';

// import firebase, { auth } from '../../utils/firebase';
import {createUserWithEmailandPass, loginWithEmailAndPass} from '../../utils/firebaseFunctions';
import SubmitButtons from '../submitButtons';
import LoginForm from './loginForm';
import CreateLogin from './createLogin';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '',
            verifyEmail: '',
            verifyPassword: '',
            fullName: '',
            streetAddress: '',
            city: '',
            st: '',
            zip: '',
            phone: '',
            errMsg: '',
            hasLogin: true,
            buttonText: "Don't have a login? Click here."
        };

        this.changeHasLogin = this.changeHasLogin.bind(this);
        this.submitEmailPass = this.submitEmailPass.bind(this);
        this.signUp = this.signUp.bind(this);
        this.updateFields = this.updateFields.bind(this);
    }

    updateFields = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({[name]: value, errMsg: ''});
        // console.log("update: " + name + " - " + value);
        
    }

    submitOrSignup = (e) => {
        if(this.state.hasLogin) {
            this.submitEmailPass(e);
        } else {
            this.signUp(e);
        }
    }

    submitEmailPass = async (e) => {
        e.preventDefault();
        // console.log("email: " + this.state.email);
        // console.log("password: " + this.state.password);

        let userId = await loginWithEmailAndPass(this.state.email, this.state.password);

        this.props.setCurrentUser(userId);
    }

    signUp = async (e) => {
        e.preventDefault();
        console.log("signUp running...")

        //check if email and passwords match
        const emailIsMatch = this.state.email === this.state.verifyEmail;
        const passwordIsMatch = this.state.password === this.state.verifyPassword;

        if (!emailIsMatch) {
           this.setState({
               errMsg: "Your emails do not match. Please re-enter your email address and try again."
           });
           return null;
        } else if(!passwordIsMatch){
            this.setState({
                errMsg: "Your passwords do not match. Please re-enter your email address and try again."
            });
            return null;
        }

       let userId = createUserWithEmailandPass(this.state.email, this.state.password);

       this.props.setCurrentUser("user123");
        // console.log(`logged in as ${this.state.user}`); //.displayName} - ${user.uid}`);
        //Add display name to auth token
        //FIXME - need to test if working
        // firebase.auth().currentUser.updateProfile({
        //     displayName: this.state.fullName,

        // })
        // .catch((error) => {
        //     this.setState({errMsg: error.message});
        // });

        //TODO - need to add additional user info to database and abstract to firebaseAuthFunctions

        // console.log(`logged in as ${user.displayName} - ${user.uid}`);
        
    };
    
    cancelFn = (e) => {
        this.setState = {email: '', password: '', errMsg: ''};
    }

    changeHasLogin = (e) => {
        e.preventDefault();
        let buttonText = this.state.hasLogin ? "Already have a login? Click here." : "Don't have a login? Click here.";
        
        this.setState((prevState) => ({
            hasLogin: !prevState.hasLogin,
            buttonText
        }));
        console.log('updated state to: ' + this.state.hasLogin)
        

    }



    render() {

        // ui.start('#firebaseui-auth-container', uiConfig);

        // const haveOrCreateLogin = () => {
        //     if (this.state.hasLogin) {
        //         return <LoginForm updateFields={this.updateFields.bind(this)} />
        //     } else {
        //         return <CreateLogin updateFields={this.updateFields.bind(this)} />
        //     }
        // };

        return (
            <div data-testid="login">
                {this.state.errMsg && <div id="loginError" ><h4>{this.state.errMsg}</h4></div>}
                <form>
                    <title>Login</title>
                    <LoginForm emailName="email" passwordName="password" updateFields={this.updateFields} />
                    {!this.state.hasLogin && <CreateLogin updateFields={this.updateFields.bind(this)} />}
                    
                    <SubmitButtons submitTitle="Submit" cancelTitle="Cancel"
                        submitFn={this.submitOrSignup.bind(this)}
                        cancelFn={this.cancelFn.bind(this)} />

                    <button type="button" onClick={this.changeHasLogin} data-testid="loginOrCreateButton">{this.state.buttonText}</button>

                    {/*<div id="firebaseui-auth-container"/>*/}
                    {/*<div id="loader">Loading...</div>*/}

                </form>
                {/* <FireAuthWidget/> */}
            </div>

        );
    }
}

export default Login;