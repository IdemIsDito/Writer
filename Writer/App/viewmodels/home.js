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
						logger.logSuccess('Succesful activation', data, 'home.js', false);
					}).fail(function (error) {
						logger.logError('Error while activate', error, 'home.js', true);
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
					logger.logError('Error while navigate prev', error, 'home.js-this.prev', true);
				});
		};
		this.next = function () {
			context.saveChanges()
				.then(function () {
					self.activeView(self.getChildView('next'));
				})
				.fail(function (error) {
					logger.logError('Error while navigating next', error, 'home.js-this.prev', true);
				});
		};
		this.complete = function () {
			logger.logInfo('Completed', null, 'home.js-this.complete', true);
		};
		this.newStory = function () {
			context.newStory();
		};
	};
	return vm;
});