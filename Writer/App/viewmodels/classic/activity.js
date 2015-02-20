define([
	'services/logger',
	'services/context',
	'viewmodels/base/activity'
], function (
	logger,
	context,
	baseactivity
) {
	var vm = function () {
		var self = this;

		this.views = [
			'classic/title',
			'classic/summary',
			'classic/initiation',
			'classic/proceedings',
			'classic/satisfaction',
			'classic/overview'
		];

		this.activate = function () {
			context.getClassicActivityByParticipant()
				.then(function (data) {
					if (data.results.length > 0) {
						self.activity(data.results[0]);
					} else {
						self.activity(context.createClassicActivity());
					}
					logger.logSuccess('Succesful activation', data, 'classic/activity.js-activate', false);
				}).fail(function (error) {
					logger.logError('Error while activate', error, 'classic/activity.js-activate', true);
				});
		};

		baseactivity.call(this);
	};
	return vm;
});