const firebase = require('firebase');
const config = require('./config');
const fireabse = firebase.initializeApp(config.firebase);
module.exports = fireabse;