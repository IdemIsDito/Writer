define(['durandal/system'],
    function (system) {
    	var logger = {
    		logInfo: logInfo,
    		logSuccess: logSuccess,
    		logWarning: logWarning,
    		logError: logError
    	};
    	return logger;

    	function logInfo(message, data, source, showToast) {
    		logIt(message, data, source, showToast, 'info');
    	}
    	function logSuccess(message, data, source, showToast) {
    		logIt(message, data, source, showToast, 'success');
    	}
    	function logWarning(message, data, source, showToast) {
    		logIt(message, data, source, showToast, 'warning');
    	}
    	function logError(message, data, source, showToast) {
    		logIt(message, data, source, showToast, 'error');
    	}
    	function logIt(message, data, source, showToast, toastType) {
    		source = source ? '[' + source + '] ' : '';
    		if (data) {
    			system.log(source, message, data);
    		} else {
    			system.log(source, message);
    		}
    		if (showToast) {
    			switch (toastType) {
    				case 'info':
    					toastr.info(message);
    					break;
    				case 'success':
    					toastr.success(message);
    					break;
    				case 'warning':
    					toastr.warning(message);
    					break;
    				case 'error':
    					toastr.error(message);
    					break;
    				default:
    					toastr.info(message);
    			}
    		}
    	}
    });