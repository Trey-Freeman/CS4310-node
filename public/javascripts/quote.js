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



        $.ajax({
            type: 'GET',
            url: 'http://maps.googleapis.com/maps/api/distancematrix/json?origins=94587&destinations=90210&units=imperial&mode=driving&language=en',
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: "myJsonMethod",
            success: function (json) {
                console.log(json);
            } 
          });


        // function parseDistance(xml)
        // {

        // var $xml = $(xml);
        // //DistanceMatrixResponse/row/element/distance/value
        // var $dist = $xml.find("distance").text();

        // console.log("distance " + $dist );

        // }

            // function parseDistance(json) {
            //     console.log(json);
            //     // var distance = json.rows[0].text;
            //     // console.log(distance);
            // }

        });   



})();


/* I think google is blocking cross site ajax requests, which is strange....

TODO: xml parsing the google distance api

for internal requests....

http://stackoverflow.com/questions/25761481/simple-ajax-request-to-localhost-nodejs-server/28089807#28089807


    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    */