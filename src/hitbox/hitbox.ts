/// <reference path="../../typings/tsd.d.ts" />

import * as socketio from 'socket.io-client';
import * as hitbox from './hitbox/hitbox'
import * as utils from '../utils'
import * as server from '../client';

var channels = new Map();

export function StartClient(channel, bot, auth) {
	if (channels.has(channel)) return;
	InitClient(channel, bot, auth);
}

function Client(channel, bot, auth, url) {

	var io = socketio.connect(url, { 'force new connection': true });

	channels.set(channel, io);

	io.on('connect', function() {
		console.log("connected");
		io.emit('message', {
			method: 'joinChannel',
			params: {
				name: bot,
				channel: channel.toLowerCase(),
				token: auth
			}
		})
	});

	io.on('message', function(msg) {
		var json = JSON.parse(msg);
		var params = json.params;

		if (params.buffer) return;

		switch (json.method) {
			case 'loginMsg':
				SendMessageToChannel(channel.toLowerCase(), bot, 'Hello, I\'m ' + bot + '!', io);
				server.SendSuccessJoinToMaster(channel);
		}

		console.log(msg);
	});
}

function InitClient(channel, bot, auth) {
	utils.getHttp({ url: 'https://api.hitbox.tv/chat/servers', gzip: true }).then(function(data) {
		var jsonData = JSON.parse(data);
		Client(channel, bot, auth, jsonData[0].server_ip.toString());
	});
}

function SendMessageToChannel(channel, bot, message, io: SocketIOClient.Socket) {
		io.emit('message', {
		method: 'chatMsg',
		params: {
			channel: channel,
			name: bot,
			nameColor: 'FFFFFF',
			text: message
		}
	});
}