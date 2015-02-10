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
		createClassicStory: createClassicStory,
		getClassicStoryByParticipant: getClassicStoryByParticipant,
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

	function createClassicStory() {
		return manager.createEntity('ClassicStory', {
			ParticipantId: globals.participant().Id()
		});
	}

	function getClassicStoryByParticipant() {
		var q = breeze.EntityQuery.from("ClassicStories")
			.where("ParticipantId", "==", globals.participant().Id());
		return manager.executeQuery(q);
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
