<?php
include_once("functions/db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_GET['joinCode'])) {
    $joinCode = $_GET['joinCode'];
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Reset | Revision Check</title>
    <meta name="viewport" content="width=device-width" />
    <script type="text/javascript" src="assets/js/url.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/login.css">
    <link rel="icon" href="assets/img/icon.png">

</head>
<body>


<div class="container" id="block">
    <a href="https://revisioncheck.com"><img src="assets/img/logo.png" class="img-responsive" id="logo"></a>
    <h4>Free QR Document Manager</h4>

    <form id="login-form" action="functions/login.php" method="post" role="form" style="display: block;">
        <div class="row">
          <div class="inputDiv">
              <span class='blocking-span'>
                  <span class="floating-label">Welcome to Revision Check. Please enter your details to join the team:</span>
                  <br>
                  <br>
              </span>
          </div>
          <div class="inputDiv">
              <span class='blocking-span'>
                  <input id="newName" type="text" name="name" class="inputText" required/>
                  <hr>
                  <span class="floating-label">Name</span>
              </span>
          </div>
            <div class="inputDiv">
                <span class='blocking-span'>
                    <input id="newPassword" type="password" name="password" class="inputText" required/>
                    <hr>
                    <span class="floating-label">Password</span>
                </span>
            </div>
            <div class="inputDiv">
                <span class='blocking-span'>
                    <input id="confirmPassword" type="password" name="password" class="inputText" required/>
                    <hr>
                    <span class="floating-label">Confirm Password</span>
                </span>
            </div>
        </div>

        <div class="text-center error" id="reset-error"></div>

        <div class="row" id="loginButtonRow">
            <input class="submit" type="button" id="join" value="JOIN">
        </div>
    </form>

</div>

<script src="assets/js/newteammember.js"></script>
<script>
    var joinCode = "<?php echo $joinCode; ?>";
</script>

</body>
</html>
