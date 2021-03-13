import React from 'react';
import ReactDOM from 'react-dom';
import TitlePhotoDesc from '../components/titlePhotoDesc';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";
import Login from "../components/login";

afterEach(cleanup);

describe('Displays the titlePhotoDesc component correctly', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<TitlePhotoDesc/>, div);
    });

    it('Displays the title passed in', () => {
        expect(false).toBe(true);
    });

    it.todo('Displays the description passed in');

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



