
import React, { Component } from 'react';
import Login from './components/Login/login';
import AddItem from './components/AddEditItems/addItem';
import ReserveItem from './components/Reservations/reserveItem';
import Home from './components/Home/home';
import MyRentals from "./components/MyRentals/myRentals";
import './App.scss';
import 'bootstrap';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import { auth } from './utils/firebase';

let unsubscribeAuthState = null;

class App extends Component {
  constructor(props) {
    super(props);

    //TODO - persist state with useLocalStorage
    this.state = {
      currentUser: "",
      currentRentalItem: "",
    };

    this.updateCurrentItem = this.updateCurrentItem.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  updateCurrentItem = (rentalItemId) => {
    this.setState({currentRentalItem: rentalItemId});
  }

  setCurrentUser = (userId) => {
    // console.log(userId);
    this.setState({currentUser: userId});
  }

  //login tutorial provided by: https://medium.com/@650egor/react-30-day-challenge-day-3-firebase-user-authentication-879e484e5934
  logout() {
    auth.signOut().then((result) => {
        this.setState({
            currentUser: null
        });
        // console.log("logged out");
    })
  }

  componentDidMount() {
    //set Observer on auth object to monitor if user is signed in out

      unsubscribeAuthState = auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
              this.setState({currentUser: currentUser.uid});
              
          }
      })
  }

  componentWillUnmount() {

    // console.log("App user logged in: " + this.state.currentUser)

    if (unsubscribeAuthState) {
        unsubscribeAuthState();
    }
      
  }

  render() {
    
    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <NavLink to="/" className="navbar-brand" >Mooch</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {/* <li className="nav-item">
                                    <NavLink to="/" className="nav-link active" aria-current="page">Find</NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink to="/myRentals" className="nav-link">My Rentals</NavLink>
                                </li>
                                <li className="nav-item">
                                    {this.state.currentUser && <NavLink to="/" onClick={this.logout} className="nav-link">Signed in as {this.state.currentUser} - Logout</NavLink>}
                                    {!this.state.currentUser && <NavLink to="/login" className="nav-link" data-testid="loginNav">Login</NavLink>}
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink to="/addItems" className="nav-link">Temp-Add Items</NavLink>
                                </li> */}
                                {/* <li className="nav-item">
                                    <NavLink to="/reserveItem" className="nav-link">Temp-Reserve Items</NavLink>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route path="/login">
                        <Login setCurrentUser={this.setCurrentUser} returnTo='/'/>
                    </Route>
                    <Route path="/addItems">
                        <AddItem currentUser={this.state.currentUser} />
                    </Route>
                    <Route path="/reserveItem">
                        {this.state.currentUser && <ReserveItem currentRentalItem={this.state.currentRentalItem} 
                        currentUser={this.state.currentUser}/>}
                        {!this.state.currentUser && <Login setCurrentUser= {this.setCurrentUser} returnTo='/reserveItem' />}

                    </Route>
                    <Route path="/myRentals">
                        {this.state.currentUser && <MyRentals currentUser={this.state.currentUser} />}
                        {!this.state.currentUser && <Login setCurrentUser= {this.setCurrentUser} returnTo='/myRentals' />}
                        
                    </Route>
                    <Route path="/">
                        <Home updateCurrentItem={this.updateCurrentItem.bind(this)} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
  }
}

export default App;
