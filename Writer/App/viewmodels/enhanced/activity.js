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
			'enhanced/has-activity',
			'enhanced/imagine',
			'enhanced/title',
			'enhanced/situation',
			'enhanced/summary',
			'enhanced/persons',
			'enhanced/involved-persons',
			'enhanced/initiation',
			'enhanced/proceedings',
			'enhanced/satisfaction',
			'enhanced/overview'
		];

		this.activity = ko.observable();

		this.activeView = ko.observable(this.views[0]);

		this.activateView = function (viewName) {
			self.prepareView(viewName);
			self.activeView(viewName);
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
		this.activate = function () {
			context.getEnhancedActivityByParticipant()
				.then(function (data) {
					if (data.results.length > 0) {
						self.activity(data.results[0]);
					} else {
						self.activity(context.createEnhancedActivity());
					}
					logger.logSuccess('Succesful activation', data, 'enhanced/activity.js-activate', false);
				}).fail(function (error) {
					logger.logError('Error while activate', error, 'enhanced/activity.js-activate', true);
				});
		};

		this.getChildView = function (direction) {
			var activeViewPos = self.views.indexOf(self.activeView()),
				directionInt = direction === 'next' ? 1 : direction === 'skip-next' ? 2 : direction === 'skip-prev' ? -2 : -1;
			return self.views[activeViewPos + directionInt];
		};
		this.addPerson = function () {
			context.createInvolvedPerson(self.activity().Id());
		};
		this.removePerson = function (person) {
			app.showMessage('Weet je zeker dat je deze persoon (<b>'+ person.Name() +'</b>) wilt verwijderen?', 'Weet je het zeker?', ['Ja', 'Nee'])
				.then(function(result){
				if (result == 'Ja') {
					var ip = self.activity().InvolvedPersons,
					personIndex = ip.indexOf(person);
					ip.splice(personIndex, 1);
					person.entityAspect.setDeleted();	
				}
			});
		};
		this.prev = function (bindingContext, event) {
			var l = Ladda.create(event.target);
			l.start();
			context.saveChanges()
				.then(function () {
					self.activateView(self.getChildView(self.whatIsPrev()));
					l.stop();
				})
				.fail(function (error) {
					logger.logError('Error while navigating prev', error, 'enhanced/activity.js-prev', true);
					l.stop();
				});
		};

		this.next = function (bindingContext, event) {
			if (this.stepIsValid()) {
				var l = Ladda.create(event.target);
				l.start();
				context.saveChanges()
					.then(function () {
						self.activateView(self.getChildView(self.whatIsNext()));
						l.stop();
					})
					.fail(function (error) {
						logger.logError('Error while navigating next', error, 'enhanced/activity.js-next', true);
						l.stop();
					});
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
			case 'enhanced/has-activity':
				return validate(this.activity().HasActivity);
			case 'enhanced/imagine':
				return true;
			case 'enhanced/title':
				return validate(this.activity().Title);
			case 'enhanced/situation':
				return validate(this.activity().Situation);
			case 'enhanced/summary':
					return validate(this.activity().Summary);
			case 'enhanced/persons':
				return validate(this.activity().Persons);
				case 'enhanced/involved-persons':
					var e = 0,
						ips = this.activity().InvolvedPersons();
					for (var j = 0; j < ips.length; j++) {
						!validate(ips[j]) ? e++ : e=e;
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
					logger.logError('Error while navigating next', error, 'enhanced/activity.js-next', true);
					l.stop();
				});
		};

		this.checkSentiment = function (text) {
			$.ajax({
				type: "POST",
				url: "https://japerk-text-processing.p.mashape.com/sentiment/",
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-Mashape-Key', 'dyDo5R3lphmshMhp1pl8iVQWUN2gp1rBidkjsnw64NSr8ZdB2d');
				},
				contentType: 'application/x-www-form-urlencoded',
				dataType: 'json',
				data: {
					'language': 'dutch',
					'text': text
				}
			}).done(function (data) {
				//do something with data;
			});
		};
	};
	return vm;
});