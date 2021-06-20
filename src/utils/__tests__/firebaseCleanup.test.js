import {cleanupReservations} from '../firebaseCleanup';

test.skip('cleanup firebaseData', async () => {
    await cleanupReservations();
}, 20000);
