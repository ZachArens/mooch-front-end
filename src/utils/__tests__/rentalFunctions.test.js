import {rentalTimeAsString, msTimeDifference, hoursTimeDifference, textAbbreviator, 
    formatShortDate, formatCurrency,
    finalFormatCurrency, displayTime, updateCalculations, 
    getNewTime, getNewDate} from "../rentalFunctions";

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
});

describe('textAbbreviator', () => {
    test('should not abbreviate text under 32 characters', () => {
        let okText = ['asdfsdbf   &*#)(%sdfafasdf', 'somethingelse23423tdfsf', 'abcdefghijklmnopqrstuvABCDEF']
        
        for (let item in okText) {
            expect(textAbbreviator(okText[item])).toBe(okText[item]);
        }
        
    });

    test('should abbreviate text at least 32 characters', () => {
        let notOkText = ['abcdefghijklmnopqrstuvwxyzABCDEFG', 'This should not be more 30 characters long. If it is it should be abbrev', '!#423%$)Y%*NFGDSLFBDSFLDGNLSDSABLDSFLGfdksnfelrkasdlfnsl']
        
        for (let item in notOkText) {
            expect(textAbbreviator(notOkText[item])).toBe(`${notOkText[item].substr(0,29)}...`);
        }
    });

});

describe('formatShortDate', () => {
    test('accepts a js date type and returns date formatted MM/DD/YYYY for rentalSummary', () => {
        let input = new Date(1621818840 * 1000);

        expect(formatShortDate(input)).toBe("5/23/2021");

    })
});

describe('formatCurrency', () => {
    test('returns a number if matching currency format not including $', () => {
        let inputString = '34.50';

        expect(formatCurrency(inputString)).toBe('34.50');
    });

    test('removes additional zeroes in front of other digits', () => {
        let inputString = '034.50';

        expect(formatCurrency(inputString)).toBe('34.50');
    });

    

    test('adds a zero if . is first', () => {
        let inputString = '.34';

        expect(formatCurrency(inputString)).toBe('0.34');
    });

    test('removes digits until only 2 digits behind .', () => {
        let inputString = '34.507586';
        expect(formatCurrency(inputString)).toBe('34.50');

    });

    test('throws error if non-digit', () => {
        let inputString = 'thirty-four';

        function runInvalidInput() {
            formatCurrency(inputString)
        } ;

        expect(runInvalidInput).toThrow();
        expect(runInvalidInput).toThrowError('must be a currency value');
    });
});

describe('finalFormatCurrency', () => {
    test('trims . if . is last', () => {
        let inputString = '34.';

        expect(finalFormatCurrency(inputString)).toBe(34);
    });

    test('returns as a number from string', () => {
        let inputString = '034.507586.'
        expect(finalFormatCurrency(inputString)).toBe(34.50);

    })
});

describe('displayTime', () => {
    test('takes in date and returns a string - HH:mm', () => {

        let time = new Date();
        let hours = '13';
        let minutes = '45';
        time.setHours(hours);
        time.setMinutes(minutes);
        expect(displayTime(time)).toBe(`13:45`);
    });

    test('if hours and time are single digit, inserts a 0', () => {
        let time = new Date();
        let hours = '3';
        let minutes = '5';
        time.setHours(hours);
        time.setMinutes(minutes);
        expect(displayTime(time)).toBe(`03:05`);
    });
});

describe('updateCalculations', () => {
    test('returns correct time for totalTime', () => {
        const date1 = new Date(2021, 10, 15, 12, 30);
        const date2 = new Date(2021, 10, 16, 14, 30);
        const date3 = new Date(2021, 10, 23, 15, 0);
        const date4 = new Date(2021, 11, 23, 15, 0);

        expect(updateCalculations(date1, date2, 0, 0).totalTime).toBe(hoursTimeDifference(date1, date2));
        expect(updateCalculations(date1, date3, 0, 0).totalTime).toBe(hoursTimeDifference(date1, date3));
        expect(updateCalculations(date2, date3, 0, 0).totalTime).toBe(hoursTimeDifference(date2, date3));
        expect(updateCalculations(date3, date4, 0, 0).totalTime).toBe(hoursTimeDifference(date3, date4));
        expect(updateCalculations('', date4, 0, 0).totalTime).toBe(0);
        expect(updateCalculations(date3, '', 0, 0).totalTime).toBe(0);
    });

    test('returns correct cost for totalCost', () => {
        const date1 = new Date(2021, 10, 15, 12, 30);
        const date2 = new Date(2021, 10, 16, 14, 30);

        expect(updateCalculations(date1, date2, 4, 12).totalCost).toBe(hoursTimeDifference(date1, date2)*4 + 12);
        expect(updateCalculations(date1, date2, 6.50, 0).totalCost).toBe(hoursTimeDifference(date1, date2)*6.50);
        expect(updateCalculations('', date2, 4, 13).totalCost).toBe(13);
        expect(updateCalculations(date1, '', 4, 13).totalCost).toBe(13);
        expect(updateCalculations(date1, date2, 0, 13).totalCost).toBe(13);
        expect(updateCalculations(date1, date2, 4, 0).totalCost).toBe(hoursTimeDifference(date1, date2) * 4);
    });

    test('returns correct cost for rentalCost', () => {
        const date1 = new Date(2021, 10, 15, 12, 30);
        const date2 = new Date(2021, 10, 16, 14, 30);

        expect(updateCalculations(date1, date2, 4, 0).rentalCost).toBe(hoursTimeDifference(date1, date2)*4);
        expect(updateCalculations(date1, date2, 6.50, 0).rentalCost).toBe(hoursTimeDifference(date1, date2)*6.50);
        expect(updateCalculations('', date2, 4, 0).rentalCost).toBe(0);
        expect(updateCalculations(date1, '', 4, 0).rentalCost).toBe(0);
        expect(updateCalculations(date1, date2, 0, 0).rentalCost).toBe(0);
    });
});

describe('getNewTime', () => {
    test('updates new time given previous date', () => {
        const date1 = new Date(2021, 10, 15, 12, 30);
        const date2 = new Date(2021, 10, 15, 14, 30);
        const incomingTime = '14:30';

        expect(getNewTime(incomingTime, date1)).toEqual(date2);
    });

    test('updates new time given no original date', () => {
        let date2 = new Date();
        date2.setHours(14);
        date2.setMinutes(30);
        const incomingTime = '14:30';

        expect(getNewTime(incomingTime, '')).toEqual(date2);
    })
});

describe('getNewDate', () => {
    test('updates new date given previous date', () => {
        const date1 = new Date(2021, 5, 19, 12, 30);
        const date2 = new Date(2021, 5, 21, 12, 30);
        const incomingDate = '2021-06-21';

        expect(getNewDate(incomingDate, date1)).toEqual(date2);
    });

    test('updates new date given no original date', () => {
        let date2 = new Date();
        date2.setUTCFullYear(2021, 5, 21);
        const incomingDate = '2021-06-21';

        expect(getNewDate(incomingDate, '')).toEqual(date2);
    });
});
