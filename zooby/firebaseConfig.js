// import { initializeApp } from 'firebase/app';
// import { initializeAuth, getReactNativePersistence,GoogleAuthProvider,FacebookAuthProvider,signInWithPopup  } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//  apiKey: "AIzaSyBCHxGVeX192N8anPKbpp1ox5T7XS0B1ww",
//   authDomain: "zooby-app-6b2e6.firebaseapp.com",
//   projectId: "zooby-app-6b2e6",
//   storageBucket: "zooby-app-6b2e6.firebasestorage.app",
//   messagingSenderId: "354452657995",
//   appId: "1:354452657995:web:e4d06ac278e0cc21347ace",
//   measurementId: "G-1D91HRNHP3"
// };

// const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app,
//   {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// const provider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

// const db = getFirestore(app);

// export { auth, db,facebookProvider,provider,signInWithPopup  };
// export default app;

import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,

   
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

// Only initialize Firebase once
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);


export { auth, db };

export default app;

