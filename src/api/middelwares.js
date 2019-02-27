const token = require('../services/token');
const utils = require('../utils/index');

const Middlewares = {
	loginRequired: async (req, res, next) => {
		if (!req.headers.authorization)
			return res.status(401).send({ error: 'Please make sure your request has an Authorization header.' });

		// Validate jwt
		var request_token = utils.extracttokenfromheader(req.headers.authorization);
		console.log(request_token);

		var flag = await utils.istokeninblacklist(request_token);
		console.log(flag);

		if (flag == 1) {
			return res
				.status(401)
				.send({ error: 'This token has been expired already. Log In required and receive new token' });
		}
		else {
			const decode = await token.verifyToken(request_token);
			if (!decode) {
				res
					.status(401)
					.send({ error: 'Access token is missing or invalid' });
			}
			else {
				console.log('Oh welcome~')
				req.request_token = request_token;
				req.userid = decode.sub
				next();
			}
		}
	}
}
module.exports = Middlewares;