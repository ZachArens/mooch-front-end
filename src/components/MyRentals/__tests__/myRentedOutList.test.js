import React from 'react';
import {fireEvent, cleanup, render, queryAllByTestId} from '@testing-library/react';
import faker, { random } from 'faker';
import MyRentedOutList from '../myRentedOutList';
import { formatShortDate } from '../../../utils/rentalFunctions';

describe('<MyRentaledOutList />', () => {
    test('renders without crashing', () => {
        const myRentalComponent = render(<MyRentedOutList />)
        expect(myRentalComponent).toBeTruthy();
    });

    test('displays list of rentalSummary components', ()=> {
        const myReservations = [];
        for ( let i=0; i<3; i++ ) {
            const entry = {id:faker.random.alphaNumeric(20), itemName: faker.commerce.product(), startDateTime: faker.date.future(2),
            endDateTime: faker.date.future(2), lenderId: faker.random.alphaNumeric(20), 
            exchangeMethod: faker.random.arrayElement(["delivery", "meetup", "pickup"]),
            rentalCost: Math.floor(Math.random()*100) }
            // console.log(entry);
            myReservations.push(entry);
        }
        const {rerender, getAllByTestId, queryByText, debug} = render(<MyRentedOutList myReservations={[]} loading={true}/>);

        expect(queryByText('Loading...')).toBeTruthy();

        // debug();
        rerender(<MyRentedOutList myReservations={myReservations} loading={false}/>);
        
        for (let entry in myReservations) {
            expect(getAllByTestId('itemName')[entry].innerHTML).toBe(myReservations[entry].itemName);
            expect(getAllByTestId('dueSummary')[entry].innerHTML)
            .toBe("Due " + formatShortDate(myReservations[entry].endDateTime));
        }
        
        // debug();
        
        
    });

});