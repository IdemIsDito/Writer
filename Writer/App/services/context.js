define([
	'Q',
	'breeze',
	'config',
	'services/globals',
	'services/validation',
	'services/logger'
], function (
	Q,
	breeze,
	config,
	globals,
	validation,
	logger
) {
	var serviceUrl = config.breezeRoot + 'data',
		manager = new breeze.EntityManager(serviceUrl),
		store = manager.metadataStore,
		initialized = false;

	store.registerEntityTypeCtor('Participant', null, validation.pInitializer);
	store.registerEntityTypeCtor('ClassicActivity', null, validation.caInitializer);
	store.registerEntityTypeCtor('EnhancedActivity', null, validation.eaInitializer);
	store.registerEntityTypeCtor('InvolvedPerson', null, validation.ipInitializer);

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
