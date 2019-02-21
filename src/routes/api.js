import firebase from '../firebase';
const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('connected');
})

router.get('/user', (req, res) => {

	const db = firebase.firestore();
	let docRef = db.collection("users").doc(req.userid);

	docRef.get()
		.then(doc => {
			console.log(doc.data());
			res
				.status(200)
				.send({
					username: doc.data().username,
					email: doc.data().email,
					password: doc.data().password
				});
		})
		.catch(err => {
			res
				.status(404)
				.send({ message: `Can't find user...` });
		})

})

router.put('/user', (req, res) => {

	const db = firebase.firestore();
	let docRef = db.collection("users").doc(req.userid);

	docRef.get()
		.then(function (doc) {
			if (doc.exists) {
				docRef.update({
					username: req.body.username,
					email: req.body.email,
					password: req.body.password
				})
				res
					.status(200)
					.send({
						message: 'Your profile successfully updated. '
					});
			} else {
				// doc.data() will be undefined in this case
				res
					.status(404)
					.send({
						message: `Can't update your profile... `
					});
			}
		})
		.catch(error => {
			console.log("Error getting document:", error);
		});
})
router.delete('/user', (req, res) => {

	const db = firebase.firestore();
	let docRef = db.collection("users").doc(req.userid);

	docRef.get()
		.then(function (doc) {
			if (doc.exists) {
				docRef.delete();
				db.collection('blacklisttoken').add({ blacklisttoken: req.request_token });
				res
					.status(200)
					.send({
						message: 'Your profile successfully delected. '
					});
			} else {
				res
					.status(404)
					.send({
						message: `Can't find your profile... `
					});
			}
		})
		.catch(error => {
			console.log("Error getting document:", error);
		});
})

router.post('/addjoblink', (req, res) => {
	let job = {
		url: req.body.url,
		posted_userid: req.userid
	}
	console.log(job);
	const db = firebase.firestore();
	db.collection("jobs").add(job)
		.then(doc => {
			res
				.status(200)
				.send({
					message: 'Joblink successfully added.'
				});
		})
		.catch(error => {
			console.log("Error getting document:", error);
		});
})

router.get('/listlinks', (req, res) => {
	let type = req.query.type;
	let joblinks = [];
	console.log(req.query);
	const db = firebase.firestore();

	if (type == 'all') {
		db.collection('jobs')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					joblinks.push(doc.data().url);
					console.log(doc.data());
				});
				console.log(joblinks);
				res
					.status(200)
					.send({
						joblinks: joblinks
					});
			})
			.catch(err => {
				res
					.status(404)
					.send({
						message: `There is no job link`
					});
			})
	}
	else {
		db.collection('jobs').where('posted_userid', '==', req.userid)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					joblinks.push(doc.data().url);
					console.log(doc.data());
				});
				console.log(joblinks);
				res
					.status(200)
					.send({
						joblinks: joblinks
					});
			})
			.catch(err => {
				res
					.status(404)
					.send({
						message: `There is no job link`
					});
			})
	}
})
export default router;