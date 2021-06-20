import React from 'react';

class RentalSummary extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
<<<<<<< HEAD:src/components/MyRentals/rentalSummary.js
            <div className="row rental-summary" onClick={() => this.props.selectReservation(this.props.id)}>
                <h5 data-testid='itemName' className="col-md-4">{this.props.title}</h5>
                <h5 className="col-md-4" data-testid="dueSummary" >{"Due " + this.props.dueDate}</h5>
=======
            <div className="row rental-summary">
                <h5 className="col-md-4">{this.props.title}</h5>
                <h5 className="col-md-4">{"Due " + this.props.dueDate}</h5>
>>>>>>> parent of d9c3eff (updated myRentedOutList to retrieve items from firebase and built tests for component):src/components/rentalSummary.js
                <h5 className="col-md-4">&#62;</h5>
            </div>
        );
    }
}

export default RentalSummary;