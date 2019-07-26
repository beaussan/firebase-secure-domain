import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onUserCreated = functions.auth.user().onCreate(async (user: admin.auth.UserRecord) => {
    if (!`${user.email}`.endsWith('@awesome.co')) {
        await admin.auth().deleteUser(user.uid);
        return;
    }
    await admin.firestore().doc(`allowed/${user.uid}`).set({ allowed: true });
})
