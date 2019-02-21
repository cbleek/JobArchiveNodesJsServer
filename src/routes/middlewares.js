import token from '../services/token';
import utils from '../utils/index';

export default {
	loginRequired: (req, res, next) => {
		if (!req.headers.authorization) return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });

		// Validate jwt
		var request_token = utils.extracttokenfromheader(req.headers.authorization);
		utils.istokeninblacklist(request_token)
			.then((flag) => {
				if (flag == 1) {
					return res
						.status(401)
						.send({ message: 'This token has been expired already. Log In required and receive new token' })
				}
				else {
					console.log(request_token);
					token.verifyToken(request_token, (err, decode) => {
						if (err) {
							console.log('Why here?');
							res
								.status(401)
								.send({ message: 'Access token is missing or invalid' })
						}
						else {
							req.request_token = request_token;
							req.userid = decode.sub
							next();
						}
					})
				}
			})
			.catch((err) => {
				res
					.status(401)
					.send({ message: 'Access token is missing or invalid' })
			})
	}
}