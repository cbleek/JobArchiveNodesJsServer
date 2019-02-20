import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV == 'development') {
	dotenv.config({ path: path.resolve(__dirname, '.env.development') });
	console.log(process.env);
}
else if (process.env.NODE_ENV == 'production') {
	dotenv.config({ path: path.resolve(__dirname, '.env') });
	console.log(process.env);
}

module.exports = {
	jwt_secret: process.env.JWT_SECRET || 'unsafe_jwt_secret',
}