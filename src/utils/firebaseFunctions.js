import firebase, {db} from './firebase';

export const AddRentalItem = async(title, description, itemRate) => {
    await firebase
                .firestore()
                .collection('rentalItems')
                .add({
                    itemName: title, itemDesc: description, costHourly: itemRate
                })
                .then((docRef) => {
                    console.log("success writing document:", docRef.id);
                    return docRef.id;
                })
                .catch((error) => {
                    console.error(error);
                });
}

export const GetRentalItems = async() => {

    //TODO - need unsubscribe

    const rentalItems = db.collection("rentalItems").limit(24);

    let rentalItemsList = [];
    const unsubscribe = await rentalItems.get().then((querySnapshot) => {
        // console.log("queried")
        querySnapshot.forEach((doc) => {
            const entry = {"id": doc.id, ...doc.data()};
            // console.log(`entry: ${entry.id}`);
            rentalItemsList.push(entry);
        });
    })
    .catch((error) => {
        //TODO - security, do not publish error details to console
        console.error("Error getting documents:" + error);
    });

    return { unsubscribe, rentalItemsList };


    // return {unsubscribe, rentalItemsList};
}

export const getItemFromDB = (itemId) => {
    const item = db.collection('rentalItems').doc(itemId);

    return item.get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            console.log('no such document exists');
            return null;
        }
    }).catch((error) => {
        console.error("Error getting document", error);
    });
}


export const AddReservation = async(reservation) => {
    await firebase
                .firestore()
                .collection('reservations')
                .add({
                    startDateTime: reservation.startDateTime, 
                    endDateTime: reservation.endDateTime,
                    exchangeMethod: reservation.exchangeMethod, 
                    totalCost: reservation.totalCost,
                    deliveryCost: reservation.deliveryCost,
                    rentalCost: reservation.rentalCost
                })
                .then((docRef) => {
                    console.log("success writing document:", docRef.id);
                    return docRef.id;
                })
                .catch((error) => {
                    console.error(error);
                });
}