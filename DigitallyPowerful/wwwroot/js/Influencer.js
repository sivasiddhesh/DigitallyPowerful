
function login_influencer() {
    var id = getCookie("Id");
    var SocialTemp_count = 0;
    if (id > 0) {
        $.ajax({
            method: "GET",
            data: {
                userId: id
            },
            url: "http://localhost:51638/Api/Influencer/influencerprofile",
            success: function (data) {
                $("#ProfileLogoName").html("Welcome back " + data[0].firstName + " !");
                $("#ProfileName").html("Influencer");
                $("#FirstName").val(data[0].firstName);
                $("#LastName").val(data[0].lastName);
                $("#Email").val(data[0].emailAddress);
                $("#Mobile").val(data[0].phoneNumber);
                $("#BirthDate").val((new Date(data[0].dob)).toISOString().substr(0, 10));
                if (data[0].gender == "Female")
                    $("#Female").prop("checked", true);
                else if (data[0].gender == "Male")
                    $("#Male").prop("checked", true);
                else if (data[0].gender == "Transgender")
                    $("#Transgender").prop("checked", true);
                else
                    $("#PreferNotToSay").prop("checked", true);
                if (data[0].socialMedia.length > 0) {
                    for (var a = 0; a < data[0].socialMedia.length; a++) {
                        if (data[0].socialMedia[a].socialMediaTypeName == "Instagram") {
                            $("#InstaLink").val(data[0].socialMedia[a].socialMediaLink);
                            $("#InstaCount").val(data[0].socialMedia[a].followersCount);
                            $("#InstaVal").val(data[0].socialMedia[a].countTypeId);
                        } else if (data[0].socialMedia[a].socialMediaTypeName == "YouTube") {
                            $("#YouTubeLink").val(data[0].socialMedia[a].socialMediaLink);
                            $("#YouTubeCount").val(data[0].socialMedia[a].followersCount);
                            $("#YouTubeVal").val(data[0].socialMedia[a].countTypeId);
                        } else if (data[0].socialMedia[a].socialMediaTypeName == "Facebook") {
                            $("#FBLink").val(data[0].socialMedia[a].socialMediaLink);
                            $("#FBCount").val(data[0].socialMedia[a].followersCount);
                            $("#FBVal").val(data[0].socialMedia[a].countTypeId);
                        } else if (data[0].socialMedia[a].socialMediaTypeName == "Twitter") {
                            $("#TwitterLink").val(data[0].socialMedia[a].socialMediaLink);
                            $("#TwitterCount").val(data[0].socialMedia[a].followersCount);
                            $("#TwitterVal").val(data[0].socialMedia[a].countTypeId);
                        } else {
                            $("#Socialnetwork_Add").click();
                            SocialTemp_count = SocialTemp_count + 1;
                            $("#OtherName" + SocialTemp_count).val(data[0].socialMedia[a].socialMediaTypeName);
                            $("#OtherLink" + SocialTemp_count).val(data[0].socialMedia[a].socialMediaLink);
                            $("#OtherCount" + SocialTemp_count).val(data[0].socialMedia[a].followersCount);
                            $("#OtherVal" + SocialTemp_count).val(data[0].socialMedia[a].countTypeId);
                        }
                    }
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
    }
}

var SocialMedia_count = 0;
//INFLUENCERS PROFILE
$("#Socialnetwork_Add").click(function () {
    SocialMedia_count = SocialMedia_count+1;
    var table = $('#SocialNetworkingTable');
    var tr = $('<tr></tr>');
    tr.append("<td style='padding:0px !important'><div class='form-group'><input type='text' id='OtherName" + SocialMedia_count +"' class='form-control' required=''></div></td>")
    tr.append("<td><div class='form-group'><input id='OtherLink" + SocialMedia_count+"' type='url' class='form-control' required=''></div></td>")
    tr.append("<td><div class='form-group'><div class='input-group'><input type='number' id='OtherCount" + SocialMedia_count + "' class='form-control' aria-label='Text input with dropdown button'><div class='input-group-append'><select class='form-control' id=OtherVal" + SocialMedia_count +"'><option value='1'>K</option><option value='2'>M</option></select></div></div></div></div></td>");
    $(table).find('tbody').append(tr);
});

$("#Influencer_save").click(function () {
    var gender = "";
    if ($('input[name=icon-input]:checked').val() == "Female") {
        gender = "Female";
    } else if ($('input[name=icon-input]:checked').val() == "Male") {
        gender = "Male";
    } else if ($('input[name=icon-input]:checked').val() == "Transgender") {
        gender = "Transgender";
    } else if ($('input[name=icon-input]:checked').val() == "PreferNotToSay") {
        gender = "PreferNotToSay";
    }
    var Social = [];
    Social.push({
        SocialMediaTypeName: "Instagram",
        SocialMediaLink: $("#InstaLink").val(),
        FollowersCount: $("#InstaCount").val(),
        CountTypeId: $("#InstaVal").val()
    });
    Social.push({
        SocialMediaTypeName: "YouTube",
        SocialMediaLink: $("#YouTubeLink").val(),
        FollowersCount: $("#YouTubeCount").val(),
        CountTypeId: $("#YouTubeVal").val()
    });
    Social.push({
        SocialMediaTypeName: "Twitter",
        SocialMediaLink: $("#TwitterLink").val(),
        FollowersCount: $("#TwitterCount").val(),
        CountTypeId: $("#TwitterVal").val()
    });
    Social.push({
        SocialMediaTypeName: "Facebook",
        SocialMediaLink: $("#FBLink").val(),
        FollowersCount: $("#FBCount").val(),
        CountTypeId: $("#FBVal").val()
    });
    for (var a = 1; a <= SocialMedia_count; a++) {
        Social.push({
            SocialMediaTypeName: $("#OtherName" + (a)).val(),
            SocialMediaLink: $("#OtherLink" + (a)).val(),
            FollowersCount: $("#OtherCount" + (a)).val(),
            CountTypeId: $("#OtherVal" + (a)).val()
        });       
    }
    $.ajax({
        method: "POST",
        data: {
            UserId: getCookie("Id"),
            EmailAddress: $("#Email").val(),
            Gender: gender,
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
            DateOfBirth: $("#BirthDate").val(),
            PhoneNumber: $("#Mobile").val(),
            SocialMedia:Social
        },
        url: "http://localhost:51638/Api/Influencer/influencerprofile",
        success: function (data) {
            if (data.message == "Saved Successfully") {
                var content = {};
                content.message = "Registration Successful";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-check';
                $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
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
});
