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
		this.participant = ko.observable();

		this.activate = function (guid) {
			if (guid) {
				context.getParticipantByGuid(guid)
					.then(function (data) {
						if (data.results) {
							self.participant(data.results[0]);
						}
						logger.logSuccess('Succesful activation', data, 'demograpics.js-activate', false);
					}).fail(function (error) {
						logger.logError('Error while activate', error, 'demograpics.js-activate', true);
					});
			} else {
				var participant = context.createParticipant();
				context.saveChanges()
					.then(function () {
						self.participant(participant);
						logger.logSuccess('Succesful canActivation', null, 'demograpics.js-canActivate', false);
					})
				.fail(function (error) {
					logger.logError('Error while canActivate', error, 'demographics.js-canActivate', true);
				});
			}
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