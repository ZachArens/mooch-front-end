import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import CreateLogin from '../createLogin';

describe('<CreateLogin />', () => {
    
    test('renders without crashing', () => {
        render(<CreateLogin />);
    });

    
});