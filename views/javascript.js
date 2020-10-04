$(document).ready(function() {
	$('#uploadForm').submit(function() {
		$('#status1').empty().text('File is uploading...');
		$(this).ajaxSubmit({
			error: function(xhr) {
				status('Error: ' + xhr.status);
			},
			success: function(response) {
				$('#status1').empty().text(response);
				alert(response);
				console.log(response);
				$('#uploadB').hide();
			}
		});
		//Code to disable the page refresh.
		return false;
	});

	//Code to disable the page refresh.
});
