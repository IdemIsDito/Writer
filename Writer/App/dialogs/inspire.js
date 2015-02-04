define([
	'plugins/dialog'
], function (
	dialog
) {
	var inspire = function () {

		this.closeModal = function () {
			dialog.close(this);
		};

	};
	return inspire;
});