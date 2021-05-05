import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import SubmitButtons from '../components/submitButtons';

describe('<SubmitButtons />', () => {

    const submitFn = jest.fn(() => true);
    const cancelFn = jest.fn(() => true);

    it('renders without crashing', () => {
        render(<SubmitButtons />);
    });

    it('displays props titles correctly and is dumb', () => {
        const SubmitButtonDiv = render(<SubmitButtons submitTitle="Submit Title" cancelTitle="Cancel Title"
                                                      submitFn={submitFn} cancelFn={cancelFn}/>);
        expect(SubmitButtonDiv.getByDisplayValue(/Submit Title/)).toBeTruthy();
        expect(SubmitButtonDiv.getByDisplayValue(/Cancel Title/)).toBeTruthy();
    });

    it('executes the submit function when clicked and is dumb', () => {
        const SubmitButtonDiv = render(<SubmitButtons submitTitle="Submit Title" cancelTitle="Cancel Title"
                                                      submitFn={submitFn} cancelFn={cancelFn}/>);
        const button = SubmitButtonDiv.getByDisplayValue(/Submit Title/);
        fireEvent.click(button);
        expect(submitFn).toHaveBeenCalledTimes(1);
    });

    it('executes the cancel function when clicked and is dumb', () => {
        const SubmitButtonDiv = render(<SubmitButtons submitTitle="Submit Title" cancelTitle="Cancel Title"
                                                      submitFn={submitFn} cancelFn={cancelFn}/>);
        const button = SubmitButtonDiv.getByDisplayValue(/Cancel Title/);
        fireEvent.click(button);
        expect(cancelFn).toHaveBeenCalledTimes(1);
    });

});