import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import ReserveDetails from '../reserveDetails';
import {displayTime} from '../../../utils/rentalFunctions';

describe('<ReserveDetails />', () => {
    const data = {
        startDate: new Date(2021,4,13,15,32),
        newStartDate: new Date(2021,4,17,3,22),
        newEndDate: new Date(2021,4,25,23,59),
        endDate: new Date(2021,4,27,14,24)
    }
    
    test('renders without crashing', () => {
        render(<ReserveDetails />);
    });

    test('displays passed values correctly', () => {

        const defaultStartDate =  new Date();
        let defaultEndDate = new Date(defaultStartDate);
        defaultEndDate.setDate(defaultEndDate.getDate()+1);
        let selectedExchangeMethod = ''
            
        const {queryByTestId, rerender, debug} = render (
            <ReserveDetails 
                startDateTime={defaultStartDate} 
                endDateTime={defaultEndDate}
                exchangeOptions={{delivery: 5, meetup: 8, pickup: 2}}
                selectedExchangeMethod={selectedExchangeMethod} 
            />);
        
        // debug();

        //FIXME - need to finish this testing series and fix/understand the date inputs and displays
        expect(queryByTestId('startDateInput')).toHaveValue(defaultStartDate.toISOString().substr(0,10));
        expect(queryByTestId('endDateInput')).toHaveValue(defaultEndDate.toISOString().substr(0,10));
        expect(queryByTestId('startTimeInput')).toHaveValue(displayTime(defaultStartDate));
        
        selectedExchangeMethod = 'delivery'

        rerender (
            <ReserveDetails 
                startDateTime={defaultStartDate} 
                endDateTime={defaultEndDate}
                exchangeOptions={{delivery: 5, meetup: 8, pickup: 2}}
                selectedExchangeMethod={selectedExchangeMethod} 
            />);        
            expect(queryByTestId('dropdownButton').innerHTML).toBe('Delivery $5');

    });

    test('creates exchange options correctly', () => {

        const {queryByText, getByTestId, debug} = render(
            <ReserveDetails />
            );
        
        const dropdownButton = getByTestId('dropdownButton')
        fireEvent.click(dropdownButton);

        // debug();

        expect(queryByText(/Delivery/i)).toBeTruthy();
        expect(queryByText(/Pick-Up/i)).toBeTruthy();
        expect(queryByText(/Public Meet-Up/i)).toBeTruthy();
    });

    test('changes dropdown Title and calls updateExchangeMethod based on selected option', () => {

        const updateExchangeMethod = jest.fn();
        const {queryByTestId, rerender, debug} = render (
            <ReserveDetails 
                selectedExchangeMethod={''} 
                exchangeOptions={{delivery: 5, meetup: 8, pickup: 2}}
                updateExchangeMethod={updateExchangeMethod}
            />);
        
        const dropdownButton = queryByTestId('dropdownButton');
        expect(queryByTestId('dropdownButton').innerHTML).toBe('Select Exchange Method');
        fireEvent.click(dropdownButton);
        fireEvent.click(queryByTestId('deliveryButton'));
        expect(updateExchangeMethod).toBeCalledTimes(1);
        rerender (
            <ReserveDetails 
                selectedExchangeMethod={'delivery'} 
                exchangeOptions={{delivery: 5, meetup: 8, pickup: 2}}
                updateExchangeMethod={updateExchangeMethod}
            />
        );
        expect(queryByTestId('dropdownButton').innerHTML).toBe('Delivery $5');
        fireEvent.click(dropdownButton);
        fireEvent.click(queryByTestId('pickupButton'));
        expect(updateExchangeMethod).toBeCalledTimes(2);
        rerender (
            <ReserveDetails 
                selectedExchangeMethod={'pickup'} 
                exchangeOptions={{delivery: 5, meetup: 8, pickup: 2}}
                updateExchangeMethod={updateExchangeMethod}
            />);
        expect(queryByTestId('dropdownButton').innerHTML).toBe('Pick-Up $2');
        fireEvent.click(dropdownButton);
        fireEvent.click(queryByTestId('meetupButton'));
        expect(updateExchangeMethod).toBeCalledTimes(3);
        rerender (
            <ReserveDetails 
                selectedExchangeMethod={'meetup'} 
                exchangeOptions={{delivery: 5, meetup: 8, pickup: 2}}
                updateExchangeMethod={updateExchangeMethod}
            />);
        expect(queryByTestId('dropdownButton').innerHTML).toBe('Public Meet-Up $8');

    });

    test('calls updateStartDate with correct value when Start Date is updated', () => {

        const updateStartDate = jest.fn();
        const {queryByTestId, rerender, debug} = render (
            <ReserveDetails 
                startDateTime={data.startDate} 
                updateStartDate={updateStartDate}
            />);
        
        expect(queryByTestId('startDateInput')).toHaveValue(data.startDate.toISOString().substr(0,10));
        fireEvent.change(queryByTestId('startDateInput'), {target: {value: data.newStartDate.toISOString().substr(0,10)}});
        expect(updateStartDate).toHaveBeenCalledTimes(1);
        rerender (
            <ReserveDetails 
                startDateTime={data.newStartDate} 
                updateStartDate={updateStartDate}
            />);
        expect(queryByTestId('startDateInput')).toHaveValue(data.newStartDate.toISOString().substr(0,10));
    });

    test('calls updateEndDate with correct value when End Date is updated', () => {

        const updateEndDate = jest.fn();
        const {queryByTestId, rerender, debug} = render (
            <ReserveDetails 
                endDateTime={data.endDate} 
                updateEndDate={updateEndDate}
            />);
        
        expect(queryByTestId('endDateInput')).toHaveValue(data.endDate.toISOString().substr(0,10));
        fireEvent.change(queryByTestId('endDateInput'), {target: {value: data.newEndDate.toISOString().substr(0,10)}});
        expect(updateEndDate).toHaveBeenCalledTimes(1);
        rerender (
            <ReserveDetails 
                endDateTime={data.newEndDate} 
                updateEndDate={updateEndDate}
            />);
        expect(queryByTestId('endDateInput')).toHaveValue(data.newEndDate.toISOString().substr(0,10));
    });

    test('calls updateStartTime with correct value when Start Time is updated', () => {

        const updateTime = jest.fn();
        const {queryByTestId, rerender, debug} = render (
            <ReserveDetails 
                startDateTime={data.startDate} 
                updateTime={updateTime}
            />);
        
        expect(queryByTestId('startTimeInput')).toHaveValue(displayTime(data.startDate));
        fireEvent.change(queryByTestId('startTimeInput'), {target: {value: displayTime(data.newStartDate)}});
        expect(updateTime).toHaveBeenCalledTimes(1);
        rerender (
            <ReserveDetails 
                startDateTime={data.newStartDate} 
                updateTime={updateTime}
            />);
        expect(queryByTestId('startTimeInput')).toHaveValue(displayTime(data.newStartDate));
    });

    test('calls updateEndTime with correct value when End Date is updated', () => {

        const updateTime = jest.fn();
        const {queryByTestId, rerender, debug} = render (
            <ReserveDetails 
                endDateTime={data.endDate} 
                updateTime={updateTime}
            />);
        
        expect(queryByTestId('endTimeInput')).toHaveValue(displayTime(data.endDate));
        fireEvent.change(queryByTestId('endTimeInput'), {target: {value: displayTime(data.newEndDate)}});
        expect(updateTime).toHaveBeenCalledTimes(1);
        rerender (
            <ReserveDetails 
                endDateTime={data.newEndDate} 
                updateTime={updateTime}
            />);
        expect(queryByTestId('endTimeInput')).toHaveValue(displayTime(data.newEndDate));
    });

});