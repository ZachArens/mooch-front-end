import React from 'react';
import {fireEvent, cleanup, render, queryAllByTestId} from '@testing-library/react';

import MyRentals from '../myRentals';
import { MemoryRouter } from 'react-router';

describe('<MyRentals />', () => {
    test('renders without crashing', () => {
        const myRentalComponent = render(
            <MemoryRouter>
                <MyRentals />
            </MemoryRouter>
        )
        expect(myRentalComponent).toBeTruthy();
    });


});