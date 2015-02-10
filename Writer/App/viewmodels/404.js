define([
	'services/logger',
	'services/globals',
	'plugins/router'
], function (
	logger,
	globals,
	router
) {
	var vm = function () {
		this.imageRoot = globals.imageRoot;
		this.activate = function () {
			logger.logWarning('Warning: Page Not Found', null, '404.js', false);
		};
		this.goBack = function () {
			router.navigateBack();
		};
	};
	return vm;
});