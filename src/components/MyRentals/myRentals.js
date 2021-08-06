import React from 'react';
import MyRentedOutList from "./myRentedOutList";
import MyItemsList from './myItemsList';
import { GetRentalItems, getMyReservations, deleteItemFromDB } from "../../utils/firebaseFunctions";
import { withRouter } from 'react-router-dom';
import '../../styles/myRentals.scss'

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
        this.deleteRentalItem = this.deleteRentalItem.bind(this);
    }

    goAddItem = () => {
        const { history } = this.props;
        if (history) history.push('/addItems');
    }

    updateRentalItems = (rentalItemsList, removedItemsList) => {
        // this.setState(prevState => ({
        //     myItems: prevState.myItems.filter((item) => (
        //         removedItemsList.findIndex(rmItem => (item.id === rmItem.id)) > -1 
        //         ))
        // }));

        this.setState(prevState => ({
            // ...prevState.myItems, 
            myItems: [...rentalItemsList],
            itemsLoading: false
        }));
    }

    deleteRentalItem = async (rentalItem) => {
        console.log('deleting rental Item');
        try {
            deleteItemFromDB(rentalItem);
            console.log('deleted from db');
            console.log('myItems: ', this.state.myItems);
            this.setState(prevState => ({
                myItems: prevState.myItems.filter((item) => (item.id !== rentalItem.id))
            }));
            
            console.log('my Post Items: ', this.state.myItems);
            console.log('deleted from state');

        } catch (error) {
            console.log(error.message);
        }

        // console.log(this.state.myItems.find((item) => (item.id === rentalItem.id)).itemName);

        
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
                <h1>My Reservations</h1>
                <MyRentedOutList myReservations={this.state.myReservations} 
                    loading={this.state.reservationsLoading} />

                <h1>My Items</h1>
                <button className='addItemButton' data-testid="addItemButton" onClick={this.goAddItem}>Add Item</button>
                <MyItemsList myItems={this.state.myItems} deleteRentalItem={this.deleteRentalItem} loading={this.state.itemsLoading}/>
            </div>
        );
    }
}

export default withRouter(MyRentals);