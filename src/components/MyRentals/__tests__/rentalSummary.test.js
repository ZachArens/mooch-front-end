import React from 'react';
import {fireEvent, cleanup, render} from '@testing-library/react';

import RentalSummary from '../rentalSummary';

describe('<RentalSummary />', () => {
    test('renders without crashing', () => {
        const myRentalComponent = render(<RentalSummary title="title" dueDate="12/25/2021" />)
        expect(myRentalComponent).toBeTruthy();
    });

    test('displays the title and due date', () => {
        const title = "title"
        const dueDate = "12/25/2021"

        const {queryByText, queryByTestId} = render(<RentalSummary title={title} dueDate={dueDate} />)
        expect(queryByText(title)).toBeTruthy();
        expect(queryByTestId('dueSummary').innerHTML).toBe("Due " + dueDate);
    });

});