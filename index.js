var telegram = require('telegram-bot-api');
var { botToken } = require('./config.js');

var { exec } = require('child_process');

var api = new telegram({
	token: botToken,
	updates: {
		enabled: true
	}
});

api.on('message', (message) => {
	if (message.text === '/photo') {
		console.log(message);

		exec('fswebcam -p YUYV photo.jpg', (error, stdout, stderr) => {

			// api.sendPhoto({
				
			// });

		});

	}
});