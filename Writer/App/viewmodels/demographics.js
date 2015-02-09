define([
	'breeze',
	'plugins/router',
	'services/context',
	'services/globals',
	'services/logger'
], function (
	breeze,
	router,
	context,
	globals,
	logger
) {
	var vm = function () {
		var self = this;
		this.isValid = true;
		this.participant = globals.participant;
		this.canActivate = function () {
			if (this.participant()) return true;
			return false;
		};

		this.next = function () {
			if (self.isValid) {
				context.saveChanges()
					.then(function () {
						router.navigate('#/instructions');
						logger.logSuccess('Succesful save', null, 'demograpics.js-next', false);
					}).fail(function (error) {
						logger.logError('Error while saving', error, 'demograpics.js-next', true);
					});
			}
		};
	};
	return vm;
});