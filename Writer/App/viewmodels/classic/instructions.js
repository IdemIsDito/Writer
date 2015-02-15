define([
	'services/globals'
], function (
	globals
) {
	var vm = function () {
		this.title = "Instructies";
		this.imageRoot = globals.imageRoot;
	};
	return vm;
})