import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD:src/components/AddEditItems/__tests__/addItem.test.js
import AddItem from '../addItem';
import { MemoryRouter } from 'react-router-dom';
import {render, fireEvent} from '@testing-library/react';
import { AddRentalItem } from '../../../utils/firebaseFunctions';
=======
import AddItem from '../components/addItem';

import {render, fireEvent} from '@testing-library/react';
>>>>>>> parent of d9c3eff (updated myRentedOutList to retrieve items from firebase and built tests for component):src/tests/addItem.test.js
// import '@testing-library/react/dont-cleanup-after-each';

//TODO - need more help or research on mocking to isolate from firebase and editTitleDesc

<<<<<<< HEAD:src/components/AddEditItems/__tests__/addItem.test.js
jest.mock('../../../utils/firebaseFunctions');

describe('<AddItem />', () => {
    test("renders without crashing", () => {
        // const div = document.createElement("div");
        // ReactDOM.render(<AddItem />, div);

        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        );
    });

    test.skip('can call AddRentalItem to add an item to the database', () => {
        const fakeItem = {
            ownerId: "user123",
            title: "Example Item",
            description: "Item described as this fake item",
            hourlyRate: 14,
            deliveryFee: 2,
            meetupFee: 4,
            pickupFee: 12.5
        }

        const {getByPlaceholderText, getByTestId, debug} = render(
            <MemoryRouter>
                <AddItem currentUser={fakeItem.ownerId}/>
            </MemoryRouter>
        );

        
        fireEvent.change(getByPlaceholderText("Title"), { target: {value: fakeItem.title}});
        fireEvent.change(getByPlaceholderText("Enter a description here"), { target: {value: fakeItem.description}});
        fireEvent.change(getByTestId("itemRate"), { target: {value: fakeItem.hourlyRate}});
        expect(getByTestId("itemRate")).toHaveValue(fakeItem.hourlyRate.toString());
        fireEvent.change(getByTestId("deliveryCost"), { target: {value: fakeItem.deliveryFee}});
        fireEvent.change(getByTestId("meetupCost"), { target: {value: fakeItem.meetupFee}});
        fireEvent.change(getByTestId("pickupCost"), { target: {value: fakeItem.pickupFee}});
        fireEvent.click(getByTestId('submitButton'));

        debug();

        expect(AddRentalItem).toHaveBeenCalled();
        expect(AddRentalItem).toHaveBeenCalledWith(fakeItem.ownerId, fakeItem.title, fakeItem.description, fakeItem.itemRate, 
            {delivery: fakeItem.deliveryFee, meetup: fakeItem.meetupFee, pickup: fakeItem.pickupFee});

    });

    test.skip('allows a value for title of 25 chars or less', () => {
        const {getByPlaceholderText,getByTestId} = render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        );
        
        const okText = ['Kayak', 'asdfasdfa - DFSDFS', '    sfsdfasfa  123asdfsadf asdfa'];
        const notOkText = ["x".repeat(26)];

        const title = getByPlaceholderText('Title');
        const submit = getByTestId('submitButton');
        const message = getByTestId('messageBox');

        fireEvent.change(getByPlaceholderText("Enter a description here"), { target: {defaultValue: "something"}});


        for (let text in okText) {
            fireEvent.change(title, { target: {defaultValue: okText[text]}});
            fireEvent.click(submit);
            expect(message).not.toBeVisible;
        }

        for (let text in notOkText) {
            fireEvent.change(title, { target: {defaultValue: notOkText[text] }});
            expect(message.innerHTML).toContain('The title may not be greater than  25 characters.');
        }
=======
test("renders without crashing", () => {
    // const div = document.createElement("div");
    // ReactDOM.render(<AddItem />, div);

    render(<AddItem />);
});
>>>>>>> parent of d9c3eff (updated myRentedOutList to retrieve items from firebase and built tests for component):src/tests/addItem.test.js

describe('addItem validates and sanitizes all values for text inputs', () => {

    test.skip('allows a value for title with only alphabet and space characters', () => {
        const addItemComponent = render(<AddItem />);
        const title = addItemComponent.getAllByPlaceholderText('Title');
    });

    test.todo('can add an item to the database');

    test.todo('displays an error for a title that is a number or symbol');

    test.todo('allows a value for description that is a string');

    test.todo('displays an error for a description that is > 500 chars');

    test.todo('allows a value for itemRate that is numeric');

    test.todo('displays an error for an itemRate that is < 0');
})