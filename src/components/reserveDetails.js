import React, { Component } from 'react';

export default class ReserveDetails extends Component {

    render() {
        //TODO- make dropdown options dynamic

        // const exchangeOptDisplay = exchangeOptions.map((opt) => {
        //     // console.log(`value: ${opt.value}, label: ${opt.label}`);
        //     <a key={opt.value} id={opt.value} className="dropdown-item" value={opt.value} onClick={(e) => this.props.setExMeth(e)}>{opt.label}</a>
        // });

        //TODO - set date fields min

        return (
            <div>
                <div className="dropdown show">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-testid="dropdownButton" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Exchange Method
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button id="delivery" className="dropdown-item" value="delivery" onClick={(e) => this.props.setExMeth(e)}>Delivery</button>
                        <button id="pickup" className="dropdown-item" value="pickup" onClick={(e) => this.props.setExMeth(e)}>Pick-up</button>
                        <button id="meetup" className="dropdown-item" value="meetup" onClick={(e) => this.props.setExMeth(e)}>Public Meet-up</button>
                        {/* {exchangeOptDisplay} */}
                    </div>
                </div>
                <div className="scheduler">
                    <label htmlFor="startDate">Start Date</label>
                    <input type="datetime-local" id="startDate" data-testid="startDateInput" 
                    defaultValue={this.props.startDate} onChange={(e) => {this.props.updateStartDate(e)}}/>
                    <label htmlFor="endDate">End Date</label>
                    <input type="datetime-local" id="endDate" data-testid="endDateInput" 
                    defaultValue={this.props.endDate} onChange={(e) => {this.props.updateEndDate(e)}}/>
                </div>
            </div>
        )
    }
}
