$( document ).ready(function() {

    $('#checkRevCodeLink').click(function () {
        $("#revcheck-modal").modal();
    });
    

    var currentYear = (new Date).getFullYear();
    $('#copyright').text('Copyright © '+ currentYear +' Revision Check');

    $(document).ajaxStart(function() {
        $("#loading-image").slideDown('slow');
    });

    $(document).ajaxStop(function() {
        $("#loading-image").hide();
    });

    $("#revCode").keyup(function (e) {
        if(e.keyCode == 13)
        {
            $('#checkRevCode').click();
        }
    });

    $("#checkRevCode").click(function (){
        $('.api-message').hide();

        var revCode = $("#revCode").val();
        $.post("functions/checkRevAPI?revcode=" + revCode, function (data) {
            if (data){
                if(data === 'latest'){
                    $('#latest-rev').show();
                }
                else if (data === 'old') {
                    $('#old-rev').show();
                } else {
                    $('#no-rev').show();
                }
            }
            console.log(data)
        });




    });

});
