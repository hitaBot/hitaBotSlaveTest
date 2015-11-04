/// <reference path="../typings/tsd.d.ts" />

var json = require('jsonfile');

var config = {
	secret: "",
	slave: ""
}
export default config;

export function getConfig() {
	
	var promise = new Promise(function(resolve, reject) {
		json.readFile('./config.json', function(err, data) {
			if (err) throw 'Failed Loading Config';
			config.secret = data.secret;
			config.slave = data.slave;
			console.log(config);
			resolve();
		});
	});
	return promise;
}