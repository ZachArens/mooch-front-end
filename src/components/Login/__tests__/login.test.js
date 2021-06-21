import React from 'react';
import Login from '../login';

import {render, cleanup, fireEvent} from '@testing-library/react';
import {createUserWithEmailandPass, loginWithEmailAndPass} from '../../../utils/firebaseFunctions';

jest.mock('../../../utils/firebaseFunctions');

afterEach(cleanup);

describe('<Login />', () => {
    test('renders without crashing', () => {
        render(<Login/>);
    });

    test('<Login /> with only LoginForm', () => {
        const {queryAllByRole, debug} = render(<Login/>);
        debug();
        expect(queryAllByRole('input')).toBe(2);
    });

    test('<Login /> logs a user in', () => {
        const {queryByTestId} = render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        );

        const email = "test@testemail.com";
        const password = "1234asdfas"

        fireEvent.change(queryByTestId("email"), {
            target: {defaultValue: email},
        });

        fireEvent.change(queryByTestId("password"), {
            target: {defaultValue: password},
        });

        fireEvent.click(queryByTestId(submitButton));

        expect(loginWithEmailAndPass).toHaveBeenCalled();
        expect(loginWithEmailAndPass).toHaveBeenCalledWith(email, password);

    });

    test('<Login /> can create a new user login', () => {
        const {queryByTestId, debug} = render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        );

        const fakeUser = {
            uid: "user123",
            email: "test@testemail.com",
            password: "1234asdfas",
            fullName: "Testy Testerson",
            streetAddress: "123 Sample Data Dr.",
            city: "Testerville",
            st: "TX",
            zip: "12345",
            phone: "555-555-5555"
        };

        fireEvent.click(queryByTestId('loginOrCreateButton'));

        fireEvent.click(queryByTestId(loginOrCreateButton));

        fireEvent.change(queryByTestId("email"), {
            target: {defaultValue: email},
        });

        fireEvent.change(queryByTestId("password"), {
            target: {defaultValue: password},
        });

        fireEvent.click(queryByTestId(submit));

        expect(loginWithEmailAndPass).toHaveBeenCalled();
        expect(loginWithEmailAndPass).toHaveBeenCalledWith(email, password);

    });



    // it('renders email input correctly', () => {
    //     const {getByTestId} = render(<Login/>);
    //     const email = getByTestId('email');
    //     expect(email).toHaveTextContent("Email");
    //     expect(email.getElementsByTagName('input').length).toBe(1);
    //     expect(email.getElementsByTagName('input')[0].getAttribute('type')).toBe("text");
    // });

    // it('renders password input correctly', () => {
    //     const {getByTestId} = render(<Login/>);
    //     const password = getByTestId('password');
    //     expect(password).toHaveTextContent("Password");
    //     expect(password.getElementsByTagName('input').length).toBe(1);
    //     expect(password.getElementsByTagName('input')[0].getAttribute('type')).toBe("password");
    // });

    // it('renders submit input correctly', () => {
    //     const {getByTestId} = render(<Login/>);
    //     const submit = getByTestId('submit');
    //     expect(submit).toHaveValue("Submit");
    //     expect(submit.getAttribute('type')).toBe("submit");
    // });

    // it('renders cancel input correctly', () => {
    //     const {getByTestId} = render(<Login/>);
    //     const cancel = getByTestId('cancel');
    //     expect(cancel).toHaveValue("Cancel");
    //     expect(cancel.getAttribute('type')).toBe("button");
    // });

    // it('renders link to create account correctly', () => {
    //     const {getByTestId} = render(<Login/>);
    //     const createAccount = getByTestId('createAccount');
    //     //TODO -set link for createAccount page
    //     expect(createAccount.getAttribute('href')).toBe("#");
    // });


    // it('matches snapshot', () => {
    //     const tree = renderer.create(<Login/>).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});
