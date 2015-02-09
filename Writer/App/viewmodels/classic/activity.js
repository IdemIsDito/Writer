define([
	'services/globals',
	'services/logger',
	'services/context'
], function (
	globals,
	logger,
	context
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
		this.activity = ko.observable();
		this.activeView = ko.observable(this.views[0]);
		this.activateView = function (viewName) {
			self.activeView(viewName);
		};
		this.activate = function () {
			context.getClassicStoryByParticipant()
				.then(function (data) {
					if (data.results.length > 0) {
						self.activity(data.results[0]);
					} else {
						self.activity(context.createClassicStory());
					}
					logger.logSuccess('Succesful activation', data, 'classic.js-activate', false);
				}).fail(function (error) {
					logger.logError('Error while activate', error, 'classic.js-activate', true);
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
					logger.logError('Error while navigate prev', error, 'classic.js-prev', true);
				});
		};
		this.next = function () {
			context.saveChanges()
				.then(function () {
					self.activeView(self.getChildView('next'));
				})
				.fail(function (error) {
					logger.logError('Error while navigating next', error, 'classic.js-next', true);
				});
		};
		this.complete = function () {
			this.activity().Completed(true);
			context.saveChanges();
		};
		this.newStory = function () {
			context.newStory();
		};
	};
	return vm;
});