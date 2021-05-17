import React from 'react';
import PhotoCarousel from "./photoCarousel.js";
import TotalBox from "./totalBox"
import DisplayTitleDesc from "./displayTitleDesc";
import SubmitButtons from './submitButtons';
import ReserveDetails from './reserveDetails';
import {hoursTimeDifference} from '../utils/rentalFunctions';
import '../styles/reserveItem.scss';

class ReserveItem extends React.Component {
    constructor(props) {
        super(props);

        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1);

        //FIXME - lower priority, set state from rentalItem 
        //TODO - set user details
        this.state = {
            exchangeMethod: '', 
            startDate: today, 
            endDate: tomorrow,
            total_time: 0,
            unit_cost: 5,
            rental_cost: 0,
            total_cost: 0,
            delivery_cost: 0,
            delivery_options: {delivery: 5, pickup: 1, meetup: 15 }
        };
    }

    setExchangeMethod = (e) => {
        const value = e.target.value;
        let delivery_cost = 0;
        switch (value) {
            case "delivery": 
                delivery_cost = this.state.delivery_options.delivery;
                break;
            case "pickup":
                delivery_cost = this.state.delivery_options.pickup;
                break;
            case "meetup":
                delivery_cost = this.state.delivery_options.meetup;
                break;
            default:
                delivery_cost = 0;
        }
        this.setState({
            exchangeMethod: value, 
            delivery_cost,
            total_cost: (delivery_cost + this.state.rental_cost)
        });
    }

    updateStartDate = (e) => {

        const incomingStartDate = new Date(e.target.value);
        let newEndDate = null;
        
        //set default endDate to be equal or greater to new start date
        if (incomingStartDate > this.state.endDate) {
            newEndDate = incomingStartDate;
        } else {
            newEndDate = this.state.endDate;
        }

        let total_time = hoursTimeDifference(incomingStartDate, newEndDate);
        let rental_cost = total_time * this.state.unit_cost;
        let total_cost = rental_cost + this.state.delivery_cost;
        
        this.setState({
            startDate: incomingStartDate, 
            endDate: newEndDate,
            total_time,
            rental_cost,
            total_cost
        });

    }

    updateEndDate = (e) => {

        const incomingEndDate = new Date(e.target.value);
        const startDate = this.state.startDate;
        
        //check that endDate is greater than startDate and setState
        //compare milliseconds (+)
        if (+startDate < +incomingEndDate) {
            let total_time = hoursTimeDifference(this.state.startDate, incomingEndDate);
            let rental_cost = total_time * this.state.unit_cost;
            let total_cost = rental_cost + this.state.delivery_cost;
        
            this.setState({
                endDate: incomingEndDate,
                total_time,
                rental_cost,
                total_cost
            });
        } else {
            //FIXME - send error message instead
            console.log('The end date must be later than the start date.');
        }
        
    }

    reserveItem = (e) => {
        //TODO - set reserveDetails to state and firebase
        console.log('reserve Item');
    }

    quitReservation = (e) => {
        //TODO - clear reserveDetails and return to main page
        console.log('quit Reservation');
    }


    render() {
        // const photos = [{key: 1, active: "active", photoURL:"https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText: "kayak"},
        //     {key:2, photoURL: "https://oldtowncanoe.johnsonoutdoors.com/sites/johnsonoutdoors-store/files/assets/images/10/1/1099627_primary/1099627_primary.jpg", altText:"paddle"},
        //     {key:3, photoURL: "https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Untitled-48.png?v=1563914213", altText: "lifejacket"},
        //     {key:4, photoURL: "https://cdni.llbean.net/is/image/wim/506404_3525_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2", altText: "something else"}];
        // const numbers = [1,2,3,4];
        return(
            <div className="form">
                <div className="row top-row">
                    {/* <div className="photo_frame col-md-5">
                        <PhotoCarousel numbers={numbers}/>
                    </div> */}


                    
                    <DisplayTitleDesc title="Sample" desc="This is the description of the item"
                    itemRate="$7.99" />

                    <SubmitButtons submitTitle="Rent" cancelTitle="Clear"
                            submitFn={this.reserveItem.bind(this)}
                            cancelFn={this.quitReservation.bind(this)}
                            />
                </div>
                <div className="row">
                        <ReserveDetails setExMeth={this.setExchangeMethod.bind(this)} startDate={this.state.startDate} endDate={this.state.endDate}
                        updateStartDate={this.updateStartDate.bind(this)} updateEndDate={this.updateEndDate.bind(this)} />

                        <TotalBox 
                            total_cost={this.state.total_cost} 
                            delivery_cost={this.state.delivery_cost} 
                            rental_time={this.state.total_time} 
                            rental_cost={this.state.rental_cost}
                        />

                </div>
            </div>
        );
    }
}

export default ReserveItem;