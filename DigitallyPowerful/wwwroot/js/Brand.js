
function login_brand() {
    var id = getCookie("Id");
    if (id > 0) {
        $.ajax({
            method: "GET",
            data: {
                userId: id
            },
            url: "http://localhost:51638/Api/Brand/branddetails",
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
                    window.location.href = "http://localhost:51638/user/login";                    
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
    LoadinfluencersTable(0);
}

var SocialMedia_count = 0;
//INFLUENCERS PROFILE
$("#Socialnetwork_Add").click(function () {
    SocialMedia_count = SocialMedia_count + 1;
    var table = $('#SocialNetworkingTable');
    var tr = $('<tr></tr>');
    tr.append("<td style='padding:0px !important'><div class='form-group'><input type='text' id='OtherName" + SocialMedia_count + "' class='form-control' required=''></div></td>")
    tr.append("<td><div class='form-group'><input id='OtherLink" + SocialMedia_count + "' type='url' class='form-control' required=''></div></td>")
    tr.append("<td><div class='form-group'><div class='input-group'><input type='number' id='OtherCount" + SocialMedia_count + "' class='form-control' aria-label='Text input with dropdown button'><div class='input-group-append'><select class='form-control' id=OtherVal" + SocialMedia_count + "'><option value='1'>K</option><option value='2'>M</option></select></div></div></div></div></td>");
    $(table).find('tbody').append(tr);
});

$("#BrandProfile_Save").click(function () {    
    $.ajax({
        method: "POST",
        data: {
            UserId: getCookie("Id"),
            EmailAddress: $("#BrandProfile_Email").val(),
            FirstName: $("#BrandProfile_BrandName").val(),
            LastName: $("#BrandProfile_Name").val(),
            PhoneNumber: $("#BrandProfile_Mobile").val(),
            ProjectType: $("#BrandProfile_Project").val(),
            ProjectType: $("#BrandProfile_Category").val(),
            BrandDescription: $("#BrandProfile_Description").val()
        },
        url: "http://localhost:51638/Api/Brand/branddetails",
        success: function (data) {
            if (data.message == "Saved Successfully") {
                var content = {};
                content.message = data.message;
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

function LoadinfluencersTable(id) {
    if (id == 0) {
        $.ajax({
            method: "GET",
            data: {
                userId: id
            },
            url: "http://localhost:51638/Api/Influencer/influencerprofile",
            success: function (data) {
                $("#InfluencerList").DataTable().clear().draw();
                $("#InfluencerList").DataTable().destroy();
                window.table = $('#InfluencerList').DataTable({
                    scrollCollapse: true,
                    data: data,
                    "aaSorting": [],
                    scrollX: true,
                    "columnDefs": [
                        { "targets": 0, "width": "5%" },
                        { "targets": 1, "width": "50%" },
                        { "targets": 2, "width": "45%" },
                    ],
                    'columns': [
                        {
                            "data": "#",
                            "render": function (data, type, full, meta) {
                                return full.userId;
                            }
                        },
                        {
                            "data": "Name",
                            "render": function (data, type, full, meta) {
                                return full.firstName + " " + full.lastName;
                            }
                        },
                        {
                            "data": "Gender",
                            "render": function (data, type, full, meta) {
                                return full.gender;
                            }
                        }
                    ],
                    "bDestroy": true,
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        $("td:first", nRow).html(iDisplayIndex + 1);
                        return nRow;
                    },
                });
            },
            error: function (data) {
                $("#InfluencerList").DataTable().clear().draw();
                $("#InfluencerList").DataTable().destroy();
                var content = {};
                content.message = "Kindly try again later";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-exclamation';
                $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
            }
        });
    }
   
}