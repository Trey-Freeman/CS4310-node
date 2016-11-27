//id, origin,  destination,  price,  mpg, distance,  gasType,  ppm,  gallons,  gasCost, ppmCost, totalCost
$(document).ready(function() {

  ('.delete').click( function(e){
    e.preventDefault();
    var rowID = $(this).data()['row'];
    var quoteID = $(this).data()['id'];
    $.ajax({
      type:'POST',
      url:'/quote/delete',
      data: { id: sheetID },
      success: function(data){
          console.log(data);
          $('#' + rowID).remove();
      }
    });
  });

  $(".edit-button").click(function() {
    var $id = $(this).attr("id");
    var $tableRow = $(this).closest("tr");
    //alert($tableRow.children(".firstname-cell").text());
    var $origin = $tableRow.children(".origin-cell").text();
    var $destination = $tableRow.children(".destination-cell").text();
    var $price = $tableRow.children(".price-cell").text();
    var $mpg = $tableRow.children(".mpg-cell").text();
    var $distance = $tableRow.children(".distance-cell").text();
    var $gasType = $tableRow.children(".gasType-cell").text();
    var $ppm = $tableRow.children(".ppm-cell").text();
    var $gallons = $tableRow.children(".gallons-cell").text();
    var $gasCost = $tableRow.children(".gasCost-cell").text();
    var $ppmCost = $tableRow.children(".ppmCost-cell").text();
    var $totalCost = $tableRow.children(".totalCost-cell").text();
    // set the form input values
    $("#id-field").val($id);
    $("#origin-field").val($origin);
    $("#distance-field").val($distance);
    $("#destination-field").val($destination);
    $("#price-field").val($price);
    $("#mpg-field").val($mpg);
    $("#distance-field").val($distance);
    $("#gasType-field").val($gasType);
    $("#ppm-field").val($ppm);
    $("#gallons-field").val($gallons);
    $("#ppmCost-field").val($ppmCost);
    $("#gasCost-field").val($gasCost);
    $("#totalCost-field").val($totalCost);
  });
  var c3Total = 0;
  var c4Total = 0;
  var c5Total = 0;
  var c6Total = 0;
  var c7Total = 0;
  var c8Total = 0;
  var c9Total = 0;
  var c10Total = 0;
  var c11Total = 0;
  var c12Total = 0;
  var $count = 0;
  $("tr").find("td").each(function() {
    var curVal = parseFloat($(this).text());
    if (!isNaN(curVal)) {
      $count = $count + 1;
      if ($(this).index() == 3) {
        c3Total += parseFloat($(this).text());
      } else if ($(this).index() == 4) {
        c4Total += parseFloat($(this).text());
      } else if ($(this).index() == 5) {
        c5Total += parseFloat($(this).text());
      } else if ($(this).index() == 6) {
        c6Total += parseFloat($(this).text());
      } else if ($(this).index() == 7) {
        c7Total += parseFloat($(this).text());
      } else if ($(this).index() == 8) {
        c8Total += parseFloat($(this).text());
      } else if ($(this).index() == 9) {
        c9Total += parseFloat($(this).text());
      } else if ($(this).index() == 10) {
        c10Total += parseFloat($(this).text());
      } else if ($(this).index() == 11) {
        c11Total += parseFloat($(this).text());
      } else if ($(this).index() == 12) {
        c12Total += parseFloat($(this).text());
      }
    }
  });
  $count = $count / 10; //10 rows divide to find number of elements
  $("#DataGrid tr:last td:eq(2)").text($count.toFixed(2));
  $("#DataGrid tr:last td:eq(3)").text(c3Total.toFixed(2));
  $("#DataGrid tr:last td:eq(4)").text((c4Total / $count).toFixed(2));
  $("#DataGrid tr:last td:eq(5)").text(c5Total.toFixed(2));
  $("#DataGrid tr:last td:eq(6)").text((c6Total / $count).toFixed(2));
  $("#DataGrid tr:last td:eq(7)").text((c7Total / $count).toFixed(2));
  $("#DataGrid tr:last td:eq(8)").text(c8Total.toFixed(2));
  $("#DataGrid tr:last td:eq(9)").text(c9Total.toFixed(2));
  $("#DataGrid tr:last td:eq(10)").text(c10Total.toFixed(2));
  $("#DataGrid tr:last td:eq(11)").text(c11Total.toFixed(2));
  $("#DataGrid tr:last td:eq(12)").text(c12Total.toFixed(2));
  // $('#DataGrid').sumtr({sumCells : '.totalCost-cell'});
});
