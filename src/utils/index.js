const firebase = require('../lib/firebase');
const lowerCase = require('lower-case');

const utils = {
	ComPassword: function (inputpass, datapass) {
		return inputpass == datapass;
	},
	istokeninblacklist: async function (token) {
		const db = firebase.firestore();
		var isexpiredtoken = 0;
		return db.collection("blacklisttoken").where("blacklisttoken", "==", token).get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log('Found existing token');
					isexpiredtoken = 1;
				});
				return isexpiredtoken;
			})
			.catch(err => { reject(err); })
	},
	extracttokenfromheader: function (token) {
		let request_token = token;

		if (token.startsWith("Bearer ")) {
			request_token = token.substring(7, token.length);
		}
		return request_token;
	},
	lowerCase
}

module.exports = utils;