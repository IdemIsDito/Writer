define([
	'services/logger',
	'services/context'
], function (
	logger,
	context
) {
	var vm = function () {
		var self = this;
		this.stories = ko.observableArray();
		this.activate = function () {
			context.getStories()
				.then(function (data) {
					self.stories(data.results);
					logger.logSuccess('Succesful activation', data, 'home.js', true);
				}).fail(function (error) {
					logger.logError('Error while activate', error, 'home.js', true);
				});
		};
		this.newStory = function () {
			context.newStory();
		};
		this.save = function () {
			context.saveChanges();
		};
	};
	return vm;
});