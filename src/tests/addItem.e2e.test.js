import puppeteer from 'puppeteer';
import { getDocument, queries, waitFor } from 'pptr-testing-library';


import faker, { fake } from 'faker';

//https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

describe('addItem', () => {
    test('Enter new item', async () => {
        let browser = await puppeteer.launch();
        //  let browser = await puppeteer.launch({headless: false, slowMo: 75});
        try {
            
            let page = await browser.newPage();
            await page.goto('http://localhost:3000/');
            await page.setViewport({ width: 1366, height: 768});


            let { getByTestId, getByText, getAllByText, queryByText, getByLabelText } = queries
            
            const $document = await getDocument(page);

            expect($document).toBeTruthy();

            await delay(1000);

            const $myRentals = await getByText($document, 'My Rentals');
            expect($myRentals).toBeTruthy();

            await $myRentals.click();

            await delay(1000);

            //requires user to be logged in
            expect(page.url()).toBe('http://localhost:3000/myRentals');


            const $email = await getByLabelText($document, 'Email');
            const $password = await getByLabelText($document, 'Password');
            const $submit = await queryByText($document, 'Submit');

            await $email.type('test3@testemail.com');
            await $password.type('123456');

            await $submit.click();

            await delay(1000);

            //after logging in -routes to myRentals page

            expect(page.url()).toBe('http://localhost:3000/myRentals');

            //click addItem to go to addItem page

            const $addItemButton = await getByTestId($document, 'addItemButton');
            expect($addItemButton).toBeTruthy();

            await $addItemButton.click();

            await delay(1000);

            expect(page.url()).toBe('http://localhost:3000/addItems');

            const fakeItem = {title: faker.commerce.productName(), 
                    description: faker.commerce.productDescription(),
                    hourlyRate: Math.floor(Math.random()*100) + "",
                    deliveryRate: Math.floor(Math.random()*100) + "",
                    meetupRate: Math.floor(Math.random()*100).toString(),
                    pickupRate: Math.floor(Math.random()*100).toString(),
                }


            const $title = await getByLabelText($document, 'Title');
            const $description = await getByLabelText($document, 'Description');
            const $hourlyRate = await getByLabelText($document, 'Hourly Rate $');
            const $deliveryRate = await getByLabelText($document, 'Delivery');
            const $meetupRate = await getByLabelText($document, 'Public Meetup');
            const $pickupRate = await getByLabelText($document, 'Pickup');
            const $addItemSubmit = await getByText($document, 'Add');

            await $title.type(fakeItem.title);
            await $description.type(fakeItem.description);
            await $hourlyRate.type(fakeItem.hourlyRate);
            await $deliveryRate.type(fakeItem.deliveryRate);
            await $meetupRate.type(fakeItem.meetupRate);
            await $pickupRate.type(fakeItem.pickupRate);

            await $addItemSubmit.click();
            await delay(1000);

            expect(page.url()).toBe('http://localhost:3000/myRentals');

            const $myItemsContainer = await getByTestId($document, 'myItemsContainer');

            const $enteredTitle = await getAllByText($myItemsContainer, fakeItem.title);
            const $enteredDescription = await getAllByText($myItemsContainer, fakeItem.description);
            const $enteredHourlyRate = await getAllByText($myItemsContainer, fakeItem.hourlyRate );

            expect($enteredTitle.length).toBeGreaterThanOrEqual(1);
            expect($enteredDescription.length).toBeGreaterThanOrEqual(1);
            expect($enteredHourlyRate.length).toBeGreaterThanOrEqual(1);


        } finally {
            browser.close();
        }
    }, 104000);

    test.todo('should allow a user to clear the information and return to the home page by clicking the cancel button from myRental');


    test.todo('should allow a user to clear the information and return to the home page by clicking the cancel button edit');

});   