requirejs.config({
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
	'config'
], function (
	system,
	app,
	viewLocator,
	config
) {
	system.debug(config.scriptCache);

	app.title = 'SIMA Writer';

	app.configurePlugins({
		router: true,
		dialog: true,
	});

	app.start()
		.then(function () {
			viewLocator.useConvention();
			app.setRoot('viewmodels/shell');
		});
});