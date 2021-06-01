test.todo('test firebase rules');
// //const assert = require('assert');

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

// describe ('Mooch App user account creation and editing', () => {
//     it ("Can write to a user document with the same ID as our user", async() => {
//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("users").doc(myId);
//         await firebase.assertSucceeds(testDoc.set({phone_number: "5555555555"}));
//     });

//     it ("Can't write to a user document with a different ID as our user", async() => {
//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("users").doc(theirId);
//         await firebase.assertFails(testDoc.set({phone_number: "5555555555"}));
//     });

//     it("Can create a user with all eligible fields", async() => {

//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("users").doc(myId);
//         const user = {uid: myId, displayName: "John Doe",
//             email: "abc@gmail.com", phone_number: "555555555", searchZip: "55555"};
//         await firebase.assertSucceeds(testDoc.set(user));
//     });

//     it("Can't create a user with unauthorized fields", async() => {

//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("users").doc(myId);
//         const user = {uid: myId, displayName: "John Doe",
//             email: "abc@gmail.com", phone_number: "555555555", searchZip: "55555", notAllowed: "true"};
//         await firebase.assertFails(testDoc.set(user));
//     });

//     it("Can update a user with any eligible field", async() => {

//         const db = getFirestore(myAuth);

//         const user = {uid: myId, displayName: "John Doe",
//             email: "abc@gmail.com", phone_number: "555555555", searchZip: "55555"};
//         const testDoc = db.collection("users").add(user);
//         await firebase.assertSucceeds(db.collection("users").doc(myId).set({phone_number: "6666666666"}));
//     });

//     it("Can't update a user with unauthorized fields", async() => {

//         const db = getFirestore(myAuth);
//         const testDoc = db.collection("users").doc(myId);

//         await firebase.assertFails(testDoc.update({not_allowed: "true"}));
//     });

//     it("Can read a user's address if logged in as that user", async() => {

//         const db = getFirestore(myAuth);
//         const address = {addressType: "Delivery", streetAddress: "111 Pennsylvania Ave",
//             city: "Zeeland", st: "MI", zip: "49464"};
//         const testDoc = db.collection("users").doc(myId)
//             .collection("addresses").doc("1234567");
//         await testDoc.set(address);

//         await firebase.assertSucceeds(testDoc.get());
//     });

//     it("Can't read a user's address if not logged in as that user", async() => {

//         const db = getFirestore(myAuth);
//         const address = {addressType: "Delivery", streetAddress: "111 Pennsylvania Ave",
//             city: "Zeeland", st: "MI", zip: "49464"};
//         const testDoc = db.collection("users").doc(theirId)
//             .collection("addresses").doc("1234567");
//         await testDoc.set(address);

//         await firebase.assertFails(testDoc.get());
//     });

//     it("Can write a user's address if logged in as that user", async() => {

//         const testColl = db.collection("users").doc(myId).collection("addresses");
//         const address = {addressType: "Delivery", streetAddress: "111 Pennsylvania Ave",
//             city: "Zeeland", st: "MI", zip: "49464"};
//         await firebase.assertSucceeds(testColl.add(address));
//     });

//     it("Can create an address with all eligible fields", async() => {
//         const testColl = db.collection("users").doc(myId).collection("addresses");
//         const address = {addressType: "Delivery", streetAddress: "111 Pennsylvania Ave",
//             city: "Zeeland", st: "MI", zip: "49464"};
//         await firebase.assertSucceeds(testColl.add(address));
//     });

//     it("Can't create an address with unauthorized fields", async() => {

//         const testColl = db.collection("users").doc(myId).collection("addresses");
//         const address = {addressType: "Delivery", streetAddress: "111 Pennsylvania Ave",
//             city: "Zeeland", st: "MI", zip: "49464", notAllowed: true};
//         await firebase.assertFails(testColl.add(address));
//     });

//     it("Can delete a user account if logged in as that user", async() => {

//         const user = {uid: myId, displayName: "John Doe",
//             email: "abc@gmail.com", phone_number: "555555555", searchZip: "55555"};
//         await db.collection("users").doc(myId).set(user);

//         await firebase.assertSucceeds(db.collection("users").doc(myId).delete());
//     });

//     it("Can't delete a user account if not logged in as that user", async() => {
//         const user = {uid: theirId, displayName: "John Doe",
//             email: "abc@gmail.com", phone_number: "555555555", searchZip: "55555"};
//         await admin.collection("users").doc(theirId).set(user);


//         const db = getFirestore(myAuth);

