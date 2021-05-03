import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from '../components/addItem';

import {render, fireEvent} from '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AddItem />, div);
});

it ("renders button correctly", () => {
    const {getByTestId} = render(<AddItem />, div);

})

describe('buttons', () => {
    it('click Add', () => {
        const { getByText } = render(<AddItem />)
        const addButton = getByText('Add');
        fireEvent.click(addButton);
        // expect
    })
})