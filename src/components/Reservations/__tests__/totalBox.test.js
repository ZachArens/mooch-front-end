import React from 'react';
import {render, cleanup} from '@testing-library/react';
import TotalBox from '../totalBox';
import {rentalTimeAsString} from "../../../utils/rentalFunctions";

afterEach(()=> {
    cleanup();
});

describe('<TotalBox />', () => {

    const data = {
        rental_time: 24,
        rental_cost: 35,
        delivery_cost: 7.99,
        total_cost: 42.99
    }

    test('renders without crashing', () => {
        render(<TotalBox rental_time={data.rental_time} rental_cost={data.rental_cost} 
            delivery_cost={data.delivery_cost} total_cost={data.total_cost}/>);
    });

    test('receives and displays rental_time props correctly', () => {
        
        const {getByTestId, rerender, debug} = render (<TotalBox rental_time={data.rental_time} />);
        
        // debug();
        expect(getByTestId('rentalTimeLabel').textContent).toBe("1 day");

        rerender (<TotalBox rental_time={36} />);
        expect(getByTestId('rentalTimeLabel').textContent).toBe("1 day, 12 hours");

        rerender (<TotalBox rental_time={1} />);
        expect(getByTestId('rentalTimeLabel').textContent).toBe("1 hour");

        rerender (<TotalBox rental_time={52} />);
        expect(getByTestId('rentalTimeLabel').textContent).toBe("2 days, 4 hours");
    });

    test('receives and displays rental_cost, deliver_cost, and total_cost props correctly', () => {
        
        const {queryByText, debug} = render (<TotalBox rental_time={data.rental_time} 
            rental_cost={data.rental_cost} delivery_cost={data.delivery_cost} total_cost={data.total_cost}/>);
        
        // debug();
        expect(queryByText(`$35`)).toBeTruthy();
        expect(queryByText(`$7.99`)).toBeTruthy();
        expect(queryByText(`$42.99`)).toBeTruthy();

    });
});