define([
	'services/logger'
], function (
	logger
) {
	var vm = function () {
		this.activate = function () {
			logger.logWarning('Warning: Page Not Found', null, '404.js', true);
		};
	};
	return vm;
});