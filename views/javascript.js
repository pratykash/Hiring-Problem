$(document).ready(function() {
    $('#insert').hide();
    $('#insert').disabled = true;

    $('#uploadForm').submit(function() {
        $("#status1").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            error: function(xhr) {
            status('Error: ' + xhr.status);
        },
        success: function(response) {
            $("#status1").empty().text(response);
            alert(response);
            console.log(response);
            $('#insert').show();
            $('#insert').disabled = false;
            $('#uploadB').hide();
        }
        });
    //Code to disable the page refresh.
        return false;
    });

    // AJAX call to submit form to server to add rows from CSV to the table
    $('#insertForm').submit(function() {
        $("#status2").empty().text("File is being Inserted...");
        $(this).ajaxSubmit({
            error: function(xhr) {
            status('Error: ' + xhr.status);
        },
        success: function(response) {
            $("#status2").empty().text(response);
            alert(response);
            //console.log(response);
        }
        });
    //Code to disable the page refresh.
        return false;
    });
});