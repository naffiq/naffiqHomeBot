var telegram = require('node-telegram-bot-api');
var { botToken } = require('./config.js');

var { exec } = require('child_process');

var bot = new telegram(botToken, { polling: true });

bot.onText(/\/photo/, (msg, match) => {
	var chatId = msg.chat.id;
	exec('fswebcam -p YUYV photo.jpg', (error, stdout, stderr) => {
			
		if (!error) {
			bot.sendPhoto(chatId, './photo.jpg', {caption: 'Photo of my home'});
		} else {
			bot.sendMessage(chatId, 'There was an error making a photo');
		}

	});
});
