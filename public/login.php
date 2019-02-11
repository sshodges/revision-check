<?php

session_start();
if(isset($_SESSION['idd'])){
    header("Location: app/home");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login | Revision Check</title>
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/login.css">
    <link rel="icon" href="assets/img/icon.png">
    <script type="text/javascript" src="assets/js/url.js"></script>

</head>
<body style="display: none">


<div class="container" id="block">
    <a href="https://revisioncheck.com"><img src="assets/img/logo.png" class="img-responsive" id="logo"></a>
    <h4>Free QR Document Manager</h4>

    <form id="login-form" action="functions/login.php" method="post" role="form" style="display: block;">
        <div class="row">
            <div class="inputDiv">
                <span class='blocking-span'>
                    <input id="login-email" type="email" name="email" class="inputText" required/>
                    <hr>
                    <span class="floating-label">Email</span>
                </span>
            </div>
        </div>
        <div class="row">
            <div class="inputDiv">
                <span class='blocking-span'>
                    <input id="login-password" type="password" name="password" class="inputText" required/>
                    <hr>
                    <span class="floating-label">Password</span>
                </span>
            </div>
        </div>

        <a id="forgot" href="forgotpassword"><h5>Forgot your password?</h5></a>

        <div class="text-center error" id="login-error"></div>

        <div class="row" id="loginButtonRow">
            <input class="submit" type="button" name="login-submit" id="login-submit" value="LOGIN">
        </div>
    </form>

</div>


</div>
<script src="assets/js/users.js"></script>

</body>
</html>
