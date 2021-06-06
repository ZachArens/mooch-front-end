import firebase, {db, auth} from './firebase';

export const AddRentalItem = async(ownerId, title, description, itemRate, exchangeOptions) => {
    // console.log("add item to db: " + exchangeOptions.delivery);
    
    await firebase
                .firestore()
                .collection('rentalItems')
                .add({
                    ownerId: ownerId,
                    itemName: title, 
                    itemDesc: description, 
                    costHourly: itemRate,
                    exchangeOptions: {
                        delivery: exchangeOptions.delivery,
                        meetup: exchangeOptions.meetup,
                        pickup: exchangeOptions.pickup
                    }
                })
                .then((docRef) => {
                    console.log("success writing document:", docRef.id);
                    return docRef.id;
                })
                .catch((error) => {
                    console.error(error);
                });
}

//TODO - need to remove unsubscribe from a firebase get - it does not need to be closed.
export const GetRentalItems = async(userId) => {

    let rentalItems;
    //TODO - need unsubscribe
    if (!userId) {
        rentalItems = db.collection("rentalItems").limit(24);
    } else if (userId) {
        rentalItems = db.collection("rentalItems").where('ownerId', '==', userId).limit(24);
    }

    // const rentalItems = db.collection("rentalItems").limit(24);

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
        console.log("Error getting documents:" + error);
        // return { () => {}, [] };
    });


    return [ unsubscribe, rentalItemsList ];


}

export const getItemFromDB = (itemId) => {
    if (itemId.length < 1) {
        return null;
    }
    const item = db.collection('rentalItems').doc(itemId);

    return item.get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            console.log('no such document exists');
            return null;
        }
    }).catch((error) => {
        console.log("Error getting document", error);
    });
}


export const AddReservation = async(reservation) => {
    await firebase
                .firestore()
                .collection('reservations')
                .add({
                    itemName: reservation.itemName, 
                    startDateTime: reservation.startDateTime, 
                    endDateTime: reservation.endDateTime,
                    exchangeMethod: reservation.exchangeMethod, 
                    totalCost: reservation.totalCost,
                    deliveryCost: reservation.deliveryCost,
                    rentalCost: reservation.rentalCost,
                    renterId: reservation.renterId,
                    rentalItemId: reservation.rentalItemId,
                    ownerId: reservation.ownerId
                })
                .then((docRef) => {
                    console.log("success writing document:", docRef.id);
                    return docRef.id;
                })
                .catch((error) => {
                    console.error(error);
                });
}

export const getMyReservations = async (userId) => {
    if (userId.length < 1) {
        return null;
    }

    let reservationList = [];

    console.log('received reservationList: '+ reservationList);

    const query = db.collection('reservations').where('lenderId', '==', userId);

    const unsubscribe = await query.get().then((querySnapshot) => {
        // console.log("queried")
        querySnapshot.forEach((doc) => {
            const entry = {"id": doc.id, ...doc.data()};
            console.log(`entry: ${entry.startDateTime}`);
            reservationList.push(entry);
        });
    })
    .catch((error) => {
        //TODO - security, do not publish error details to console
        console.log("Error getting documents:" + error);
    });

    const notes = {

    
    // const observer = await query.onSnapshot(querySnapshot => {
    //     querySnapshot.docChanges().forEach(change => {
    //         console.log('change');
    //         console.log(change.doc.id);
    //         console.log(change.type);
    //         if (change.type === 'added') {
    //           console.log('New city: ', change.doc.data());
    //           const entry = {"id": change.doc.id, ...change.doc.data()};
    //           reservationList.push(entry);
    //         }
    //         if (change.type === 'modified') {
    //           console.log('Modified city: ', change.doc.data());
    //           const entry = {"id": change.doc.id, ...change.doc.data()};
    //           const index = reservationList.findIndex(res => res.id === change.doc.id)
    //           reservationList[index] = entry;
    //         }
    //         if (change.type === 'removed') {
    //           console.log('Removed city: ', change.doc.data());
    //           const entry = {"id": change.doc.id, ...change.doc.data()};
    //           const index = reservationList.findIndex(res => res.id === change.doc.id)
    //           reservationList[index] = entry;
    //           reservationList.splice(index, 1);
    //         }
    //       })

    // }, err => {
    //     console.log(`Encountered error: ${err}`);
    // });
    }

    for (let entry in reservationList) {

        const reservation = reservationList[entry];
        console.log('date conversion entry' + reservation);


        if (reservation.startDateTime) {
            console.log('converting start date');
            reservation.startDateTime = new Date(reservation.startDateTime.seconds * 1000);
        }

        if (reservation.endDateTime) {
            reservation.endDateTime = new Date(reservation.endDateTime.seconds * 1000);
        }
    }

    return [unsubscribe, reservationList];

}



export const loginWithEmailAndPass = async (email, password) => {
    //https://firebase.google.com/docs/auth/web/password-auth
    return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        //Signed in
        console.log(`logged in as ${userCredential.user.displayName} - ${userCredential.user.uid}`);

        return userCredential.user.uid;
    })
    .catch((error) => {
        this.setState({
            errMsg: error.message
        });
        console.log(error.message);
    });
};

export const createUserWithEmailandPass = (email, password) => {
    let user = null;
    //create user in firebase.auth
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user.uid;
        })
        .catch((error) => {
            return error.message;
        });
}

export const getCurrentUserId = () => {
    let user = firebase.auth().currentUser;

    if (user) {
        return user.uid;
    } else {
        return null;
    }
}

export const addUserDetails = async (userDetails) => {
    await firebase
    .firestore()
    .collection('userProfiles').doc(userDetails.uid)
    .set({
        fullName: userDetails.fullName, 
        streetAddress: userDetails.streetAddress,
        city: userDetails.city, 
        st: userDetails.st,
        zip: userDetails.zip, 
        phone: userDetails.phone,
    })
    .catch((error) => {
        console.error(error);
    });

}