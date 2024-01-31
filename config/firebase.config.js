require('dotenv').config()

module.exports ={
    firebaseConfig: {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECT_ID,
        // databaseURL: process.env.FIRESTORE_DB_URL,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        // measurementId: process.env.MEASUREMENT_ID,
    },
};
