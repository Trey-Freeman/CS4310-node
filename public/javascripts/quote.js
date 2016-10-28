(function() {
    $(document).ready(function() {
        //var quote = #{quote};
        //var quoteObject = $('#hiddenquote').attr('data-val');
        //if(quoteObject)
            //var quote =  JSON.parse(quoteObject);
        //console.log(typeof quote);
        var quote = $('#hiddenquote').attr('data-val');
        var distance = $('#hiddendistance').attr('data-val');
        var ppm = $('#hiddenppm').attr('data-val');
        var mpg = $('#hiddenmpg').attr('data-val');
        var price = $('#hiddenprice').attr('data-val');

        console.log("quote origin: " + " "+ quote);
        console.log("quote distance: " + " "+ distance);
        console.log("quote ppm: " + " "+ ppm);
        console.log("quote price: " + " "+ price);
        console.log("quote mpg: " + " "+ mpg);




 
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
         var electric = $xml.find("electric").text();
         var e85 = $xml.find("e85").text();
        

        console.log("cng " + $cng);
        console.log("diesel " + diesel);
        console.log("lpg " + lpg);
        console.log("electric " + electric);
        console.log("regular " + regular);
        console.log("midgrade " + midgrade);
        console.log("premium " + premium);
        console.log("e85 " + e85);

        $('div.Premium-Fuel').contents()[0].data = '$' + premium;

        var e = document.getElementById("gasList");
        var gs = e.options[e.selectedIndex].text;
        console.log(" gs: " + gs);
        if(typeof quote !== 'undefined')  {gs = quote; }
        console.log("selected gas: " + gs);
        //if(typeof quote !== 'undefined') {console.log("quote origin: " + quote.origin + " qt: " + quote); }
        

        $("#gasList").val(gs).attr('selected', 'selected');
                if($( "#gasList option:selected" ).text() === "Diesel") {       var $gas = diesel; }
                else if($( "#gasList option:selected" ).text() === "CNG") {     var $gas = $cng; }
                else if($( "#gasList option:selected" ).text() === "Electric"){ var $gas = electric; }
                else if($( "#gasList option:selected" ).text() === "LPG") {     var $gas = lpg; }
                else if($( "#gasList option:selected" ).text() === "Regular") { var $gas = regular; }
                else if($( "#gasList option:selected" ).text() === "Midgrade") {var $gas = midgrade; }
                else if($( "#gasList option:selected" ).text() === "Premium") { var $gas = premium; }
                console.log("$gas " + $gas);

                var $pri =  price;
                var $mp  =  mpg;
                var $pm =  ppm;
                var $dist =  ( Number(distance) / 1000000000 * 621371);
                //var $dist= ( <x:out select="$output/DistanceMatrixResponse/row/element/distance/value" /> / 1000000000 * 621371);
                var $gallons = ($dist / $mp );
                var $ppmCost = ($pm * $dist);
                var $gasCost = ($gallons * $gas ) ;
                var $totalCost = ($pri - $gasCost - $ppmCost);
                $("#dist-field").val(Number($dist).toFixed(3));
                $("#gas-field").val(Number($gas).toFixed(2));
                $("#gallons-field").val(Number($gallons).toFixed(2));
                $("#gasCost-field").val(Number($gasCost).toFixed(2));
                $("#ppm-field").val(Number($ppmCost).toFixed(2));
                $("#totalCost-field").val(Number($totalCost).toFixed(2));        

        }







        // $.ajax({
        //     type: 'GET',
        //     url: 'http://maps.googleapis.com/maps/api/distancematrix/json?origins=94587&destinations=90210&units=imperial&mode=driving&language=en',
        //     dataType: 'jsonp',
        //     jsonp: false,
        //     jsonpCallback: "myJsonMethod",
        //     success: function (json) {
        //         console.log(json);
        //     } 
        //   });


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