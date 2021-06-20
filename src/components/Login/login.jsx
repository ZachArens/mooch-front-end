import React from 'react';
import { withRouter } from 'react-router-dom';
import {addUserDetails, createUserWithEmailandPass, loginWithEmailAndPass} from '../../utils/firebaseFunctions';
import SubmitButtons from '../submitButtons';
import LoginForm from './loginForm';
import CreateLogin from './createLogin';

//FIXME - uncaught error in login rejection
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

    submitOrSignup = async (e) => {
        if(this.state.hasLogin) {
            await this.submitEmailPass(e);
        } else {
            await this.signUp(e);
        }

        const { history } = this.props;

        if (history) history.push(this.props.returnTo);
        
    }

    submitEmailPass = async (e) => {
        e.preventDefault();
        // console.log("email: " + this.state.email);
        // console.log("password: " + this.state.password);

        let userId = await loginWithEmailAndPass(this.state.email, this.state.password);

        // //FIXME - temp fix for auth problem
        // let userId = 'aQqcGAeDGafhOSQWeXDFA2klpuH2';
        this.props.setCurrentUser(userId);
    }

    signUp = async (e) => {
        e.preventDefault();

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

       this.props.setCurrentUser(userId);

       const userDetails = {
        uid: userId,
        email: this.state.email,
        fullName: this.state.fullName, 
        streetAddress: this.state.streetAddress,
        city: this.state.city, 
        st: this.state.st,
        zip: this.state.zip, 
        phone: this.state.phone,
       }

       console.log("adding user details: " + userDetails);

       addUserDetails(userDetails);
        
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

export default withRouter(Login);