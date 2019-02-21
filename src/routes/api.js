import firebase from '../firebase';
const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('connected');
})

router.get('/user', (req, res) => {

	const db = firebase.firestore();
	var docRef = db.collection("users").doc(req.userid);

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
	var docRef = db.collection("users").doc(req.userid);

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
	var docRef = db.collection("users").doc(req.userid);

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
	console.log(req.body);
	console.log(req.userid);

	const db = firebase.firestore();
	var docRef = db.collection("jobs").doc(req.userid);

	db.collection("jobs").doc(req.userid).add({
		url: req.body.url
	})
		.then(function () {
			console.log("Document successfully written!");
		})
		.catch(function (error) {
			console.error("Error writing document: ", error);
		});

	// docRef.get()
	// 	.then(function (doc) {
	// 		if (doc.exists) {
	// 			docRef.add({
	// 				username: req.body.username,
	// 				email: req.body.email,
	// 				password: req.body.password
	// 			})
	// 			res
	// 				.status(200)
	// 				.send({
	// 					message: 'Your profile successfully updated. '
	// 				});
	// 		} else {
	// 			// doc.data() will be undefined in this case
	// 			res
	// 				.status(404)
	// 				.send({
	// 					message: `Can't update your profile... `
	// 				});
	// 		}
	// 	})
	// 	.catch(error => {
	// 		console.log("Error getting document:", error);
	// 	});
})

router.get('/listlinks', (req, res) => {
	console.log(req.body);
	console.log(req.userid);

	const db = firebase.firestore();
	var docRef = db.collection("users").doc(req.userid);

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
export default router;