define(['Q', 'breeze', 'config', 'services/logger'], function (Q, breeze, config, logger) {

	var serviceUrl = config.breezeRoot + 'data',
		manager = new breeze.EntityManager(serviceUrl),
		initialized = false;

	return {
		initialize: initialize,
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
