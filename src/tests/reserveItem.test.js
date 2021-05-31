import React from 'react';
import {fireEvent, cleanup, render, act} from '@testing-library/react';
import ReserveItem from '../components/reserveItem';
import {AddReservation, getItemFromDB} from '../utils/firebaseFunctions.js';
import { JsxEmit } from 'typescript';

// const mockAddReservation = jest.fn();
jest.mock('../utils/firebaseFunctions');

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
});

describe('<ReserveItem />', () => {
    test('renders without crashing', () => {
        render(<ReserveItem />);
    });

    //thanks Dr. Kurmas!
    test('the mock setup', () => {

        

        // console.log("Testing the mock setup.");

        // console.log(AddReservation);

        AddReservation('Tokyo');


        expect(AddReservation).toHaveBeenCalled();

        expect(AddReservation).toHaveBeenLastCalledWith("Tokyo");

    });

    test('renders and calls getItemfromDB', () => {

        jest.mock('../utils/firebaseFunctions');
        
        const itemId = "12345678"
        render(<ReserveItem currentRentalItem={itemId} />);

        expect(getItemFromDB).toHaveBeenCalled();
        expect(getItemFromDB).toHaveBeenLastCalledWith(itemId);
    });

    test('renders and sets the itemName, itemDesc, itemCost, and exchangeMethodCosts', () => {
        const fakeItemId = "12345678"

        const fakeItemDetails = {
            ownerId: "", 
            itemName: "Stand Up Paddle Board", 
            costHourly: "8", 
            itemDesc: "11' Board with Paddle and leash.  Excellent beginner and all around board", 
            exchangeMethod: {pickup: 4, meetup: 6, delivery: 8}}
        
        getItemFromDB
        //.mockImplementation(() => fakeItemDetails);

        render(<ReserveItem currentRentalItem={fakeItemId} />);

        expect(getItemFromDB).toHaveBeenCalled();
        expect(getItemFromDB).toHaveBeenLastCalledWith(fakeItemId);
        expect(getItemFromDB).toHaveReturnedWith(fakeItemDetails);
    });

    test('clicking Reserve fires the AddReservation function to add the res. the db', () => {
        
        let start = new Date(2021, 0, 17);
        let end = new Date(2021, 0, 19);
        const reservation = {
            startDateTime: start, 
            endDateTime: end, 
            exchangeMethod: "meetup",
            totalCost: 25,
            deliveryCost: 5, 
            rentalCost: 20
        }        

        const {getByText, getByTestId, debug}  = render(<ReserveItem currentRentalItem=""/>);

        fireEvent.click(getByText('Exchange Method'));
        fireEvent.click(getByTestId('deliveryButton'));

        fireEvent.change(getByTestId('startDateInput'), {
            target: {defaultValue: start},
        });

        fireEvent.change(getByTestId('endDateInput'), {
            target: {defaultValue: end},
        });

        // debug();


        // console.log(getByTestId('rentalTimeLabel').innerText);
        // console.log(getByTestId('rentalCostLabel').innerText);
        // console.log(getByTestId('exchangeCost').innerText);
        // console.log(getByTestId('exchangeCostLabel').innerText);
        // console.log(getByTestId('totalCost').innerText);

        fireEvent.click(getByText('Reserve'));

        // debug();

        expect(AddReservation).toHaveBeenCalled();

        expect(AddReservation).toHaveBeenLastCalledWith(reservation);

    });

    test('displays default date values correctly', () => {
        
        const {queryByTestId, debug} = render (<ReserveItem />);
        
        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1);

        let todayStr = today.toString();
        let tomorrowStr = tomorrow.toString();

        // debug();
        expect(queryByTestId('startDateInput').val).toEqual(today);
        expect(queryByTestId('endDateInput').nodeValue).toEqual(tomorrow);
    });

    test('updates startDate values when startDate is updated', () => {
        
        const {getByTestId, debug} = render (<ReserveItem />);
        
        let today = new Date()
        let todayStr = today.toString();
        let startDate = new Date(2021, 7, 13);
        

        const startDateField = getByTestId('startDateInput');
        

        expect(startDateField.defaultValue).toEqual(todayStr);

        let newDate = new Date();
        let newDateStr = newDate.toString();
        console.log(newDateStr);
        console.log(startDateField.defaulValue);

        fireEvent.change(startDateField, {
            target: {defaulValue: newDateStr},
        });
        
        debug();
        expect(startDateField.defaultValue).toEqual(newDateStr);
        //expect(fireEvent.change(startDateField, { target: { value: dateText } })).toBeTruthy();

        //console.log(startDateField.target.value);
        //expect(startDateField.defaultValue).toBe(newDateStr);

    });

    test('updates endDate values when endDate is updated', () => {
        const {getByTestId} = render(<ReserveItem />);
        
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let tomorrowStr = tomorrow.toString();
        let endDate = new Date(2021, 7, 13);

        const endDateField = getByTestId('endDateInput');
        // debug();

        expect(endDateField.defaultValue).toEqual(tomorrowStr);

        let dateText = "2021-10-24"
        let newDate = new Date(dateText);
        let newDateStr = newDate.toString();

        //expect(fireEvent.change(endDateField, { target: { value: dateText } })).toBeTruthy();

        //expect(endDateField.defaultValue).toBe(newDateStr);

        //check that it does not update end date if less than start date
        dateText = "2021-03-24"
        let newDate2 = new Date(dateText);
        let newDateStr2 = newDate2.toString();

        expect(fireEvent.change(endDateField, { target: { value: dateText } })).toBeTruthy();
        expect(endDateField.defaultValue).not.toBe(newDateStr2);

    });
});