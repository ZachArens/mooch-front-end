import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import LoginForm from '../loginForm';

describe('<LoginForm />', () => {
    
    test('renders without crashing', () => {
        render(<LoginForm />);
    });

    
});