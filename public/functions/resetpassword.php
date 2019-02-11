<?php
include_once("db.php");
include_once("functions.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['email'])) {
    $email = $_POST['email'];

    $stmt = $db->prepare("SELECT * FROM accounts WHERE email=?");
    $stmt->bind_param('s', $email); // 's' specifies the variable type => 'string'
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        while ($row = mysqli_fetch_assoc($result)) {
            $id = $row['id'];
        }

        $resetCode = generateResetCode();

        $stmt = $db->prepare("UPDATE accounts SET reset_code=? WHERE id=?");
        $stmt->bind_param('ss', $resetCode, $id); // 's' specifies the variable type => 'string'
        $stmt->execute();
        $result = $stmt->get_result();

        $to = $email;
        $subject = "Password Reset - Revision Check";
        $txt = "
<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"utf-8\">
    <title>Revision Check</title>
    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
</head>
<body>

<img src='' style='margin: 0 auto;'>
<h3 style='text-align: center'>Revision Check Password Reset</h3>
<br>
<p style='text-align: center;'>Click <a href='https://revisioncheck.com/passwordreset?resetCode="
.$resetCode.
"'>here</a> to reset your password</p>

</body>
</html>
";

        $headers = "Reply-To: Revision Check <retrieve@revisioncheck.com>\r\n";
        $headers .= "Return-Path: Revision Check <retrieve@revisioncheck.com>\r\n";
        $headers .= "From: Revision Check <retrieve@revisioncheck.com>\r\n";
        $headers .= "Organization: Revision Check\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
        $headers .= "X-Priority: 3\r\n";
        $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

        mail($to,$subject,$txt,$headers);


    } else {
        echo "email address doesn't exist";
    }





} else {
    echo 'Error with server';
}




?>