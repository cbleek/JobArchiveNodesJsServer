var nodemailer = require('nodemailer');

export default {
	sendemail: function (token, email) {
		console.log('We are going to send confirm email to you...')
		console.log(token);
		console.log(email);
		var transporter = nodemailer.createTransport({
			host: "posty.cross-solution.de",
			port: 465,
			secure: true,
			auth: {
				user: "api@yawik.org",
				pass: "hzqB1I1g0ua6"
			}
		});
		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
			} else {
				console.log("Server is ready to take our messages");
			}
		});
		var mailOptions = {
			from: 'posty.cross-solution.de',
			to: `${email}`,
			subject: 'Please confirm your email',
			text: `We're hoping meet you soon...`
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