
import React, { Component } from 'react';
// import UserUI from './components/userUI';
import Login from './components/login';
import RentItem from './components/rentItem'
import './App.scss';
import 'bootstrap';
// import { db } from "./firebase";
// db.doc("react/test/attributes/speed").set({speed:25});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // speed: 0
    };
  }

  // componentDidMount() {
  //   const speedRef = db.doc('react/test/attributes/speed');
  //   speedRef.onSnapshot( snap => {
  //     this.setState({
  //       // speed:snap.data().speed
  //     });
  //   });
  // }

  render() {
    return (
        <RentItem costPerUnit="10" timeUnitType="hour"/>
    )
  }
}

export default App;
