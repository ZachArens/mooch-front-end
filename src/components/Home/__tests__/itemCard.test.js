import React from 'react';
import ItemCard  from '../itemCard';

import { render, cleanup, debug } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// import '@testing-library/jest-dom/extend-expect';

// afterEach(() => {
//     cleanup();
// })

const updateCurrentItem = jest.fn();

describe('<ItemCard />', () => {
    test("renders without crashing", () => {
        
        render(
            <MemoryRouter>
                <ItemCard id={"12345"} updateCurrentItem={updateCurrentItem}
        description="this is a description" itemRate={12}/>
            </MemoryRouter>
        );
        // debug();
    });


    test('displays a title', () => {
        const testTitle = "Test Title"
        const { getByText } = render(
        <MemoryRouter>
            <ItemCard title={testTitle} updateCurrentItem={updateCurrentItem} />
        </MemoryRouter>
        );
        expect(getByText(testTitle)).toBeTruthy();
    });

    test('displays an abbreviated description', () => {
        const testDescription = "This is a test description that is too long and should not be displayed without abbreviation but should be displayed after abbreviation";
        const testAbbreviation = `${testDescription.substr(0, 29)}...`;
        const { getByText } = render(
            <MemoryRouter>
                <ItemCard description={testDescription} />
            </MemoryRouter>
            );
        expect(getByText(testAbbreviation)).toBeTruthy();
    });

    test('displays a itemRate', () => {
        const testRate = 5;
        const { getByText } = render(
            <MemoryRouter>
                <ItemCard itemRate={testRate} />
            </MemoryRouter>
        );
        expect(getByText(`$${testRate}`)).toBeTruthy();
    });
});