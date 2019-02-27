const emailprocess = require('../../services/sendemail');
const firebase = require('../../lib/firebase');
const utils = require('../../utils');
const token = require('../../services/token');
/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.signupuser = async (req) => {
	// Implement your business logic here...
	//
	// This function should return as follows:
	//
	// return {
	//   status: 200, // Or another success code.
	//   data: [] // Optional. You can put whatever you want here.
	// };
	//
	// If an error happens during your business logic implementation,
	// you should throw an error as follows:
	//
	// throw new Error({
	//   status: 500, // Or another error code.
	//   error: 'Server Error' // Or another error message.
	// });

	const { username, email, password } = req.body;

	console.log(req.body);
	if (!username || !email || !password) {
		return {
			status: 422,
			data: { error: 'User information is invalid.' }
		}
	}

	const user = {
		username: username,
		email: utils.lowerCase(email),
		password: password,
		verified: 0
	}

	const db = firebase.firestore();
	let flag = 1;

	return new Promise((resolve, reject) => {
		db.collection("users").where("email", "==", user.email).get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					flag = 0;
				});

				//Email is use
				if (flag == 0) {
					console.log('exist');
					return resolve(
						{
							status: 422,
							data: { error: 'Email is in use.' }
						});
				}

				db.collection('users').add(user)
					.then(docRef => {
						console.log(`added id: ${docRef.id}`);
						let confirmtoken = token.generateToken(docRef.id);
						return resolve(
							{
								status: 201,
								data: emailprocess.sendemail(confirmtoken, email)
							});
					})
					.catch(err => { reject(err); })
			})
			.catch(err => { reject(err); })
	})
};

