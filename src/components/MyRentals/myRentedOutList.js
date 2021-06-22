import React from 'react';
import RentalSummary from "./rentalSummary";
import { formatShortDate } from '../../utils/rentalFunctions';
import ReserveItem from '../Reservations/reserveItem';

class MyRentedOutList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedReservation : ''
        }
        
        this.selectReservation = this.selectReservation.bind(this);
    }

    selectReservation = (reservationId) => {
        this.setState({selectedReservation: reservationId});
    }

    render() {
        
        let rentedItems;

        //check that reservations have loaded and iterate through reservations
        if (!this.props.loading && this.props.myReservations) {
            rentedItems = this.props.myReservations.map((card) => {
                if (this.state.selectedReservation === card.id) {
                    return <ReserveItem key={card.id} 
                        currentRentalItem={card.rentalItemId} 
                        currentUser={this.props.currentUser}
                        reservation={card}
                        selectReservation={this.selectReservation}/>;
                        
                }
                return <RentalSummary key={card.id} id={card.id} title={card.itemName} 
                    dueDate={card.endDateTime ? formatShortDate(card.endDateTime) : ""} 
                    selectReservation={this.selectReservation}/>;
                
            });
            // console.log('rendering with loading false');
        } else {
            rentedItems = <RentalSummary />
            // console.log('rendering with loading true');
        }

        return(
            <div className="container">
                { this.props.loading && <div className="loader">Loading...</div>}
                { !this.props.loading && rentedItems }
            </div>
        );
    }
}

export default MyRentedOutList;