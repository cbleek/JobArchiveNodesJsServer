import firebase from '../firebase';
import token from '../services/token';
import emailprocess from '../services/sendemail'

function ComPassword(inputpass, datapass) {
	return inputpass == datapass;
}

function istokeninblacklist(token) {
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
}
export default {
	signup: (req, res, next) => {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res
				.status(422)
				.send({ error: 'User information invalid' });
		}
		const user = {
			username: username,
			email: email,
			password: password,
			verified: 0
		}
		console.log(user);
		const db = firebase.firestore();
		let flag = 1;

		return new Promise((resolve, reject) => {
			db.collection("users").where("email", "==", email)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						console.log('Found existing email');
						flag = 0;
					});
					//Email is using
					if (flag == 0) {
						console.log('exist');
						return resolve(res
							.status(422)
							.send({ error: 'Email is in use' }));
					}

					db.collection('users').add(user)
						.then(docRef => {
							console.log(`added id: ${docRef.id}`);
							let confirmtoken = token.generateToken(docRef.id);
							emailprocess.sendemail(confirmtoken, email);
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
		const { email, password } = req.body;
		console.log(email);
		if (!email || !password) {
			return res
				.status(422)
				.send({ error: 'Email or password not provided' });
		}

		const db = firebase.firestore();
		var id = 0;
		return new Promise((resolve, reject) => {
			db.collection("users").where("email", "==", email)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log('Found existing email');
						id = doc.id
						if (!ComPassword(password, doc.data().password)) {
							id = 0;
							return resolve(res
								.status(400)
								.send({ error: 'Invalid password supplied' }));
						}
					});

					if (!id) {
						return resolve(res
							.status(404)
							.send({ error: 'User not found' }));
					}

					console.log('Successfully SignIn');
					return resolve(res
						.status(200)
						.send({ token: `${token.generateToken(id)}` }));
					// console.log(db.collection('users').add(req.body))
				})
				.catch(err => { reject(err); })
		})
	},
	logout: (req, res, next) => {
		var request_token = req.headers.authorization;

		if (req.headers.authorization.startsWith("Bearer ")) {
			request_token = req.headers.authorization.substring(7, req.headers.authorization.length);
		} else {
			//Error
		}

		istokeninblacklist(request_token)
			.then((flag) => {
				if (flag == 1)
					return res
						.status(401)
						.send({ message: 'This token has been expired already. Log In required and receive new token' })
			})

		token.verifyToken(request_token, (err, decode) => {
			console.log(decode);
			if (err) {
				res
					.status(401)
					.send({ message: 'Access token is missing or invalid' })
			}
			else {
				const db = firebase.firestore();
				db.collection('blacklisttoken').add({ blacklisttoken: request_token });
				res
					.status(200)
					.send({ message: 'Successfully log out' })
			}
		})


	},
	updateProfile: (req, res, next) => {
	},
	validateemail: (req, res, next) => {
		const validatetokken = req.query.token;
		console.log(validatetokken);
		token.verifyToken(validatetokken, (err, decode) => {
			if (err) {
				res
					.status(401)
					.send({ message: 'Invalid Token' });
			}
			else {
				const db = firebase.firestore();
				var docRef = db.collection("users").doc(`${decode.sub}`);

				docRef.get()
					.then(function (doc) {
						if (doc.exists) {
							docRef.update({
								verified: 1
							})
							console.log("Your email has verified ");
						} else {
							// doc.data() will be undefined in this case
							console.log("No such document!");
						}
					})
					.catch(function (error) {
						console.log("Error getting document:", error);
					});
				res
					.status(200)
					.redirect('/');
			}
		})
	}
}
