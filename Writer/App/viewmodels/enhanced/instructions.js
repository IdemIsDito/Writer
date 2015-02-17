define([
	'services/globals'
], function (
	globals
) {
	var vm = function () {
		this.imageRoot = globals.imageRoot;
	};
	return vm;
})