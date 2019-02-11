$( document ).ready(function() {

    $('#resetPassword').click(function () {
      if ($('#newPassword').val() === $('#confirmPassword').val()){
        var attributes = {}
        attributes.password = $('#newPassword').val();
        attributes = JSON.stringify(attributes);
        $.ajax({
            url: urlStart + "/v1/users/forgot-password/" + resetCode,
            method: "PUT",
            data: attributes,
            dataType: 'json',
            contentType: "application/json",
             success: function(result,status,jqXHR ){
                console.log(result);
                window.location.replace('login')
             },
             error(jqXHR, textStatus, errorThrown){
               console.log(errorThrown);
             }
        });
      } else {
        alert ("Passwords don't match");
      }

    });




});
