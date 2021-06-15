import React, { Component } from 'react';

export default class ReserveDetails extends Component {

    render() {
        //TODO- make dropdown options dynamic

        // const exchangeOptDisplay = exchangeOptions.map((opt) => {
        //     // console.log(`value: ${opt.value}, label: ${opt.label}`);
        //     <a key={opt.value} id={opt.value} className="dropdown-item" value={opt.value} onClick={(e) => this.props.setExMeth(e)}>{opt.label}</a>
        // });
        // console.log(this.props.startDateTime ? `render start date: ${this.props.startDateTime.toISOString().substr(0,10)}`: 'no start date');

        const exchangeLabel = () => {
            // console.log('run exchange label');
            if (this.props.exchangeMethod) {
                if (this.props.exchangeMethod === 'delivery') {
                    return 'Delivery';
                } 
                if (this.props.exchangeMethod === 'meetup') {
                    return 'Public Meetup';
                }
                if (this.props.exchangeMethod === 'pickup') {
                    return 'Pick Up';
                }
            } 
            return 'Select Exchange Method'
        }

        //TODO - add cost to exchange Method labels
        //FIXME - consistently display selected exchange method on exchange method button

        return (
            <div>
                <div className="dropdown show">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-testid="dropdownButton" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {exchangeLabel()}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button id="delivery" className="dropdown-item" value="delivery" 
                        data-testid="deliveryButton" 
                        onClick={(e) => {
                            this.props.updateExchangeMethod(e);
                            exchangeLabel();
                        }}>Delivery</button>
                        <button id="pickup" className="dropdown-item" value="pickup" 
                        data-testid="pickupButton" 
                        onClick={(e) => {
                            this.props.updateExchangeMethod(e)
                            exchangeLabel();
                        }}>Pick-up</button>
                        <button id="meetup" className="dropdown-item" value="meetup" data-testid="meetupButton" 
                        onClick={(e) => {
                            this.props.updateExchangeMethod(e);
                            exchangeLabel();
                        }}>Public Meet-up</button>
                    </div>
                </div>
                <div className="scheduler">
                    <label htmlFor="startDate">Start Date
                        <input type="date" id="startDate" data-testid="startDateInput" 
                        min={new Date()}
                        value={this.props.startDateTime ? this.props.startDateTime.toISOString().substr(0,10) : ''} 
                        onChange={(e) => {this.props.updateStartDate(e)}}/>
                    </label>

                    <label htmlFor="startTime">Start Time
                        <input type="time" id="startTime" data-testid="startTimeInput" 
                    // this.props.startDate ? this.props.startDate : 
                    value={this.props.startDateTime ? this.props.startDateTime.toISOString().substr(11, 15): ''} 
                    onChange={(e) => {this.props.updateStartTime(e)}}/>
                    </label>
                    
                    <label htmlFor="endDate">End Date
                        <input type="date" id="endDate" data-testid="endDateInput" 
                        value={this.props.endDateTime ? this.props.endDateTime.toISOString().substr(0, 10) : ''} 
                        min={this.props.startDateTime ? this.props.startDateTime.toISOString().substr(0,10) : ''} 
                        onChange={(e) => {this.props.updateEndDate(e)}}/>
                    </label>

                    <label htmlFor="endTime">End Time
                        <input type="time" id="endTime" data-testid="endTimeInput" 
                        value={this.props.endDateTime ? this.props.endDateTime.toISOString().substr(11, 15): ''} 
                        onChange={(e) => {this.props.updateEndTime(e)}}
                        />
                    </label>
                    
                </div>
            </div>
        )
    }
}
