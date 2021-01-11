import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAl3I4nzah2U5zMqf6wYazu6zPo3mN_Eq8",
    authDomain: "react-ecommerce-absulit.firebaseapp.com",
    projectId: "react-ecommerce-absulit",
    storageBucket: "react-ecommerce-absulit.appspot.com",
    messagingSenderId: "314823344508",
    appId: "1:314823344508:web:19f6df154f112db2e064f9",
    measurementId: "G-LBVHCYL02Q"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    const collectionShapshot = await collectionRef.get();
    console.log({ collection: collectionShapshot.docs.map(doc => doc.data()) });

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set(
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                }
            );
        } catch (error) {
            console.log('error creating user', error.message);
        }

    }
    return userRef;

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        console.log('---- addCollectionAndDocuments, newDocRef', newDocRef)
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
