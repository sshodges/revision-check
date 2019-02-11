$( document ).ready(function() {
    var token;

    $(document).on({

      ajaxStart: function() {
        $("#content-bar").addClass("loading");
        $('.modalLoading').show();
      },
      ajaxStop: function() {
        $("#content-bar").removeClass("loading");
        $('.modalLoading').hide();

      }
    });

    if (localStorage.getItem("token") === null) {
      window.location.replace('../login')
    } else {
      token = localStorage.getItem("token");
    }
    $('#logout').click(function () {
      localStorage.removeItem('token');
      window.location.replace('../login');
    });

    $('.edit').click(function () {
        var value = $(this).attr('id');
        $('#'+value+'Modal').modal('show');
    });

    $('#nameModal').on('shown.bs.modal', function () {
        $('#nameInput').focus();
    });

    $('#subuserModal').on('shown.bs.modal', function () {
        $('#email').focus();
    });

    $('#companyModal').on('shown.bs.modal', function () {
        $('#companyName').focus();
    });

    $('#passwordModal').on('shown.bs.modal', function () {
        $('#oldPassword').val('').focus();
    });

    $('#companyName').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            $('#changeCompany').click();
        }
    });

    $('#email').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            $('#addSubuser').click();
        }
    });

    $('#nameInput').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            $('#changeName').click();
        }
    });

    $('#confirmPassword').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            $('#changePassword').click();
        }
    });

    $("#changeName").click(function () {
        var attributes = {}
        attributes.name = $('#nameInput').val();
        changeCompany(attributes);
        $('#nameModal').modal('toggle');

    });

    $("#addSubuser").click(function () {
        var attributes = {}
        attributes.email = $('#email').val();
        addSubuser(attributes);
        $('#subuserModal').modal('toggle');

    });

    $("#changeCompany").click(function () {
      var attributes = {}
      attributes.company = $('#companyName').val();
      changeCompany(attributes);
      $('#companyModal').modal('toggle');
    });

    changeCompany = function (attributes) {
      attributes = JSON.stringify(attributes);
      $.ajax({
          url: urlStart + "/v1/users",
          method: "PUT",
          data: attributes,
          dataType: 'json',
          headers: { "Auth": token },
          contentType: "application/json",
           success: function(result,status,jqXHR ){
              console.log(result);
              getDetails();
           },
           error(jqXHR, textStatus, errorThrown){
             console.log(errorThrown);
           }
      });
    }

    addSubuser = function (attributes) {
      attributes = JSON.stringify(attributes);
      $.ajax({
          url: urlStart + "/v1/users/subuser",
          method: "POST",
          data: attributes,
          dataType: 'json',
          headers: { "Auth": token },
          contentType: "application/json",
           success: function(result,status,jqXHR ){
              console.log(result);
              getSubusers();
           },
           error(jqXHR, textStatus, errorThrown){
             console.log(errorThrown);
           }
      });
    }

    getSubusers = function () {
      $.ajax({
          url: urlStart + "/v1/users/subuser",
          method: "GET",
          dataType: 'json',
          headers: { "Auth": token },
          contentType: "application/json",
           success: function(result,status,jqXHR ){
             var html = ''
             if (result.length > 0){
               html += "<h5 id='subuserHeading'>Team Members</h5>"
               result.forEach(function(element) {
                 console.log(element.name);
                 html += '<div class="subuserItem">'
                 var email = element.email;
                 if (element.name){
                   email = email + " (" + element.name + ")"
                 }

                 if (!element.active){
                   email = email + " <strong style='color: red;'>(Not Activated)</strong>"
                 }
                 html += '<h5 class="subuserName">'+email+'</h5>'

                 html += '</div>'
               });
               $('#subuserDetails').html(html)
             }
           },
           error(jqXHR, textStatus, errorThrown){
             console.log(errorThrown);
           }
      });
    }
    getSubusers();

    getDetails = function () {
      $.ajax({
          url: urlStart + "/v1/users",
          method: "GET",
          dataType: 'json',
          headers: { "Auth": token },
          contentType: "application/json",
           success: function(result,status,jqXHR ){
             if (result.name){
               $('#nameText').html(result.name);
               $('#name').val(result.name);

             } else {
               $('#nameText').html('');
               $('#name').val('');
             }
             if (result.company) {
               $('#companyText').html(result.company);
               $('#companyName').val(result.company);
             } else {
               $('#companyText').html('');
               $('#companyName').val('');
             }
           },
           error(jqXHR, textStatus, errorThrown){
             console.log(errorThrown);
           }
      });
    }
    getDetails();

    $("#changePassword").click(function () {
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();

        if (newPassword.length > 6){
            if (newPassword === confirmPassword){
              attributes = {};
              attributes.oldPassword = oldPassword;
              attributes.newPassword = newPassword;
              attributes = JSON.stringify(attributes);
              $.ajax({
                  url: urlStart + "/v1/users/change-password",
                  method: "PUT",
                  data: attributes,
                  dataType: 'json',
                  headers: { "Auth": token },
                  contentType: "application/json",
                   success: function(result,status,jqXHR ){
                     $('.alert').remove();
                      $('body').prepend('<div class="alert alert-success alert-dismissible">\
                          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
                      <strong>Success!</strong> Your password has been changed.\
                      </div>');

                      $(".alert").fadeTo(2000, 500).slideUp(500, function(){
                          $("#success-alert").slideUp(500);
                      });
                      $('#passwordModal').modal('toggle');
                      $('#oldPassword').val('');
                      $('#newPassword').val('');
                      $('#confirmPassword').val('');
                   },
                   error(jqXHR, textStatus, errorThrown){
                     if (errorThrown === 'Unauthorized'){
                       $("#change-error").text("Incorrect password");
                     }
                   }
              });

            } else {
                $("#change-error").text("Passwords don't match");
            }
        } else {
            $("#change-error").text("Passwords must be greater than 6 charaters long");
        }






    });


});
