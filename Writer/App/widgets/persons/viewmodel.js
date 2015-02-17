define(function() {
	var vm = function () {

		this.involved = ko.observableArray;

		this.activate = function (data) {
			this.involved(data.involved);
		};
	};
	return vm;
})