
import React, { Component } from 'react';
// import UserUI from './components/userUI';
import Login from './components/login';
import RentItem from './components/rentItem';
import AddItem from './components/addItem';
import Home from './components/home';
import MyRentals from "./components/myRentals";
import './App.scss';
import 'bootstrap';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // speed: 0
    };
  }

  render() {
    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Mooch</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link active" aria-current="page">Find</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/myRentals" className="nav-link">My Rentals</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/rentItems" className="nav-link">Temp-Rent Items</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/addItems" className="nav-link">Temp-Add Items</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/rentItems">
                        <RentItem/>
                    </Route>
                    <Route path="/addItems">
                        <AddItem/>
                    </Route>
                    <Route path="/myRentals">
                        <MyRentals/>
                    </Route>
                    <Route path="/find">
                        <div><p>This is page is not yet written</p></div>
                        {/*<Find/>*/}
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
  }
}

export default App;
