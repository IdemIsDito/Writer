define([
	'config',
	'services/logger',
	'services/context'
], function (
	config,
	logger,
	context
) {
	var vm = function () {
		var self = this;
		this.views = [
			'first',
			'second',
			'summary'
		];
		this.story = ko.observableArray();
		this.activeView = ko.observable(this.views[0]);
		this.activateView = function (viewName) {
			self.activeView(viewName);
		};
		this.activate = function (id) {
			if (id) {
				context.getEnhancedActivityByParticipant(id)
					.then(function (data) {
						self.story(data.results[0]);
						logger.logSuccess('Succesful activation', data, 'enhanced.js-activate', false);
					}).fail(function (error) {
						logger.logError('Error while activate', error, 'enhanced.js-activate', true);
					});

			} else {
				self.story(context.enhancedActivity());
			}
		};
		this.bindingComplete = function (view) {
			$(view)
				.find('.indicator')
				.tooltip({
					placement: 'right'
				});
		};
		this.getChildView = function (direction) {
			var activeViewPos = self.views.indexOf(self.activeView()),
				directionInt = direction === 'next' ? 1 : -1;
			return self.views[activeViewPos + directionInt];
		};
		this.prev = function () {
			context.saveChanges()
				.then(function () {
					self.activeView(self.getChildView('prev'));
				})
				.fail(function (error) {
					logger.logError('Error while navigate prev', error, 'enhanced.js-prev', true);
				});
		};
		this.next = function () {
			context.saveChanges()
				.then(function () {
					self.activeView(self.getChildView('next'));
				})
				.fail(function (error) {
					logger.logError('Error while navigating next', error, 'enhanced.js-next', true);
				});
		};
		this.complete = function () {
			logger.logInfo('Completed', null, 'enhanced.js-complete', true);
		};
		this.newActivity = function () {
			context.newActivity();
		};
	};
	return vm;
});