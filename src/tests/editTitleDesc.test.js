import React from 'react';
import {render} from '@testing-library/react';
import EditTitleDesc from '../components/editTitleDesc';

describe('<EditTitleDesc />', () => {
    it('renders without crashing', () => {
        render(<EditTitleDesc title="This is the Title" desc="This is the Description" itemRate={5} 
            exchangeOptions={{delivery : 0, meetup: 0, pickup: 0}} />);
    });

    it('handles props correctly', () => {
        const TitleDesc = render(<EditTitleDesc title="This is the Title" desc="This is the Description" itemRate={5} 
        exchangeOptions={{delivery : 0, meetup: 0, pickup: 0}}/>);
        expect(TitleDesc.getByDisplayValue("This is the Title")).toBeTruthy;
        expect(TitleDesc.getByDisplayValue("This is the Description")).toBeTruthy;
        expect(TitleDesc.getByDisplayValue("5")).toBeTruthy;
    });

    it('handles props correctly and is dumb', () => {
        const TitleDesc = render(<EditTitleDesc title="&*#&%()#" desc="454365" itemRate={-300} 
        exchangeOptions={{delivery : 0, meetup: 0, pickup: 0}}/>);
        expect(TitleDesc.getByDisplayValue("&*#&%()#")).toBeTruthy;
        expect(TitleDesc.getByDisplayValue("454365")).toBeTruthy;
        expect(TitleDesc.getByDisplayValue("-300")).toBeTruthy;
    });

});