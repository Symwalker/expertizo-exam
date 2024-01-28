import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

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
  // console.log(name);
  const {name, temp, country} = data
  // console.log(name);
  try {
     await addDoc(collection(db, "searchName"), {
      name,
      temp,
      country
    });
  } catch (e) {

  }
}
export async function getAllSearch() {
  const querySnapshot = await getDocs(collection(db, "searchName"));
  const data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    const datum = doc.data();
    data.id = doc.id;
    data.push(datum);
  });
  return data;
}

// export async function register(userInfo) {
//   try {
//     const { email, password, fullName, age } = userInfo;
//     console.log(email, age, fullName);
//     const user = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     await addDoc(collection(db, "users"), {
//       email,
//       fullName,
//       age,
//       user
//     });
//     toast.success("User Created");
//     return true;
//   } catch (error) {
//     toast.error(error.message);
//   }
// }

export async function register(userInfo) {
  try {
    const { email, password, fullName, age, img } = userInfo;
    console.log(img, "firebase wala");
    const authResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = authResult.user;
    console.log(user);
    const storageRef = ref(storage, `users/${img.name}`);
    await uploadBytes(storageRef, img);
    const url = await getDownloadURL(storageRef);
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      profilePic: url,
      email,
      age,
    });
    toast.success("User Created");
  } catch (e) {
    const errorMessage = e.message;
    toast.error(e.message);
  }
}

export async function login(userInfo) {
  const { email, password, age } = userInfo;
  // console.log(email, password);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("successfully login");
  } catch (error) {
    toast.error(error.message);
  }
}
export async function addItem(productInfo) {
  const { brand, title, description, category, price, image } = productInfo;
  // console.log(brand, title, description, category, price, image);

  try {
    const storageRef = ref(storage, `ads/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, "products"), {
      brand,
      title,
      description,
      category,
      price,
      imageURL: url,
    });
    toast.success("Product successfully added");
    return true;
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    toast.success(e.message);
    return true;
  }
}
export async function getItems() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const ads = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    const data = doc.data();
    data.id = doc.id;
    ads.push(data);
  });
  return ads;
}
export async function getSingleItem(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    // console.log("No such document!");
  }
}

export async function logout() {
  try {
    await signOut(auth);
    toast.success("you loggedOut");
    return true;
  } catch (e) {
    toast.error("something went wrong");
  }
}

export async function getUser(id) {
  console.log(id);
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    // console.log("No such document!");
  }
}

export async function updataUser(userId, data) {
  console.log(userId, data);
  try {
    const { age, name, image } = data;
    console.log(age, name, image);
    const docRef = doc(db, "users", userId);
    const storageRef = ref(storage, `users/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    await updateDoc(docRef, {
      fullName: name,
      age,
      profilePic: url,
    });
    return true
  } catch (error) {}
  return false
}
