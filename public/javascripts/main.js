(function() {
	$(document).ready(function() {
		//On click of a navbar button, make its class active and remove active from those that are already active
		$('#nav-buttons li').on('click', function() {
			$('#nav-buttons .active').removeClass('active');
			$(this).addClass('active');
		})
	});
})();