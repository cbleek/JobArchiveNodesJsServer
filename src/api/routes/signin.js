const express = require('express');
const signin = require('../services/signin');

const router = new express.Router();

/**
 */
router.post('/', async (req, res, next) => {

	const options = {
	};

	try {
		const result = await signin.signin(req);
		console.log(result);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		console.log(err);
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});

module.exports = router;
