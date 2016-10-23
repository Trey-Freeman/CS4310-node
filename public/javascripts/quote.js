(function() {
    $(document).ready(function() {
        // Demonstrate parsing an in-memory XML string
        var xmlString = '<suggestions><book title="Twilight"/><book title="Twister"/></suggestions>'
        var xml = $.parseXML(xmlString, 'text/xml');
        var $xml = $(xml);
        console.log($xml.find('book')[0].attributes.title);

        $.ajax({
            type: 'GET',
            url: 'http://www.fueleconomy.gov/ws/rest/fuelprices',
            crossDomain: true,
            dataType: 'xml',
            success: parseXml
          });


        function parseXml(xml)
        {

        var $xml = $(xml);
        var $cng = $xml.find("cng").text();
        var diesel = $xml.find("diesel").text();
        var lpg = $xml.find("lpg").text();
        var regular = $xml.find("regular").text();
        var midgrade = $xml.find("midgrade").text();
        var premium = $xml.find("premium").text();
        var e85 = $xml.find("e85").text();
        

        console.log("cng " + $cng);
        console.log("diesel " + diesel);
        console.log("lpg " + lpg);
        console.log("regular " + regular);
        console.log("midgrade " + midgrade);
        console.log("premium " + premium);
        console.log("e85 " + e85);

        $('div.Premium-Fuel').contents()[0].data = '$' + premium;

        }

        });



})();