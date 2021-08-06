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
        let selectedOption;
        let newExchangeCost;
        // console.log('value: ', value);
        if (!loading) {
            switch (value) {
                case "delivery": 
                    // console.log('clicked: delivery');
                    selectedOption = 'delivery';
                    newExchangeCost = exchangeOptions.delivery;
                    // console.log('exchange cost set: ', newExchangeCost);
                    // console.log('selectedExchangeMethod set: ', selectedOption);

                    break;
                case "pickup":
                    // console.log('clicked: pickup');
                    selectedOption = 'pickup';
                    newExchangeCost = exchangeOptions.pickup;
                    // console.log('exchange cost set: ', newExchangeCost);
                    // console.log('selectedExchangeMethod set: ', selectedOption);
                    
                    break;
                case "meetup":
                    // console.log('clicked: meetup');
                    selectedOption = 'meetup';
                    newExchangeCost = exchangeOptions.meetup;
                    // console.log('exchange cost set: ', newExchangeCost);
                    // console.log('selectedExchangeMethod set: ', selectedOption);
                    break;
                case "":
                    // console.log('clicked: blank');
                    selectedOption = '';
                    newExchangeCost = 0;
                    // console.log('exchange cost set: ', newExchangeCost);
                    // console.log('selectedExchangeMethod set: ', selectedOption);
                    break;
                default:
                    alert('Not a valid exchange option');
            }

            // console.log('selectedExchangeMethod: ', selectedExchangeMethod);

            const newCalcs = updateCalculations(startDateTime, endDateTime, unitCost, newExchangeCost);
            setExchangeCost(newExchangeCost);
            setSelectedExchangeMethod(selectedOption);
            setTotalTime(newCalcs.totalTime);
            setRentalCost(newCalcs.rentalCost);
            setTotalCost(newCalcs.totalCost);
        }
        
        
    }

    const updateStartDate = (e) => {

        //set startDateTime or create if null
        let newDate = getNewDate(e.target.value, startDateTime);
        let newCalcs;
        //set default endDateTime to be equal or greater to new start date
        if (endDateTime < newDate ) {
            setEndDateTime(newDate);
            // console.log('updated endDate from start date');
            newCalcs = updateCalculations(newDate, newDate, unitCost, exchangeCost);
        } else {
            newCalcs = updateCalculations(newDate, endDateTime, unitCost, exchangeCost);
        }

        //FIXME - race condition - maybe passing updated values as parameters or may useState hook
        setStartDateTime(newDate);
        setTotalTime(newCalcs.totalTime);
        setRentalCost(newCalcs.rentalCost);
        setTotalCost(newCalcs.totalCost);

    }

    const updateEndDate = (e) => {

        const newDate = getNewDate(e.target.value, endDateTime)
        const newCalcs = updateCalculations(startDateTime, newDate, unitCost, exchangeCost);
        
        setEndDateTime(newDate);
        setTotalTime(newCalcs.totalTime);
        setRentalCost(newCalcs.rentalCost);
        setTotalCost(newCalcs.totalCost);
    }

    const updateTime = (e) => {

        const newDate = getNewTime(e.target.value);
        let newCalcs;

        if (e.target.id === 'startTime') {
            setStartDateTime(newDate);
            newCalcs = updateCalculations(newDate, endDateTime, unitCost, exchangeCost);
        
        }

        if (e.target.id === 'endTime') {
            setEndDateTime(newDate);
            newCalcs = updateCalculations(newDate, endDateTime, unitCost, exchangeCost);
        }
        
        setEndDateTime(newDate);
        setTotalTime(newCalcs.totalTime);
        setRentalCost(newCalcs.rentalCost);
        setTotalCost(newCalcs.totalCost);

    }

    const reserveItem = async (e) => {
        //TODO - set reserveDetails to state and firebase
        // console.log('reservingItem');

        if (startDateTime && endDateTime && exchangeCost && totalTime > 1) {
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
            try {
                await AddReservation(newReservation);
                
                if (props.reservation) {
                    props.selectReservation('');
                } else {
                    history.push('/myRentals');
                }
            } catch (error) {
                // console.log('error adding reservation: ', error.message);
            }

        } else {
            // console.log('missing something: ', 'startDateTime: ', startDateTime, 'endDateTime: ', endDateTime, 'exchangeCost: ',exchangeCost, 'totalTime: ',totalTime);

        }
        
    }

    const quitReservation = (e) => {
        if (props.reservation) {
            props.selectReservation('');
        } else {
           history.push('/'); 
        }
        
    }

    

    

    useEffect(() => {
        const loadFromCurrentReservation = () => {
            const { reservation } = props;
            // console.log('running loadFromCurrent...', reservation);
            setOwnerId(reservation.ownerId ? reservation.ownerId : '');
            setExchangeOptions(reservation.exchangeOptions ? reservation.exchangeOptions : '');
            setTotalTime(reservation.totalTime ? reservation.totalTime : '');
            setTotalCost(reservation.totalCost ? reservation.totalCost : '');
            setUnitCost(reservation.unitCost ? reservation.unitCost : '');
            setRentalCost(reservation.rentalCost ? reservation.rentalCost : '');
            setExchangeCost(reservation.exchangeCost ? reservation.exchangeCost : '');
            setItemName(reservation.itemName ? reservation.itemName : '');
            setItemDescription(reservation.itemDesc ? reservation.itemDesc : '');
            setStartDateTime(reservation.startDateTime ? reservation.startDateTime : '');
            setEndDateTime(reservation.endDateTime ? reservation.endDateTime : '');
            setSelectedExchangeMethod(reservation.selectedExchangeMethod ? reservation.selectedExchangeMethod : '');
            setLoading(false);
        }

        const loadItemDetails = async () => {

            //need to update to load from passed ItemDetails not FB request
    
            const itemDetails = await getItemFromDB(props.currentRentalItem);
            // console.log('in loadItemDetails');
    
            if (itemDetails) {
                setOwnerId(itemDetails.ownerId);
                setItemName(itemDetails.itemName);
                setItemDescription(itemDetails.itemDesc);
                setUnitCost(itemDetails.costHourly);
                setExchangeOptions(itemDetails.exchangeOptions);
                setLoading(false);
            } 
    
        }

        if (loading) {
            // console.log('loading...')
            if (props.reservation) {
                // console.log('loadFromCurrent');
                loadFromCurrentReservation();
            } else {
                // console.log('loadFromDetails');

                loadItemDetails();
            }
        }

        // console.log('end: ', endDateTime, 'start: ', startDateTime);
        // props.rentalItemId, props.reservation, props.currentRentalItem,
    }, [props, loading]);

    
        
    return(
        <div className="form reserveItem" >
            <div className="row top-row align-items-center">
                <DisplayTitleDesc title={itemName} desc={itemDescription}
                itemRate={unitCost} />
            </div>
            <div className="row align-items-center">
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
            </div>
            <div className="row align-items-center">
                    <TotalBox 
                        total_cost={totalCost} 
                        delivery_cost={exchangeCost} 
                        rental_time={totalTime} 
                        rental_cost={rentalCost}
                        selectedExchangeMethod={selectedExchangeMethod}
                    />
            </div>
            <div className="row align-items-center">
                <SubmitButtons submitTitle={props.reservation ? "Edit" : "Reserve"} cancelTitle="Cancel"
                        submitFn={reserveItem.bind(this)}
                        cancelFn={quitReservation.bind(this)}
                        /> 
            </div>
        </div>
    );
}

export default ReserveItem;