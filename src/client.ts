/// <reference path="../typings/tsd.d.ts" />

import * as hitbox from './hitbox/hitbox'
import * as io from 'socket.io-client';
import * as config from './config';
var cfg = config.default;
var socket = io.connect('http://localhost:7080');

export function StartClient() {
	var auth = false;

	socket.on('connect', function(msg) {
		console.log('connected');

	});

	socket.on('master', function(msg) {
		console.log(msg);

		socket.emit('register', {
			slave: cfg.slave,
			secret: cfg.secret
		});
	});

	socket.on('loginMsg', function(msg) {
		auth = true;
		console.log(msg);
	});

	socket.on('reconnect', function(msg) {

	});

	socket.on('disconnect', function() {
		console.log('disconnected');
	});

	socket.on('infoMsg', function(msg) {
		console.log(msg);
	});
	
	socket.on('joinChannel', function(msg) {
		// name, bot, auth
		hitbox.StartClient(msg.channel, msg.bot, msg.auth);
	});
}

export function SendSuccessJoinToMaster(channel) {
	socket.emit('ackMsg', {
		success: true,
		channel: channel
	})
}