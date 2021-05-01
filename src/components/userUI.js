import React from 'react';
import firebase from '../utils/firebase';

class UserUI extends React.Component {

    render() {
        return(
            <div>
                <div className="profileCard">
                    <div className="profilePhotoBox">
                        <img src="https://images.unsplash.com/photo-1613566062425-e4ef58b22451?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="profile img"/>
                    </div>
                    <h3>Display Name</h3>
                    <input type="button" value="Update Email or Password"/>
                </div>
                <form>
                    <input type="text" placeholder="Search Zip" value={this.state.searchZip} />
                    <input type="text" placeholder="Phone Number" value={this.state.phone} />
                    <input type="text" placeholder="Billing Address" value={this.state.billingAddress} />
                    <input type="text" placeholder="City" value={this.state.billingCity} />
                    <input type="text" placeholder="ST" value={this.state.billingST} />
                    <input type="text" placeholder="Zip" value={this.state.billingZip} />
                    <input type="text" placeholder="Mailing Address" value={this.state.mailingAddress} />
                    <input type="text" placeholder="City" value={this.state.mailingCity} />
                    <input type="text" placeholder="ST" value={this.state.mailingST} />
                    <input type="text" placeholder="Zip" value={this.state.mailingZip} />



                </form>
            </div>
        );
    }
}

export default UserUI;
