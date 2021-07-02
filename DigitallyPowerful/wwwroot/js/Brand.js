
function login_brand() {
    var id = getCookie("Id");
    if (id > 0) {
        $.ajax({
            method: "GET",
            data: {
                userId: id
            },
            url: "/Api/Brand/branddetails",
            success: function (data) {
                if (data.length > 0) {
                    $("#ProfileLogoName_Brand").html("Welcome back " + data[0].firstName + " !");
                    $("#ProfileName_Brand").html("Brand");
                    $("#BrandProfile_BrandName").val(data[0].firstName);
                    $("#BrandProfile_Name").val(data[0].lastName);
                    $("#BrandProfile_Email").val(data[0].emailAddress);
                    $("#BrandProfile_Mobile").val(data[0].phoneNumber);
                    $("#BrandProfile_Description").val(data[0].brandDescription);
                    $("#BrandProfile_Project").val(data[0].projectTypeId);
                    $("#BrandProfile_Category").val(data[0].projectName);
                } else {
                    deleteAllCookies();
                    window.location.href = "/user/login";                    
                }
            },
            error: function (data) {
                var content = {};
                content.message = "Unable to fetch details, Kindly try again!";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
            }
        });
    }
}

var brandMobile_change_flag = 0;

$("#BrandProfile_Mobile").change(function () {
    brandMobile_change_flag = 1;
});

$("#BrandProfile_Save").click(function () {
    $('#BrandProfile_Save').prop('disabled', true);
    if ($("#BrandProfile_Name").val() != "" && $("#BrandProfile_Mobile").val() != "" && $("#BrandProfile_Description").val()!="" && $("#BrandProfile_Email").val() != "") {
        if (brandMobile_change_flag == 0 || validateMobile($("#BrandProfile_Mobile").val())) {
            $.ajax({
                method: "POST",
                data: {
                    UserId: getCookie("Id"),
                    EmailAddress: $("#BrandProfile_Email").val(),
                    FirstName: $("#BrandProfile_BrandName").val(),
                    LastName: $("#BrandProfile_Name").val(),
                    PhoneNumber: $("#BrandProfile_Mobile").val(),
                    ProjectTypeId: $("#BrandProfile_Project").val(),
                    ProjectName: $("#BrandProfile_Category").val(),
                    BrandDescription: $("#BrandProfile_Description").val()
                },
                url: "/Api/Brand/branddetails",
                success: function (data) {
                    $('#BrandProfile_Save').prop('disabled', false);
                    if (data.message == "Saved Successfully") {
                        var content = {};
                        content.message = data.message;
                        content.title = 'Digitally Powerful';
                        content.icon = 'fa fa-bell';
                        $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
                    }
                },
                error: function (data) {
                    $('#BrandProfile_Save').prop('disabled', false);
                    var content = {};
                    content.message = "Kindly try again later";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
                }
            });
        } else {
            $("#BrandProfile_Mobile").val("");
            $("#BrandProfile_Mobile").css('border-color', 'red');
            $('#BrandProfile_Save').prop('disabled', false);
            var content = {};
            content.message = "Kindly fill the 10 digit number";
            content.title = 'Cars Notification';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    } else {
        $('#BrandProfile_Save').prop('disabled', false);
        $("#BrandProfile_Name").val() == "" ? $("#BrandProfile_Name").css('border-color', 'red') : $("#BrandProfile_Name").css('border-color', '');
        $("#BrandProfile_Mobile").val() == "" ? $("#BrandProfile_Mobile").css('border-color', 'red') : $("#BrandProfile_Mobile").css('border-color', '');
        $("#BrandProfile_Email").val() == "" ? $("#BrandProfile_Email").css('border-color', 'red') : $("#BrandProfile_Email").css('border-color', '');
        $("#BrandProfile_Description").val() == "" ? $("#BrandProfile_Description").css('border-color', 'red') : $("#BrandProfile_Description").css('border-color', '');
        var content = {}; 
        content.message = "Kindly fill the details";
        content.title = 'Cars Notification';
        content.icon = 'fa fa-bell';
        $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
    }
});

$("#BrandProfile_Cancel").click(function () {
    login_brand();
    $("#BrandProfile_Name").val() == "" ? $("#BrandProfile_Name").css('border-color', 'red') : $("#BrandProfile_Name").css('border-color', '');
    $("#BrandProfile_Mobile").val() == "" ? $("#BrandProfile_Mobile").css('border-color', 'red') : $("#BrandProfile_Mobile").css('border-color', '');
    $("#BrandProfile_Email").val() == "" ? $("#BrandProfile_Email").css('border-color', 'red') : $("#BrandProfile_Email").css('border-color', '');

});

$("#BrandProfile_Project").change(function () {
    if ($("#BrandProfile_Project").val() == "2") {
        $("#BrandProfile_Categoryflag").show();
    } else {
        $("#BrandProfile_Categoryflag").val("");
        $("#BrandProfile_Categoryflag").hide();
    }
});

//CONTACT US
$("#BrandProfile_Send").click(function () {
    $('#BrandProfile_Send').hide();
    if ($("#BrandProfile_subject").val() != "" && $("#BrandProfile_BrandName").val() != "" && $("#BrandProfile_Email").val() != "" && $("#BrandProfile__message").val() != "") {
        var data = {
            Email: $("#BrandProfile_Email").val(),
            Name: $("#BrandProfile_BrandName").val(),
            Subject: $("#BrandProfile_subject").val(),
            Message: $("#BrandProfile__message").val()
        };
        $.ajax({
            method: "POST",
            data: data,
            url: "/Api/Mail/mail",
            success: function (data) {
                var content = {};
                content.message = data.message;
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
            },
            error: function (data) {
                var content = {};
                content.message = data.message;
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
            }
        });
        $("#BrandProfile_subject").val("");
        $("#BrandProfile__message").val("");
        $("#BrandProfile_Email").css('border-color', '');
        $("#BrandProfile_BrandName").css('border-color', '');
        $("#BrandProfile_subject").css('border-color', '');
        $("#BrandProfile__message").css('border-color', '');
        $('#BrandProfile_Send').show();
    } else {
        $("#BrandProfile_BrandName").val() != "" ? $("#BrandProfile_BrandName").css('border-color', 'red') : $("#BrandProfile_BrandName").css('border-color', '');
        $("#BrandProfile_Email").val() != "" ? $("#BrandProfile_Email").css('border-color', 'red') : $("#BrandProfile_Email").css('border-color', '');
        $("#BrandProfile_subject").val() != "" ? $("#BrandProfile_subject").css('border-color', 'red') : $("#BrandProfile_subject").css('border-color', '');
        $("#BrandProfile__message").val() != "" ? $("#BrandProfile__message").css('border-color', 'red') : $("#BrandProfile__message").css('border-color', '');
        $('#BrandProfile_Send').show();
    }
});

$("#BrandProfile_Undo").click(function () {
    $("#BrandProfile_subject").val("");
    $("#BrandProfile__message").val("");
    $("#BrandProfile_subject").css('border-color', '');
    $("#BrandProfile__message").css('border-color', '');
});