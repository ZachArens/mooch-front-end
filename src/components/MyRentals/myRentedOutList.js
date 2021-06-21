import React from 'react';
import RentalSummary from "./rentalSummary";
import { getMyReservations } from '../../utils/firebaseFunctions';
import { formatShortDate } from '../../utils/rentalFunctions';

let unsubscribe = null;

class MyRentedOutList extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        
        let rentedItems;

        if (!this.props.loading && this.props.myReservations) {
            rentedItems = this.props.myReservations.map((card) =>
                        <RentalSummary key={card.id} title={card.itemName} dueDate={card.endDateTime ? formatShortDate(card.endDateTime) : ""} />
                    );
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