//         const testDoc = db.collection("users").doc(theirId);
//         await firebase.assertFails(testDoc.delete());
//     });

//     // need database function - it ("Can delete all user items if a user account has been deleted");

//     it ("Can't delete a user account if an item is listed as rented");

// });

// describe ('Mooch App user rental item creation, editing, and deletion', () => {


//     const itemId = "item_123"



//     it("Can write an item when they list themselves as the owner", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await firebase.assertSucceeds(testItem.set(item));
//     });

//     it("Can read any item if it has a status of available", async() => {
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: theirId};
//         await admin.collection("rentalItems").doc(itemId).set(item);

//         const testRead = db.collection("rentalItems").doc(itemId);
//         await firebase.assertSucceeds(testRead.get());
//     });

//     it("Can read an item if logged in as item's owner", async() => {
//         const item = {itemName: "Kayak", itemStatus: "draft",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await admin.collection("rentalItems").doc(itemId).set(item);

//         const testRead = db.collection("rentalItems").doc(itemId);
//         await firebase.assertSucceeds(testRead.get());
//     });

//     it("Can't read an item if it doesn't have a status of available " +
//         "or logged in as it's owner", async() => {
//         const item = {itemName: "Kayak", itemStatus: "draft",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: theirId};
//         await admin.collection("rentalItems").doc(itemId).set(item);

//         const testRead = db.collection("rentalItems").doc(itemId);
//         await firebase.assertFails(testRead.get());
//     });

//     it("Can create or update an item if it has a status of available, draft, or rented", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await firebase.assertSucceeds(testItem.set(item));
//         await firebase.assertSucceeds(testItem.update({itemStatus: "rented"}));
//         await firebase.assertSucceeds(testItem.update({itemStatus: "draft"}));
//     });

//     it("Can't create or update an item if it doesn't have a status of available, draft, or rented", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "not_allowed",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Can't delete an item if it has a status of rented", async() => {
//         const item = {itemName: "Kayak", itemStatus: "rented",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await db.collection("rentalItems").doc(itemId).set(item);

//         await firebase.assertFails(db.collection("rentalItems").doc(itemId).delete());
//     });

//     it("Can't delete an item if it user doesn't match ownerId", async() => {
//         const item = {itemName: "Kayak", itemStatus: "rented",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await admin.collection("rentalItems").doc(itemId).set(item);

//         await firebase.assertFails(db.collection("rentalItems").doc(itemId).delete());
//     });

//     it("Can delete an item if has a status of available and uid matches ownerId", async() => {
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await db.collection("rentalItems").doc(itemId).set(item);

//         await firebase.assertSucceeds(db.collection("rentalItems").doc(itemId).delete());
//     });

//     it("Can delete an item if it does have a status of draft and uid matches ownerId", async() => {
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await db.collection("rentalItems").doc(itemId).set(item);

//         await firebase.assertSucceeds(db.collection("rentalItems").doc(itemId).delete());
//     });

//     it("Can't write a user item if not logged in as that item's owner", async() => {
//         const testItem = db.collection("rentalItems");
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: theirId};
//         await firebase.assertFails(testItem.add(item));
//     });

//     // const REQUIRED_FIELDS = ["itemName", "itemStatus", "itemDesc", "costHourly", "ownerId"];
//     //
//     // const OPTIONAL_FIELDS = ["deliveryAvailable", "deliveryCost", "meetupAvailable",
//     //     "meetupCost", "pickupAvailable", "pickupCost"];
//     it( "Can write an item with all authorized fields", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId, deliveryAvailable: true,
//             deliveryCost: 500, meetupAvailable: false, meetupCost: 200, pickupAvailable: true,
//             pickupCost: 0};
//         await firebase.assertSucceeds(testItem.set(item));
//     });

//     it("Can't write an item that has any unauthorized fields", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId,
//             not_allowed: true};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("A new item can be created with the correct data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId, deliveryAvailable: true,
//             deliveryCost: 500, meetupAvailable: false, meetupCost: 200, pickupAvailable: true,
//             pickupCost: 0};
//         await firebase.assertSucceeds(testItem.set(item));
//     });

