import React from 'react';
import ReactDOM from 'react-dom';
import RentItem from '../components/rentItem';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";
import Login from "../components/login";

afterEach(cleanup);

describe('RentItem - R#9 The app shall provide users with the ability to select a ' +
    'piece of equipment for rental, the length of a rental and check out.', () => {
    it.todo('Rents an item after pressing the rent button');

    it.todo('Sends an email confirmation to the owner and borrower of the item after pressing the rent button');

    it.todo('Loads the My Rentals page after pressing the rent button');

    it.todo('Cancels the rental after pressing the cancel button');

    it.todo('Returns to the main page after canceling a rental');

    //For the total box tests
    // it('Displays the correct delivery type in the total box');
    //
    // it('Displays the correct delivery fee in the total box');
    //
    // it('Displays the correct total-rental-time in the total box');
    //
    // it('Displays the correct rental-price in the total box');
    //
    // it('Displays the correct total-price in the total box');

    it.todo('Updates the state of the delivery type when changing the value of the delivery type dropdown');



    it.todo('Displays the correct rental amount in the rental amount label');

    it.todo('Updates the state of start date when a new start date is selected');

    it.todo('Updates the state of end date when a new end date is selected');


    // it('matches snapshot', () => {
    //     const tree = renderer.create(<RentItem/>).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});
