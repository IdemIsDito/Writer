define([
	'plugins/router',
	'services/context',
	'services/globals',
	'services/logger'
], function (
	router,
	context,
	globals,
	logger
) {
	var vm = function () {
		var self = this;

		this.genderOptions = ['Man', 'Vrouw'];
		this.educationCompletedOptions = [
			'Lager onderwijs/ basisonderwijs',
			'LBO',
			'MAVO/ VMBO',
			'MULO',
			'MBO',
			'HAVO',
			'VWO',
			'HBO',
			'Universiteit',
			'Anders...'
		];

		this.imageRoot = globals.imageRoot;

		this.participant = globals.participant;

		this.EducationCompletedIsDifferent = ko.computed(function () {
			if (self.participant()) {
				return self.participant().EducationCompleted() === 'Anders...';
			}
			return false;
		});

		this.participant().EducationCompletedDifferent.extend({
			required: {
				message: "Dit is een verplicht veld.",
				onlyIf: function () {
					return self.EducationCompletedIsDifferent();
				}
			}
		});

		this.isValid = function () {
			var validate = ko.validation.group(this, { deep: true });
			if (validate().length > 0) {
				validate.showAllMessages(true);
				return false;
			}
			return true;
		};

		this.next = function (bindingContext, event) {
			if (this.isValid()) {
				var l = Ladda.create(event.target).start();
				context.saveChanges()
					.then(function () {
						l.stop();
						router.navigate('#/instructions');
						logger.logSuccess('Succesful save', null, 'demograpics.js-next', false);
					}).fail(function (error) {
						l.stop();
						logger.logError('Error while saving', error, 'demograpics.js-next', true);
					}).fin();
			}
		};
	};
	return vm;
});