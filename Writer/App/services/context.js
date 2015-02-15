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
		initialized = false;

	return {
		initialize: initialize,
		getParticipantByGuid: getParticipantByGuid,
		createClassicActivity: createClassicActivity,
		getClassicActivityByParticipant: getClassicActivityByParticipant,
		hasChanges: hasChanges,
		saveChanges: saveChanges
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
