import Authentication from '../controllers/authentication'
import Middlewares from './middlewares'
import api from './api'
const router = require('express').Router()

//Authentication
router.post('/signup', Authentication.signup)
router.post('/signin', Authentication.signin)
router.post('/logout', Authentication.logout)
//Confirm Server Status
router.get('/ping', (req, res) => res.send('pong'))
router.get('/', (req, res) => res.send({ 'status': 'server is running...' }))

export default router;