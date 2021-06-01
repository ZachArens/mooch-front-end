import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from '../components/addItem';

import {render, fireEvent} from '@testing-library/react';
// import '@testing-library/react/dont-cleanup-after-each';

//TODO - need more help or research on mocking to isolate from firebase and editTitleDesc

test("renders without crashing", () => {
    // const div = document.createElement("div");
    // ReactDOM.render(<AddItem />, div);

    render(<AddItem />);
});

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