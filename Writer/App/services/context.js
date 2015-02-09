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
		createParticipant: createParticipant,
		createClassicStory: createClassicStory,
		getClassicStoryByParticipant: getClassicStoryByParticipant,
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

	function createParticipant() {
		var storyType = getStoryTypeForAssignment();
		return manager.createEntity('Participant', {
			Guid: breeze.core.getUuid(),
			StoryType: storyType
	});
	}
	function getStoryTypeForAssignment() {
		var storyType;
		$.ajax({
			url: serviceUrl + '/GetStoryTypeForAssignment',
			success: function(data) {
				storyType = data;
			},
			async:false
		});
		return storyType;
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
	function hasChanges() {
		return manager.hasChanges();
	};
	function saveChanges() {
		if (manager.hasChanges()) {
			return manager.saveChanges();
		} else {
			logger.logInfo("Nothing to save", null, null, false);
			return Q.resolve();
		};
	}
});
