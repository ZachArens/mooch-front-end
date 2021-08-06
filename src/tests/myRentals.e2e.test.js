import puppeteer from 'puppeteer';
import { getDocument, queries, waitFor } from 'pptr-testing-library';


import faker, { fake } from 'faker';

//https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

describe('myRentals', () => {
    test('displays a list of reservations and items', async () => {
        let browser = await puppeteer.launch();
        //  let browser = await puppeteer.launch({headless: false, slowMo: 75});


        try {
            let page = await browser.newPage();
            await page.goto('http://localhost:3000/myRentals');
            await page.setViewport({ width: 1366, height: 768});

            let { getByTestId, getByText, getAllByTestId, queryByText, getByLabelText } = queries
            
            const $document = await getDocument(page);
            expect($document).toBeTruthy();

            await delay(1000);

            const $email = await getByLabelText($document, 'Email');
            const $password = await getByLabelText($document, 'Password');
            const $submit = await queryByText($document, 'Submit');

            await $email.type('test2@testemail.com');
            await $password.type('123456');

            await $submit.click();

            await delay(1000);

            const $myReservationsTitle = await getByText($document, "My Reservations");
            expect($myReservationsTitle).toBeTruthy();

            const $myItemsTitle = await getByText($document, "My Items");
            expect($myItemsTitle).toBeTruthy();

            const $addItemButton = await getByTestId($document, 'addItemButton');
            expect($addItemButton).toBeTruthy();

            const $reservationList = await getByTestId($document, 'reservationList');
            expect($reservationList).toBeTruthy();

            await delay(5000);

            const $reservations = await getAllByTestId($document, 'reservation');
            expect($reservations.length).toBeGreaterThan(0);
            

        } finally {
            browser.close();
        }
    }, 40000);
});
    

    

