import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
// import PhotoCarousel from "./photoCarousel.js";
import TotalBox from "./totalBox"
import DisplayTitleDesc from "./displayTitleDesc";
import SubmitButtons from './submitButtons';
import ReserveDetails from './reserveDetails';
import {hoursTimeDifference} from '../utils/rentalFunctions';
import '../styles/reserveItem.scss';
import { getItemFromDB, AddReservation } from '../utils/firebaseFunctions';

function ReserveItem(currentRentalItem) {
    
    const history = useHistory();
    const [exchangeMethod, setExchangeMethod] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [unitCost, setUnitCost] = useState(10);
    const [rentalCost, setRentalCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [deliveryCost, setDeliveryCost] = useState(-1);
    const [deliveryOptions, setDeliveryOptions] = useState({delivery: 5, pickup: 1, meetup: 15 });
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("");
    // const [itemId, setItemId] = useState('');
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);

    // const defaultDates = () => {
    //    //FIXME 

    //     let today = new Date();
    //     let tomorrow = new Date(today)
    //     tomorrow.setDate(today.getDate() + 1);
        
    //     setStartDateTime(today);
    //     setEndDateTime(tomorrow);
        
    // }


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

        const calcTotalTime = hoursTimeDifference(incomingStartDateTime, endDateTime);
        const calcRentalCost = calcTotalTime * unitCost;

        console.log("calc time difference: " + calcTotalTime, "state time difference: " + totalTime, "calcRentalCost: " + calcRentalCost);
        setTotalTime(calcTotalTime);
        setRentalCost(calcRentalCost);
        setTotalCost(calcRentalCost + deliveryCost);

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

        if (!startDateTime || !endDateTime || deliveryCost < 0 || totalTime < 1) {
            return null;
        }

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
        history.push('/myRentals');
    }

    const quitReservation = (e) => {
        //TODO - clear reserveDetails and return to main page
        history.push('/');
    }

    // let { rentalItemId } = useParams();

    const loadItemDetails = async () => {

        const itemDetails = await getItemFromDB(currentRentalItem.currentRentalItem);

        console.log(itemDetails);

        if (itemDetails) {
            setItemName(itemDetails.itemName);
            setItemDescription(itemDetails.itemDesc);
            setUnitCost(itemDetails.costHourly);
            setDeliveryOptions(itemDetails.deliveryOptions);
        }
        
        
        // console.log("name: " + itemName, "desc: " + itemDescription, "cost: " + unitCost);

        // console.log ('using effect to load Item Details');
    }

    useEffect(() => {
        loadItemDetails();
    });

    
        
    return(
        <div className="form">
            <div className="row top-row">
                
                <DisplayTitleDesc title={itemName} desc={itemDescription}
                itemRate={unitCost} />

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