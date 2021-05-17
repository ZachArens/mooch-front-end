import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import ReserveDetails from '../components/reserveDetails';

describe('<ReserveDetails />', () => {
    const data = {
        startDate: "2021-05-13",//new Date(2021,4,13),
        endDate: "2021-05-27" //new Date(2021,4,27)
    }
    
    test('renders without crashing', () => {
        render(<ReserveDetails />);
    });

    test('displays date values correctly', () => {

        const {queryByDisplayValue, debug} = render (<ReserveDetails startDate={data.startDate} 
            endDate={data.endDate} />);
        
        // debug();
        expect(queryByDisplayValue(data.startDate)).toBeTruthy();
        expect(queryByDisplayValue(data.endDate)).toBeTruthy();
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