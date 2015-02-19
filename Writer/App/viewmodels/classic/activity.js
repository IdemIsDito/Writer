define([
	'durandal/app',
	'plugins/router',
	'services/globals',
	'services/logger',
	'services/context',
	'viewmodels/base/activity'
], function (
	app,
	router,
	globals,
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

		this.prev = function (bindingContext, event) {
			var l = Ladda.create(event.target);
			l.start();
			context.saveChanges()
				.then(function () {
					self.activateView(self.getChildView('prev'));
					l.stop();
				})
				.fail(function (error) {
					logger.logError('Error while navigating prev', error, 'classic/activity.js-prev', true);
					l.stop();
				});
		};

		this.next = function (bindingContext, event) {
			if (this.stepIsValid()) {
				var l = Ladda.create(event.target);
				l.start();
				context.saveChanges()
					.then(function () {
						self.activateView(self.getChildView('next'));
						l.stop();
					})
					.fail(function (error) {
						logger.logError('Error while navigating next', error, 'classic/activity.js-next', true);
						l.stop();
					});
			}
		};

		baseactivity.call(this);
	};
	return vm;
});