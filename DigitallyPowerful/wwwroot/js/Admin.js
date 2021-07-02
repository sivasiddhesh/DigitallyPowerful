
function login_admin() {
    LoadbrandTable(0);
    LoadinfluencersTable(0)
}

function LoadbrandTable(id) {
    if (id == 0) {
        $.ajax({
            method: "GET",
            data: {
                userId: id
            },
            url: "/Api/Brand/branddetails",
            success: function (data) {
                $("#BrandList").DataTable().clear().draw();
                $("#BrandList").DataTable().destroy();
                window.table = $('#BrandList').DataTable({
                    scrollCollapse: true,
                    data: data,
                    "aaSorting": [],
                    scrollX: true,
                    "columnDefs": [
                        { "targets": 0, "width": "5%" },
                        { "targets": 1, "width": "25%" },
                        { "targets": 2, "width": "30%" },
                        { "targets": 3, "width": "20%" },
                        { "targets": 4, "width": "20%" }
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
                                return full.firstName;
                            }
                        },
                        {
                            "data": "Email",
                            "render": function (data, type, full, meta) {
                                return full.emailAddress;
                            }
                        },
                        {
                            "data": "Mobile",
                            "render": function (data, type, full, meta) {
                                return full.phoneNumber;
                            }
                        },
                        {
                            "data": "Project Type",
                            "render": function (data, type, full, meta) {
                                return full.projectTypeId == 1 ? "Influencer Marketing" : full.projectTypeId == 2 ? "Other - " + full.projectName:'';
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
                $("#BrandList").DataTable().clear().draw();
                $("#BrandList").DataTable().destroy();
                var content = {};
                content.message = "Kindly try again later";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
            }
        });
    }

}

function LoadinfluencersTable(id) {
    if (id == 0) {
        $.ajax({
            method: "GET",
            data: {
                userId: id
            },
            url: "/Api/Influencer/influencerprofile",
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
                        { "targets": 1, "width": "35%" },
                        { "targets": 2, "width": "10%" },
                        { "targets": 3, "width": "30%" },
                        { "targets": 4, "width": "15%" },
                        { "targets": 5, "width": "5%" }
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
                        },
                        {
                            "data": "Email",
                            "render": function (data, type, full, meta) {
                                return full.emailAddress;
                            }
                        },
                        {
                            "data": "Mobile",
                            "render": function (data, type, full, meta) {
                                return full.phoneNumber;
                            }
                        },
                        {
                            "data": "View",
                            "render": function (data, type, full, meta) {
                                return "<button class='btn btn-icon btn-round btn-primary' onclick='LoadInfluencerdetail(" + full.userId + ")'><i class = 'far fa-eye'></i></button>";
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
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
            }
        });
    }

}

function LoadInfluencerdetail(id) {
    $('#detailModal').modal('show');
    $.ajax({
        method: "GET",
        data: {
            userId: id
        },
        url: "/Api/Influencer/influencerprofile",
        success: function (data) {
            $("#Influencerdetail").DataTable().clear().draw();
            $("#Influencerdetail").DataTable().destroy();
            window.table = $('#Influencerdetail').DataTable({
                scrollCollapse: true,
                data: data[0].socialMedia,
                "aaSorting": [],
                scrollX: true,
                "columnDefs": [
                    { "targets": 0, "width": "5%" },
                    { "targets": 1, "width": "20%" },
                    { "targets": 2, "width": "60%" },
                    { "targets": 3, "width": "15%" }
                ],
                'columns': [
                    {
                        "data": "#",
                        "render": function (data, type, full, meta) {
                            return full.countTypeId;
                        }
                    },
                    {
                        "data": "Site",
                        "render": function (data, type, full, meta) {
                            return full.socialMediaTypeName;
                        }
                    },
                    {
                        "data": "Link",
                        "render": function (data, type, full, meta) {
                            return full.socialMediaLink;
                        }
                    },
                    {
                        "data": "Followers",
                        "render": function (data, type, full, meta) {
                            return full.followersCount + (full.countTypeId == 1 ? " K" : full.countTypeId == 2 ? " M" : " ");
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
            var content = {};
            content.message = "Kindly try again later";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
        }
    });
}

$("#ExportBtn").click(function () {
    $.ajax({
        method: "get",
        url: "/Api/Mail/contactmail",
        success: function (data) {
            var content = {};
            content.message = "Kindly check your mail!!";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
        },
        error: function (data) {
            var content = {};
            content.message = "Kindly try again later";
            content.title = 'Digitally Powerful';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "danger", placement: { from: "top", align: "right" }, });
        }
    });
});