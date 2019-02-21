var nodemailer = require('nodemailer');
var dotenv = require('dotenv').config();

export default {
	sendemail: function (token, email) {
		console.log('We are going to send confirm email to you...')
		console.log(dotenv);
		var transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.port,
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		});


		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
			} else {
				console.log("Server is ready to take our messages");
			}
		});
		//var link = `http://localhost:8000/validateemail?token=${token}` // for local test
		var link = `https://api.yawik.org/validateemail?token=${token}` //for production
		console.log(link);
		var mailOptions = {
			from: 'posty.cross-solution.de',
			to: `${email}`,
			subject: 'Please confirm your email',
			text: `We're hoping meet you soon...`,
			html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
}