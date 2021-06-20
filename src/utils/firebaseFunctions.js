import firebase, {db, storage, auth} from './firebase';
import { v4 as uuid } from 'uuid';

export const AddRentalItem = async(title, description, itemRate, exchangeOptions) => {
    // console.log("add item to db: " + exchangeOptions.delivery);
    
    await firebase
                .firestore()
                .collection('rentalItems')
                .add({
                    itemName: title, 
                    itemDesc: description, 
                    costHourly: itemRate,
                    exchangeOptions: {
                        delivery: exchangeOptions.delivery,
                        meetup: exchangeOptions.meetup,
                        pickup: exchangeOptions.pickup
                    },
                    photos: [...photos]
                })
                // .then((docRef) => {
                //     console.log("success writing document:", docRef.id);
                //     return docRef.id;
                // })fd
                .catch((error) => {
                    console.error(error);
                });
}

export const addPhotosToFB = async (currentUser, file, updatePhotoState) => {
    const fbImages = storage.ref(currentUser);
        
    console.log('process file ', file);
    const id = uuid();
    // let photosInStorage = [];
    try {                    
        //https://firebase.google.com/docs/storage/web/upload-files

        var uploadTask = fbImages.child(id).put(file);

        uploadTask.on('state_changed',
                (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, (error) => {
                console.log('photo upload unsuccessful: ', error.message);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('url of imageUpload: ', downloadURL);
                    const photoEntry = ({id: id, url: downloadURL});
                    updatePhotoState(photoEntry);
                    // photosInStorage.push(photoEntry);
                })
            });
    } catch (e) {
        console.log('error', e);
    }
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


    // return {unsubscribe, rentalItemsList};
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
                    startDateTime: reservation.startDateTime, 
                    endDateTime: reservation.endDateTime,
                    selectedExchangeMethod: reservation.selectedExchangeMethod,
                    exchangeOptions: reservation.exchangeOptions, 
                    totalCost: reservation.totalCost,
                    exchangeCost: reservation.exchangeCost,
                    costHourly: reservation.unitCost,
                    rentalCost: reservation.rentalCost,
                    ownerId: reservation.ownerId,
                    rentalItemId: reservation.rentalItemId
                })
                .then((docRef) => {
                    console.log(docRef);
                    console.log("success writing document:");
                    return null;//docRef.id;
                })
                .catch((error) => {
                    console.error(error);
                });
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
            this.setState({errMsg: error.message});
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