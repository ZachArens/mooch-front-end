import React from 'react';

class RentalSummary extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="row rental-summary">
                <h5 className="col-md-4">{this.props.title}</h5>
                <h5 className="col-md-4">{"Due " + this.props.dueDate}</h5>
                <h5 className="col-md-4">&#62;</h5>
            </div>
        );
    }
}

export default RentalSummary;