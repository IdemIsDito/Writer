﻿requirejs.config({
	paths: {
		'text': '../Scripts/text',
		'durandal': '../Scripts/durandal',
		'plugins': '../Scripts/durandal/plugins',
		'transitions': '../Scripts/durandal/transitions',
		'breeze': '../Scripts/breeze.debug',
		'Q': '../Scripts/q'

	},
	urlArgs: scriptCache ? undefined : "bust=" + new Date().getTime()
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define([
	'durandal/system',
	'durandal/app',
	'durandal/viewLocator',
	'config',
	'services/context'
], function (
	system,
	app,
	viewLocator,
	config,
	context
) {

	system.debug(config.debug);

	app.title = 'SIMA Writer';

	app.configurePlugins({
		router: true,
		dialog: true,
	});

	app.start()
		.then(context.initialize())
		.then(function () {
			viewLocator.useConvention();
			app.setRoot('viewmodels/shell');
		});
});