import {db} from '../utils/firebase';
import {AddReservation, deleteMyReservation, getItemFromDB} from './firebaseFunctions';
import { hoursTimeDifference } from './rentalFunctions';

export const cleanupReservations = async () => {

    console.log('running cleanup reservations');
    let reservationList = [];


        const query = db.collection('reservations');

        console.log(query);

        const unsubscribe = await query.get().then((querySnapshot) => {
            console.log("queried")
            querySnapshot.forEach((doc) => {
                const entry = {"id": doc.id, ...doc.data()};
                reservationList.push(entry);
                console.log(entry.id + 'retrieved');
            });
        })
        .catch((error) => {
            //TODO - security, do not publish error details to console
            console.log("Error getting documents:" + error);
        });

        unsubscribe();

        console.log('reservationList length: ', reservationList.length);

        //for (let entry in reservationList) {

            // const reservation = reservationList[entry];
            const reservation = reservationList[0];
            console.log('date conversion entry' + reservation);

            if (reservation.exchangeMethod) {
                reservation.exchangeOptions = reservation.exchangeMethod;
                console.log('updated exchangeMethod to exchangeOptions');
            }

            if (reservation.rentalItemId && (!reservation.itemDesc || !reservation.costHourly)) {
                const item = await getItemFromDB(reservation.rentalItemId);
                reservation.itemDesc = item.itemDesc;
                reservation.costHourly = item.costHourly;
                console.log('updated itemDesc and/or costHourly');
            }

            if (reservation.startDateTime) {
                console.log('converting start date');
                reservation.startDateTime = new Date(reservation.startDateTime.seconds * 1000);
            }

            if (reservation.endDateTime) {
                reservation.endDateTime = new Date(reservation.endDateTime.seconds * 1000);
            }

            if (!reservation.exchangeCost || !reservation.selectedExchangeMethod) {
                const options = ['delivery', 'pickup', 'meetup'];
                reservation.selectedExchangeMethod = options(Math.floor(Math.random()*3));
                reservation.exchangeCost = reservation.exchangeOptions[reservation.selectedExchangeMethod];
                console.log('updated selectedExchangeMethod and exchangeCost');
                
            }

            if (reservation.costHourly && reservation.startDateTime && reservation.endDateTime 
                && reservation.rentalCost && reservation.totalCost && reservation.exchangeCost) {
                    const calcRentalCost = reservation.costHourly * hoursTimeDifference(reservation.startDateTime, reservation.endDateTime)

                    if (calcRentalCost !== reservation.rentalCost) {
                        reservation.rentalCost = calcRentalCost;
                        console.log('updating rental Cost');
                    }

                    const calcTotalCost = reservation.rentalCost + reservation.exchangeCost;

                    if (calcTotalCost !== reservation.totalCost) {reservation.totalCost = calcTotalCost}
                }

            

        try {    

            const hasAllNeededFields = reservation.ownerId &&
                reservation.lenderId &&
                reservation.rentalItemId &&
                reservation.itemName &&
                reservation.costHourly && 
                reservation.startDateTime && 
                reservation.endDateTime &&
                reservation.exchangeCost &&
                reservation.rentalCost &&
                reservation.totalCost &&
                reservation.itemDesc &&
                reservation.selectedExchangeMethod &&
                reservation.exchangeOptions;

            if (hasAllNeededFields && reservation.id) {
                console.log('updating reservation in fb');
                const addReturn = await AddReservation(reservation);
                // delete any fields not in hasAllNeededFields
                let deleteCost, deleteMethod;
                const docRef = db.collection('reservations').doc(reservation.id);
                if (reservation.deliveryCost ) {
                    await docRef.update({
                        deliveryCost: firebase.firestore.FieldValue.delete()
                    })
                }
                if (reservation.exchangeMethod) {
                    await docRef.update({
                        exchangeMethod: firebase.firestore.FieldValue.delete()
                    })
                }

                if (addReturn && deleteCost && deleteMethod) {console.log('update successful')}

            } else {
                console.log('deleting reservation in fb');

                //Delete document that lacks fields
                deleteMyReservation(reservation.id);
            }
        //}
        } catch (error) {
            console.log('failed');
        }

}
