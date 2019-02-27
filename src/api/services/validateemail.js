const firebase = require('../../lib/firebase');
const token = require('../../services/token');

/**
 * @param {Object} options
 * @param {} options.token this token is from backend after sign up
 * @throws {Error}
 * @return {Promise}
 */
module.exports.confirmemail = async (options) => {
	const decode = await token.verifyToken(options.token);
	if (!decode) {
		res
			.status(401)
			.send({ error: 'Access token is missing or invalid' });
	}
	else {
		const db = firebase.firestore();
		var docRef = db.collection("users").doc(`${decode.sub}`);

		return new Promise((resolve, reject) => {
			docRef.get()
				.then(function (doc) {
					if (doc.exists) {
						docRef.update({ verified: 1 })
						return resolve({
							status: 200
						})
					} else {
						// doc.data() will be undefined in this case
						return resolve({
							status: 404
						})
					}
				})
				.catch(err => { reject({ status: 500, error: err }); })
		});

	}
}

