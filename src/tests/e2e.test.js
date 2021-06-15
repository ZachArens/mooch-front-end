import puppeteer from 'puppeteer';
import { getDocument, queries, waitFor } from 'pptr-testing-library';

import faker, { fake } from 'faker';

//https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

describe('e2e test for main page', () => {
    test('loads the main page correctly', async () => {
        let browser = await puppeteer.launch();
        // let browser = await puppeteer.launch({headless: false});

        try {
            let page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        //make assertion
        const { getByTestId, queryByText, getAllByText } = queries
        
        const $document = await getDocument(page)

        const $loading = await queryByText($document, 'Loading...');
        expect($loading).toBeTruthy();
    
        const $title = await getAllByText($document, 'Mooch');
        expect($title.length).toBe(2);

        const $login = await queryByText($document, 'Login');
        expect($login).toBeTruthy();

        const $myRentals = await queryByText($document, 'My Rentals');
        expect($myRentals).toBeTruthy();
        } finally {
            browser.close();
        }
        
        
        
    });

    test('can click on and enter login information', async () => {
        let browser = await puppeteer.launch();
        //  let browser = await puppeteer.launch({headless: false, slowMo: 75});
        try {
            
            let page = await browser.newPage();
            await page.goto('http://localhost:3000/');

            await page.setViewport({ width: 1366, height: 768});


            let { getByTestId, getByText, queryByText, getByLabelText } = queries
            
            const $document = await getDocument(page);

            expect($document).toBeTruthy();

            const $login = await getByText($document, 'Login');
            const $logout = await queryByText($document, 'Logout');

            expect($logout).toBeFalsy();
            expect($login).toBeTruthy();
            await $login.click();

            await delay(1000);

            expect(page.url()).toBe('http://localhost:3000/login');


            const $email = await getByLabelText($document, 'Email');
            const $password = await getByLabelText($document, 'Password');
            const $submit = await queryByText($document, 'Submit');

            await $email.type('test@testemail.com');
            await $password.type('123456');

            await $submit.click();

            await delay(1000);

            const $logout2 = await queryByText($document, 'Signed in as aQqcGAeDGafhOSQWeXDFA2klpuH2 - Logout');

            expect($logout2).toBeTruthy();

            expect(page.url()).toBe('http://localhost:3000/');

            $logout2.click();
            await delay(1000);

            expect($login).toBeTruthy();

        } catch (e) {
            console.log(e);
        } finally {
            // await delay(2000);
            browser.close();
        }
        
    }, 100000);

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
            const $hourlyRate = await getByLabelText($document, 'Hourly Rate');
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
    // beforeAll(async () => {
    //     browser = await puppeteer.launch({
    //         headless:false,
    //         slowMo:20
    //     });
    //     page = await browser.newPage();
    //     await page.goto('http://localhost:3000/addItems');

    //     // await db.
    // });

    // afterAll( async () => {
    //     // browser.close();
    // })

    it.skip('should allow the user to enter a title, description, and itemRate', async () => {

        let title = 'Test Object';
        let desc = 'This object is useful for testing.';
        let rate = '4';
        
        await page.click('input[id="itemTitle"]');
        await page.keyboard.type(title);
        

        await page.click('input[id="itemDesc"]');
        await page.keyboard.type(desc);

        await page.click('input[id="itemRate"]');
        await page.keyboard.type(rate);



        const itemTitle = await page.$eval('#itemTitle', (el) => el.value);
        expect(itemTitle).toBe(title);
        const itemDesc = await page.$eval('#itemDesc', (el)=> el.value);
        expect(itemDesc).toBe(desc);
        const itemRate = await page.$eval('#itemRate', (el)=> el.value);
        expect(itemRate).toBe(rate);

    });

    it.skip('should allow the user to add an item to the database by clicking the add button', async () => {
        await page.click('#addItemButton');

        // let docResult
        //
        // let query = collection.where('title', '==', 'Test Object').get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             // doc.data() is never undefined for query doc snapshots
        //             ;
        //         });
        //     })
        //     .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //     });
        // expect(query).not.toBeNull();


    });

    test.todo('should allow a user to clear the information and return to the home page by clicking the cancel button');
});