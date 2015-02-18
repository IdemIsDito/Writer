define([
	'durandal/app',
	'plugins/router',
	'services/globals',
	'services/logger',
	'services/context'
], function (
	app,
	router,
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
		this.getChildView = function (direction) {
			var activeViewPos = self.views.indexOf(self.activeView()),
				directionInt = direction === 'next' ? 1 : -1;
			return self.views[activeViewPos + directionInt];
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
		this.complete = function (bindingContext, event) {
			var l = Ladda.create(event.target);
			l.start();
			this.activity().EndTime(new Date());
			context.saveChanges()
				.then(function () {
					router.navigate('#/experience');
					l.stop();
				})
				.fail(function (error) {
					logger.logError('Error while navigating next', error, 'classic/activity.js-next', true);
					l.stop();
				});
		};
	};
	return vm;
});