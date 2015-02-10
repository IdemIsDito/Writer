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
					self.initValidation();
				}).fail(function (error) {
					logger.logError('Error while activate', error, 'classic.js-activate', true);
				});
		};
		this.initValidation = function () {
			this.activity().Title.extend({ required: { message: "Dit is een verplicht veld." } });
			this.activity().Summary.extend({ required: { message: "Dit is een verplicht veld." } });
			this.activity().Initiation.extend({ required: { message: "Dit is een verplicht veld." } });
			this.activity().Proceedings.extend({ required: { message: "Dit is een verplicht veld." } });
			this.activity().Satisfaction.extend({ required: { message: "Dit is een verplicht veld." } });
		};
		this.getChildView = function (direction) {
			var activeViewPos = self.views.indexOf(self.activeView()),
				directionInt = direction === 'next' ? 1 : -1;
			return self.views[activeViewPos + directionInt];
		};

		this.prev = function () {
			if (this.stepIsValid()) {
				context.saveChanges()
					.then(function () {
						self.activeView(self.getChildView('prev'));
					})
					.fail(function (error) {
						logger.logError('Error while navigate prev', error, 'classic.js-prev', true);
					});
			}
		};

		this.next = function () {
			if (this.stepIsValid()) {
				context.saveChanges()
					.then(function () {
						self.activeView(self.getChildView('next'));
					})
					.fail(function (error) {
						logger.logError('Error while navigating next', error, 'classic.js-next', true);
					});
			}
		};
		this.stepIsValid = function () {
			var validate = function (field) {
				var valid = ko.validation.group(field);
				if (valid().length > 0) {
					valid.showAllMessages(true);
					return false;
				}
				return true;
			};
			switch (this.activeView()) {
				case 'classic/title':
					return validate(this.activity().Title);
				case 'classic/summary':
					return validate(this.activity().Summary);
				case 'classic/initiation':
					return validate(this.activity().Initiation);
				case 'classic/proceedings':
					return validate(this.activity().Proceedings);
				case 'classic/satisfaction':
					return validate(this.activity().Satisfaction);
			}
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