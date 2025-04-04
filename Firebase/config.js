import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Primary Firebase Project (Firestore)
const firebaseConfig = {
  apiKey: "AIzaSyC9j3uhiJ-NZN_Ci3KJM3CHXA_3orWlotw",
  authDomain: "sfss-8b4fb.firebaseapp.com",
  projectId: "sfss-8b4fb",
  storageBucket: "sfss-8b4fb.appspot.com", // Fix the storage URL
  messagingSenderId: "570090995458",
  appId: "1:570090995458:web:f5ef977968cf8fa0624c1b",
  measurementId: "G-P55MQ6PNZJ"
};

// Secondary Firebase Project (Storage)
const firebaseConfig2 = {
  apiKey: "AIzaSyDGzi-rH1RLOBfJLv34gbpKfmGUGg4WMKo",
  authDomain: "niilano-b4d6d.firebaseapp.com",
  projectId: "niilano-b4d6d",
  storageBucket: "niilano-b4d6d.appspot.com", // Fix storage URL
  messagingSenderId: "602582283160",
  appId: "1:602582283160:web:ffbb23853137e328a631ed"
};

// Initialize Primary App (Firestore)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Secondary App (Storage)
const app2 = initializeApp(firebaseConfig2, "secondary");
export const imageDb = getStorage(app2);
