import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJIvWO4XpLQBF3_s5gOiXIyRv7Zj-_jZs",
  authDomain: "ex-22-fa1a9.firebaseapp.com",
  projectId: "ex-22-fa1a9",
  storageBucket: "ex-22-fa1a9.appspot.com",
  messagingSenderId: "363173341020",
  appId: "1:363173341020:web:c7785c146a718aafb64399",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function saveSearchName(data) {
  const { name, temp, country } = data;
  try {
    await addDoc(collection(db, "searchName"), {
      name,
      temp,
      country,
    });
  } catch (e) {}
}
export async function getAllSearch() {
  const querySnapshot = await getDocs(collection(db, "searchName"));
  const data = [];
  querySnapshot.forEach((doc) => {
    const datum = doc.data();
    data.id = doc.id;
    data.push(datum);
  });
  return data;
}
