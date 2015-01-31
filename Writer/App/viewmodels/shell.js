define(['plugins/router'], function (router) {
	var vm = function () {
		this.router = router;
		this.mapRouter = function () {
			var routes = [];
			ko.utils.arrayPushAll(routes, [
                { route: '', moduleId: 'viewmodels/home', title: 'Home', nav: true },
                { route: '', moduleId: 'viewmodels/test', title: 'Test', nav: true }
			]);
			router
				.map(routes)
				.buildNavigationModel();
				.mapUnknownRoutes('hello/index', 'not-found');
		};
		this.activate = function () {
			this.mapRouter();
			return this.router.activate();
		};
	};
	return vm;
});