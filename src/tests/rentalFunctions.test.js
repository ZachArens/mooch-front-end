import {rentalTimeAsString, msTimeDifference, hoursTimeDifference} from "../utils/rentalFunctions";

describe('rentalTimeAsString functions correctly', () => {
    it('presents hours in the correct format', () => {
        expect(rentalTimeAsString(15)).toBe('15 hours');
    });

    it('presents hours in the correct format', () => {
        expect(rentalTimeAsString(1)).toBe('1 hour');
    });

    it('presents days in the correct format', ()=> {
        expect(rentalTimeAsString(24)).toBe('1 day');
    });

    it('presents days in the correct format', ()=> {
        expect(rentalTimeAsString(26)).toBe('1 day, 2 hours');
    });

    it('presents days and hours in the correct format', ()=> {
        expect(rentalTimeAsString(63)).toBe('2 days, 15 hours');
    });

    it('handles improper input correctly', ()=> {
        expect(rentalTimeAsString("asdfsadf")).toBe("");
        expect(rentalTimeAsString(-15)).toBe("");
    });
});

describe('msTimeDifference functions correctly when', () => {
    it('can count the correct milliseconds between two dates', () => {
        const endDate = new Date(2018, 11, 30);
        const startDate = new Date(2018, 11, 15);

        expect(msTimeDifference(startDate, endDate)).toBe(15*24*60*60*1000);
    });

    it('can count the correct milliseconds between two times', () => {
        const endDate = new Date(2018, 11, 30, 15, 60);
        const startDate = new Date(2018, 11, 30);

        expect(msTimeDifference(startDate, endDate)).toBe((15*60+60)*60*1000);
    });

    it('can count the correct milliseconds between two dates that are in separate months', () => {
        const endDate = new Date(2018, 11, 30);
        const startDate = new Date(2018, 10, 30);

        expect(msTimeDifference(startDate, endDate)).toBe(30*24*60*60*1000);
    });
});

describe('hoursTimeDifference functions correctly when', () => {
    it('can convert time in milliseconds to hours and round up', () => {
        const startDate1 = new Date(2021,4,13,14);
        const endDate1 = new Date(2021,4,14,15,14);
        const hrs1 = 26;

        expect(hoursTimeDifference(startDate1, endDate1)).toBe(hrs1);
    });
})
