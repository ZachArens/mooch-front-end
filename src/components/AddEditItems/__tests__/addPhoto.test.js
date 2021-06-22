import React from 'react'
import {render} from '@testing-library/react'
import AddPhoto from '../addPhoto';

const updateSelectedId = jest.fn();

test('renders without crashing', () => {
    render(<AddPhoto photos={[]} updateSelectedId={updateSelectedId}/>);
});

test.todo('renders without photos');

test.todo('renders with correct img src');