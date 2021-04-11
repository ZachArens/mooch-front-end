import React from 'react';
import ReactDOM from 'react-dom';
import RentItem from '../components/rentItem';
import Enzyme from 'enzyme';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {render, fireEvent, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

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

    it('Should return the initial state', () => {
        let {container} = render(<RentItem/>);

        expect(container.state).toEqual({exchangeMethod: ''});
    });

    it('Should update the state on clicking the exchange method button set', () => {
        fireEvent.click(getByText('Delivery'));
        expect(RentItem.state).toEqual({exchangeMethod: 'delivery'});
    });

    it('Updates the state of the delivery type when changing the value of the delivery type dropdown', () => {
        let {container, getByText} = render(<RentItem/>);

        // const setExchangeMethod = jest.fn();
        // const handleClick = jest.spyOn(React, "useState");
        // handleClick.mockImplementation(exchangeMethod => [exchangeMethod, setExchangeMethod] )

        expect(getByText(/State is/i).textContent).toBe("State is ");

        fireEvent.click(getByText("Delivery"))

        expect(getByText(/State is/i).textContent).toBe("State is delivery");


        // wrapper.find('#delivery').simulate('click');
        // expect(setExchangeMethod).toBeTruthy();
        //expect(wrapper.state()).toEqual({exchangeMethod: 'delivery'});
    });



    it.todo('Displays the correct rental amount in the rental amount label');

    it.todo('Updates the state of start date when a new start date is selected');

    it.todo('Updates the state of end date when a new end date is selected');


    it('matches snapshot', () => {
        //syntax via https://www.freecodecamp.org/news/testing-react-hooks/
        const wrapper = shallow(<RentItem/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
