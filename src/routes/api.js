import Authentication from '../controllers/authentication';

const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('connected');
})

export default router;