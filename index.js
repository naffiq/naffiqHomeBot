var telegram = require('node-telegram-bot-api');
var { botToken } = require('./config.js');

var { exec } = require('child_process');

var bot = new telegram(botToken, { polling: true });

bot.onText(/\/photo/, (msg, match) => {
	var chatId = msg.chat.id;

	bot.sendMessage(chatId, 'Taking a photo...').then(() => {
		exec('fswebcam -p YUYV photo.jpg', (error, stdout, stderr) => {
				
			if (!error) {
				bot.sendPhoto(chatId, './photo.jpg', {caption: 'Photo of my home'});
			} else {
				bot.sendMessage(chatId, 'There was an error making a photo');
			}

		});
	});
});

bot.onText(/\/volume (.+)/, (msg, match) => {
	var chatId = msg.chat.id;

	if (typeof match[1] !== undefined) {
		let level = match[1];
		exec(`amixer set PCM ${level}%`, (error, stdout, stderr) => {
			bot.sendMessage(chatId, `Volume set to ${level}%`);
		});
	}
});

bot.onText(/\/volume (.+)/, (msg, match) => {
	var chatId = msg.chat.id;

	if (typeof match[1] !== undefined) {
		let level = match[1];
		exec(`amixer set PCM ${level}%`, (error, stdout, stderr) => {
			bot.sendMessage(chatId, `Volume set to ${level}%`);
		});
	}
});

bot.onText(/http:\/\/www.youtube.com\/watch?v=(.+)/, (msg, match) => {
	var chatId = msg.chat.id;

	if (typeof match[0] !== undefined) {
		let url = match[0];
		exec(`chromium-browser --app='${url}'`, (error, stdout, stderr) => {
			bot.sendMessage(chatId, `Video is now live on your screen`);
		});
	}
});