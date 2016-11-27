(function() {
	$(document).ready(function() {
		$('#submit').on('click', function() {
			if(!verifyPassword($('#password').val(), $('#password-conf').val())) {
				alert('Passwords do not match');
				return false;
			}
			return true;
		});
	});

	function verifyPassword(pass, passConf) {
		return pass === passConf;
	}

	function validatePassword(fld, fld2) {
      var error = "";
      var illegalChars = /[\W_]/; // allow only letters and numbers
   
      if (fld.value != fld2.value) {
          error = "Passwords must match . \n";
          fld.style.background = 'Yellow';
          fld2.style.background = 'Yellow';
          alert(error);
          return false;
   
      } else {
          fld.style.background = 'White';
      }
     return true;
    }
})();