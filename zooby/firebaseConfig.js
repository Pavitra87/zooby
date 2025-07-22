// import { initializeApp, getApps, getApp } from 'firebase/app';
// import {
//   initializeAuth,
//   getAuth,
//   getReactNativePersistence,
// } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBCHxGVeX192N8anPKbpp1ox5T7XS0B1ww",
//   authDomain: "zooby-app-6b2e6.firebaseapp.com",
//   projectId: "zooby-app-6b2e6",
//   storageBucket: "zooby-app-6b2e6.appspot.com",
//   messagingSenderId: "354452657995",
//   appId: "1:354452657995:web:e4d06ac278e0cc21347ace",
//   measurementId: "G-1D91HRNHP3"
// };

// // Initialize Firebase App only once
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // Initialize Auth only once
// let auth;
// try {
//   auth = getAuth(app);
// } catch (error) {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
//   });
// }

// // Initialize Firestore
// const db = getFirestore(app);

// export { app, auth, db };

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCHxGVeX192N8anPKbpp1ox5T7XS0B1ww",
  authDomain: "zooby-app-6b2e6.firebaseapp.com",
  projectId: "zooby-app-6b2e6",
  storageBucket: "zooby-app-6b2e6.appspot.com",
  messagingSenderId: "354452657995",
  appId: "1:354452657995:web:e4d06ac278e0cc21347ace",
  measurementId: "G-1D91HRNHP3"
};

// Only initialize Firebase app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Check if auth is already initialized
let auth;
try {
  auth = getAuth(app);
} catch (e) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { auth, db };

