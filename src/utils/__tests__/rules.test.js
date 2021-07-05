// const assert = require('assert');

// const firebase = require('@firebase/rules-unit-testing');

// const MY_PROJECT_ID = 'moochrentalapp';
// const myId = "user_abc";
// const myAuth = {uid: myId, email: "abc@gmail.com"}
// const theirId = "user_xyz";
// const admin = getAdminFirestore();
// const db = getFirestore(myAuth);
// const theirDB = getFirestore({uid: theirId, email: "alice@example.com"})

// function getFirestore(auth) {
//     return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
// }

// function getAdminFirestore() {
//     return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
// }

// beforeEach(async() => {
//     await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
// });

// describe('rentalItems', () => {
//     let rentalItem = {ownerId: myId, itemName: "Kayak", 
//         itemDesc: "8 foot river kayak", costHourly: 400, exchangeOptions: {
//             delivery: 5,
//             meetup: 4,
//             pickup: 3
//         },
//         photos: ['https://firebasestorage.googleapis.com/v0/b/moochrentalapp.appspot.com/o/3sR3H7RACJdZ6dEROhSb5LIQJ1Y2%2F1f01be9a-c557-4dfd-b529-a4fc3f4ed57c?alt=media&token=49f3d5c6-d093-4598-a668-1d78de529fa7']
//     };

//     const itemId = "item_123"

//     it("Can't create a rentalItem if the auth is not logged in as owner", async () => {
//         const testPath = theirDB.collection("rentalItems").doc(itemId);
//         await firebase.assertFails(testPath.set(rentalItem));
//     });

//     it("Can create a rentalItem if logged in as item owner", async () => {
//         const testPath = db.collection('rentalItems').doc(itemId);
//         await firebase.assertSucceeds(testPath.set(rentalItem));
//     });

//     it("Can update a rentalItem if logged in as item owner", async () => {
//         const testPath = db.collection('rentalItems').doc(itemId);
//         await admin.collection('rentalItems').doc(itemId).set(rentalItem);
//         await firebase.assertSucceeds(testPath.get());
//         rentalItem = {...rentalItem, itemName: "River Kayak"};
//         await firebase.assertSucceeds(testPath.update(rentalItem));
//     });

//     it("Can delete a rentalItem if logged in as item owner", async () => {
//         const testPath = db.collection('rentalItems');
//         await admin.collection('rentalItems').doc(itemId).set(rentalItem);
//         await firebase.assertSucceeds(testPath.doc(itemId).get());
//         await firebase.assertSucceeds(testPath.doc(itemId).delete());
//     });

//     it("Can't update a rentalItem if logged in as a different owner", async () => {
//         const testPath = theirDB.collection('rentalItems').doc(itemId);
//         await admin.collection('rentalItems').doc(itemId).set(rentalItem);
//         rentalItem = {...rentalItem, itemName: "Kayak"};
//         await firebase.assertFails(testPath.update(rentalItem));
//     });

//     it("Can't delete a rentalItem if logged in as a different owner", async () => {
//         const testPath = theirDB.collection('rentalItems').doc(itemId);
//         await admin.collection('rentalItems').doc(itemId).set(rentalItem);
//         await firebase.assertFails(testPath.delete());
//     });

//     it('Can read a rentalItem if auth is null', async() => {
//         nullPath = getFirestore(null);
//         //set item
//         await admin.collection('rentalItems').doc(itemId).set(rentalItem);
//         //get item as null
//         const testPath = nullPath.collection('rentalItems').doc(itemId);
//         await firebase.assertSucceeds(testPath.get());
//     });

// });

// describe('userProfile', () => {

//     let userProfile = {
//         fullName: 'Testy Testerson', 
//         streetAddress: '432 Testerville Rd',
//         city: 'Testerville', 
//         st: 'TY',
//         zip: '99999', 
//         phone: '555-555-5555',
//     }

//     it("Can create a userProfile if logged in as user", async () => {
//         const testPath = db.collection('userProfiles').doc(myId);
//         await firebase.assertSucceeds(testPath.set(userProfile));
//     });

//     it("Can't create a userProfile if logged in as a different user", async () => {
//         const testPath = theirDB.collection('userProfiles').doc(myId);
//         await firebase.assertFails(testPath.set(userProfile));
//     });

