import React, {Component} from 'react';
import {rentalTimeAsString} from "../../utils/rentalFunctions";

export default class TotalBox extends Component {

    render() {

        return (
            <div>
                <h3>Exchange Fees:</h3>
                <table>
                    <tbody>
                        <tr>
                            <td data-testid="rentalTimeLabel">
                                {rentalTimeAsString(this.props.rental_time)}
                            </td>
                            <td data-testid="rentalCostLabel">{`$${this.props.rental_cost}`}</td>
                        </tr>
                        <tr>
                            <td data-testid="exchangeCostLabel">Delivery</td>
                            <td data-testid="exchangeCost">{`$${this.props.delivery_cost}`}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td data-testid="totalCost">{`$${this.props.total_cost}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    
}