import React from 'react';
import {fireEvent, cleanup, render} from '@testing-library/react';
import MyItemsList from '../myItemsList';
import faker from 'faker';

describe('<MyItemsList />', () => {
    test('renders without crashing', () => {
        const myItemComponent = render(<MyItemsList />)
        expect(myItemComponent).toBeTruthy();
    });

    test('displays list of rentalSummary components', ()=> {
        const myItems = [];
        for ( let i=0; i<3; i++ ) {
            const entry = {id:faker.random.alphaNumeric(20), itemName: faker.commerce.product(), itemDesc: faker.commerce.productDescription(),
            exchangeMethod: {delivery: Math.floor(Math.random()*100), meetup: Math.floor(Math.random()*50), pickup: Math.floor(Math.random()*50),}, 
            ownerId: faker.random.alphaNumeric(20), 
            costHourly: Math.floor(Math.random()*100) };
            // console.log(entry);
            myItems.push(entry);
        }
        const {rerender, getAllByTestId, queryByText, debug} = render(<MyItemsList myItems={[]} loading={true}/>);

        expect(queryByText('Loading...')).toBeTruthy();

        // debug();
        rerender(<MyItemsList myItems={myItems} loading={false}/>);
        
        for (let entry in myItems) {
            expect(getAllByTestId('itemName')[entry].innerHTML).toBe(myItems[entry].itemName);
            expect(queryByText(myItems[entry].itemDesc)).toBeTruthy();
            expect(queryByText(myItems[entry].costHourly)).toBeTruthy();
        }
        
        // debug();
        
        
    });

});