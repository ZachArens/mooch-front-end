import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import ReserveDetails from '../components/reserveDetails';

describe('<ReserveDetails />', () => {
    const data = {
        startDate: new Date(2021,4,13),
        endDate: new Date(2021,4,27)
    }
    
    test('renders without crashing', () => {
        render(<ReserveDetails />);
    });

    test.skip('displays default date values correctly', () => {

        const defaultStartDate =  new Date();
            
        const {queryByTestId, debug} = render (<ReserveDetails />);
        
        // debug();

        //FIXME - need to finish this testing series and fix/understand the date inputs and displays
        expect(queryByTestId('startDateInput')).toHaveValue(defaultStartDate.toString());
        expect(queryByTestId(data.endDate)).toBeTruthy();
    });

    test('displays passed-in date values correctly', () => {

        const {queryByTestId, getByLabelText, debug} = render (<ReserveDetails startDateTime={data.startDate} 
            endDateTime={data.endDate} />);
        // console.log('test start date: ', data.startDate);

        
        debug(queryByTestId('startDateInput'));
        expect(queryByTestId('startDateInput')).toHaveValue(data.startDate.toISOString().substr(0,10));
        expect(queryByTestId('endDateInput')).toHaveValue(data.endDate.toISOString().substr(0,10));
    });

    test('creates exchange options correctly', () => {

        const {queryByText, getByTestId, debug} = render(<ReserveDetails title="&*#&%()#" desc="454365" itemRate={-300} />);
        
        const dropdownButton = getByTestId('dropdownButton')
        fireEvent.click(dropdownButton);

        // debug();

        expect(queryByText(/Delivery/i)).toBeTruthy();
        expect(queryByText(/Pick-Up/i)).toBeTruthy();
        expect(queryByText(/Public Meet-Up/i)).toBeTruthy();
    });

});