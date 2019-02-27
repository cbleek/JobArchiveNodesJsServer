const nodemailer = require('nodemailer')
const config = require('../lib/config')

const emailprocess = {
	sendemail: function (token, email) {
		console.log('We are going to send confirm email to you...')

		var transporter = nodemailer.createTransport({
			host: config.emailserver.SMTP.SMTP_HOST,
			port: config.emailserver.SMTP.SMTP_PORT,
			secure: true,
			auth: {
				user: config.emailserver.SMTP.SMTP_USER,
				pass: config.emailserver.SMTP.SMTP_PASSWORD
			}
		});


		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
			} else {
				console.log("Server is ready to take our messages");
			}
		});
		var link = config.emailserver.confirmemaillink_localtest + 'validateemail?token=' + token // for local test
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
				console.log("error?");
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
}
module.exports = emailprocess;