import React from 'react';
import MyRentedOutList from "./myRentedOutList";

class MyRentals extends React.Component {


    render() {
        return(
            <div>
                <h1>Things I've Rented Out</h1>
                <MyRentedOutList/>

                <h1>My Items</h1>
                <button>+</button>
                {/*<MyItemsList/>*/}
            </div>
        );
    }
}

export default MyRentals;