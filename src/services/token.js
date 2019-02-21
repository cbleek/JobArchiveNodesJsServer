import jwt from 'jwt-simple';
import config from '../config';

export default {
	generateToken: function (userid) {
		console.log('Generating token...');
		const timeStamp = new Date().getTime();
		const payload = {
			sub: userid,
			iat: timeStamp
		}
		return jwt.encode(payload, config.jwt_secret);
	},
	verifyToken: function (token, cb) {

		const decode = jwt.decode(token, config.jwt_secret)
		console.log(decode);
		if (!decode) return cb({ error: 'Token is not verified.' });
		cb(null, decode);
	}
}