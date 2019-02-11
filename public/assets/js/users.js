$(function() {

  if (localStorage.getItem("token") !== null) {
    window.location.replace('app/');
  } else {
    $('body').show();
  }

    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#login-submit').click(function () {
        $("#login-error").text('');
        var email = $('#login-email').val();
        if (testEmail.test(email)){
            var password = $('#login-password').val();
            body = {};
            body.email = email;
            body.password = password;
            body = JSON.stringify(body);


            $.ajax({
                url: urlStart + "/v1/users/login",
                method: "POST",
                data: body,
                dataType: 'json',
                contentType: "application/json",
                 success: function(result,status,jqXHR ){
                      if (jqXHR.getResponseHeader('Auth')) {
                        localStorage.setItem('token', jqXHR.getResponseHeader('Auth'));
                        window.location.replace('app/home')
                      }
                 },
                 error(jqXHR, textStatus, errorThrown){
                     $("#login-error").text(jqXHR.responseJSON);
                 }
            });

        } else {
            $("#login-error").text('Incorrect email format');
        }
    });

    $('#register-submit').click(function () {
        $("#register-error").text('');
        $('#register-submit').hide();
        var email = $('#register-email').val();
        if (testEmail.test(email)){
            var password = $('#register-password').val();
            var confirmPassword = $('#confirm-password').val();
            var name = $('#name').val();
            var company = $('#company').val();


            if (password.length > 6){
                if (password === confirmPassword){
                  body = {};
                  body.email = email;
                  body.password = password;
                  body.name = name;
                  body.company = company;
                  body = JSON.stringify(body);
                  $.ajax({
                      url: urlStart + "/v1/users",
                      method: "POST",
                      data: body,
                      dataType: 'json',
                      contentType: "application/json",
                       success: function(result,status,jqXHR ){
                            $('#register-submit').show();
                            window.location.replace('verify')
                       },
                       error(jqXHR, textStatus, errorThrown){
                         console.log(errorThrown);
                           $("#login-error").text('Incorrect email or password');
                           $('#register-submit').show();

                       }
                  });
                } else {
                    $('#register-submit').show();
                    $("#register-error").text("Passwords don't match");
                }
            } else {
                $('#register-submit').show();
                $("#register-error").text("Passwords must be greater than 6 charaters long");
            }


        } else {
            $('#register-submit').show();
            $("#register-error").text('Incorrect email format');
        }
    });

    $(document).ajaxStart(function(){
        $("#loading").css("display", "block");
    });

    $(document).ajaxComplete(function(){
        $("#loading").css("display", "none");
    });

    $('#confirm-password').keyup(function(e){
        if(e.keyCode === 13)
        {
            $('#register-submit').click();
        }
    });

    $('#login-password').keyup(function(e){
        if(e.keyCode === 13)
        {
            $('#login-submit').click();
        }
    });

});
