import React, {useState, useEffect} from 'react';
import PhotoCarousel from "./photoCarousel.js";
import TotalBox from "./totalBox"
import DisplayTitleDesc from "./displayTitleDesc";
import SubmitButtons from './submitButtons';
import ReserveDetails from './reserveDetails';
import {hoursTimeDifference} from '../utils/rentalFunctions';
import '../styles/reserveItem.scss';
import { useParams } from 'react-router-dom';
import { getItemFromDB, AddReservation } from '../utils/firebaseFunctions';

function ReserveItem() {
    
    const [exchangeMethod, setExchangeMethod] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [unitCost, setUnitCost] = useState(10);
    const [rentalCost, setRentalCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [deliveryOptions, setDeliveryOptions] = useState({delivery: 5, pickup: 1, meetup: 15 });
    const [itemId, setItemId] = useState('');
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);

    const defaultDates = () => {
       //FIXME 

        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1);
        
        setStartDateTime(today);
        setEndDateTime(tomorrow);
        
    }


    const updateExchangeMethod = (e) => {
        const value = e.target.value;
        switch (value) {
            case "delivery": 
                setDeliveryCost(deliveryOptions.delivery);
                break;
            case "pickup":
                setDeliveryCost(deliveryOptions.pickup);
                break;
            case "meetup":
                setDeliveryCost(deliveryOptions.meetup);
                break;
            default:
                setDeliveryCost(0);
            
        }
        setExchangeMethod(value);
        setTotalCost(deliveryCost + rentalCost);

    }

    const updateStartDateTime = (e) => {

        const incomingStartDateTime = new Date(e.target.value);
        
        //set default endDateTime to be equal or greater to new start date
        if (incomingStartDateTime > endDateTime) {
            //FIXME
        } 

        setEndDateTime(incomingStartDateTime);

        setStartDateTime(incomingStartDateTime);

        setTotalTime(hoursTimeDifference(startDateTime, endDateTime));
        setRentalCost(totalTime * unitCost);
        console.log("rentalCost: " + rentalCost);
        setTotalCost(rentalCost + deliveryCost);

    }

    const updateEndDateTime = (e) => {

        const incomingEndDateTime = new Date(e.target.value);
        
        //check that endDateTime is greater than startDateTime and setState
        //compare milliseconds (+)
        if (+startDateTime < +incomingEndDateTime) {
            //FIXME
            
        } else {
            //FIXME - send error message instead
            //console.log('The end date must be later than the start date.');
        }
        
        setTotalTime(hoursTimeDifference(startDateTime, incomingEndDateTime));
        console.log("unitCost: " + unitCost);
        console.log("totalTime: " + totalTime);
        setRentalCost(totalTime * unitCost);

        console.log("rentalCost: " + rentalCost)

        setTotalCost(rentalCost + deliveryCost);
        setEndDateTime(incomingEndDateTime);
    }

    const reserveItem = (e) => {
        //TODO - set reserveDetails to state and firebase
        console.log(`startDateTime: ${startDateTime}`, `endDateTime: ${endDateTime}`,
         `exchangeMethod: ${exchangeMethod}`, `totalCost: ${totalCost}`, 
         `rentalCost: ${rentalCost}`, `totalTime: ${totalTime}` );
        
        const reservation = {
            startDateTime, 
            endDateTime, 
            exchangeMethod, 
            totalCost, 
            deliveryCost, 
            rentalCost
        };

        AddReservation(reservation);
    }

    const quitReservation = (e) => {
        //TODO - clear reserveDetails and return to main page
        console.log('quit Reservation');
    }

    // let { rentalItemId } = useParams();

    const loadItemDetails = () => {

        

        // console.log ('using effect to load Item Details');
        //     // const itemId = this.props.params.itemId;
        // console.log("itemId: " + itemId);
        // const item = getItemFromDB(itemId);
    }

    useEffect(() => {
        loadItemDetails();
    }, []);

    
        
    return(
        <div className="form">
            <div className="row top-row">
                
                <DisplayTitleDesc title="Sample" desc="This is the description of the item"
                itemRate="$7.99" />

                <SubmitButtons submitTitle="Reserve" cancelTitle="Clear"
                        submitFn={reserveItem.bind(this)}
                        cancelFn={quitReservation.bind(this)}
                        />
            </div>
            <div className="row">
                    <ReserveDetails setExMeth={updateExchangeMethod.bind(this)} exchangeMethod={exchangeMethod} 
                    startDateTime={startDateTime} endDateTime={endDateTime}
                    updateStartDateTime={updateStartDateTime.bind(this)} updateEndDateTime={updateEndDateTime.bind(this)} />

                    <TotalBox 
                        total_cost={totalCost} 
                        delivery_cost={deliveryCost} 
                        rental_time={totalTime} 
                        rental_cost={rentalCost}
                    />

            </div>
        </div>
    );
}

export default ReserveItem;