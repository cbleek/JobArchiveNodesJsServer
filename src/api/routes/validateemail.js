const express = require('express');
const validateemail = require('../services/validateemail');

const router = new express.Router();

/**
 */
router.get('/', async (req, res, next) => {
	console.log("please verify!");
	const options = {
		token: req.query.token
	};

	try {
		const result = await validateemail.confirmemail(options);
		res.status(result.status || 200).redirect('/');
	} catch (err) {
		return res.status(500).send({
			status: 500,
			error: 'Server Error'
		});
	}
});

module.exports = router;
