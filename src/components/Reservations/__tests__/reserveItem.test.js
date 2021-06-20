import React from 'react';
import {fireEvent, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import ReserveItem from '../reserveItem';
import {AddReservation, getItemFromDB} from '../../../utils/firebaseFunctions';

const fakeItemDetails = {
        itemId: "12345abcdef",
        ownerId: "zxy987", 
        itemName: "Stand Up Paddle Board", 
        costHourly: 8, 
        itemDesc: "11' Board with Paddle and leash.  Excellent beginner and all around board", 
        exchangeOptions: {pickup: 4, meetup: 6, delivery: 8}
    }

const fakeReservation = {
    itemId: "12345abcdef",
    ownerId: "zxy987", 
    lenderId: "asdgfwe3245",
    itemName: "Stand Up Paddle Board", 
    exchangeCost: "8", 
    itemDesc: "11' Board with Paddle and leash.  Excellent beginner and all around board", 
    exchangeOptions: {pickup: 4, meetup: 6, delivery: 8}}


// const mockAddReservation = jest.fn();
jest.mock('../../../utils/firebaseFunctions');

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
});

describe('<ReserveItem />', () => {
    test('renders without crashing', () => {
        render(<ReserveItem />);
    });

    test('loadFromReservation', () => {
        const {getByTestId, queryByTestId, debug} = render(
            <ReserveItem currentRentalItem={fakeItemDetails.itemId} 
                reservation={fakeItemDetails}
                currentUser={fakeItemDetails.lenderId}/>
            );
    })

    test('loadsItemDetails from addItemFromDB', async () => {
        getItemFromDB.mockImplementation(() => { 
            // console.log("Running mock getItemFromDB");
            return fakeItemDetails;
        });

        expect(getItemFromDB()).toBe(fakeItemDetails);
        
        render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);

        expect(getItemFromDB).toHaveBeenCalledTimes(2);
        expect(getItemFromDB).toHaveBeenCalledWith(fakeItemDetails.itemId);
        expect(getItemFromDB).toHaveReturnedWith(fakeItemDetails);
        
        expect(await screen.findByText(fakeItemDetails.itemName)).toBeInTheDocument();
        expect(await screen.findByText(fakeItemDetails.itemDesc.substr(0,10), {exact: false})).toBeInTheDocument();
        expect(await screen.findByText(fakeItemDetails.costHourly)).toBeInTheDocument();

    });

    test.skip('clicking the exchangeMethod button and selecting an option updates' + 
    ' the delivery cost, total cost and exchange method', async() => {
        
        const {getByTestId, queryByTestId, debug} = render(<ReserveItem reservation={fakeReservation} />);
        // debug();

        fireEvent.click(getByTestId('dropdownButton'));
        fireEvent.click(getByTestId('deliveryButton'));

        expect(await screen.findByTestId('dropdownButton')).toHaveTextContent('Delivery $8');
        expect(queryByTestId('totalCost').innerHTML).toBe("$5");
        expect(queryByTestId('exchangeCost').innerHTML).toBe('$5');
        expect(queryByTestId('exchangeCostLabel').innerHTML).toBe('Delivery');

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

    test('<reserveItem should load with startDate as today, endDate as tomorrow, rentalCost totalCost as 0, and rental time as none', () => {
        const {getByTestId, queryByTestId, debug} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        const today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        expect(queryByTestId('startDateInput')).toHaveValue(today.toISOString().substr(0,10));
        expect(queryByTestId('endDateInput')).toHaveValue(tomorrow.toISOString().substr(0,10));  
        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');
        expect(queryByTestId('exchangeCost').innerHTML).toBe('$0');
        expect(queryByTestId('totalCost').innerHTML).toBe('$0');
        
    });

    test('updating start date-time should update component', () => {

        //updating start date-time should update displayed start date-time, total time label, and recalculate rentalCost and totalCost

        const {getByTestId, queryByTestId, debug, rerender} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        let currentDate = new Date();
        let newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 3);
        const newDateStr = newDate.toISOString().substr(0,10);

        expect(queryByTestId('startDateInput')).toHaveValue(currentDate.toISOString().substr(0,10));
        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');

        fireEvent.change(queryByTestId("startDateInput"), {
            target: {value: newDateStr},
        });

        // debug();

        expect(queryByTestId('startDateInput')).toHaveValue(newDate.toISOString().substr(0,10));
        expect(queryByTestId('endDateInput')).toHaveValue(newDate.toISOString().substr(0,10));
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');
        //FIXME - why are calcs not fixed on state update?
        //expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        
        
    });

    test.skip('updating start date only should leave total time as zero', () => {

        //updating start date-time should update displayed start date-time, total time label, and recalculate rentalCost and totalCost

        const {getByTestId, queryByTestId, debug, rerender} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        let currentDate = new Date();
        let newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 3);
        const newDateStr = newDate.toISOString().substr(0,10);

        expect(queryByTestId('startDateInput')).toHaveValue(currentDate.toISOString().substr(0,10));
        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');

        fireEvent.change(queryByTestId("startDateInput"), {
            target: {value: newDateStr},
        });

        // debug();

        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        
    });

    test.skip('updating end date only should update total time', () => {

        //updating start date-time should update displayed start date-time, total time label, and recalculate rentalCost and totalCost

        const {getByTestId, queryByTestId, debug, rerender} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        let newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 3);
        const newDateStr = newDate.toISOString().substr(0,10);

        expect(queryByTestId('endDateInput')).toHaveValue(currentDate.toISOString().substr(0,10));
        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');

        fireEvent.change(queryByTestId("endDate"), {
            target: {value: newDateStr},
        });

        // debug();

        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('4 days');
        
    });

    test('updating end date-time should update component', () => {

        //updating end date-time should update displayed end date-time, total time label, and recalculate rentalCost and totalCost

        const {getByTestId, queryByTestId, debug, rerender} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);
        const today = new Date();
        let currentDate = new Date(today);
        currentDate.setDate(currentDate.getDate() + 1);
        let newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 3);
        const newDateStr = newDate.toISOString().substr(0,10);

        // debug();
        expect(getByTestId('startDateInput')).toHaveValue(today.toISOString().substr(0,10));
        expect(queryByTestId('endDateInput')).toHaveValue(currentDate.toISOString().substr(0,10));
        expect(queryByTestId('rentalTimeLabel').innerHTML).toBe('0 hrs');
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');

        fireEvent.change(queryByTestId("endDateInput"), {
            target: {value: newDateStr},
        });

        // debug();

        expect(queryByTestId('startDateInput')).toHaveValue(today.toISOString().substr(0,10));
        expect(queryByTestId('endDateInput')).toHaveValue(newDate.toISOString().substr(0,10));
        expect(queryByTestId('rentalCostLabel').innerHTML).toBe('$0');      
        
    });


    test('reserve button should not fire if the required data for a reservation is not completed', () => {
        const {getByTestId, queryByTestId, debug, rerender} = render(<ReserveItem currentRentalItem={fakeItemDetails.itemId} />);

        // debug();
        fireEvent.click(queryByTestId('submitButton'));

        expect(AddReservation).not.toHaveBeenCalled();

    });

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
        
        const itemId = "12345678"
        render(<ReserveItem currentRentalItem={itemId} />);

        expect(getItemFromDB).toHaveBeenCalled();
        expect(getItemFromDB).toHaveBeenLastCalledWith(itemId);
    });

    test.skip('should render component with itemName, itemDesc, itemCost, and exchangeMethodCosts', async () => {
        
        getItemFromDB.mockImplementation(async () => { 
            // console.log("Running mock AddReservation");
            return fakeItemDetails;
        });
        
        const fakeItemId = "12345678"

        render(<ReserveItem currentRentalItem={fakeItemId} />);

        expect(getItemFromDB).toHaveBeenCalled();
        expect(getItemFromDB).toHaveBeenLastCalledWith(fakeItemId);
        expect(getItemFromDB).toHaveReturnedWith(fakeItemDetails);
    });

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