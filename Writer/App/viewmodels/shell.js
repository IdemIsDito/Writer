define([
	'config',
	'plugins/router'
], function (
	config,
	router
) {
	var vm = function () {
		this.router = router;
		this.mapRouter = function () {
			var routes = [];
			ko.utils.arrayPushAll(routes, [
                { route: ['','home(/:id)'], moduleId: 'viewmodels/home', title: 'Home', nav: true }
			]);
			router
				.map(routes)
				.buildNavigationModel()
				.mapUnknownRoutes('viewmodels/404', '404-page-not-foud');
		};
		this.activate = function (bla) {
			this.mapRouter();
			return this.router.activate();
		};
	};
	return vm;
});