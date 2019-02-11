$( document ).ready(function() {

    $.ajax({
        url: urlStart + "/v1/users/confirm/" + confirmCode,
        method: "PUT",
        dataType: 'json',
        contentType: "application/json",
         success: function(result,status,jqXHR ){
            console.log(result);
            $("#success").show();
         },
         error(jqXHR, textStatus, errorThrown){
           console.log(errorThrown);
           $("#fail").show();

         }
    });

});
