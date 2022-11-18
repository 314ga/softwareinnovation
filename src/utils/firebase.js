import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";

const app = firebase.initializeApp({
  projectId: "demo-smart-charger-socket",
  appId: "demo",
  apiKey: "demo",
});
export const auth = getAuth(app);
export const firestore = firebase.firestore();

export const initFirebase = () => {
  /* eslint-disable-next-line no-restricted-globals */
  if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099/", {
      disableWarnings: true,
    });
  }
};
