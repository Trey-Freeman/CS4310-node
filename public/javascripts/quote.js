(function() {
	$(document).ready(function() {

	    	$.post(location + 'XML', {})
	    	.done(function(gasXML) {

	    		var suggestions = gasXML;

	    		console.log(33333);
	    		console.log(gasXML);
	    	})
	    	.fail(function(error) {
	    		console.log(error);
	    	});
	    });
})();