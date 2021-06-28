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
                if (validateEmail($("#email_Brand").val())) {
                    $.ajax({
                        method: "POST",
                        data: {
                            EmailAddress: $("#email_Brand").val(),
                            Password: $("#passwordsignup_Brand").val(),
                            FirstName: $("#Brandname_Brand").val(),
                            LastName: $("#Contactname_Brand").val(),
                            RoleTypeId: "2",
                            PhoneNumber: $("#Mobile_Brand").val()
                        },
                        url: "http://localhost:51638/Api/Auth/signup",
                        success: function (data) {
                            if (data.message == "Saved Successfully") {
                                var content = {};
                                content.message = "Registration Successful";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-check';
                                $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
                            } else if (data.message == "Email Address Exists") {
                                var content = {};
                                content.message = "Entered Email Address Exists";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-exclamation';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            } else {
                                var content = {};
                                content.message = "Kindly check the details";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-exclamation';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            }
                        },
                        error: function (data) {
                            var content = {};
                            content.message = "Kindly try again later";
                            content.title = 'Digitally Powerful';
                            content.icon = 'fa fa-exclamation';
                            $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
                        }
                    });
                } else {
                    var content = {};
                    content.message = "Kindly enter a valid Email";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-exclamation';
                    $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                }
            } else {
                var content = {};
                content.message = "Kindly agree to the terms and conditions";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-exclamation';
                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
            }
        } else {
            $("#passwordsignup_Brand").val("");
            $("#confirmpassword_Brand").val("");
            var content = {};
            content.message = "Password Mismatch";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });

    //INFLUENCERS SIGNUP
    $("#signup_Influencers").click(function () {
        if ($("#passwordsignup_Influencers").val() == $("#confirmpassword_Influencers").val() && $("#passwordsignup_Influencers").val() != "" && $("#confirmpassword_Influencers").val() != "") {
            if ($("#agree_Influencers").prop("checked") == true) {
                if (validateEmail($("#email_Influencers").val())) {
                    $.ajax({
                        method: "POST",
                       // data: data,
                        data: {
                            EmailAddress: $("#email_Influencers").val(),
                            Password: $("#passwordsignup_Influencers").val(),
                            FirstName: $("#Firstname_Influencers").val(),
                            LastName: $("#Lastname_Influencers").val(),
                            RoleTypeId: "3",
                            PhoneNumber: $("#Mobile_Influencers").val()
                        },
                        url: "http://localhost:51638/Api/Auth/signup",
                        success: function (data) {
                            if (data.message == "Saved Successfully") {
                                var content = {};
                                content.message = "Registration Successful";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-check';
                                $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
                            } else if (data.message == "Email Address Exists") {
                                var content = {};
                                content.message = "Entered Email Address Exists";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-exclamation';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            } else {
                                var content = {};
                                content.message = "Kindly check the details";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-exclamation';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            }
                        },
                        error: function (data) {
                            var content = {};
                            content.message = "Kindly try again later";
                            content.title = 'Digitally Powerful';
                            content.icon = 'fa fa-exclamation';
                            $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
                        }
                    });
                } else {
                    var content = {};
                    content.message = "Kindly enter a valid Email";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-exclamation';
                    $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                }
            } else {
                var content = {};
                content.message = "Kindly agree to the terms and conditions";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-exclamation';
                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
            }
        } else {
            $("#passwordsignup_Influencers").val("");
            $("#confirmpassword_Influencers").val("");
            var content = {};
            content.message = "Kindly check the Password";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });

    //LOGIN
    $("#signin").click(function () {
        if (validateEmail($("#Login_username").val())) {
            $.ajax({
                method: "GET",
                data: {
                    EmailAddress: $("#Login_username").val(),
                    Password: $("#Login_password").val()
                },
                url: "http://localhost:51638/Api/Auth/login",
                success: function (data) {
                    if (data.message == "Login Successful") {
                        setAuthCookie("Id", data.userId);
                        if (data.roleTypeId == 3)
                            window.location.href = "http://localhost:51638/user/Influencer";
                        else if (data.roleTypeId == 2)
                            window.location.href = "http://localhost:51638/user/Brand";
                        else if (data.roleTypeId == 1)
                            window.location.href = "http://localhost:51638/user/Influencer";                                  
                    } else {
                        var content = {};
                        content.message = data.message;
                        content.title = 'Digitally Powerful';
                        content.icon = 'fa fa-exclamation';
                        $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                    }
                },
                error: function (data) {
                    var content = {};
                    content.message = "Please try again later";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-exclamation';
                    $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
                }
            });
        } else {
            var content = {};
            content.message = "Kindly enter a valid Email";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
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
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-exclamation';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setAuthCookie(key, data) {
    document.cookie = key + "=" + data + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function deleteCookie(key) {
    var cookies = document.cookie.split(";");
    deleteAllCookies();
    for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split("=")[0];
        var data = cookies[i].split(name + "=")[1];
        if (!cookies[i].includes(key)) {
            document.cookie = name + "=" + data + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        if (name.trim() === "token") {
            document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = name + "=; Path=/Home; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        } else if (name.trim() === "AppraisalId") {
            document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = name + "=; Path=/Appraisal; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        } else {
            document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
    }
}

/*JS End*/