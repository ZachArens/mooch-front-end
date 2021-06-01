// import {db} from '../utils/firebase';
import { AddRentalItem, AddReservation, getItemFromDB, GetRentalItems } from '../firebaseFunctions';
import faker from 'faker';
// import { mockGoogleCloudFirestore } from 'firestore-jest-mock';


test.todo('this file still needs a test');

// mockGoogleCloudFirestore({
//     database: {
//       users: [
//         { id: 'abc123', name: 'Homer Simpson' },
//         { id: 'abc456', name: 'Lisa Simpson' },
//       ],
//       posts: [{ id: '123abc', title: 'Really cool title' }],
//     },
//   });

// import {mockCollection} from 'firestore-jest-mock/mocks/firestore';
// import { Firestore } from '@google-cloud/firestore';
// console.error = jest.fn();

// const db = Firestore;

// test('testing stuff', () => {
  
// //   const firestore = new Firestore();

//   return firestore
//     .collection('users')
//     .get()
//     .then(userDocs => {
//       expect(mockCollection).toHaveBeenCalledWith('users');
//       expect(userDocs[0].name).toEqual('Homer Simpson');
//     });
// });

// describe('AddRentalItem Fn', () => {
//     const item = {
//                 title: faker.commerce.productName(),
//                 description: faker.commerce.productDescription(),
//                 itemRate: faker.commerce.price(0, 10000, 2, "")
//             };

//     // test('the function completes callback', async(done) => {
//     //     let itemId = null;

//     //     function callback(data) {
//     //         try {
//     //             console.log(item);

//     //             let itemId = AddRentalItem(item.title, item.description, item.itemRate);

//     //             console.log("itemId: " + itemId);
//     //             done();

//     //         } catch (error) {
//     //             console.error(error);
//     //             done(error);
//     //         }
//     //     }
        
        
//     // });

//     test('the function completes callback', async() => {
//         let itemId = await AddRentalItem(item.title, item.description, item.itemRate);

//         expect(itemId).success.toMatch(/[a-zA-Z0-9]{20}/g);

//         let itemDetails = await db.collection('rentalItems').doc(itemId).get()
//         .then((doc) => {
//             if (doc.exists) {
//                 return doc.data();
//             } else {
//                 console.log('no such document exists');
//                 return null;
//             }
//         }).catch((error) => {
//             console.error("Error getting test document", error);
//         });
//         expect(itemDetails).success.toEqual(item);
        
//     });
// });

// // describe('GetRentalItems', () => {

// //     const items = [{
// //         title: "Stand Up Board",
// //         description: "Here's a full description of the stand up board.",
// //         itemRate: 10
// //     },
// //     {
// //         title: "Kayak",
// //         description: "Here's a full description of the stand up kayak.",
// //         itemRate: 17
// //     },
// //     {
// //         title: "Backpack 40L",
// //         description: "Here's a full description of the backpack.",
// //         itemRate: 5
// //     },{
// //         title: "Tent",
// //         description: "Here's a full description of the tent.",
// //         itemRate: 50
// //     }];

// //     const addItemsToFB = async(items) => {
// //         let itemIds = [];
// //         let dbCollection = db.collection('rentalItems');
// //         for (let i = 0; i < items.length; i++) {
// //             await dbCollection.add(items[i]).then((docRef) => {
// //                 itemIds.push(docRef.id);
// //                 console.log("Document written with ID: ", docRef.id);
// //             })
// //             .catch((error) => {
// //                 console.error("Error adding document: ", error);
// //             });
// //         }

// //         return itemIds;
// //     }


// //     test('retrieves items from the rentalItems collection', async() => {

// //         // await addItemsToFB(items);
        
// //         const { unsubscribe, rentalItemsList } = await GetRentalItems();

// //         console.log(rentalItemsList);
// //         unsubscribe;
        



        
// //         // const retrieveData = async() => {
// //         //     try {
// //         //         // const item = {
// //         //         //     title: faker.commerce.productName(),
// //         //         //     description: faker.commerce.productDescription(),
// //         //         //     itemRate: faker.commerce.price(0, 10000, 2, "")
// //         //         // };

                

// //         //         let itemID = await firebase.firestore().collection('rentalItems')
// //         //         .add({
// //         //             itemName: title, itemDesc: description, costHourly: itemRate
// //         //         }).then((docRef) => {
// //         //             return docRef.id;
// //         //         }).catch((error) => {
// //         //             console.error(error);
// //         //         });

// //         //         // console.log(itemID);

// //         //         let rentalItemsList = GetRentalItems();

// //         //         expect(rentalItemsList).toContain(itemID);
// //         //     } catch(error) {
// //         //         expect(error).toBeFalsy();
// //         //         // console.error(error);
// //         //     } 
// //         // }

// //         // retrieveData();
// //     });
// // });

// // describe('getItemFromDB', () => {
// //     const item = {
// //                         title: faker.commerce.productName(),
// //                         description: faker.commerce.productDescription(),
// //                         itemRate: faker.commerce.price(0, 10000, 2, "")
// //                     };
// //     let addItem = (item) => {db.collection("rentalItems").add({
// //                 itemName: item.title, itemDesc: item.description, costHourly: item.itemRate
// //             }).then((docRef) => {
// //                 console.log(docRef.id);
// //                 return docRef.id;
// //             }).then(() => {
// //                 console.log('item added successfully');
// //             }).catch((error) => {
// //                 console.error('item add error', error);
// //             });
// //     }

// //     test('retrieves an object from firebase that contains all the item details', () => {
        
// //         const itemId = addItem(item);
        
// //         let itemDetails = null;
// //         console.log("item id: " + itemId);
        

// //         itemDetails = getItemFromDB(itemID).catch((error) => {
// //             console.log(
// //                 'error in retrieving document'
// //             );
// //         });
        
// //          console.log(itemDetails);

// //         expect(itemDetails.title).toBe(item.title);
// //         expect(itemDetails.description).toBe(item.description);
// //         expect(itemDetails.itemRate).toBe(item.itemRate);
        
// //     });
// // });

// describe('AddReservation to Firebase', () => {
//     test('adds a reservation to firebase and returns a reservation id', async () => {
//         let start = new Date(2021, 0, 17);
//         let end = new Date(2021, 0, 19);
//         const reservation = {
//             startDateTime: start, 
//             endDateTime: end, 
//             exchangeMethod: "meetup",
//             totalCost: 25,
//             deliveryCost: 5, 
//             rentalCost: 20
//         }
        
//         const reservationId = await AddReservation(reservation);

//         expect(reservationId).resolves.toMatch(/[a-zA-Z0-9]{20}/g);

//         expect(console.error).rejects.toHaveBeenCalled();


//     });
// })