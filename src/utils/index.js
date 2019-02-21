import firebase from '../firebase';
export default {
	ComPassword: function (inputpass, datapass) {
		return inputpass == datapass;
	},
	istokeninblacklist: function (token) {
		const db = firebase.firestore();
		return new Promise((resolve, reject) => {
			db.collection("blacklisttoken").where("blacklisttoken", "==", token)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log('Found existing token');
						return resolve(1);
					});

					console.log('This token is valid');
					return resolve(0);
				})
				.catch(err => { reject(err); })
		})
	},
	extracttokenfromheader: function (bearertoken) {
		var request_token;

		if (bearertoken.startsWith("Bearer ")) {
			request_token = bearertoken.substring(7, bearertoken.length);
		} else {
			//Error
		}
		return request_token;
	}
}