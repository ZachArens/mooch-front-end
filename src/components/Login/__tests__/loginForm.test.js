import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import LoginForm from '../loginForm';

const updateFields = jest.fn();

beforeEach(() => {
    cleanup();
})

describe('<LoginForm />', () => {
    
    test('renders without crashing', () => {
        render(<LoginForm emailName="1234" passwordName="5678" updateFields={updateFields} />);
    });

    test('calls updateFields on change of both fields', () => {
        const emailName = "test1";
        const passwordName = "test2";

        const {queryByTestId } = render(<LoginForm emailName={emailName} passwordName={passwordName} 
            updateFields={updateFields} />);

            fireEvent.change(queryByTestId(emailName), {
                target: {defaultValue: "test@testemail.com"},
            });
    
            fireEvent.change(queryByTestId(passwordName), {
                target: {defaultValue: "1234asdfas"},
            });

            expect(updateFields).toHaveBeenCalledTimes(2);
    });  

    test('matches snapshot', () => {
        const { container } = render(<LoginForm />);
        expect(container.firstChild).toMatchSnapshot();
    });
});