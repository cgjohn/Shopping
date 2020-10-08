import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBeLbprXpg61SPlg_9MnZA6_JiR7JH8bmU",
  authDomain: "groceries-3a7de.firebaseapp.com",
  databaseURL: "https://groceries-3a7de.firebaseio.com",
  projectId: "groceries-3a7de",
  storageBucket: "groceries-3a7de.appspot.com",
  messagingSenderId: "87369438966",
  appId: "1:87369438966:web:a865fdc3d0679ce6a17ed7",
  measurementId: "G-CY250ZQJGX"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = db.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating a user", error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => {
  auth.signOut();
};

export default firebase;
