import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyBl37H1L3b0A6Ngf-fYLNS-cfbC0aYUWJI",
	authDomain: "newagent-20e1a.firebaseapp.com",
	databaseURL: "https://newagent-20e1a.firebaseio.com",
	projectId: "newagent-20e1a",
	storageBucket: "newagent-20e1a.appspot.com",
	messagingSenderId: "472476880024"
};

firebase.initializeApp(config);

export default firebase;