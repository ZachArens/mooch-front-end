import React from 'react';
import MyRentedOutList from "./myRentedOutList";
import MyItemsList from './myItemsList';
import { GetRentalItems, getMyReservations } from "../../utils/firebaseFunctions";
import { withRouter } from 'react-router-dom';

let unsubscribeReservations = null;
let unsubscribeItems = null;

//TODO - need to make only available to logged in user or forward to login screen

class MyRentals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myReservations : [],
            reservationsLoading: true,
            myItems : [],
            itemsLoading: true,
        };

        this.goAddItem = this.goAddItem.bind(this);
    }

    goAddItem = () => {
        // this.props.updateCurrentItem('');
        const { history } = this.props;
        if (history) history.push('/addItems');
    }

    async componentDidMount() {
        // console.log(this.props.currentUser);
        if (this.props.currentUser) {
            try {
                await getMyReservations(this.props.currentUser).then(([unsubscribe, reservationList]) => {
                    // console.log('running getMyReservations');
                    unsubscribeReservations = unsubscribe;
                    // console.log("returned with: " + reservationList);
                    this.setState({
                        myReservations: [...reservationList], 
                        reservationsLoading: false
                    });
                });
            } catch (e) {
                console.log('getMyReservations...Catch');
                console.log(e);
            }

            try {
                await GetRentalItems(this.props.currentUser).then(([unsubscribe, rentalItemsList]) => {
                    unsubscribeItems = unsubscribe;

                    // console.log(rentalItemsList[0]);
                    this.setState({
                        myItems: [...rentalItemsList], 
                        itemsLoading: false
                    });
                } )

            } catch (e) {
                console.log('getMyItems...Catch');
                console.log(e);
            } 
        }
        

    }

    componentWillUnmount() {
        // unsubscribeReservations();
        // unsubscribeItems();
    }

    render() {

        

        return(
            <div>
                <h1>Things I've Rented Out</h1>
                <MyRentedOutList myReservations={this.state.myReservations} 
                    loading={this.state.reservationsLoading} 
                    currentUser={this.props.currentUser}/>

                <h1>My Items</h1>
                <button data-testid="addItemButton" onClick={this.goAddItem}>+</button>
                <MyItemsList myItems={this.state.myItems} 
                    loading={this.state.itemsLoading}
                    currentUser={this.props.currentUser}
                    updateCurrentItem={this.props.updateCurrentItem}
                    />
            </div>
        );
    }
}

export default withRouter(MyRentals);