//     it("Can update and delete a userProfile if logged in as user", async () => {
//         const testPath = db.collection('userProfiles').doc(myId);
//         await admin.collection('userProfiles').doc(myId).set(userProfile);
//         userProfile = {...userProfile, fullName: 'Lester Testerville'}
//         await firebase.assertSucceeds(testPath.update(userProfile));
//         await firebase.assertSucceeds(testPath.delete());
//     });

//     it("Can't update and delete a userProfile if logged in as a different user", async () => {
//         const testPath = theirDB.collection('userProfiles').doc(myId);
//         await admin.collection('userProfiles').doc(myId).set(userProfile);
//         userProfile = {...userProfile, fullName: 'Lester Testerville'}
//         await firebase.assertFails(testPath.update(userProfile));
//         await firebase.assertFails(testPath.delete());
//     });

//     it('Can read a userProfile if auth is not null', async() => {
//         //set item
//         await admin.collection('userProfiles').doc(myId).set(userProfile);
//         //get item as null
//         const testPath1 = db.collection('userProfiles').doc(myId);
//         const testPath2 = theirDB.collection('userProfiles').doc(myId);
//         await firebase.assertSucceeds(testPath1.get());
//         await firebase.assertSucceeds(testPath2.get());
//     });

//     it("Can't read a userProfile if auth is null", async() => {
//         nullPath = getFirestore(null);
//         //set item
//         await admin.collection('userProfiles').doc(myId).set(userProfile);
//         //get item as null
//         const testPath = nullPath.collection('userProfiles').doc(myId);
//         await firebase.assertFails(testPath.get());
//     });

// });

// describe('reservations', () => {
//     const reservationId = 'reservation_123'
//     let reservation = {
//         itemName: 'Kayak', 
//         itemDesc: 'Description entered here',
//         startDateTime: new Date().setFullYear(2021,11,1),
//         endDateTime: new Date().setFullYear(2021,11,3),
//         selectedExchangeMethod: "delivery",
//         exchangeOptions: {
//             delivery: 5,
//             meetup: 4,
//             pickup: 3
//         }, 
//         totalCost: 245,
//         exchangeCost: 5,
//         costHourly: 5,
//         rentalCost: 240,
//         lenderId: myId,
//         rentalItemId: 'item_123',
//         ownerId: theirId
//     }

//     it("Can write a reservation if the user matches the lenderId", async() => {
//         const testPath = db.collection('reservations').doc(reservationId);
//         await firebase.assertSucceeds(testPath.set(reservation));
//         reservation = {...reservation, fullName: 'Lester Testerville'}
//         await firebase.assertSucceeds(testPath.update(reservation));
//         await firebase.assertSucceeds(testPath.delete());
//     });

//     it("Can't write a reservation if logged in as a different user", async () => {
//         const testPath = theirDB.collection('reservations').doc(myId);
//         await firebase.assertFails(testPath.set(reservation));
//         //set item
//         await admin.collection('reservations').doc(myId).set(reservation);
//         //get item as null
//         const testPath1 = db.collection('reservations').doc(myId);
//         const testPath2 = theirDB.collection('reservations').doc(myId);
//         await firebase.assertSucceeds(testPath1.get());
//         await firebase.assertSucceeds(testPath2.get());
//     });

//     it('Can read a reservation if auth is lender or owner', async() => {
//         //set item
//         await admin.collection('reservations').doc(reservationId).set(reservation);
//         //get item as either myUser or theirUser
//         const testPath1 = db.collection('reservations').doc(reservationId);
//         const testPath2 = theirDB.collection('reservations').doc(reservationId);
//         await firebase.assertSucceeds(testPath1.get());
//         await firebase.assertSucceeds(testPath2.get());
//     });

//     it("Can't read a reservation if auth is not lender or owner", async() => {
//         //set item
//         await admin.collection('reservations').doc(reservationId).set(reservation);
//         //get item as either myUser or theirUser
//         const otherId = 'user999'
//         const otherAuth = { uid: otherId, email: 'ltesterson@testemail.com' }
//         const otherDB = getFirestore(otherAuth)
//         const testPath1 = otherDB.collection('reservations').doc(reservationId);
//         await firebase.assertFails(testPath1.get());
//     });
// })
// 
    test.todo('unable to run rules unit tests without emulator');

