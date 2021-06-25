/*JS Start*/

$(document).ready(function () {
    //BRAND SIGNUP
    $("#BrandContact_Project").change(function () {
        if ($("#BrandContact_Project").val() == "Others") {
            $("#BrandContact_Categorycol").show();
        } else {
            $("#BrandContact_Category").val("");
            $("#BrandContact_Categorycol").hide();
        }
    });

    $("#BrandContact_send").click(function () {
        if ($("#BrandContact_message").val() != "") {
            //AJAX
            $("#BrandContact_Brand").val("");
            $("#BrandContact_Name").val("");
            $("#BrandContact_Email").val("");
            $("#BrandContact_Mobile").val("");
            $("#BrandContact_Project").val("Influencer Marketing");
            $("#BrandContact_Category").val("");
            $("#BrandContact_message").val("");
        } else {
            var content = {};
            content.message = "Kindly type in the message";
            content.title = 'Cars Notification';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });
    $("#signup_Brand").click(function () {
        if ($("#passwordsignup_Brand").val() == $("#confirmpassword_Brand").val()) {
            if ($("#agree_Brand").prop("checked") == true) {
                //AJAX
            } else {
                var content = {};
                content.message = "Kindly agree to the terms and conditions";
                content.title = 'Cars Notification';
                content.icon = 'fa fa-exclamation';
                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
            }
        } else {
            $("#passwordsignup_Brand").val("");
            $("#confirmpassword_Brand").val("");
            var content = {};
            content.message = "Password Mismatch";
            content.title = 'Cars Notification';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });

    //INFLUENCERS SIGNUP
    $("#signup_Influencers").click(function () {
        if ($("#passwordsignup_Influencers").val() == $("#confirmpassword_Influencers").val()) {
            if ($("#agree_Influencers").prop("checked") == true) {
                //AJAX
            } else {
                var content = {};
                content.message = "Kindly agree to the terms and conditions";
                content.title = 'Cars Notification';
                content.icon = 'fa fa-exclamation';
                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
            }
        } else {
            $("#passwordsignup_Influencers").val("");
            $("#confirmpassword_Influencers").val("");
            var content = {};
            content.message = "Password Mismatch";
            content.title = 'Cars Notification';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });
    //INFLUENCERS PROFILE
    $("#Socialnetwork_Add").click(function () {
        var table = $('#SocialNetworkingTable');
        var tr = $('<tr></tr>');
        tr.append("<td><button type='button' class='btn btn-icon btn-round btn-danger'><i class='fab fa-instagram'></i></button></td>")
        tr.append("<td><div class='form-group'><input id='InstaLink' type='url' class='form-control' required=''></div></td>")
        tr.append("<td><div class='form-group'><div class='input-group'><input type='number' class='form-control' aria-label='Text input with dropdown button'><div class='input-group-append'><button class='btn btn-primary btn-border dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Followers</button><div class='dropdown-menu' x-placement='bottom-start' style='position: absolute; transform: translate3d(225px, 43px, 0px); top: 0px; left: 0px; will-change: transform;'><a class='dropdown-item'>K</a><a class='dropdown-item'>M</a></div></div ></div ></div ></td>")
        $(table).find('tbody').append(tr);
    });
    //LOGIN
    $("#signin").click(function () {
        //AJAX
    });

    //CONTACT US
    $("#Contact_usbtn").click(function () {
        if ($("#Contact_subject").val() != "" && $("#Contact_name").val() != "" && $("#Contact_email").val() != "" && $("#Contact_message").val() != "") {
            //AJAX
            $("#Contact_name").val("");
            $("#Contact_email").val("");
            $("#Contact_subject").val("");
            $("#Contact_message").val("");

        } else {
            var content = {};
            content.message = "Kindly fill all the details";
            content.title = 'Cars Notification';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });
});

/*JS End*/