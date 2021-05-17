import firebase from '../utils/firebase';
import { AddRentalItem, GetRentalItems} from '../utils/firebaseFunctions';
import faker from 'faker';

describe('AddRentalItem Fn', () => {
    test('adds an item to the rentalItemsCollection', async() => {
        const addData = () => {
            try {
                let title = faker.commerce.productName
                // const item = {
                //     title: faker.commerce.productName(),
                //     description: faker.commerce.productDescription(),
                //     itemRate: faker.commerce.price(0, 10000, 2, "")
                // };

                const item = {
                    title: "Stand Up Board",
                    description: "Here's a full description of the stand up board.",
                    itemRate: 10
                };
                // console.log(item);

                let updatedState = AddRentalItem(item.title, item.description, item.itemRate);

                // console.log(updatedState);

                expect(updatedState.message).toBe("success");
                
                let count;

                firebase.collection('rentalItems').where("title", "===", item.title)
                .get()
                .then((querySnapshot) => {
                    count = querySnapshot.count;
                }).catch((err) => {
                    // console.error(err)
                });
                
                expect(count).toBe(1);
            } catch (error) {
                console.error(error);
                expect(error).toBeFalsy();
                
            }
            
        }

        addData();
        
    });
});

describe('GetRentalItems', () => {
    test('retrieves items from the rentalItems collection', async() => {
        const retrieveData = async() => {
            try {
                // const item = {
                //     title: faker.commerce.productName(),
                //     description: faker.commerce.productDescription(),
                //     itemRate: faker.commerce.price(0, 10000, 2, "")
                // };

                const item = {
                    title: "Stand Up Board",
                    description: "Here's a full description of the stand up board.",
                    itemRate: 10
                };

                let itemID = await firebase.firestore().collection('rentalItems')
                .add({
                    itemName: title, itemDesc: description, costHourly: itemRate
                }).then((docRef) => {
                    return docRef.id;
                }).catch((error) => {
                    console.error(error);
                });

                // console.log(itemID);

                let rentalItemsList = GetRentalItems();

                expect(rentalItemsList).toContain(itemID);
            } catch(error) {
                expect(error).toBeFalsy();
                // console.error(error);
            } 
        }

        retrieveData();
    });
});