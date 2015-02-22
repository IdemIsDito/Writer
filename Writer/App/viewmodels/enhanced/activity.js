define([
	'durandal/app',
	'services/logger',
	'services/context',
	'viewmodels/base/activity'
], function (
	app,
	logger,
	context,
	baseactivity
) {
	var vm = function () {
		var self = this;

		this.views = [
			'enhanced/has-activity',
			'enhanced/imagine',
			'enhanced/title',
			'enhanced/summary',
			'enhanced/situation',
			'enhanced/role',
			'enhanced/persons',
			'enhanced/involved-persons',
			'enhanced/initiation',
			'enhanced/proceedings',
			'enhanced/satisfaction',
			'enhanced/overview'
		];

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

		this.addPerson = function () {
			context.createInvolvedPerson(self.activity().Id());
		};

		this.removePerson = function (person) {
			var n = person.Name();
			app.showMessage('Weet je zeker dat je deze persoon' + (n ? ' <b>(' + n + ')</b>' : '') + ' wilt verwijderen?', 'Weet je het zeker?', ['Ja', 'Nee'])
				.then(function(result){
				if (result === 'Ja') {
					var ip = self.activity().InvolvedPersons,
					personIndex = ip.indexOf(person);
					ip.splice(personIndex, 1);
					person.entityAspect.setDeleted();	
				}
			});
		};

		baseactivity.call(this);
	};
	return vm;
});