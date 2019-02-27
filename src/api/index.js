const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../lib/config');
const logger = require('../lib/logger');
const cors = require('cors');

const log = logger(config.logger);
const app = express();

const Middlewares = require('./middelwares');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
/*
 * Routes
 */

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/logout', Middlewares.loginRequired, require('./routes/logout'));
app.use('/validateemail', require('./routes/validateemail'));
app.use('/api', Middlewares.loginRequired, require('./routes/api'));

// catch 404
app.use('/', require('./routes/index'));
app.use((req, res, next) => {
	log.error(`Error 404 on ${req.url}.`);
	res.status(404).send({ status: 404, error: 'Not found' });
});


// catch errors
app.use((err, req, res, next) => {
	const status = err.status || 500;
	log.error(`Error ${status} (${err.message}) on ${req.method} ${req.url} with payload ${req.body}.`);
	res.status(status).send({ status, error: 'Server error' });
});

module.exports = app;
