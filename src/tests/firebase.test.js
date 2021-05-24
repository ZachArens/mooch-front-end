import firebase, {db} from '../utils/firebase';

// afterAll( async() => {

//     await db.collection('test').doc('12345').delete();
// });

test('firebase has a connection', async() => {
    const id = "12345";
    const testData = {testItem: "this is a test"};
    
    await db.collection('test').doc(id).set(testData);
    const docRef = db.collection('test').doc(id);
    const docData = await docRef.get().then((doc) => {
        return doc.data();
    })
    .catch((error) => {
        console.error(error)
    });
    console.log(docData);
    expect(docData).toEqual(testData);

}, 20000);