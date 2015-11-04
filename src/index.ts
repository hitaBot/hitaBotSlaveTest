/// <reference path="../typings/tsd.d.ts" />


import * as config from './config';
import * as server from './client';

// If getting a config fails, We should fall back to an interactive prompt to create a config.
config.getConfig().then(function() {
	server.StartClient();
});