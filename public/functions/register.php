<?php

include_once("db.php");
include_once("functions.php");

if(!empty($_POST['email'])){
    $pass = $_POST['password']; //register password field
    $email = $_POST['email'];
    $email = strtolower($email);

    if (strlen($pass) > 6){
        $options = [
            'cost' => 11
        ];
        $hash = password_hash($pass, PASSWORD_BCRYPT, $options);
        $stmt = $db->prepare("SELECT email FROM accounts WHERE email=?");
        $stmt->bind_param('s', $email); // 's' specifies the variable type => 'string'
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows == 0) {

            $confirmCode = generateResetCode();

            $stmt = $db->prepare("INSERT INTO accounts (email, password, create_date, confirmed) VALUES 
            (?, ?, now(), ?)");
            $stmt->bind_param('sss', $email, $hash, $confirmCode); // 's' specifies the variable type => 'string'
            $stmt->execute();

            $to = $email;
            $subject = "Verify Account";
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
<h3 style='text-align: center'>Welcome to Revision Check!</h3>
<br>
<h4>Click <a href='https://revisioncheck.com/verifylogin?confirmcode="
                .$confirmCode.
                "'>here</a> to verify account</h4>
</body>
</html>";

            $headers = "Reply-To: Revision Check <verify@revisioncheck.com>\r\n";
            $headers .= "Return-Path: Revision Check <verify@revisioncheck.com>\r\n";
            $headers .= "From: Revision Check <verify@revisioncheck.com>\r\n";
            $headers .= "Organization: Revision Check\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
            $headers .= "X-Priority: 3\r\n";
            $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

            mail($to,$subject,$txt,$headers);

        } else {
            echo 'email address already exists';
        }
        } else {

            echo 'password must be greater than 6 charaters';

    }

}
?>