import puppeteer from 'puppeteer';
import { getDocument, queries, waitFor } from 'pptr-testing-library';


import faker, { fake } from 'faker';
const serveLocal = false;
const server = serveLocal ? 'http://localhost:3000/' : 'https://moochrentalapp.web.app/';
console.log(server);
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
            await page.goto(server);
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
            await page.goto(server);

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

            expect(page.url()).toBe(server + 'login');


            const $email = await getByLabelText($document, 'Email');
            const $password = await getByLabelText($document, 'Password');
            const $submit = await queryByText($document, 'Submit');

            await $email.type('test@testemail.com');
            await $password.type('123456');

            await $submit.click();

            await delay(1000);

            const $logout2 = await queryByText($document, 'Signed in as aQqcGAeDGafhOSQWeXDFA2klpuH2 - Logout');

            expect($logout2).toBeTruthy();

            expect(page.url()).toBe(server);

            $logout2.click();
            await delay(1000);

            expect($login).toBeTruthy();

        } catch (e) {
            console.log(e);
        } finally {
            // await delay(2000);
            browser.close();
        }
        
    }, 10000);


});
