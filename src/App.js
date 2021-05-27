
import React, { Component } from 'react';
// import UserUI from './components/userUI';
import Login from './components/Login/login';
import RentItem from './components/reserveItem';
import AddItem from './components/addItem';
import ReserveItem from './components/reserveItem';
import Home from './components/home';
import MyRentals from "./components/myRentals";
import './App.scss';
import 'bootstrap';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    //TODO - persist state with useLocalStorage
    this.state = {
      currentUser: "",
      currentRentalItem: "",
    };

    this.updateCurrentItem = this.updateCurrentItem.bind(this);
  }

  updateCurrentItem = (rentalItemId) => {
    this.setState({currentRentalItem: rentalItemId});
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
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/addItems" className="nav-link">Temp-Add Items</NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink to="/reserveItem" className="nav-link">Temp-Reserve Items</NavLink>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/addItems">
                        <AddItem/>
                    </Route>
                    <Route path="/reserveItem">
                        <ReserveItem currentRentalItem={this.state.currentRentalItem}/>
                    </Route>
                    <Route path="/myRentals">
                        <MyRentals/>
                    </Route>
                    <Route path="/find">
                        <div><p>This is page is not yet written</p></div>
                        {/*<Find/>*/}
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
