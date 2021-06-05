//import puppeteer from 'puppeteer';
// import firebase from '../utils/firebase';
// import Faker from 'faker';

// describe('e2e test for addItem', async () => {
//     it('loads the page title correctly', () => {
//         let browser = await puppeteer.launch();
//         //let browser = await puppeteer.launch({headless: false});
//         let page = await browser.newpage();
//         await page.goto('http://localhost:3000/');
//         //make assertion
//         const html = await page.$eval('.App-title', e=> e.innerHTML);
//         expect(html).toBe('Welcome to React');
//         browser.close();
//     });
// })

describe.skip('Enter new item', () => {
    let browser;
    let page;
    // const db = firebase.firestore();
    // const collection = db.collection('rentalItems');


    // beforeAll(async () => {
    //     browser = await puppeteer.launch({
    //         headless:false,
    //         slowMo:20
    //     });
    //     page = await browser.newPage();
    //     await page.goto('http://localhost:3000/addItems');

    //     // await db.
    // });

    afterAll( async () => {
        // browser.close();
    })

    it('should allow the user to enter a title, description, and itemRate', async () => {

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

    it('should allow the user to add an item to the database by clicking the add button', async () => {
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

describe('e2e <Login /> ', () => {
    test.todo('user can login with email and password');

    test.todo('user can create a login with all user details ');
})