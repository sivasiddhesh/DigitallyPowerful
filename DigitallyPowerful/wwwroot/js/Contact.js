//CONTACT US
$("#Contact_usbtn").click(function () {
    $('#Contact_usbtn').hide();
    $('#Contact_usbtnloading').show();
    if ($("#Contact_subject").val() != "" && $("#Contact_name").val() != "" && validateEmail($("#Contact_email").val()) && $("#Contact_message").val() != "") {
        var data = {
            Email: $("#Contact_email").val(),
            Name: $("#Contact_name").val(),
            Subject: $("#Contact_subject").val(),
            Message: $("#Contact_message").val()
        };
        $.ajax({
            method: "POST",            
            data: data,
            url: "/Api/Mail/mail",
            success: function (data) {
                $('#Sentmessage_successFlag').show();
                $('#Sentmessage_errorFlag').hide();
                $("#Contact_name").val("");
                $("#Contact_email").val("");
                $("#Contact_subject").val("");
                $("#Contact_message").val("");
            },
            error: function (data) {
                $('#Sentmessage_successFlag').hide();
                $('#Sentmessage_errorFlag').show();
            }
        });        
        $("#Contact_name").css('border-color', '');
        $("#Contact_email").css('border-color', '');
        $("#Contact_subject").css('border-color', '');
        $("#Contact_message").css('border-color', '');
        $('#Contact_usbtn').show();
        $('#Contact_usbtnloading').hide();
    } else {
        $("#Contact_name").val() == "" ? $("#Contact_name").css('border-color', 'red') : $("#Contact_name").css('border-color', '');
        $("#Contact_email").val() == "" ? $("#Contact_email").css('border-color', 'red') : $("#Contact_email").css('border-color', '');
        $("#Contact_subject").val() == "" ? $("#Contact_subject").css('border-color', 'red') : $("#Contact_subject").css('border-color', '');
        $("#Contact_message").val() == "" ? $("#Contact_message").css('border-color', 'red') : $("#Contact_message").css('border-color', '');
        $('#Contact_usbtn').show();
        $('#Contact_usbtnloading').hide();
    }
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}