import React from 'react';
import {fireEvent,  render} from '@testing-library/react';
import ReserveItem from '../components/reserveItem';

describe('<ReserveItem />', () => {
    test('renders without crashing', () => {
        render(<ReserveItem />);
    });

    test.skip('displays default date values correctly', () => {
        
        const {queryByTestId, debug} = render (<ReserveItem />);
        
        let today = new Date();
        let tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1);

        let todayStr = today.toString();
        let tomorrowStr = tomorrow.toString();

        // debug();
        expect(queryByTestId('startDateInput').val).toEqual(today);
        expect(queryByTestId('endDateInput').nodeValue).toEqual(tomorrow);
    });

    test('updates startDate values when startDate is updated', () => {
        
        const {getByTestId, debug} = render (<ReserveItem />);
        
        let today = new Date()
        let todayStr = today.toString();
        let startDate = new Date(2021, 7, 13);
        

        const startDateField = getByTestId('startDateInput');
        

        expect(startDateField.defaultValue).toEqual(todayStr);

        const dateText = "2020-05-24"
        let newDate = new Date(dateText);
        let newDateStr = newDate.toString();
        startDateField.defaultValue = newDate.toDateString;
        fireEvent.change(startDateField);
        
        debug();
        expect(startDateField.defaultValue).toBe(newDateStr);
        //expect(fireEvent.change(startDateField, { target: { value: dateText } })).toBeTruthy();

        //console.log(startDateField.target.value);
        //expect(startDateField.defaultValue).toBe(newDateStr);

    });

    test('updates endDate values when endDate is updated', () => {
        const {getByTestId} = render(<ReserveItem />);
        
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let tomorrowStr = tomorrow.toString();
        let endDate = new Date(2021, 7, 13);

        const endDateField = getByTestId('endDateInput');
        // debug();

        expect(endDateField.defaultValue).toEqual(tomorrowStr);

        let dateText = "2021-10-24"
        let newDate = new Date(dateText);
        let newDateStr = newDate.toString();

        //expect(fireEvent.change(endDateField, { target: { value: dateText } })).toBeTruthy();

        //expect(endDateField.defaultValue).toBe(newDateStr);

        //check that it does not update end date if less than start date
        dateText = "2021-03-24"
        let newDate2 = new Date(dateText);
        let newDateStr2 = newDate2.toString();

        expect(fireEvent.change(endDateField, { target: { value: dateText } })).toBeTruthy();
        expect(endDateField.defaultValue).not.toBe(newDateStr2);

    });
});