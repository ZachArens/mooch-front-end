import React from 'react';
import {fireEvent, cleanup, render, queryAllByTestId} from '@testing-library/react';

import ReserveItem from '../components/reserveItem';
import {AddReservation, getItemFromDB} from '../utils/firebaseFunctions.js';

const fakeItemDetails = {
        itemId: "12345abcdef",
        ownerId: "", 
        itemName: "Stand Up Paddle Board", 
        costHourly: "8", 
        itemDesc: "11' Board with Paddle and leash.  Excellent beginner and all around board", 
        exchangeMethod: {pickup: 4, meetup: 6, delivery: 8}}

// const mockAddReservation = jest.fn();
jest.mock('../utils/firebaseFunctions'); //, () => {
//     getItemFromDB: jest.fn().mockImplementation(() => fakeItemDetails),
//     AddReservation: jest.fn()
// });

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
});

describe('<ReserveItem />', () => {
    test('renders without crashing', () => {
        render(<ReserveItem />);
    });

    test('clicking the exchangeMethod button and selecting an option updates' + 
    ' the delivery cost, total cost and exchange method', () => {
        const {getByTestId, queryByTestId, debug} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        // debug();
        fireEvent.click(getByTestId('dropdownButton'));
        fireEvent.click(getByTestId('deliveryButton'));

        expect(queryByTestId('displayExMethod').innerHTML).toBe('delivery');
        expect(queryByTestId('totalCost').innerHTML).toBe("$5");
        expect(queryByTestId('exchangeCost').innerHTML).toBe('$5');

        fireEvent.click(getByTestId('dropdownButton'));
        fireEvent.click(getByTestId('meetupButton'));

        expect(queryByTestId('displayExMethod').innerHTML).toBe('meetup');
        expect(queryByTestId('totalCost').innerHTML).toBe("$15");
        expect(queryByTestId('exchangeCost').innerHTML).toBe('$15');

        fireEvent.click(getByTestId('dropdownButton'));
        fireEvent.click(getByTestId('pickupButton'));

        expect(queryByTestId('displayExMethod').innerHTML).toBe('pickup');
        expect(queryByTestId('totalCost').innerHTML).toBe("$1");
        expect(queryByTestId('exchangeCost').innerHTML).toBe('$1');
    });

    test('<reserveItem should load with startDate as today, endDate as tomorrow, rentalCost as 0, and totalCost as 0', () => {
        const {getByTestId, queryByTestId, debug} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        const today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(queryByTestId('startDateInput').defaultValue).toEqual(today.toString());
        expect(queryByTestId('endDateInput').defaultValue).toEqual(tomorrow.toString());  
        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('');
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');
        
    });

    test('updating start date-time should update component', () => {

        //updating start date-time should update displayed start date-time, total time label, and recalculate rentalCost and totalCost

        const {getByTestId, queryByTestId, debug, rerender} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + 3);
        const newDateStr = newDate.toISOString().substr(0,10);

        const startDateInput = queryByTestId('startDateInput');
        
        fireEvent.mouseDown(startDateInput);
        
        
        fireEvent.change(startDateInput, { target: {defaultValue: newDateStr }});

        // debug();
        // console.log(queryByTestId('startDateInput').value);

        expect(queryByTestId('startDateInput').value).toEqual(newDate.toString());
        // expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        // expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0')
        
        // fireEvent.change(queryByTestId("startDateInput"), {
        //     target: {defaultValue: "2021-02-28"},
        // });
        // debug();
    });

    test.todo('updating end date-time should update component')

        //updating end date-time should update displayed end date-time, total time label, and recalculate rentalCost and totalCost

    test.todo('reserve button should not fire if the required data for a reservation is not completed');

    //thanks Dr. Kurmas!
    test('the mock setup', () => {
        // console.log("Testing the mock setup.");
        AddReservation.mockImplementation(() => { 
            // console.log("Running mock AddReservation");
            return 'Yup';
        });
        // console.log(AddReservation);

        let answer = AddReservation('Tokyo');

        expect(AddReservation).toHaveBeenCalled();
        expect(AddReservation).toHaveBeenLastCalledWith("Tokyo");
        expect(answer).toBe('Yup');

    });

    test('renders and calls getItemfromDB', () => {

        // jest.mock('../utils/firebaseFunctions');
        
        const itemId = "12345678"
        render(<ReserveItem currentRentalItem={itemId} />);

        expect(getItemFromDB).toHaveBeenCalled();
        expect(getItemFromDB).toHaveBeenLastCalledWith(itemId);
    });

    test.todo('should render component with itemName, itemDesc, itemCost, and exchangeMethodCosts') //, () => {
    //     const fakeItemId = "12345678"

        

    //     render(<ReserveItem currentRentalItem={fakeItemId} />);

    //     expect(getItemFromDB).toHaveBeenCalled();
    //     expect(getItemFromDB).toHaveBeenLastCalledWith(fakeItemId);
    //     expect(getItemFromDB).toHaveReturnedWith(fakeItemDetails);
    // });

    test.todo('clicking Reserve fires the AddReservation function to add the res. the db') //, () => {
        
    //     let start = new Date(2021, 0, 17);
    //     let end = new Date(2021, 0, 19);
    //     const reservation = {
    //         startDateTime: start, 
    //         endDateTime: end, 
    //         exchangeMethod: "meetup",
    //         totalCost: 25,
    //         deliveryCost: 5, 
    //         rentalCost: 20
    //     }        

    //     const {getByText, getByTestId, debug}  = render(<ReserveItem currentRentalItem=""/>);

    //     fireEvent.click(getByText('Exchange Method'));
    //     fireEvent.click(getByTestId('deliveryButton'));

    //     fireEvent.change(getByTestId('startDateInput'), {
    //         target: {defaultValue: start},
    //     });

    //     fireEvent.change(getByTestId('endDateInput'), {
    //         target: {defaultValue: end},
    //     });

    //     // debug();


    //     // console.log(getByTestId('rentalTimeLabel').innerText);
    //     // console.log(getByTestId('rentalCostLabel').innerText);
    //     // console.log(getByTestId('exchangeCost').innerText);
    //     // console.log(getByTestId('exchangeCostLabel').innerText);
    //     // console.log(getByTestId('totalCost').innerText);

    //     fireEvent.click(getByText('Reserve'));

    //     // debug();

    //     expect(AddReservation).toHaveBeenCalled();

    //     expect(AddReservation).toHaveBeenLastCalledWith(reservation);

    // });

});