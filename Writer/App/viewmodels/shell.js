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
				{ route: '', moduleId: 'viewmodels/welcome', title: 'Welkom', nav: false},
				{ route: 'demographics', moduleId: 'viewmodels/demographics', title: 'Demografische gegevens', nav: false }
			]);

			if (globals.participant().StoryType() === 'ClassicStories') {
				ko.utils.arrayPushAll(routes, [
					{ route: 'instructions', moduleId: 'viewmodels/classic/instructions', title: 'Instructions', nav: false },
					{ route: 'story', moduleId: 'viewmodels/classic/story', title: 'Activity Writer', nav: false }
				]);
			} else {
				ko.utils.arrayPushAll(routes, [
					{ route: 'instructions', moduleId: 'viewmodels/enhanced/instructions', title: 'Instructions', nav: false },
					{ route: 'story', moduleId: 'viewmodels/enhanced/story', title: 'Activity Writer', nav: false }
				]);
			}

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
			if (globals.participantGuid) {
				context.getParticipantByGuid(globals.participantGuid)
					.then(function (data) {
						globals.participant(data.results[0]);
					})
					.then(function () {
						return self.activateRouter();
					});
			} else {
				globals.participant(context.createParticipant());
				context.saveChanges()
					.then(function () {
						return self.activateRouter();
				});
			}
		};
	};
	return vm;
});