import React from "react"; 
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import DisplayTitleDesc from '../components/displayTitleDesc';

describe('<DisplayTitleDescription />', () => {
    test('renders without crashing', () => {
        expect(render(<DisplayTitleDesc/>)).toBeDefined;
    });

    test('displays a title, description, and item cost', () => {
        const data = {
            title: "Sample Item",
            description: "This is the description of the sample item",
            itemRate: 7.99
        }

        const {getByText} = render (<DisplayTitleDesc title={data.title} 
            desc={data.description} itemRate={data.itemRate} />);
        
        expect(getByText(data.title)).toBeInTheDocument();
        expect(getByText(data.description)).toBeInTheDocument();
        expect(getByText(data.itemRate)).toBeInTheDocument();

    });
});