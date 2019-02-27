const firebase = require('../../lib/firebase');

/**
 * @param {Object} req
 * @throws {Error}
 * @return {Promise}
 */
module.exports.logoutUser = async (req) => {
	var request_token = req.request_token;
	const db = firebase.firestore();
	db.collection('blacklisttoken').add({ blacklisttoken: request_token });
	return {
		status: 200,
		data: { message: 'Successfully log out.' }
	};
};

