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

function ReserveItem(currentRentalItem, currentUser) {
    
    
    const history = useHistory();
    const [exchangeMethod, setExchangeMethod] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [unitCost, setUnitCost] = useState(10);
    const [rentalCost, setRentalCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [deliveryOptions, setDeliveryOptions] = useState({delivery: 5, pickup: 1, meetup: 15 });
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("");
    const [itemId, setItemId] = useState(currentRentalItem);
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date().setUTCDate(new Date().getUTCDate() + 1));


    const updateExchangeMethod = (e) => {
        const value = e.target.value;
        if (deliveryOptions) {
            switch (value) {
                case "delivery": 
                    setDeliveryCost(deliveryOptions.delivery);
                    setTotalCost(deliveryOptions.delivery + rentalCost);
                    break;
                case "pickup":
                    setDeliveryCost(deliveryOptions.pickup);
                    setTotalCost(deliveryOptions.pickup + rentalCost);
                    break;
                case "meetup":
                    setDeliveryCost(deliveryOptions.meetup);
                    setTotalCost(deliveryOptions.meetup + rentalCost);
                    break;
                default:
                    setDeliveryCost(0);
                    setTotalCost(0);
            }

            setExchangeMethod(value);
            updateCalculations();
            
        }
    }

    const updateCalculations = () => {
        
        const calcTotalTime = startDateTime && endDateTime ? hoursTimeDifference(startDateTime, endDateTime) : 0;
        const calcRentalCost = unitCost ? calcTotalTime * unitCost: 0;
        setTotalTime(calcTotalTime);
        setRentalCost(calcRentalCost);
        if (deliveryCost) {setTotalCost(calcRentalCost + deliveryCost);} else {setTotalCost(calcRentalCost)}
        
        console.log(endDateTime ? `endDateTime: ${endDateTime}`: 'endDateTime null');
        console.log(startDateTime ? `startDateTime: ${startDateTime}`: 'startDateTime null');
        console.log(unitCost ? `unitCost: ${unitCost}`: 'unitCost null');
        console.log(deliveryCost ? `deliveryCost: ${deliveryCost}`: 'deliveryCost null');
    
        console.log("calc time difference: " + calcTotalTime, "state time difference: " + totalTime, "calcRentalCost: " + calcRentalCost);
        console.log('calc Rental cost: ', calcRentalCost, 'calc TotalCost: ', calcRentalCost + deliveryCost);
    
    }

    const updateStartDate = (e) => {

        const incomingStartDate = new Date(e.target.value);
        let newEndDate = null;
        //set default endDateTime to be equal or greater to new start date
        if (endDateTime > incomingStartDate ) {
            //FIXME
            newEndDate = incomingStartDate;
        } else {
            newEndDate = endDateTime;
        }

        //set startDateTime or create if null
        let newDate = null;
        if (startDateTime) {
            console.log('using old date');
            newDate = new Date(startDateTime);
        } else {
            console.log('using new date');
            newDate = new Date();
        }
        console.log('endDate', endDateTime, 'incomingStartDate', incomingStartDate)


        console.log(newDate);
        //set new date but keep time
        newDate.setUTCFullYear(incomingStartDate.getUTCFullYear(), 
            incomingStartDate.getUTCMonth(), 
            incomingStartDate.getUTCDate());

        setStartDateTime(newDate);
        console.log(
            'set new start: ', newDate
        )
        setEndDateTime(newEndDate);
        console.log('set new end: ', newEndDate);

        updateCalculations();

    }

    const updateEndDate = (e) => {

        const incomingEndDateTime = new Date(e.target.value);
        
        //check that endDateTime is greater than startDateTime and setState
        //compare milliseconds (+)
        //set startDateTime or create if null
        let newDate = null;
        if (endDateTime) {
            console.log('using old date');
            newDate = new Date(endDateTime);
        } else {
            console.log('using new date');
            newDate = new Date();
        }

        //set new date but keep time
        newDate.setUTCFullYear(incomingEndDateTime.getUTCFullYear(), 
            incomingEndDateTime.getUTCMonth(), 
            incomingEndDateTime.getUTCDate());
        
        setEndDateTime(newDate);

        updateCalculations();
    }

    const reserveItem = (e) => {
        //TODO - set reserveDetails to state and firebase

        if (!startDateTime || !endDateTime || deliveryCost < 0 || totalTime < 1) {
            return null;
        }

        console.log(`startDateTime: ${startDateTime}`, `endDateTime: ${endDateTime}`,
         `exchangeMethod: ${exchangeMethod}`, `totalCost: ${totalCost}`, 
         `rentalCost: ${rentalCost}`, `totalTime: ${totalTime}`, `currentUser: ${currentUser}`);
        
        const reservation = {
            itemName,
            renterId: currentUser,
            ownerId,
            startDateTime, 
            endDateTime, 
            exchangeMethod, 
            totalCost, 
            deliveryCost, 
            rentalCost,
            rentalItemId: currentRentalItem,
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

        // console.log(itemDetails);

        if (itemDetails) {
            setOwnerId(itemDetails.ownerId);
            setItemName(itemDetails.itemName);
            setItemDescription(itemDetails.itemDesc);
            setUnitCost(itemDetails.costHourly);
            setDeliveryOptions(itemDetails.deliveryOptions);
        }

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
                    <ReserveDetails 
                        updateExchangeMethod={updateExchangeMethod.bind(this)} 
                        exchangeMethod={exchangeMethod} 
                        startDateTime={startDateTime} 
                        endDateTime={new Date()}
                        updateStartDate={updateStartDate.bind(this)} 
                        updateEndDate={updateEndDate.bind(this)} 
                        />
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