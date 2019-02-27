const express = require('express');
const signup = require('../services/signup');

const router = new express.Router();

/**
 */
router.post('/', async (req, res, next) => {
	console.log('signup');
	const options = {
	};

	try {
		const result = await signup.signupuser(req);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		console.log(err);
		return res.status(500).send({
			status: 500,
			error: 'Server Error'
		});
	}
});

module.exports = router;
