$( document ).ready(function() {


    $('#join').click(function () {
      if ($('#newPassword').val() === $('#confirmPassword').val()){
        var attributes = {}
        attributes.name = $('#newName').val();
        attributes.password = $('#newPassword').val();
        attributes.confirm
        attributes = JSON.stringify(attributes);
        $.ajax({
            url: urlStart + "/v1/users/subuser/confirm/" + joinCode,
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
