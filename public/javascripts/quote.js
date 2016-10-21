(function() {
	$(document).ready(function() {

	    	$.post(location + 'XML', {})
	    	.done(function(gasXML) {
	    		console.log(gasXML);
	    	})
	    	.fail(function(error) {
	    		console.log(error);
	    	});
	    });
})();