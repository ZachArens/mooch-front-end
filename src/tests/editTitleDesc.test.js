import React from 'react';
import {render} from '@testing-library/react';
import EditTitleDesc from '../components/editTitleDesc';

describe('<EditTitleDesc />', () => {
    it('renders without crashing', () => {
        render(<EditTitleDesc />);
    });

    it('handles props correctly', () => {
        const TitleDesc = render(<EditTitleDesc title="This is the Title" desc="This is the Description" itemRate={5} />);
        TitleDesc.getByDisplayValue("This is the Title");
        TitleDesc.getByDisplayValue("This is the Description");
        TitleDesc.getByDisplayValue("5");
    });

    it('handles props correctly and is dumb', () => {
        const TitleDesc = render(<EditTitleDesc title="&*#&%()#" desc="454365" itemRate={-300} />);
        TitleDesc.getByDisplayValue("&*#&%()#");
        TitleDesc.getByDisplayValue("454365");
        TitleDesc.getByDisplayValue("-300");
    });

});