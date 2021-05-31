import React from 'react';
import {fireEvent, cleanup, render} from '@testing-library/react';
import CreateLogin from '../createLogin';

const updateFields = jest.fn();

afterEach(() => {
    cleanup();
});

describe('<CreateLogin />', () => {
    
    test('renders without crashing', () => {
        render(<CreateLogin />);
    });

    test('calls updateFields when when each field is changed', () => {
        const {queryByTestId, debug} = render(<CreateLogin updateFields={updateFields} />);

        fireEvent.change(queryByTestId('verifyEmail'), {
            target: {defaultValue: "test@testemail.com"},
        });

        fireEvent.change(queryByTestId('verifyPassword'), {
            target: {defaultValue: "1234asdfas"},
        });

        fireEvent.change(queryByTestId('fullName'), {
            target: {defaultValue: "Test"},
        });

        fireEvent.change(queryByTestId('streetAddress'), {
            target: {defaultValue: "12 Three Rd"},
        });

        fireEvent.change(queryByTestId('city'), {
            target: {defaultValue: "Testville"},
        });

        fireEvent.change(queryByTestId('st'), {
            target: {defaultValue: "MI"},
        });

        fireEvent.change(queryByTestId('zip'), {
            target: {defaultValue: "12345"},
        });

        fireEvent.change(queryByTestId('phone'), {
            target: {defaultValue: "555-555-5555"},
        });

        expect(updateFields).toHaveBeenCalledTimes(8);

    });

    test('matches snapshot', () => {
        const { container } = render(<CreateLogin />);
        expect(container.firstChild).toMatchSnapshot();
    });
    
});