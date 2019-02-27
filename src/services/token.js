const jwt = require('jwt-simple');
const config = require('../lib/config');

const token = {
	generateToken: function (userid) {
		console.log('Generating token...');
		const timeStamp = new Date().getTime();
		const payload = {
			sub: userid,
			iat: timeStamp
		}
		return jwt.encode(payload, config.jwt_secret);
	},
	verifyToken: async function (token, cb) {
		try {
			const decode = await jwt.decode(token, config.jwt_secret)
			return decode;
		} catch (err) {
			return null;
		}

	}
};

module.exports = token;