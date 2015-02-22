define([
	'services/globals',
	'services/context',
	'services/logger',
	'plugins/router'
], function (
	globals,
	context,
	logger,
	router
) {
	var vm = function () {
		var self = this;

		this.router = router;

		this.mapRouter = function () {
			var routes = [];

			ko.utils.arrayPushAll(routes, [
				{ route: '', moduleId: 'viewmodels/welcome', title: 'Welkom', nav: true},
				{ route: 'demografie', moduleId: 'viewmodels/demographics', title: 'Demografische gegevens', nav: true }
			]);

			if (globals.participant().ActivityType() === 'Classic') {
				ko.utils.arrayPushAll(routes, [
					{ route: 'instructies', moduleId: 'viewmodels/classic/instructions', title: 'Instructies', nav: true },
					{ route: 'activiteit', moduleId: 'viewmodels/classic/activity', title: 'Activiteit', nav: true }
				]);
			} else {
				ko.utils.arrayPushAll(routes, [
					{ route: 'instructies', moduleId: 'viewmodels/enhanced/instructions', title: 'Instructions', nav: true },
					{ route: 'activiteit', moduleId: 'viewmodels/enhanced/activity', title: 'Activiteit', nav: true }
				]);
			}
			ko.utils.arrayPushAll(routes, [
				{ route: 'ervaring', moduleId: 'viewmodels/experience', title: 'Ervaringen', nav: true },
				{ route: 'bedankt', moduleId: 'viewmodels/thanks', title: 'Bedankt', nav: true }
			]);
			router
				.map(routes)
				.buildNavigationModel()
				.mapUnknownRoutes('viewmodels/404', '404-page-not-foud');
		};

		this.activateRouter = function () {
			this.mapRouter();
			return this.router.activate();
		};
		this.activate = function () {
			context.getParticipantByGuid(globals.participantGuid)
				.then(function (data) {
					globals.participant(data.results[0]);
				})
				.then(function () {
					return self.activateRouter();
				});
		};
	};
	return vm;
});