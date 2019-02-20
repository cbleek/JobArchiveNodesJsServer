import firebase from '../firebase';
import token from '../services/token';

export default {
	signup: (req, res, next) => {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res
				.status(422)
				.send({ error: 'User information invalid' });
		}
		const db = firebase.firestore();
		let flag = 1;
		return new Promise((resolve, reject) => {
			db.collection("users").get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						if (doc.data().email == email) {
							console.log('Found existing email');
							flag = 0;
						}
						console.log('after email compare');
					});
					//Email is using
					if (flag == 0) {
						console.log('exist');
						return resolve(res
							.status(422)
							.send({ error: 'Email is in use' }));
					}

					db.collection('users').add(req.body)
						.then(docRef => {
							console.log();
							console.log(`added id: ${docRef.id}`);
							let confirmtoken = token.generateToken(docRef.id);
							console.log(confirmtoken);
							return resolve(res
								.status(200)
								.send({ token: confirmtoken }));
						})
						.catch(err => { reject(err); })
					// console.log(db.collection('users').add(req.body))
				})
				.catch(err => { reject(err); })
		})
	},
	signin: (req, res, next) => {
	},
	logout: (req, res, next) => {
	},
	updateProfile: (req, res, next) => {
	}
}
