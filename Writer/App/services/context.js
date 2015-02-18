define([
	'Q',
	'breeze',
	'config',
	'services/globals',
	'services/logger'
], function (
	Q,
	breeze,
	config,
	globals,
	logger
) {
	var serviceUrl = config.breezeRoot + 'data',
		manager = new breeze.EntityManager(serviceUrl),
		store = manager.metadataStore;
		initialized = false;

	store.registerEntityTypeCtor('Participant', null, pInitializer);
	store.registerEntityTypeCtor('ClassicActivity', null, caInitializer);
	store.registerEntityTypeCtor('EnhancedActivity', null, eaInitializer);
	store.registerEntityTypeCtor('InvolvedPerson', null, ipInitializer);

	return {
		initialize : initialize,
		getParticipantByGuid : getParticipantByGuid,
		createClassicActivity : createClassicActivity,
		getClassicActivityByParticipant : getClassicActivityByParticipant,
		createEnhancedActivity: createEnhancedActivity,
		getEnhancedActivityByParticipant: getEnhancedActivityByParticipant,
		createInvolvedPerson : createInvolvedPerson,
		hasChanges : hasChanges,
		saveChanges : saveChanges
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
		p.Email.extend({ email: { message: "Voer een geldig email adres in." } });
		p.Gender.extend({ required: { message: "Dit is een verplicht veld." } });
		p.MotherLanguageDutch.extend({ required: { message: "Dit is een verplicht veld." } });
		p.EducationCompleted.extend({ required: { message: "Dit is een verplicht veld." } });
		p.SimaExperience.extend({ required: { message: "Dit is een verplicht veld." } });
	}

	function caInitializer(ca) {
		ca.Title.extend({ required: { message: "Dit is een verplicht veld." } });
		ca.Summary.extend({ required: { message: "Dit is een verplicht veld." } });
		ca.Initiation.extend({ required: { message: "Dit is een verplicht veld." } });
		ca.Proceedings.extend({ required: { message: "Dit is een verplicht veld." } });
		ca.Satisfaction.extend({ required: { message: "Dit is een verplicht veld." } });
	}

	function eaInitializer(ea) {
		ea.HasActivity.extend({ required: { message: "Dit is een verplicht veld." } });
		ea.Title.extend({ required: { message: "Dit is een verplicht veld." } });
		ea.Situation.extend({ required: { message: "Dit is een verplicht veld." } });
		ea.Persons.extend({ required: { message: "Dit is een verplicht veld." } });
		ea.Initiation.extend({ required: { message: "Dit is een verplicht veld." } });
		ea.Proceedings.extend({ required: { message: "Dit is een verplicht veld." } });
		ea.Satisfaction.extend({ required: { message: "Dit is een verplicht veld." } });
	}

	function ipInitializer(ip) {
		ip.Name.extend({ required: { message: "Dit is een verplicht veld." } });
		ip.Role.extend({ required: { message: "Dit is een verplicht veld." } });
	}

	function initialize() {
		if (!initialized) {
			initialized = true;
			return manager.fetchMetadata();
		}
		return Q.resolve();
	}

	function getParticipantByGuid(guid) {
		var q = breeze.EntityQuery.from("Participants")
			.where("Guid", "==", guid);
		return manager.executeQuery(q);
	}

	function createClassicActivity() {
		return manager.createEntity('ClassicActivity', {
			StartTime : new Date(),
			ParticipantId: globals.participant().Id()
		});
	}

	function getClassicActivityByParticipant() {
		var q = breeze.EntityQuery.from("ClassicActivities")
			.where("ParticipantId", "==", globals.participant().Id());
		return manager.executeQuery(q);
	}

	function createEnhancedActivity() {
		return manager.createEntity('EnhancedActivity', {
			StartTime: new Date(),
			ParticipantId: globals.participant().Id()
		});
	}
	function getEnhancedActivityByParticipant() {
		var q = breeze.EntityQuery.from("EnhancedActivities")
			.where("ParticipantId", "==", globals.participant().Id())
			.expand("InvolvedPersons");
		return manager.executeQuery(q);
	}
	function createInvolvedPerson(enhancedActivityId) {
		return manager.createEntity('InvolvedPerson', {
			EnhancedActivityId: enhancedActivityId
		});
	}
	function hasChanges() {
		return manager.hasChanges();
	}

	function saveChanges() {
		if (manager.hasChanges()) {
			return manager.saveChanges();
		} else {
			logger.logInfo("Nothing to save", null, null, false);
			return Q.resolve();
		};
	}
});
