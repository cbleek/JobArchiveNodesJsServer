const express = require('express');

const router = new express.Router();

router.get('/ping', (req, res) => res.send('pong'))
router.get('/', (req, res) => res.send({ 'status': 'server is running...' }))

module.exports = router;