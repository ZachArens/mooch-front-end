import firebase from './firebase';

export const AddRentalItem = async(title, description, itemRate) => {
    await firebase
                .firestore()
                .collection('rentalItems')
                .add({
                    itemName: title, itemDesc: description, costHourly: itemRate
                })
                .then((docRef) => {
                    console.log("success writing document:", docRef.id);
                    return({title: "", description: "", itemRate: "", message: "success"});
                })
                .catch((error) => {
                    return({message: "fbIssue"})
                });
}

export const GetRentalItems = async() => {

    //TODO - need unsubscribe

    const rentalItems = firebase.firestore().collection("rentalItems").limit(24);

    let rentalItemsList = [];
    rentalItems.get().then((querySnapshot) => {
        console.log("queried")
        const snapshot = querySnapshot.forEach((doc) => {
            const entry = {"id": doc.id, ...doc.data()};
            console.log(`entry: ${entry}`);
            rentalItemsList.push(entry);
            // console.log(rentalItemsList);
        });
    }).then(()=> {
        return rentalItemsList;
    })
    .catch((error) => {
        //TODO - security, do not publish error details to console
        console.error("Error getting documents:" + error);
    });
}