const firebase = require('../../lib/firebase');
const utils = require('../../utils');
const token = require('../../services/token');

/**
 * @param {Object} req
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getuser = async (req) => {
	const db = firebase.firestore();
	var docRef = db.collection("users").doc(req.userid);

	return new Promise((resolve, reject) => {
		docRef.get()
			.then(doc => {
				console.log(doc.data());
				return resolve(
					{
						status: 200,
						data: {
							username: doc.data().username,
							email: doc.data().email,
							password: doc.data().password
						}
					});
			})
			.catch(err => { reject(err); })
	});
};

/**
 * @param {Object} req
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateuser = async (req) => {
	const db = firebase.firestore();
	var docRef = db.collection("users").doc(req.userid);

	return new Promise((resolve, reject) => {
		docRef.get()
			.then(doc => {
				if (doc.exists) {
					docRef.update({
						username: req.body.username,
						email: req.body.email,
						password: req.body.password
					})

					return resolve(
						{
							status: 200,
							data: {
								message: 'Your profile successfully updated.'
							}
						});
				} else {
					// doc.data() will be undefined in this case
					return resolve(
						{
							status: 404,
							data: {
								error: "Can't update your profile..."
							}
						});
				}

			})
			.catch(err => { reject(err); })
	});
};

/**
 * @param {Object} req
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteUser = async (req) => {
	const db = firebase.firestore();
	var docRef = db.collection("users").doc(req.userid);

	return new Promise((resolve, reject) => {
		docRef.get()
			.then(doc => {
				if (doc.exists) {
					docRef.delete();
					db.collection('blacklisttoken').add({ blacklisttoken: req.request_token });
					return resolve({
						status: 200,
						data: { message: 'Your profile successfully delected.' }
					})
				} else {
					return resolve({
						status: 404,
						data: { error: 'User not found.' }
					})
				}
			})
			.catch(err => { reject(err); })
	});
};

/**
 * @param {Object} req
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addjoblink = async (req) => {
	var job = {
		url: req.body.url,
		posted_userid: req.userid
	}

	console.log('Your Joblink will be added...');
	const db = firebase.firestore();

	return new Promise((resolve, reject) => {
		db.collection("jobs").add(job)
			.then(doc => {
				return resolve({
					status: 200,
					data: { message: 'Joblink successfully added.' }
				})
			})
			.catch(err => { reject(err); })
	});


};

/**
 * @param {Object} options
 * @param {} options.type if type&#x3D;&#x27;all&#x27; user be able to retrieve all jobads but not &#x27;all&#x27; user will retrieve his own posted jobads
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getjoblinks = async (options) => {
	var type = options.type;
	var joblinks = [];
	const db = firebase.firestore();

	if (type == 'all') {
		return new Promise((resolve, reject) => {
			db.collection('jobs').get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						joblinks.push(doc.data().url);
						console.log(doc.data());
					});
					console.log(joblinks);
					return resolve({
						status: 200,
						data: { joblinks: joblinks }
					})
				})
				.catch(err => {
					return reject({
						status: 404,
						data: { error: 'There is no job link' }
					})
				})
		});

	}
	else {
		return new Promise((resolve, reject) => {
			db.collection('jobs').where('posted_userid', '==', options.userid).get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						joblinks.push(doc.data().url);
						console.log(doc.data());
					});
					console.log(joblinks);
					return resolve({
						status: 200,
						data: { joblinks: joblinks }
					})
				})
				.catch(err => { reject(err); })
		});
	}
};

