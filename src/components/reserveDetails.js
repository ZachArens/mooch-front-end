import React, { Component } from 'react';

export default class ReserveDetails extends Component {

    render() {
        //TODO- make dropdown options dynamic

        // const exchangeOptDisplay = exchangeOptions.map((opt) => {
        //     // console.log(`value: ${opt.value}, label: ${opt.label}`);
        //     <a key={opt.value} id={opt.value} className="dropdown-item" value={opt.value} onClick={(e) => this.props.setExMeth(e)}>{opt.label}</a>
        // });

        //TODO - set date fields min

        let defaultStartDate = () => {
            const today = new Date();
            return today.toString();
        }

        return (
            <div>
                <div className="dropdown show">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-testid="dropdownButton" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Exchange Method
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button id="delivery" className="dropdown-item" value="delivery" 
                        data-testid="deliveryButton" onClick={(e) => this.props.setExMeth(e)}>Delivery</button>
                        <button id="pickup" className="dropdown-item" value="pickup" 
                        data-testid="pickupButton" onClick={(e) => this.props.setExMeth(e)}>Pick-up</button>
                        <button id="meetup" className="dropdown-item" value="meetup" data-testid="meetupButton" 
                        onClick={(e) => this.props.setExMeth(e)}>Public Meet-up</button>
                        {/* {exchangeOptDisplay} */}
                    </div>
                </div>
                <div>
                    <h3>{this.props.exchangeMethod}</h3>
                </div>
                <div className="scheduler">
                    <label htmlFor="startDate">Start Date</label>
                    <input type="datetime-local" id="startDate" data-testid="startDateInput" 
                    min={new Date()}
                    // this.props.startDate ? this.props.startDate : 
                    defaultValue={defaultStartDate} onChange={(e) => {this.props.updateStartDateTime(e)}}/>
                    <label htmlFor="endDate">End Date</label>
                    <input type="datetime-local" id="endDate" data-testid="endDateInput" 
                    defaultValue={this.props.endDate} min={this.props.startDate} onChange={(e) => {this.props.updateEndDateTime(e)}}/>
                </div>
            </div>
        )
    }
}
