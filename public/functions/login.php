<?php

include_once("db.php");
session_start();

if(!empty($_POST['email'])) {
    $email = $_POST['email']; //from login email field
    $email = strtolower($email);
    $pass_l = $_POST['password']; // from login password field
    $options = [
        'cost' => 11
    ];
    $hash_1 = password_hash($pass_l, PASSWORD_BCRYPT, $options);

    $stmt = $db->prepare("SELECT * FROM accounts WHERE email=?");
    $stmt->bind_param('s', $email); // 's' specifies the variable type => 'string'
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['confirmed'] == ''){
                $chk_pass = $row['password']; //inside a while loop to get the password
                $pass_isGood = password_verify($pass_l, $chk_pass);
                if ($pass_isGood){
                    $stmt = $db->prepare("UPDATE accounts SET last_login=now() WHERE email=?");
                    $stmt->bind_param('s', $email); // 's' specifies the variable type => 'string'
                    $stmt->execute();
                    $_SESSION['email'] = $email;
                    $_SESSION['idd'] = $row['id'];
                    $answerObject = array(
                        "error" => ''
                    );
                } else {
                    $answerObject = array(
                        "error" => 'Username or password is incorrect'
                    );
                }
            } else {
                $answerObject = array(
                    "error" => 'Please verify your account'
                );
            }

        }
    } else if ($result->num_rows == 0) {
        $answerObject = array(
            "error" => 'Username or password is incorrect'
        );
    } else {
        $answerObject = array(
            "error" => 'More than 1 record found'
        );
    }

    echo json_encode($answerObject);

}

?>