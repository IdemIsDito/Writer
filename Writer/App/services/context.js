﻿define(['Q', 'breeze', 'config', 'services/logger'], function (Q, breeze, config, logger) {

	var serviceUrl = config.breezeRoot + 'data',
		manager = new breeze.EntityManager(serviceUrl),
		initialized = false;

	return {
		initialize: initialize,
		getParticipantByGuid: getParticipantByGuid,
		createParticipant: createParticipant,
		createClassicStory: createClassicStory,
		getClassicStory: getClassicStory,
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
		return manager.createEntity('ClassicStory');
	}
	function getClassicStory(id) {
		var q = breeze.EntityQuery.from("ClassicStories")
			.where("Id", "==", id);
		return manager.executeQuery(q);
	}
	function saveChanges() {
		if (manager.hasChanges()) {
			return manager.saveChanges()
				.then(function () {
					logger.logSuccess("Save succesful", null, null, true);
				})
				.fail(function (error) {
					logger.logError("Save succesful", error, null, true);
				});
		} else {
			logger.logInfo("Nothing to save", null, null, false);
			return Q.resolve();
		};
	}
});
