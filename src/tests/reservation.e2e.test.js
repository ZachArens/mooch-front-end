import puppeteer from 'puppeteer';
import { getDocument, queries, waitFor } from 'pptr-testing-library';


import faker, { fake } from 'faker';

//https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

describe('reservations', () => {
    test.skip('displays a list of reservations and items', async () => {
        let browser = await puppeteer.launch();
        //  let browser = await puppeteer.launch({headless: false, slowMo: 75});


        try {
            const page = await browser.newPage();
            page.on('console', msg => console.log('PAGE LOG:', msg.text));
            await page.goto('http://localhost:3000/');
            await page.setViewport({ width: 1366, height: 768});

            let { getByTestId, getByText, findByText, findAllByTestId, queryByText, getByLabelText } = queries
            
            const $document = await getDocument(page);
            expect($document).toBeTruthy();

            await delay(500);

            const $items = await findAllByTestId($document, 'rentalItemCard');
            
            const itemName = await getByTestId($items[0], 'itemName');
            const nameTextContent = await itemName.getProperty('textContent');
            const nameText = nameTextContent._remoteObject.value
            const itemDesc = await getByTestId($items[0], 'itemDesc');
            const descTextContent = await itemDesc.getProperty('textContent');
            const descText = descTextContent._remoteObject.value
            const itemRate = await getByTestId($items[0], 'itemRate');
            const rateTextContent = await itemRate.getProperty('textContent');
            const rateText = rateTextContent._remoteObject.value
            
            await $items[0].click();

            await delay(500);

            const $email = await getByLabelText($document, 'Email');
            const $password = await getByLabelText($document, 'Password');
            const $submit = await queryByText($document, 'Submit');

            await $email.type('test2@testemail.com');
            await $password.type('123456');

            await $submit.click();

            await delay(1000);

            // const $reservationItemName = await getByText($document, nameText);
            // expect($reservationItemName).toBeTruthy();

            const $reservationItemDesc = await getByText($document, descText.substr(0,20), {exact: false});
            expect($reservationItemDesc).toBeTruthy();

            // const $reservationItemRate = await getByText($document, rateText);
            // expect($reservationItemRate).toBeTruthy();

            const $reserveButton = await getByText($document, 'Reserve');
            expect($reserveButton).toBeTruthy();

            // const $cancelButton = await getByText($document, 'Cancel');
            // expect($cancelButton).toBeTruthy();
            
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const $selectExchangeButton = await getByTestId($document, 'selectExchangeMethod');
            expect($selectExchangeButton).toBeTruthy();

            const $startDate = await findByText($document, today.toLocaleDateString, {exact: false});
            expect($startDate).toBeTruthy();

            // const $cancelButton = await getByTestId($document, cancelButton);
            // expect($cancelButton).toHaveTextContent('Cancel');

            

            


            

        } finally {
            browser.close();
        }
    }, 40000);
});

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
    

    

