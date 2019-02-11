<?php
include_once("functions/db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_GET['confirmcode'])) {
    $confirmcode = $_GET['confirmcode'];
} else {
    header("Location: 404");
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Revision Check</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="">
    <meta name="description" content="A document management system that allows users to easily see if the document they are using is the most up-to-date version. This is used via unique revision code generation and easily scanned QR codes">
    <script type="text/javascript" src="assets/js/url.js"></script>

    <!-- animate css -->
    <link rel="stylesheet" href="assets/css/animate.min.css">
    <!-- bootstrap css -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- font-awesome -->
    <link rel="stylesheet" href="assets/css/font-awesome-4.7.0/css/font-awesome.min.css">
    <!-- google font -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,700,800' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">

    <!-- custom css -->
    <link rel="stylesheet" href="assets/css/index.css">
    <script src="assets/js/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="assets/js/index.js"></script>
    <link rel="icon" href="assets/img/icon.png">

</head>
<body>

<!-- start navigation -->
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon icon-bar"></span>
                <span class="icon icon-bar"></span>
                <span class="icon icon-bar"></span>
            </button>
            <a href="https://revisioncheck.com" class="navbar-brand"><b id="first_word" style="color: #4cae4c;">Revision</b> <b id="second_word">Check</b></a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right text-uppercase">
                <li><a href="register">Register</a></li>
                <li><a href="login">Login</a></li>
            </ul>
        </div>
    </div>
</nav>
<!-- end navigation -->
<h4 id="success" style="width: 80%; margin: 0 auto; margin-top: 250px; text-align: center; display:none">
    Your Account is verified!
    Click <a href="login" style="color: #1CA347">here</a> to go back to the login page
</h4>
<h4 id="fail" style="width: 80%; margin: 0 auto; margin-top: 250px; text-align: center; display:none">An error occured, please try again</h4>

<script src="assets/js/jquery.js"></script>
<script>
    var confirmCode = "<?php echo $confirmcode; ?>";
</script>

<script src="assets/js/verifylogin.js"></script>

</body>
</html>
