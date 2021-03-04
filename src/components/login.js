import React from 'react';
import firebase from '../firebase';
var firebaseui = require('firebaseui');

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '#',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        //TODO - Add Apple auth option
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};


// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {email: '', password: ''};
//
//         this.submitEmailPass = this.submitEmailPass.bind(this);
//         this.updateFields = this.updateFields.bind(this);
//     }
//
//     updateFields = (e) => {
//         const value = e.target.value;
//         const name = e.target.name;
//         this.setState({[name]: value})
//     }
//
//     submitEmailPass = (e) => {
//         e.preventDefault();
//         console.log(`email: ${this.state.email} \n password: ${this.state.password}`);
//         alert('The link was clicked');
//     }
//
//     render() {
//         return (
//             <div>
//                 <form>
//                     <title>Login</title>
//                     <label>Email
//                         <input type="text" placeholder="email" name="email" onChange={this.updateFields}/>
//                     </label>
//                     <label>Password
//                         <input type="text" name="password" placeholder="********" onChange={this.updateFields}/>
//                     </label>
//                     <div className="submitButtons">
//                         <input type="submit" value="Submit" onClick={(e) => this.submitEmailPass(e)}/>
//                         <input type="button" value="Cancel"/>
//                     </div>
//
//
//                     {/*TODO: link to create account page*/}
//                     <a href="https://www.google.com"><p>Don't have an account?  Create one.</p></a>
//
//                     <input type="button" value="Sign in with Apple"/>
//                     <input type="button" value="Sign in with Google"/>
//                 </form>
//             </div>
//
//         );
//     }
// }

class Login extends React.Component {
    render() {

        ui.start('#firebaseui-auth-container', uiConfig);

        return(
            <div>
                <h1>Login</h1>
                <div id="firebaseui-auth-container"/>
                <div id="loader">Loading...</div>
            </div>

        );
    }
}

export default Login;