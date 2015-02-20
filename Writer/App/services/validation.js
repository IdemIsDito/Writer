define(function () {

	return {
		pInitializer: pInitializer,
		caInitializer: caInitializer,
		eaInitializer: eaInitializer,
		ipInitializer: ipInitializer,
	};

/* Private functions */

	function pInitializer(p) {
		p.Age.extend({
			required: {
				message: "Dit is een verplicht veld."
			},
			pattern: {
				message: 'Geef uw leetijd aan met een getal.',
				params: '[0-9]'
			},
			min: {
				params: 18,
				message: "U dient 18 jaar of ouder te zijn om aan dit experiment mee te doen."
			},
			max: {
				params: 100,
				message: "U geeft aan ouder dan 100 te zijn? Dit is waarschijnlijk een typfout."
			},
		});

		p.Email.extend({
			email: {
				message: "Voer een geldig email adres in."
			}
		});

		p.Gender.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		p.MotherLanguageDutch.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		p.EducationCompleted.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		p.SimaExperience.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});
	}

	function caInitializer(ca) {
		ca.Title.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ca.Summary.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ca.Initiation.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ca.Proceedings.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ca.Satisfaction.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});
	}

	function eaInitializer(ea) {
		ea.HasActivity.extend({
			min: {
				params: 1,
				message: "Dit is een verplicht veld."
			},
			max: {
				params: 2,
				message: "Dit is een verplicht veld."
			},
		});

		ea.Title.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ea.Summary.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ea.Situation.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ea.Role.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ea.Persons.extend({
			min: {
				params: 1,
				message: "Dit is een verplicht veld."
			},
			max: {
				params: 2,
				message: "Dit is een verplicht veld."
			},
		});

		ea.Initiation.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ea.Proceedings.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ea.Satisfaction.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});
	}


	function ipInitializer(ip) {
		ip.Name.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});

		ip.Role.extend({
			required: {
				message: "Dit is een verplicht veld."
			}
		});
	}

});