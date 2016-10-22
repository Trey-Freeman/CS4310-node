(function() {
	$(document).ready(function() {
		// Demonstrate parsing an in-memory XML string
		var xmlString = '<suggestions><book title="Twilight"/><book title="Twister"/></suggestions>'
	    var xml = $.parseXML(xmlString, 'text/xml');
	    var $xml = $(xml);
	    console.log($xml.find('book')[0].attributes.title);
	});
})();