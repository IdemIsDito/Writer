define([
	'breeze',
	'plugins/router',
	'services/context',
	'services/globals',
	'services/logger'
], function (
	breeze,
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

		this.participant = globals.participant;

		this.participant().Age.extend({
			required: {
				 message: "Dit is een verplicht veld."
			},
			min: {
				params: 18,
				message: "U dient 18 jaar of ouder te zijn om aan dit experiment mee te doen."
			},
			max: {
				params: 100,
				message: "U geeft aan ouder dan 100 te zijn? Dit is waarschijnlijk een typfout."
			}
		});
		this.participant().Gender.extend({ required: { message: "Dit is een verplicht veld." } });
		this.participant().MotherLanguageDutch.extend({ required: { message: "Dit is een verplicht veld." } });
		this.participant().EducationCompleted.extend({ required: { message: "Dit is een verplicht veld." } });
		this.participant().SimaExperience.extend({ required: { message: "Dit is een verplicht veld." } });

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

		this.next = function () {
			if (this.isValid()) {
				context.saveChanges()
					.then(function () {
						router.navigate('#/instructions');
						logger.logSuccess('Succesful save', null, 'demograpics.js-next', false);
					}).fail(function (error) {
						logger.logError('Error while saving', error, 'demograpics.js-next', true);
					});
			}
		};
	};
	return vm;
});