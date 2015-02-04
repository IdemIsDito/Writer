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
				context.getClassicStory(id)
					.then(function (data) {
						self.story(data.results[0]);
						logger.logSuccess('Succesful activation', data, 'classic.js-activate', false);
					}).fail(function (error) {
						logger.logError('Error while activate', error, 'classic.js-activate', true);
					});

			} else {
				self.story(context.createClassicStory());
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
			logger.logInfo('Completed', null, 'classic.js-complete', true);
		};
		this.newStory = function () {
			context.newStory();
		};
	};
	return vm;
});