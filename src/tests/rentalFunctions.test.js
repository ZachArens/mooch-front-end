import {rentalTimeAsString, msTimeDifference} from "../components/rentalFunctions";

describe('rentalTimeAsString functions correctly', () => {
    it('presents hours in the correct format', () => {
        expect(rentalTimeAsString(15*60*60*1000)).toBe('15 hrs');
    });

    it('presents days in the correct format', ()=> {
        expect(rentalTimeAsString(2*24*60*60*1000)).toBe('2 days');
    });

    it('presents days and hours in the correct format', ()=> {
        expect(rentalTimeAsString(((2*24*60*60*1000) + (15*60*60*1000)))).toBe('2 days, 15 hrs');
    });

    it('throws an error if an invalid time is inputted', ()=> {
        expect(() => rentalTimeAsString(-15*60*60*1000)).toThrow('valid time not submitted');
    });
})

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
})
