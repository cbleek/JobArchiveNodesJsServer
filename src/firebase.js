import firebase from 'firebase';
var dotenv = require('dotenv').config();

var config = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.FIREBASE_DATABASEURL,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.envFIREBASE_MESSAGINGSENDERID
};

firebase.initializeApp(config);

export default firebase;