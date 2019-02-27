const firebase = require('../../lib/firebase');
const utils = require('../../utils');
const token = require('../../services/token');
/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.signin = async (req) => {
	var { email, password } = req.body;

	// return {
	// 	status: 200, // Or another success code.
	// 	data: [] // Optional. You can put whatever you want here.
	// };
	email = utils.lowerCase(email);
	if (!email || !password) {
		return {
			status: 422,
			data: { error: 'Email or password not supplied.' }
		}
	}

	const db = firebase.firestore();
	var id = 0;

	return new Promise((resolve, reject) => {
		db.collection("users").where("email", "==", email).get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log('Found existing email');
					id = doc.id
					if (!utils.ComPassword(password, doc.data().password)) {
						id = 0;
						console.log('Invalid password supplied')
						return resolve(
							{
								status: 400,
								data: { error: 'Invalid password supplied.' }
							})
					}
				});
				if (!id) {
					return resolve(
						{
							status: 404,
							data: { error: 'User not found.' }
						})
				}
				console.log('Successfully SignIn');
				return resolve({
					status: 200,
					data: { token: `${token.generateToken(id)}` }
				})
			})
			.catch(err => { reject({ status: 500, error: err }); })

	})
};

