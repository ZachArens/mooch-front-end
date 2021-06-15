import {rentalTimeAsString, msTimeDifference, hoursTimeDifference, textAbbreviator, 
    formatShortDate, formatCurrency,
    finalFormatCurrency} from "../rentalFunctions";

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