/*JS Start*/

$(document).ready(function () {

    //INDEX 
    $("#Index_Brand").click(function () {
        window.location.href = "/user/Sign_up";
    });

    $("#Index_Influencer").click(function () {
        window.location.href = "/user/Signup";
    });

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
        if ($("#BrandContact_Brand").val() != "" && validateEmail($("#BrandContact_Email").val()) && $("#BrandContact_message").val() != "") {
            var data = {
                Email: $("#BrandContact_Email").val(),
                Name: "<h3> Brand :" + $("#BrandContact_Brand").val() + " Name :" + $("#BrandContact_Name").val() + "(" + $("#BrandContact_Mobile").val()+")</h3>",
                Subject: $("#BrandContact_Project").val() + " " + $("#BrandContact_Category").val(),
                Message: $("#BrandContact_message").val()
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
                    $("#BrandContact_Brand").val("");
                    $("#BrandContact_Name").val("");
                    $("#BrandContact_Email").val("");
                    $("#BrandContact_Mobile").val("");
                    $("#BrandContact_Project").val("Influencer Marketing");
                    $("#BrandContact_Category").val("");
                    $("#BrandContact_message").val("");
                    $("#BrandContact_Email").css('border-color', '');
                    $("#BrandContact_Brand").css('border-color', '');
                    $("#BrandContact_Project").css('border-color', '');
                    $("#BrandContact_message").css('border-color', '');
                },
                error: function (data) {
                    var content = {};
                    content.message = data.message;
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
                }
            });
            
        } else {
            $("#BrandContact_Brand").val() == "" ? $("#BrandContact_Brand").css('border-color', 'red') : $("#BrandContact_Brand").css('border-color', '');
            $("#BrandContact_Email").val() == "" ? $("#BrandContact_Email").css('border-color', 'red') : $("#BrandContact_Email").css('border-color', '');
            $("#BrandContact_message").val() == "" ? $("#BrandContact_message").css('border-color', 'red') : $("#BrandContact_message").css('border-color', '');
            $("#BrandContact_Project").val() == "" ? $("#BrandContact_Project").css('border-color', 'red') : $("#BrandContact_Project").css('border-color', '');
            $("#BrandContact_Category").val() == "" ? $("#BrandContact_Category").css('border-color', 'red') : $("#BrandContact_Category").css('border-color', '');
            var content = {};
            content.message = "Kindly fill the details";
            content.title = 'Cars Notification';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }                   
    });

    $("#signup_Brand").click(function () {
        if ($("#passwordsignup_Brand").val() == $("#confirmpassword_Brand").val()) {
            if ($("#agree_Brand").prop("checked") == true) {
                if (validateEmail($("#email_Brand").val()) && $("#passwordsignup_Brand").val() != "" && $("#Brandname_Brand").val() != "" && $("#Mobile_Brand").val() != "" && $("#confirmpassword_Brand").val()!="") {
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
                        url: "/Api/Auth/signup",
                        success: function (data) {
                            if (data.message == "Saved Successfully") {
                                var content = {};
                                content.message = "Registration Successful";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-bell';
                                $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
                            } else if (data.message == "Email Address Exists") {
                                $("#email_Brand").val("");
                                $("#email_Brand").css('border-color', 'red');
                                var content = {};
                                content.message = "Entered Email Already Exists";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-bell';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            } else {
                                var content = {};
                                content.message = "Kindly check the details";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-bell';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            }
                        },
                        error: function (data) {
                            var content = {};
                            content.message = "Kindly try again later";
                            content.title = 'Digitally Powerful';
                            content.icon = 'fa fa-bell';
                            $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
                        }
                    });
                } else {
                    $("#Brandname_Brand").val() == "" ? $("#Brandname_Brand").css('border-color', 'red') : $("#Brandname_Brand").css('border-color', '');
                    $("#passwordsignup_Brand").val() == "" ? $("#passwordsignup_Brand").css('border-color', 'red') : $("#passwordsignup_Brand").css('border-color', '');
                    $("#email_Brand").val() == "" ? $("#email_Brand").css('border-color', 'red') : $("#email_Brand").css('border-color', '');
                    $("#Mobile_Brand").val() == "" ? $("#Mobile_Brand").css('border-color', 'red') : $("#Mobile_Brand").css('border-color', '');
                    $("#confirmpassword_Brand").val() == "" ? $("#confirmpassword_Brand").css('border-color', 'red') : $("#confirmpassword_Brand").css('border-color', '');
                    var content = {};
                    content.message = "Kindly enter valid Details";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                }
            } else {
                var content = {};
                content.message = "Kindly agree to the terms and conditions";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
            }
        } else {
            $("#passwordsignup_Brand").val("");
            $("#confirmpassword_Brand").val("");
            $("#passwordsignup_Brand").css('border-color', 'red');
            $("#confirmpassword_Brand").css('border-color', 'red');
            var content = {};
            content.message = "Password Mismatch";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });

    //INFLUENCERS SIGNUP
    $("#signup_Influencers").click(function () {
        if ($("#passwordsignup_Influencers").val() == $("#confirmpassword_Influencers").val()) {
            if ($("#agree_Influencers").prop("checked") == true) {
                if (validateEmail($("#email_Influencers").val()) && $("#passwordsignup_Influencers").val() != "" && $("#confirmpassword_Influencers").val() != "" && $("#Firstname_Influencers").val() != "" && $("#Mobile_Influencers").val() != "") {
                    $.ajax({
                        method: "POST",
                        data: {
                            EmailAddress: $("#email_Influencers").val(),
                            Password: $("#passwordsignup_Influencers").val(),
                            FirstName: $("#Firstname_Influencers").val(),
                            LastName: $("#Lastname_Influencers").val(),
                            RoleTypeId: "3",
                            PhoneNumber: $("#Mobile_Influencers").val()
                        },
                        url: "/Api/Auth/signup",
                        success: function (data) {
                            if (data.message == "Saved Successfully") {
                                var content = {};
                                content.message = "Registration Successful";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-bell';
                                $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
                            } else if (data.message == "Email Address Exists") {
                                var content = {};
                                content.message = "Email Address Already Exists";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-bell';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            } else {
                                var content = {};
                                content.message = "Kindly check the details";
                                content.title = 'Digitally Powerful';
                                content.icon = 'fa fa-bell';
                                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                            }
                        },
                        error: function (data) {
                            var content = {};
                            content.message = "Kindly try again later";
                            content.title = 'Digitally Powerful';
                            content.icon = 'fa fa-bell';
                            $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
                        }
                    });
                } else {
                    $("#passwordsignup_Influencers").val() == "" ? $("#passwordsignup_Influencers").css('border-color', 'red') : $("#passwordsignup_Influencers").css('border-color', '');
                    $("#confirmpassword_Influencers").val() == "" ? $("#confirmpassword_Influencers").css('border-color', 'red') : $("#confirmpassword_Influencers").css('border-color', '');
                    $("#Firstname_Influencers").val() == "" ? $("#Firstname_Influencers").css('border-color', 'red') : $("#Firstname_Influencers").css('border-color', '');
                    $("#email_Influencers").val() == "" ? $("#email_Influencers").css('border-color', 'red') : $("#email_Influencers").css('border-color', '');
                    $("#Mobile_Influencers").val() == "" ? $("#Mobile_Influencers").css('border-color', 'red') : $("#Mobile_Influencers").css('border-color', '');
                    var content = {};
                    content.message = "Kindly enter valid details";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                }
            } else {
                var content = {};
                content.message = "Kindly agree to the terms and conditions";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
            }
        } else {
            $("#passwordsignup_Influencers").css('border-color', 'red');
            $("#confirmpassword_Influencers").css('border-color', 'red');
            var content = {};
            content.message = "Kindly check the Password";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });

    //LOGIN
    $("#signin").click(function () {
        if (validateEmail($("#Login_username").val()) && $("#Login_password").val() != "") {
            $.ajax({
                method: "GET",
                data: {
                    EmailAddress: $("#Login_username").val(),
                    Password: $("#Login_password").val()
                },
                url: "/Api/Auth/login",
                success: function (data) {
                    if (data.message == "Login Successful") {
                        setAuthCookie("Id", data.userId);
                        if (data.roleTypeId == 3)
                            window.location.href = "/user/Influencer";
                        else if (data.roleTypeId == 2)
                            window.location.href = "/user/Brand";
                        else if (data.roleTypeId == 1)
                            window.location.href = "/user/Admin";                                  
                    } else {
                        var content = {};
                        content.message = data.message;
                        content.title = 'Digitally Powerful';
                        content.icon = 'fa fa-bell';
                        $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
                    }
                },
                error: function (data) {
                    var content = {};
                    content.message = "Please try again later";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
                }
            });
        } else {
            $("#Login_username").css('border-color', 'red');
            $("#Login_password").css('border-color', 'red');
            var content = {};
            content.message = "Kindly enter valid Details!";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    });

    $("#ForgotPassword_Confirm").click(function () {
        if (validateEmail($("#ForgotPassword_email").val())) {
            $.ajax({
                method: "post",
                data: {
                    emailaddress: $("#forgotpasswordmodal").val()
                },
                url: "/api/auth/forgotpassword",
                success: function (data) {
                    $("#forgotpasswordModal").modal("hide");
                    var content = {};
                    content.message = data.message;
                    content.title = 'digitally powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
                },
                error: function (data) {
                    var content = {};
                    content.message = "please try again later";
                    content.title = 'digitally powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
                }
            });
        } else {
            $("#ForgotPassword_email").css('border-color', 'red');
        }
    });
});

$("document").ready(function () {
    setTimeout(function () {
        $('#portfolio-flters li:nth-child(1)').click();
    }, 50);
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateMobile(mobile) {
    const re = /^\d{10}$/;
    return re.test(String(mobile).toLowerCase());
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