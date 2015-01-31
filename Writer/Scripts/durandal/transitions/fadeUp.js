define(['durandal/system', './helper'], function (system, helper) {
	var settings = {
		inAnimation: 'fadeInUp',
		outAnimation: 'fadeOutUp'
	},
	fadeUp = function (context) {
		system.extend(context, settings);
		return helper.create(context);
	};
	return fadeUp;
});
