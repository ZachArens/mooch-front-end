import React from 'react';
import ReactDOM from 'react-dom';
import Login from './../components/login';

import {render, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

afterEach(cleanup);

//tutorial provided by techsith at https://www.youtube.com/watch?v=3e1GHCA3GP0&t=4s

describe('renders Login component correctly', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Login/>, div);
    });

    it('renders title correctly', () => {
        const {getByTestId} = render(<Login/>);
        expect(getByTestId('login')).toHaveTextContent("Login");
    });

    it('renders login form correctly', () => {
        const {getByTestId} = render(<Login/>);
        expect(getByTestId('login').getElementsByTagName('form').length).toBe(1);
    });

    it('renders email input correctly', () => {
        const {getByTestId} = render(<Login/>);
        const email = getByTestId('email');
        expect(email).toHaveTextContent("Email");
        expect(email.getElementsByTagName('input').length).toBe(1);
        expect(email.getElementsByTagName('input')[0].getAttribute('type')).toBe("text");
    });

    it('renders password input correctly', () => {
        const {getByTestId} = render(<Login/>);
        const password = getByTestId('password');
        expect(password).toHaveTextContent("Password");
        expect(password.getElementsByTagName('input').length).toBe(1);
        expect(password.getElementsByTagName('input')[0].getAttribute('type')).toBe("password");
    });

    it('renders submit input correctly', () => {
        const {getByTestId} = render(<Login/>);
        const submit = getByTestId('submit');
        expect(submit).toHaveValue("Submit");
        expect(submit.getAttribute('type')).toBe("submit");
    });

    it('renders cancel input correctly', () => {
        const {getByTestId} = render(<Login/>);
        const cancel = getByTestId('cancel');
        expect(cancel).toHaveValue("Cancel");
        expect(cancel.getAttribute('type')).toBe("button");
    });

    it('renders link to create account correctly', () => {
        const {getByTestId} = render(<Login/>);
        const createAccount = getByTestId('createAccount');
        //TODO -set link for createAccount page
        expect(createAccount.getAttribute('href')).toBe("#");
    });


    it('matches snapshot', () => {
        const tree = renderer.create(<Login/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
