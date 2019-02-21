import token from '../services/token';

export default {
	loginRequired: (req, res, next) => {
		if (!req.headers.authorization) return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });

		// Validate jwt
		let try_token = req.header('Authorization').split(' ')[0];
		console.log(try_token);

		next();
		// token.verifyToken(try_token, (err, payload) => {
		// 	if (err) return res.status(401).send(err);
		// 	User.findById(payload.sub)
		// 		.exec((err, user) => {
		// 			if (err || !user) {
		// 				return res.status(404).send(err || {
		// 					error: 'middleware User not found!!!'
		// 				});
		// 			}
		// 			delete user.password;
		// 			req.user = user;
		// 			next();
		// 		})
		// })
	}
}