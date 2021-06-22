import React from 'react';
import {fireEvent, cleanup, render} from '@testing-library/react';

import ItemSummary from '../itemSummary';

describe('<ItemSummary />', () => {
    test('renders without crashing', () => {
        const myRentalComponent = render(<ItemSummary />);
        expect(myRentalComponent).toBeTruthy();
    });

    test('displays the title, description, itemCost, and rentalStatus', () => {
        const title = "title";
        const description="Summary Description...";
        const costHourly=35;
        const rentalStatus="available";

        const {queryByText, debug} = render(<ItemSummary title={title} description={description}
        costHourly={costHourly} rentalStatus={rentalStatus}/>);
        // debug();

        expect(queryByText(title)).toBeTruthy();
        expect(queryByText(description)).toBeTruthy();
        expect(queryByText(costHourly)).toBeTruthy();
        expect(queryByText(rentalStatus)).toBeTruthy();
    });

});