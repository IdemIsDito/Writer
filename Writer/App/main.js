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
	'config',
	'services/globals',
	'services/context'
], function (
	system,
	app,
	viewLocator,
	config,
	globals,
	context
) {
	ko.utils.extend(globals, config);
	system.debug(globals.debug);

	app.title = 'SIMA Writer';

	app.configurePlugins({
		router: true,
		dialog: true,
	});

	context.initialize()
		.then(app.start())
		.then(function () {
			viewLocator.useConvention();
			app.setRoot('viewmodels/shell');
		});
});