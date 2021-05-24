import React from 'react';
import ItemCard  from '../components/itemCard';

import { render, cleanup, debug } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

// afterEach(() => {
//     cleanup();
// })

describe('<ItemCard />', () => {
    test("renders without crashing", () => {
        
        render(<ItemCard />);
        debug();
    });


    test('displays a title', () => {
        const testTitle = "Test Title"
        const { getByText } = render(<ItemCard title={testTitle} />);
        expect(getByText(testTitle)).toBeTruthy();
    });

    test('displays an abbreviated description', () => {
        const testDescription = "This is a test description that is too long and should not be displayed without abbreviation but should be displayed after abbreviation";
        const testAbbreviation = `${testDescription.substr(0, 29)}...`;
        const { getByText } = render(<ItemCard description={testDescription} />);
        expect(getByText(testAbbreviation)).toBeTruthy();
    });

    test('displays a itemRate', () => {
        const testRate = 5;
        const { getByText } = render(<ItemCard itemRate={testRate} />);
        expect(getByText(`$${testRate}`)).toBeTruthy();
    });
});