import firebase from '../firebase';
export default {
	signup: (req, res, next) => {
		const { username, email, password } = req.body;
		console.log(req.body);
		console.log(username);
		console.log(email);
		console.log(password);
		if (!username || !email || !password) {
			return res
				.status(422)
				.send({ error: 'User information invalid' });
		}
		const db = firebase.firestore();
		db.collection('users').add(req.body);
		return res
			.status(200)
			.send({ token: 'token....' });
	},
	signin: (req, res, next) => {
	},
	logout: (req, res, next) => {
	},
	updateProfile: (req, res, next) => {
	}
}
