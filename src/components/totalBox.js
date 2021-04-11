import React, {useState} from 'react';
import {rentalTimeAsString} from "./rentalFunctions";

const TotalBox = (props) => {


    return (
        <div>
            <h3>Exchange Fees:</h3>
            <table>
                <tbody>
                    <tr>
                        <td>{rentalTimeAsString(props.rental_time)}</td>
                        <td>{props.unit_cost}</td>
                    </tr>
                    <tr>
                        <td>Delivery</td>
                        <td>{props.delivery_cost}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{props.total_cost}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TotalBox;