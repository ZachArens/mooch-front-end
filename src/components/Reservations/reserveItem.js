import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
// import PhotoCarousel from "./photoCarousel.js";
import TotalBox from './totalBox';
import DisplayTitleDesc from "../displayTitleDesc";
import SubmitButtons from '../submitButtons';
import ReserveDetails from './reserveDetails';
import {updateCalculations, getNewTime, getNewDate} from '../../utils/rentalFunctions';
import '../../styles/reserveItem.scss';
import { getItemFromDB, AddReservation } from '../../utils/firebaseFunctions';

function ReserveItem(props) {
    
    
    const history = useHistory();
    const [exchangeOptions, setExchangeOptions] = useState(undefined);
    const [selectedExchangeMethod, setSelectedExchangeMethod] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [totalTime, setTotalTime] = useState(24);
    const [unitCost, setUnitCost] = useState(0);
    const [rentalCost, setRentalCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [exchangeCost, setExchangeCost] = useState(0);
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [startDateTime, setStartDateTime] = useState(today);
    const [endDateTime, setEndDateTime] = useState(tomorrow);

    const updateExchangeMethod = (e) => {
        const value = e.target.value;
        console.log('value: ', value);
        if (!loading) {
            switch (value) {
                case "delivery": 
                    // console.log('clicked: delivery');
                    setSelectedExchangeMethod('delivery');
                    setExchangeCost(exchangeOptions.delivery);
                    // console.log('exchange cost set: ', exchangeCost);

                    // console.log('selectedExchangeMethod set: ', selectedExchangeMethod);

                    break;
                case "pickup":
                    // console.log('clicked: pickup');
                    setSelectedExchangeMethod('pickup');
                    setExchangeCost(exchangeOptions.pickup);
                    
                    break;
                case "meetup":
                    // console.log('clicked: pickup');

                    setExchangeCost(exchangeOptions.meetup);
                    setSelectedExchangeMethod('meetup');
                    break;
            }

            // console.log('selectedExchangeMethod: ', selectedExchangeMethod);
            runUpdateCalcs();
        }
        
        
    }

    const runUpdateCalcs = () => {
        const newCalcs = updateCalculations(startDateTime, endDateTime, unitCost, exchangeCost);
        setTotalTime(newCalcs.totalTime);
        setRentalCost(newCalcs.rentalCost);
        setTotalCost(newCalcs.totalCost);
        // console.log('updated');
    }

    const updateStartDate = (e) => {

        //set startDateTime or create if null
        let newDate = getNewDate(e.target.value, startDateTime);

        //set default endDateTime to be equal or greater to new start date
        if (endDateTime < newDate ) {
            setEndDateTime(newDate);
            // console.log('updated endDate from start date');
        } 

        setStartDateTime(newDate);
        runUpdateCalcs();

    }

    const updateEndDate = (e) => {

        setEndDateTime(getNewDate(e.target.value, endDateTime));
        runUpdateCalcs();
    }

    const updateTime = (e) => {

        const newDate = getNewTime(e.target.value);

        if (e.target.id === 'startTime') {
            setStartDateTime(newDate);
        }

        if (e.target.id === 'endTime') {
            setEndDateTime(newDate);
        }
        
        runUpdateCalcs();

    }

    const reserveItem = (e) => {
        //TODO - set reserveDetails to state and firebase
        // console.log('reservingItem');

        if (!startDateTime || !endDateTime || exchangeCost < 0 || totalTime < 1) {
            // console.log('missing something: ', 'startDateTime: ', startDateTime, 'endDateTime: ', endDateTime, 'exchangeCost: ',exchangeCost, 'totalTime: ',totalTime);
            return null;
        }
        // console.log(`startDateTime: ${startDateTime}`, `endDateTime: ${endDateTime}`,
        //  `exchangeOptions: ${exchangeOptions}`, `totalCost: ${totalCost}`, 
        //  `rentalCost: ${rentalCost}`, `totalTime: ${totalTime}`, `currentUser: ${props.currentUser}`);
        
        const newReservation = {
            itemName,
            itemDescription,
            renterId: props.reservation ? props.reservation.lenderId : props.currentUser,
            ownerId,
            startDateTime, 
            endDateTime,
            exchangeOptions, 
            selectedExchangeMethod, 
            totalCost, 
            exchangeCost, 
            unitCost,
            rentalCost,
            rentalItemId: props.reservation ? props.reservation.rentalItemId : props.currentRentalItem,
            reservationId: props.reservation ? props.reservation.id : ''
        };

        // console.log('reserving: ', newReservation);

        AddReservation(newReservation);
        
        if (props.reservation) {
            props.selectReservation('');
        } else {
            history.push('/myRentals');
        }
        
    }

    const quitReservation = (e) => {
        if (props.reservation) {
            props.selectReservation('');
        } else {
           history.push('/'); 
        }
        
    }

    const loadItemDetails = async () => {

        const itemDetails = await getItemFromDB(props.currentRentalItem);
        // console.log(itemDetails);

        if (itemDetails) {
            setOwnerId(itemDetails.ownerId);
            setItemName(itemDetails.itemName);
            setItemDescription(itemDetails.itemDesc);
            setUnitCost(itemDetails.costHourly);
            setExchangeOptions(itemDetails.exchangeOptions);
            setLoading(false);
        } 

    }

    const loadFromCurrentReservation = () => {
        // console.log('running loadFromCurrent...');
        const reservation = props.reservation
        setOwnerId(reservation.ownerId ? reservation.ownerId : '');
        setExchangeOptions(reservation.exchangeOptions ? reservation.exchangeOptions : '');
        setTotalTime(reservation.totalTime ? reservation.totalTime : '');
        setTotalCost(reservation.totalCost ? reservation.totalCost : '');
        setUnitCost(reservation.unitCost ? reservation.unitCost : '');
        setRentalCost(reservation.rentalCost ? reservation.rentalCost : '');
        setExchangeCost(reservation.exchangeCost ? reservation.exchangeCost : '');
        setItemName(reservation.itemName ? reservation.itemName : '');
        setItemDescription(reservation.itemDescription ? reservation.itemDescription : '');
        setStartDateTime(reservation.startDateTime ? reservation.startDateTime : '');
        setEndDateTime(reservation.endDateTime ? reservation.endDateTime : '');
        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            if (props.reservation) {
                loadFromCurrentReservation();
            } else {
                loadItemDetails();
            }
        }

        // console.log('end: ', endDateTime, 'start: ', startDateTime);
        
    }, [props.rentalItemId, props.reservation ]);

    
        
    return(
        <div className="form" >
            <div className="row top-row">
                
                <DisplayTitleDesc title={itemName} desc={itemDescription}
                itemRate={unitCost} />

                <SubmitButtons submitTitle={props.reservation ? "Edit" : "Reserve"} cancelTitle="Cancel"
                        submitFn={reserveItem.bind(this)}
                        cancelFn={quitReservation.bind(this)}
                        />

            </div>
            <div className="row">
                    <ReserveDetails 
                        updateExchangeMethod={updateExchangeMethod.bind(this)} 
                        selectedExchangeMethod={selectedExchangeMethod} 
                        exchangeOptions={exchangeOptions}
                        startDateTime={startDateTime} 
                        endDateTime={endDateTime}
                        updateStartDate={updateStartDate.bind(this)} 
                        updateEndDate={updateEndDate.bind(this)} 
                        updateTime={updateTime.bind(this)}
                        />
                    <TotalBox 
                        total_cost={totalCost} 
                        delivery_cost={exchangeCost} 
                        rental_time={totalTime} 
                        rental_cost={rentalCost}
                        selectedExchangeMethod={selectedExchangeMethod}
                    />

            </div>
        </div>
    );
}

export default ReserveItem;