//     it("Requires itemName to be string data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: true, itemStatus: "available",
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires itemStatus to be string data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: false,
//             itemDesc: "8 foot river kayak", costHourly: 400, ownerId: myId};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires itemDesc to be string data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: 800, costHourly: 400, ownerId: myId};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires costHourly to be integer data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "this is a description", costHourly: "four hundred", ownerId: myId};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires deliveryCost to be integer data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "this is a description", costHourly: 400, ownerId: myId, deliveryCost: true};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires meetupCost to be integer data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "this is a description", costHourly: 400, ownerId: myId, meetupCost: null};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires pickupCost to be integer data types", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "this is a description", costHourly: 400, ownerId: myId, pickupCost: "nothing"};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires deliveryAvailable to be a boolean data type", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "this is a description", costHourly: 400, ownerId: myId, deliveryAvailable: "true"};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires meetupAvailable to be a boolean data type", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "this is a description", costHourly: 400, ownerId: myId, meetupAvailable: 400};
//         await firebase.assertFails(testItem.set(item));
//     });

//     it("Requires pickupAvailable to be a boolean data type", async() => {
//         const testItem = db.collection("rentalItems").doc(itemId);
//         const item = {itemName: "Kayak", itemStatus: "available",
//             itemDesc: "this is a description", costHourly: 400, ownerId: myId, pickupAvailable: null};
//         await firebase.assertFails(testItem.set(item));
//     });

//     //photos tests see storage_rules.test.js

//     it("Can write a tag to an item's tag collection if logged in as an item's owner"); //, async() => {
//     //     const testColl = db.collection("rentalItems").doc(myId).collection("tags");
//     //     const address = {addressType: "Delivery", streetAddress: "111 Pennsylvania Ave",
//     //         city: "Zeeland", st: "MI", zip: "49464"};
//     //     await firebase.assertSucceeds(testColl.add(address));
//     // });

//     it("Can't write a tag to an item's tag collection if logged in as a different user than item ownerId");

// });

// describe ('Mooch App user renting an item', () => {
//     // const REQUIRED_FIELDS = ["borrowerId", "ownerId", "itemId", "transportType",
//     // "reserveBeginDateTime", "reserveEndDateTime"];
//     // const OPTIONAL_FIELDS = ["cancellationDateTime", "checkoutDateTime", "returnedDateTime"];
//     // SYSTEM_UPDATED_FIELDS = ["transportCost", "rentalCost", "totalCost", "rentalStatus"];

//     const itemId = "item_123";
//     const transId = "transaction_123";
//     const sampBegDaTime = firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 10));
//     const sampEndDaTime = firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 15));

//     it("Can create a rentalTransaction with the same borrowerID as our user", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };

//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertSucceeds(testDoc.set(transaction));
//     });

//     it("Can't create a rentalTransaction with a different borrowerID as our user", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: myId,
//             borrowerId: theirId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const setDoc = db.collection("rentalTransactions").doc(transId);

//         await firebase.assertFails(setDoc.set(transaction));
//     });

//     it("Can update a rentalTransaction with the same ownerID as our user", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: myId,
//             borrowerId: theirId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         await theirDB.collection("rentalTransactions").doc(transId)
//         .set(transaction);

//         const updateDoc = await db.doc(`rentalTransactions/${transId}`);

//         await firebase.assertSucceeds(updateDoc.set({returnedDateTime: sampEndDaTime}));
//     });

//     it("Can update a rentalTransaction with the same borrowerId as our user", async() => {

//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "delivery",
//         };
//         await admin.collection("rentalTransactions").doc(transId).set(transaction);

//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertSucceeds(testDoc.set({returnedDateTime: sampEndDaTime}));
//     });

//     it("Can't update a rentalTransaction with a different ownerID and borrowerID as our user", async() => {

//         const transaction = {
//             itemId: itemId,
//             ownerId: "other_id",
//             borrowerId: theirId,
//             transportType: "delivery",
//         };
//         await theirDB.collection("rentalTransactions").doc(transId).set(transaction);

//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(testDoc.set({returnedDateTime: sampEndDaTime}));
//     });


//     it("Can read a rentalTransaction with the same borrowerID as our user", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await testDoc.set(transaction);
//         await firebase.assertSucceeds(testDoc.get());
//     });

//     it("Can't read a rentalTransaction with a different ownerID and borrowerID as our user", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: "testId_789",
//             borrowerId: theirId,
//             transportType: "delivery",
//         };

//         const testDoc = admin.collection("rentalTransactions").doc(transId);
//         await testDoc.set(transaction);

//         const readDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(readDoc.get());
//     });


//     it("Can update only the cancellationDate, checkoutDateTime, and returnedDateTime fields of a rentalTransaction", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: "testId_789",
//             borrowerId: theirId,
//             transportType: "delivery",
//         };
//         const sampCancDate = firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 11));
//         const sampRetDate = firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 14));
//         const sampCheckDate = firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 12));


