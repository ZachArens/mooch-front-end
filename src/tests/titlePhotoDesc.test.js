import React from 'react';
import ReactDOM from 'react-dom';
import TitlePhotoDesc from '../components/titleDesc';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";
import Login from "../components/login";
import RentItem from "../components/rentItem";

afterEach(cleanup);

describe('Displays the titlePhotoDesc component correctly', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<TitlePhotoDesc/>, div);
    });

    it('Displays the title passed in', () => {
        const {getByText} = render(<TitlePhotoDesc title="The Correct Title"/>);
        expect(getByText('The Correct Title')).toBeInTheDocument();
    });

    it('Displays the description passed in', () => {
        const {getByText} = render(<TitlePhotoDesc description="Lorem Ipsum Data Data"/>);
        expect(getByText('Lorem Ipsum Data Data')).toBeInTheDocument();
    });

    it.todo('Displays each photo for the urls passed in');

    it.todo('Sanitizes each photo url before requesting the photo');

    it.todo('Sanitizes the title before displaying');

    it.todo('Sanitizes the description before displaying');

    it.todo('Displays a larger photo view after double clicking photos');

    it.todo('The larger photo view is hidden initially');

    it.todo('Hides the larger photo view after clicking the close button');

    it('matches snapshot', () => {
        const tree = renderer.create(<TitlePhotoDesc title="Kayak" description="Ipsum data data data" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



