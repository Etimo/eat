import * as firebaseAdmin from 'firebase-admin/app';
import * as firebaseStore from 'firebase-admin/firestore';

const serviceKeyPath = 'etimo-activity-tracker-firebase-admin.json';

const initFireBaseDb = () : firebaseStore.Firestore => {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.cert(serviceKeyPath),
        databaseURL: 'https://etimo-activity-tracker.firebaseio.com',
      });
      
      return firebaseStore.getFirestore();
}
export const db = initFireBaseDb();
