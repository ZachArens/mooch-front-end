import React from 'react'
import {render} from '@testing-library/react'
import ViewEditPhotos from '../viewEditPhotos';

test('renders without crashing', () => {
    render(<ViewEditPhotos />);
});