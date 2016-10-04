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
})();