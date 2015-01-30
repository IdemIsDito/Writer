define(['Q', 'breeze', 'config', 'services/logger'], function (Q, breeze, config, logger) {

	var serviceUrl = config.breezeRoot + 'data',
		manager = new breeze.EntityManager(serviceUrl),
		initialized = false;

	return {
		initialize: initialize,
		newStory: newStory,
		getStory: getStory,
		getStories: getStories,
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
	function newStory() {
		return manager.createEntity('Story');
	}
	function getStory(id) {
		var q = breeze.EntityQuery.from("Stories")
			.where("Id", "==", id);
		return manager.executeQuery(q);
	}
	function getStories() {
		var q = breeze.EntityQuery.from("Stories");
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
			logger.logInfo("Nothing to save", null, null, true);
		};
	}
});
