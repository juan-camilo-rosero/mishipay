import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "mishipayuwu.firebaseapp.com",
  projectId: "mishipayuwu",
  storageBucket: "mishipayuwu.appspot.com",
  messagingSenderId: "512700283845",
  appId: "1:512700283845:web:debc82dc76ec69dfc4e9ac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

auth.useDeviceLanguage()