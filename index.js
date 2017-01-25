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

	// Taking a photo of my home
	if (message.text === '/photo') {
		console.log(message);

		api.sendMessage({
			'chat_id': message.chat.id,
			'text': 'Taking a photo...'
		}).then(() => {
			exec('fswebcam -p YUYV photo.jpg', (error, stdout, stderr) => {
			
				if (!error) {
					api.sendPhoto({
						chat_id: message.chat.id,
						caption: 'Photo of my home',
						photo: './photo.jpg'
					});
				} else {
					api.sendMessage({
						'chat_id': message.chat.id,
						'text': 'There was an error making a photo'
					})
				}

			});
		});
	}

	// Setting a volume
	if (message.text.includes('/volume')) {
		let level = parseInt(message.text.remove('/volume'));
		console.log(level);
		// exec('fswebcam -p YUYV photo.jpg', (error, stdout, stderr) => {
			
		// 	api.sendMessage({
		// 		'chat_id': message.chat.id,
		// 		'text': 'There was an error making a photo'
		// 	});

		// });
	}

	// Play youtube video
	if (message.text.includes('youtube')) {
		console.log(message);
	}
});