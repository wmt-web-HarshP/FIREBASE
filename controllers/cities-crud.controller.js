const express=require('express');
const  { initializeApp } =require( "firebase/app");
const { addDoc, collection, doc, getDocs, getFirestore, query, where, documentId, setDoc } = require("firebase/firestore");
const config = require('../config/firebase.config')
const { pick } =require( "lodash")
const router = express.Router();

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get reference to employee collection
const cityRef = collection(db, "cities");

// Add new data
router.post('/', async (req, res) => {
    try {
        const city = pick(req.body, ['name', 'state', 'country']);
        const docRef = await addDoc(cityRef, city);
        console.log("Document written with ID: ", docRef.id);
        return res.send('New City added to DB.')
    } catch (e) {
        return res.status(400).send(e.message)
    }
})

module.exports=router