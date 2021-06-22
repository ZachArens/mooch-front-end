import React from 'react';
import MyRentedOutList from "./myRentedOutList";
import MyItemsList from './myItemsList';
import { GetRentalItems, getMyReservations } from "../../utils/firebaseFunctions";
import { withRouter } from 'react-router-dom';

//TODO - need to make only available to logged in user or forward to login screen
let unsubscribeItems;

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
        this.updateRentalItems = this.updateRentalItems.bind(this);
    }

    goAddItem = () => {
        const { history } = this.props;
        if (history) history.push('/addItems');
    }

    updateRentalItems = (rentalItemsList) => {
        this.setState(prevState => ({
            myItems: [...prevState.myItems, ...rentalItemsList],
            itemsLoading: false
        }));
    }

    async componentDidMount() {
        // console.log(this.props.currentUser);
        if (this.props.currentUser) {
            try {
                await getMyReservations(this.props.currentUser).then(([unsubscribe, reservationList]) => {
                    // console.log('running getMyReservations');
                    // unsubscribeReservations = unsubscribe;
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
                unsubscribeItems = await GetRentalItems(this.updateRentalItems, this.props.currentUser);

            } catch (e) {
                console.log('getMyItems...Catch');
                console.log(e);
            } 
        }
        

    }

    componentWillUnmount() {
        // unsubscribeReservations();
        if (unsubscribeItems) {
            unsubscribeItems();
        }
        
    }

    render() {

        

        return(
            <div>
                <h1>Things I've Rented Out</h1>
                <MyRentedOutList myReservations={this.state.myReservations} 
                    loading={this.state.reservationsLoading} />

                <h1>My Items</h1>
                <button data-testid="addItemButton" onClick={this.goAddItem}>+</button>
                <MyItemsList myItems={this.state.myItems} loading={this.state.itemsLoading}/>
            </div>
        );
    }
}

export default withRouter(MyRentals);