define([
	'durandal/system',
	'./helper'
], function (
	system,
	helper
) {
	var settings = {
			inAnimation: 'zoomIn',
			outAnimation: 'zoomOut'
		},
		zoom = function (context) {
			system.extend(context, settings);
			return helper.create(context);
		};
	return zoom;
});
