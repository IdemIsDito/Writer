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

		this.participant = globals.participant;

		this.participant().InstructionClear.extend({required: { message: "Dit is een verplicht veld." } });
		this.participant().InstructionEffective.extend({ required: { message: "Dit is een verplicht veld." } });

		if (this.participant().ActivityType() === "Enhanced") {
			this.participant().FeedbackClear.extend({ required: { message: "Dit is een verplicht veld." } });
			this.participant().FeedbackEffective.extend({ required: { message: "Dit is een verplicht veld." } });
		}

		this.participant().GoodActivity.extend({ required: { message: "Dit is een verplicht veld." } });

		this.isValid = function () {
			var validate = ko.validation.group(this, { deep: true });
			if (validate().length > 0) {
				validate.showAllMessages(true);
				return false;
			}
			return true;
		};

		this.complete = function () {
			if (this.isValid()) {
				var l = Ladda.create(event.target);
				l.start();
				self.participant().Completed(true);
				context.saveChanges()
					.then(function () {
						router.navigate('#/thanks');
						l.stop();
					})
					.fail(function (error) {
						logger.logError('Error while completing experience', error, 'experience.js-next', true);
						l.stop();
					});
			}
		};
	};
	return vm;
});