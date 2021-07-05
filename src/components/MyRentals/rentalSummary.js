import React from 'react';

class RentalSummary extends React.Component {
    render() {
        // console.log(`title: ${this.props.title}, dueDate: ${this.props.endDateTime}`)
        return (
            <div className="row rental-summary" 
                data-testid='reservation'
                onClick={() => this.props.selectReservation(this.props.id)} >
                <h5 className="col-md-4" data-testid="itemName">{this.props.title}</h5>
                <h5 className="col-md-4" data-testid="dueSummary" >{"Due " + this.props.dueDate}</h5>
                <h5 className="col-md-4">&#62;</h5>
            </div>
        );
    }
}

export default RentalSummary;