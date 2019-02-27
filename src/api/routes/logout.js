const express = require('express');
const logout = require('../services/logout');

const router = new express.Router();

/**
 */
router.post('/', async (req, res, next) => {
	const options = {
	};

	try {
		const result = await logout.logoutUser(req);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(500).send({
			status: 500,
			error: 'Server Error'
		});
	}
});

module.exports = router;
