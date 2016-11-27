$( document ).ready(function() {
  $('.delete').click( function(){
    var rowID = $(this).data()['row'];
    var sheetID = $(this).data()['id'];
    $.ajax({
      type:'POST',
      url:'/timesheet/delete',
      data: { id: sheetID },
      success: function(data){
          console.log(data);
          $('#' + rowID).remove();
      }
    });
  });    
});
    