import React from 'react';
import ItemCard  from '../components/itemCard';
import {textAbbreviator} from '../utils/rentalFunctions';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<ItemCard />', () => {
    test("renders without crashing", () => {
        render(<ItemCard/>);
    });

    test('textAbbreviator works', () => {
        const full = "This is the full length of text that should not be fully displayed";
        const abbrev = textAbbreviator(full);
        
        expect(abbrev.length).toBe(32);
        expect(abbrev.substr(-3)).toBe('...');
    })

    test('displays a title', () => {
        const testTitle = "Test Title"
        const { ItemCardComp, getByText } = render(<ItemCard title={testTitle} />);
        expect(getByText(testTitle)).toBeInTheDocument();
    });

    test('displays an abbreviated description', () => {
        const testDescription = "This is a test description that is too long and should not be displayed without abbreviation but should be displayed after abbreviation";
        const testAbbreviation = `${testDescription.substr(0, 29)}...`;
        const { ItemCardComp, getByText } = render(<ItemCard description={testDescription} />);
        expect(getByText(testAbbreviation)).toBeInTheDocument();
    });

    test('displays a itemRate', () => {
        const testRate = 5;
        const { ItemCardComp, getByText } = render(<ItemCard itemRate={testRate} />);
        expect(getByText(`$${testRate}`)).toBeInTheDocument();
    });
});