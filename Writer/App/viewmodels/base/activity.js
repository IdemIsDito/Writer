﻿define([
	'plugins/router',
	'services/globals',
	'services/logger',
	'services/context'
], function (
	router,
	globals,
	logger,
	context
) {
	var base = function () {
		var self = this;

		this.imageRoot = globals.imageRoot;

		this.activity = ko.observable();

		this.activeView = ko.observable(this.views[0]);

		this.proceedingsChecksVisible = ko.observable(false);
		this.satisfactionChecksVisible = ko.observable(false);
		this.overviewChecksVisible = ko.observable(false);

		this.activateView = function (viewName) {
			self.prepareView(viewName);
			self.activeView(viewName);
		};

		this.complete = function (bindingContext, event) {
			var l = Ladda.create(event.target).start();
			self.activity().EndTime(new Date());
			context.saveChanges()
				.then(function () {
					router.navigate('#/ervaring');
					l.stop();
				})
				.fail(function (error) {
					logger.logError('Error while completing activity', error, 'base/activity.js-next', true);
					l.stop();
				});
		};

		this.check = function () {
			switch (self.activeView()) {
			case 'enhanced/proceedings':
				self.proceedingsChecksVisible(true);
				self.activity().ProceedingsIsChecked(true);
				break;
			case 'enhanced/satisfaction':
				self.satisfactionChecksVisible(true);
				self.activity().SatisfactionIsChecked(true);
				break;
			case 'enhanced/overview':
				self.overviewChecksVisible(true);
				self.activity().OverviewIsChecked(true);
				break;
			}
		};

		this.getChildView = function (direction) {
			var activeViewPos = self.views.indexOf(self.activeView()),
				directionInt = direction === 'next' ? 1 : direction === 'skip-next' ? 2 : direction === 'skip-prev' ? -2 : -1;
			return self.views[activeViewPos + directionInt];
		};

		this.next = function (bindingContext, event) {
			if (this.stepIsValid()) {
				var l = Ladda.create(event.target).start();
				context.saveChanges()
					.then(function () {
						self.activateView(self.getChildView(self.whatIsNext()));
						l.stop();
					})
					.fail(function (error) {
						logger.logError('Error while navigating next', error, 'base/activity.js-next', true);
						l.stop();
					});
			}
		};


		this.prepareView = function (viewName) {
			switch (viewName) {
			case 'enhanced/involved-persons':
				var ips = self.activity().InvolvedPersons();
				if (ips.length === 0) {
					ips.push(context.createInvolvedPerson(self.activity().Id()));
					break;
				}
				break;
			}
		};

		this.prev = function (bindingContext, event) {
			var l = Ladda.create(event.target).start();
			context.saveChanges()
				.then(function () {
					self.activateView(self.getChildView(self.whatIsPrev()));
					l.stop();
				})
				.fail(function (error) {
					logger.logError('Error while navigating prev', error, 'base/activity.js-prev', true);
					l.stop();
				});
		};

		this.progress = ko.computed(function () {
			var av = self.activeView();
			return av ? (100 / self.views.length) * self.views.indexOf(av) : 0;
		});

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
			case 'enhanced/has-activity':
				return validate(this.activity().HasActivity);
			case 'enhanced/imagine':
				return true;
			case 'enhanced/title':
				return validate(this.activity().Title);
			case 'enhanced/situation':
				return validate(this.activity().Situation);
			case 'enhanced/role':
				return validate(this.activity().Role);
			case 'enhanced/summary':
				return validate(this.activity().Summary);
			case 'enhanced/persons':
				return validate(this.activity().Persons);
			case 'enhanced/involved-persons':
				var e = 0,
					ips = this.activity().InvolvedPersons();
				for (var j = 0; j < ips.length; j++) {
					!validate(ips[j]) ? e++ : e = e;
				}
				return e > 0 ? false : true;
			case 'enhanced/initiation':
				return validate(this.activity().Initiation);
			case 'enhanced/proceedings':
				return validate(this.activity().Proceedings);
			case 'enhanced/satisfaction':
				return validate(this.activity().Satisfaction);
			}
		};

		this.whatIsNext = function () {
			switch (this.activeView()) {
			case 'enhanced/has-activity':
				return this.activity().HasActivity() == 1 ? 'skip-next' : 'next';
			case 'enhanced/persons':
				return this.activity().Persons() == 2 ? 'skip-next' : 'next';
			default:
				return 'next';
			}
		};

		this.whatIsPrev = function () {
			switch (this.activeView()) {
			case 'enhanced/title':
				return this.activity().HasActivity() == 1 ? 'skip-prev' : 'prev';
			case 'enhanced/initiation':
				return this.activity().Persons() == 2 ? 'skip-prev' : 'prev';
			default:
				return 'prev';
			}
		};
	};
	return base;
})