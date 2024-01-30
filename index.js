dotenv.config();
import { initializeApp } from "firebase/app";
import {
  //for data collection
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import {
  //for authorization
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };

//init firebase app
initializeApp(firebaseConfig);


//init service
const db = getFirestore();
const auth = getAuth();

//collection ref
const colRef = collection(db, "books");

//query
const q = query(colRef, orderBy("createdAt"));

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let book = [];
//     snapshot.docs.forEach((doc) => {
//       book.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(book);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//get live data
const unsubCol = onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

//add documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    auther: addBookForm.auther.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

//delete documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//get a single document
const docRef = doc(db, "books", "8Xb385yOzhrlNDzyIHYa");
// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc);
// }); //type-1

const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
}); //type-2

//update  data in the firestore database
const updateBookForm = document.querySelector(".update");
updateBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateBookForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
  }).then(() => updateBookForm.reset());
});

//signup user
const signupFrom = document.querySelector(".signup");
signupFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupFrom.email.value;
  const password = signupFrom.password.value;
  console.log(email, password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(email, password);
      console.log("user created", cred.user);
      signupFrom.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

//login user
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user login", cred.user);
    }) 
    .catch((err) => console.log(err));
});

//logout user
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  // e.preventDefault();
  signOut(auth)
    .then(() => console.log("user has logout"))
    .catch((err) => console.log(err));
});

//subscribing to auth time changes

const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("user status changed", user);
});

//unsubscribing
const unsubscribingButton = document.querySelector(".unsub");
unsubscribingButton.addEventListener("click", () => {
  console.log("unsubscribing ...");
  unsubCol();
  unsubDoc();
  unsubAuth();
});

