define([
	'services/globals'
], function (
	globals
) {
	var vm = function () {
		var self = this;

		this.imageRoot = globals.imageRoot;

		this.views = [
			'classic/instructions/first',
			'classic/instructions/second',
			'classic/instructions/third',
			'classic/instructions/fourth',
			'classic/instructions/fifth'
		];

		this.activeView = ko.observable(this.views[0]);

		this.getChildView = function (direction) {
			var activeViewPos = self.views.indexOf(self.activeView()),
				directionInt = direction === 'next' ? 1 : -1;
			return self.views[activeViewPos + directionInt];
		};

		this.next = function () {
			self.activeView(self.getChildView('next'));
		};

		this.prev = function () {
			self.activeView(self.getChildView('prev'));
		};

	};
	return vm;
})