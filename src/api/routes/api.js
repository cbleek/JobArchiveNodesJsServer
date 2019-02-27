const express = require('express');
const api = require('../services/api');

const router = new express.Router();

/**
 */
router.get('/', (req, res) => {
	res.send('connected');
})

router.get('/user', async (req, res, next) => {
	const options = {
	};
	try {
		const result = await api.getuser(req);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});

/**
 */
router.put('/user', async (req, res, next) => {
	const options = {
	};

	try {
		const result = await api.updateuser(req);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(500).send({
			status: 500,
			error: 'Server Error'
		});
	}
});

/**
 */
router.delete('/user', async (req, res, next) => {
	const options = {
	};

	try {
		const result = await api.deleteUser(req);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});

/**
 */
router.post('/addjoblink', async (req, res, next) => {
	const options = {
	};

	try {
		const result = await api.addjoblink(req);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});

/**
 */
router.get('/listlinks', async (req, res, next) => {
	const options = {
		type: req.query.type,
		userid: req.userid
	};

	try {
		const result = await api.getjoblinks(options);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});

module.exports = router;
