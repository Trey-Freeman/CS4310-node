(function() {
    $(document).ready(function() {

        var quote = $('#hiddenquote').attr('data-val');
        var distance = $('#hiddendistance').attr('data-val');
        var ppm = $('#hiddenppm').attr('data-val');
        var mpg = $('#hiddenmpg').attr('data-val');
        var price = $('#hiddenprice').attr('data-val');

        $.ajax({
            type: 'GET',
            url: '//www.fueleconomy.gov/ws/rest/fuelprices',
            crossDomain: true,
            dataType: 'xml',
            success: parseXml
          });

        /* Call back function for ajax request that parses the xml received on success */
        function parseXml(xml) {
             var $xml = $(xml);
             var $cng = $xml.find("cng").text();
             var diesel = $xml.find("diesel").text();
             var lpg = $xml.find("lpg").text();
             var regular = $xml.find("regular").text();
             var midgrade = $xml.find("midgrade").text();
             var premium = $xml.find("premium").text();
             var electric = $xml.find("electric").text();
             var e85 = $xml.find("e85").text();

            $('div.Premium-Fuel').contents()[0].data = '$' + premium;

            var e = document.getElementById("gasList");
            var gs = e.options[e.selectedIndex].text;

            if(typeof quote !== 'undefined')  {gs = quote; }        

            $("#gasList").val(gs).attr('selected', 'selected');
                    if($( "#gasList option:selected" ).text() === "Diesel") {       var $gas = diesel; }
                    else if($( "#gasList option:selected" ).text() === "CNG") {     var $gas = $cng; }
                    else if($( "#gasList option:selected" ).text() === "Electric"){ var $gas = electric; }
                    else if($( "#gasList option:selected" ).text() === "LPG") {     var $gas = lpg; }
                    else if($( "#gasList option:selected" ).text() === "Regular") { var $gas = regular; }
                    else if($( "#gasList option:selected" ).text() === "Midgrade") {var $gas = midgrade; }
                    else if($( "#gasList option:selected" ).text() === "Premium") { var $gas = premium; }

                    var $pri =  price;
                    var $mp  =  mpg;
                    var $pm =  ppm;
                    var $dist =  ( Number(distance) / 1000000000 * 621371);
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
        });
})();