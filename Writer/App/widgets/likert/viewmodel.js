define(function() {
	var vm = function () {
		this.activate = function (data) {
			this.name = data.name;
			this.field = data.field;
		};
	};
	return vm;
})