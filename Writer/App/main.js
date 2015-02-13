requirejs.config({
	paths: {
		'text': '../Scripts/text',
		'durandal': '../Scripts/durandal',
		'plugins': '../Scripts/durandal/plugins',
		'transitions': '../Scripts/durandal/transitions',
		'breeze': '../Scripts/breeze.debug',
		'Q': '../Scripts/q'

	},
	urlArgs: scriptCache ? undefined : "bust=" + new Date().getTime()
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define([
	'durandal/system',
	'durandal/app',
	'durandal/viewLocator',
	'config',
	'services/globals',
	'services/context'
], function (
	system,
	app,
	viewLocator,
	config,
	globals,
	context
) {
	ko.utils.extend(globals, config);
	ko.validation.init({
		errorElementClass: 'has-error',
		errorMessageClass: 'help-block',
	});

	ko.bindingHandlers.radioButtonGroupChecked = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = valueAccessor();
			var newValueAccessor = function () {
				return {
					change: function () {
						value(element.value);
					}
				};
			};
			if ($(element).val() == ko.unwrap(valueAccessor())) {
				$(element).closest('.btn').button('toggle');
			}
			ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, viewModel, bindingContext);
		}
	};

	system.debug(globals.debug);

	app.title = 'SIMA Writer';

	app.configurePlugins({
		router: true,
		dialog: true,
		widget : {
			kinds: ['likert']
		}
	});

	context.initialize()
		.then(app.start())
		.then(function () {
			viewLocator.useConvention();
			app.setRoot('viewmodels/shell');
		});
});