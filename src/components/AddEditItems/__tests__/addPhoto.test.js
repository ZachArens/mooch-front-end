import React from 'react'
import {render} from '@testing-library/react'
import AddPhoto from '../addPhoto';

const updateSelectedId = jest.fn();

test('renders without crashing', () => {
    render(<AddPhoto photos={[]} title='Sample Title' updateSelectedId={updateSelectedId}/>);
});

test('renders without photos', () => {
    render(<AddPhoto photos={[]} title='Sample Title' updateSelectedId={updateSelectedId}/>);
});

test('renders without title', () => {
    render(<AddPhoto photos={[]} title={null} updateSelectedId={updateSelectedId}/>);
});

// test('renders with correct img src', () => {

//     render(<AddPhoto photos={[]} title='Sample Title' updateSelectedId={updateSelectedId}/>);
// });