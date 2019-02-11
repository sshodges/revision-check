<?php


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forgot Password | Revision Check</title>
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/login.css">
    <link rel="icon" href="assets/img/icon.png">
    <script type="text/javascript" src="assets/js/url.js"></script>

</head>
<body>


<div class="container" id="block">
    <a href="https://revisioncheck.com"><img src="assets/img/logo.png" class="img-responsive" id="logo"></a>
    <h4>Free QR Document Manager</h4>

        <div class="row">
            <div class="inputDiv">
                <span class='blocking-span'>
                    <input id="resetEmail" type="email" class="inputText" required autocomplete="off"/>
                    <hr>
                    <span class="floating-label">Email</span>
                </span>
            </div>
        </div>

        <div class="text-center error" id="forgot-error"></div>

        <div class="row" id="loginButtonRow">
            <input class="submit" type="button" id="resetPassword" value="RESET">
            <img src="assets/img/loading.svg" id="loading" style="display: none;">
        </div>

</div>

<script src="assets/js/forgotpassword.js"></script>

</body>
</html>
