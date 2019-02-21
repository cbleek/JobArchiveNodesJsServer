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
				pass: "MT8T46WA8AzV"
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