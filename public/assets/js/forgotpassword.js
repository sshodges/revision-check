$( document ).ready(function() {

    $(document).ajaxStart(function(){
        $("#loading").css("display", "block");
    });

    $(document).ajaxComplete(function(){
        $("#loading").css("display", "none");
    });

    $('#resetEmail').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            $('#resetPassword').click();
        }
    });

    $("#resetPassword").click(function () {
      var attributes = {}
      attributes.email = $('#resetEmail').val();
      attributes = JSON.stringify(attributes);
      $.ajax({
          url: urlStart + "/v1/users/forgot-password",
          method: "PUT",
          data: attributes,
          dataType: 'json',
          contentType: "application/json",
           success: function(result,status,jqXHR ){
              console.log(result);
              window.location.replace('verify')

           },
           error(jqXHR, textStatus, errorThrown){
             console.log(errorThrown);
           }
      });
    });

});
