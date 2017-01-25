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

		api.sendMessage({
			'chat_id': message.chat.id,
			'text': 'Taking a photo...'
		}).then(() => {
			exec('fswebcam -p YUYV photo.jpg', (error, stdout, stderr) => {
			
				console.log(error || 'Alright');
				// api.sendPhoto({
				// 	chat_id: message.chat.id,
				// 	caption: 'Photo of my home',
				// 	photo: './photo.jpg'
				// }).then();

			});
		});

	}
});