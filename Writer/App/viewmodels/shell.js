define([
	'services/globals',
	'plugins/router'
], function (
	globals,
	router
) {
	var vm = function () {
		this.router = router;

		this.mapRouter = function () {
			var routes = [];

			ko.utils.arrayPushAll(routes, [
				{ route: ['', '(verdergaan/:guid)'], moduleId: 'viewmodels/welcome', title: 'Welkom', nav: false},
				{ route: 'demographics', moduleId: 'viewmodels/demographics', title: 'Demografische gegevens', nav: false }
			]);

			if (globals.storyType === 'ClassicStories') {
				ko.utils.arrayPushAll(routes, [
					{ route: 'instructions', moduleId: 'viewmodels/classic/instructions', title: 'Home', nav: false },
					{ route: 'story(/:guid)', moduleId: 'viewmodels/classic/story', title: 'Story Writer', nav: false }
				]);
			} else {
				ko.utils.arrayPushAll(routes, [
					{ route: 'instructions', moduleId: 'viewmodels/enhanced/instructions', title: 'Instructions', nav: false },
					{ route: 'story(/:guid)', moduleId: 'viewmodels/enhanced/story', title: 'Story Writer', nav: false }
				]);
			}

			router
				.map(routes)
				.buildNavigationModel()
				.mapUnknownRoutes('viewmodels/404', '404-page-not-foud');
		};

		this.activate = function () {
			this.mapRouter();
			return this.router.activate();
		};
	};
	return vm;
});