//         const testDoc = admin.collection("rentalTransactions").doc(transId);
//         await testDoc.set(transaction);

//         const transactionUpdate = {cancellationDateTime: sampCancDate, checkoutDateTime: sampCheckDate, returnedDateTime: sampRetDate}

//         console.log(transaction);
//         console.log(transactionUpdate);

//         await firebase.assertFails(db
//             .collection("rentalTransactions").doc(transId)
//             .set(transactionUpdate), {merge: true});
//     });

//     it("Can't update only the cancellationDate, checkoutDateTime, and returnedDateTime fields of a rentalTransaction", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: "testId_789",
//             borrowerId: theirId,
//             transportType: "delivery",
//         };

//         const testDoc = admin.collection("rentalTransactions").doc(transId);
//         await testDoc.set(transaction);

//         const sampCancDate = firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 11));
//         const transactionUpdate = {not_allowed: sampCancDate};

//         await firebase.assertFails(db
//             .collection("rentalTransactions").doc(transId)
//             .set(transactionUpdate));
//     });

//     it("Can't delete a rentalTransaction", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await testDoc.set(transaction);
//         await firebase.assertFails(testDoc.delete());
//     });

//     it("Can write a rentalTransaction with all of the required fields", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertSucceeds(testDoc.set(transaction));
//     });

//     it("Can't write a rentalTransaction with any unauthorized field", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//             not_allowed: "this should not pass"
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(testDoc.set(transaction));
//     });

//     it( "Can create a rentalTransaction if the transportType is delivery", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "delivery",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertSucceeds(testDoc.set(transaction));
//     });

//     it( "Can create a rentalTransaction if the transportType is meetup", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "meetup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertSucceeds(testDoc.set(transaction));
//     });

//     it( "Can create a rentalTransaction if the transportType is pickup", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertSucceeds(testDoc.set(transaction));
//     });

//     it( "Can't create a rentalTransaction if the transportType is something other than delivery, meetup, or pickup", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "something else",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(testDoc.set(transaction));
//     });

//     it("Requires the ownerId to be a string data type", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertSucceeds(testDoc.set(transaction));
//     });

//     it("Requires the itemId to be a string data type", async() => {
//         const transaction = {
//             itemId: 5000,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(testDoc.set(transaction));
//     });

//     it("Requires the borrowerId to be a string data type", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: true,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(testDoc.set(transaction));
//     });

//     it("Requires the reserveBeginDateTime to be a Timestamp data type", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: true,
//             transportType: "pickup",
//             reserveBeginDateTime: "Dec 12, 2015",
//             reserveEndDateTime: sampEndDaTime,
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(testDoc.set(transaction));
//     });

//     it("Requires the reserveEndDateTime to be a Timestamp data type", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: true,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: "Dec 12, 2015",
//         };
//         const testDoc = db.collection("rentalTransactions").doc(transId);
//         await firebase.assertFails(testDoc.set(transaction));
//     });

//     it("Requires the cancellationDateTime to be a Timestamp data type", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: myId,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: "Dec 12, 2015",
//         };

//         const transactionUpdate = {
//             cancellationDateTime: "firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 11))"
//         }

//         const testDoc = db.collection("rentalTransactions").doc(transId)
//         await testDoc.set(transaction);
//         await firebase.assertFails(testDoc.set(transactionUpdate));
//     });

//     it("Requires the reserveEndDateTime to be a Timestamp data type", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: true,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: "Dec 12, 2015",
//         };
//         const transactionUpdate = {
//             checkoutDateTime: "firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 11))"
//         }

//         const testDoc = db.collection("rentalTransactions").doc(transId)
//         await testDoc.set(transaction);
//         await firebase.assertFails(testDoc.set(transactionUpdate));
//     });

//     it("Requires the reserveEndDateTime to be a Timestamp data type", async() => {
//         const transaction = {
//             itemId: itemId,
//             ownerId: theirId,
//             borrowerId: true,
//             transportType: "pickup",
//             reserveBeginDateTime: sampBegDaTime,
//             reserveEndDateTime: "Dec 12, 2015",
//         };
//         const transactionUpdate = {
//             returnedDateTime: "firebase.firestore.Timestamp.fromDate(new Date(2021, 3, 11))"
//         }

//         const testDoc = db.collection("rentalTransactions").doc(transId)
//         await testDoc.set(transaction);
//         await firebase.assertFails(testDoc.set(transactionUpdate));
//     });





// });

