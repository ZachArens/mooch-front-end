import React, { Component } from 'react';
import {displayTime, isDate} from '../../utils/rentalFunctions';

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
            if (this.props.selectedExchangeMethod) {
                if (this.props.selectedExchangeMethod === '') {
                    return 'Select Exchange Method';
                } 
                if (this.props.selectedExchangeMethod === 'delivery') {
                    return `Delivery $${this.props.exchangeOptions.delivery}`;
                } 
                if (this.props.selectedExchangeMethod === 'meetup') {
                    return `Public Meet-Up $${this.props.exchangeOptions.meetup}`;
                }
                if (this.props.selectedExchangeMethod === 'pickup') {
                    return `Pick-Up $${this.props.exchangeOptions.pickup}`;
                }
            } 
            return 'Select Exchange Method';
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
                        <button id="blank" className="dropdown-item" value="" 
                        data-testid="blankButton" 
                        onClick={(e) => {
                            this.props.updateExchangeMethod(e);
                        }}></button>
                        <button id="delivery" className="dropdown-item" value="delivery" 
                        data-testid="deliveryButton" 
                        onClick={(e) => {
                            this.props.updateExchangeMethod(e);
                        }}>{`Delivery $${this.props.exchangeOptions ? this.props.exchangeOptions.delivery : '0'}`}</button>
                        <button id="pickup" className="dropdown-item" value="pickup" 
                        data-testid="pickupButton" 
                        onClick={(e) => {
                            this.props.updateExchangeMethod(e)
                        }}>{`Pick-Up $${this.props.exchangeOptions ? this.props.exchangeOptions.pickup : '0'}`}</button>
                        <button id="meetup" className="dropdown-item" value="meetup" data-testid="meetupButton" 
                        onClick={(e) => {
                            this.props.updateExchangeMethod(e);
                        }}>{`Public Meet-Up $${this.props.exchangeOptions ? this.props.exchangeOptions.meetup : '0'}`}</button>
                    </div>
                </div>
                <div className="scheduler">
                    <label htmlFor="startDate">Start Date
                        <input type="date" id="startDate" data-testid="startDateInput" 
                        min={new Date()}
                        value={isDate(this.props.startDateTime) ? this.props.startDateTime.toISOString().substr(0,10) : ''} 
                        onChange={(e) => {this.props.updateStartDate(e)}}/>
                    </label>

                    <label htmlFor="startTime">Start Time
                        <input type="time" id="startTime" data-testid="startTimeInput" 
                            value={isDate(this.props.startDateTime) ? displayTime(this.props.startDateTime): ''} 
                            onChange={(e) => {this.props.updateTime(e)}}/>
                    </label>
                    
                    <label htmlFor="endDate">End Date
                        <input type="date" id="endDate" data-testid="endDateInput" 
                        value={isDate(this.props.endDateTime) ? this.props.endDateTime.toISOString().substr(0, 10) : ''} 
                        min={isDate(this.props.startDateTime) ? this.props.startDateTime.toISOString().substr(0,10) : ''} 
                        onChange={(e) => {this.props.updateEndDate(e)}}/>
                    </label>

                    <label htmlFor="endTime">End Time
                        <input type="time" id="endTime" data-testid="endTimeInput" 
                        value={isDate(this.props.endDateTime) ? displayTime(this.props.endDateTime): ''} 
                        onChange={(e) => {this.props.updateTime(e)}}
                        />
                    </label>
                    
                </div>
            </div>
        )
    }
}