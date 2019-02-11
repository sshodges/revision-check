<?php

include_once("../db.php");
session_start();

if(!empty($_POST['oldPassword'])){
    $oldPassword = $_POST['oldPassword'];
    $newPassword = $_POST['newPassword'];
    $userId = $_POST['userId'];
    $stmt = $db->prepare("SELECT * FROM accounts WHERE id=?");
    $stmt->bind_param('s', $userId); // 's' specifies the variable type => 'string'
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        while ($row = mysqli_fetch_assoc($result)) {
            $options = [
                'cost' => 11
            ];
            $chk_pass = $row['password'];
            $pass_isGood = password_verify($oldPassword, $chk_pass);
            if ($pass_isGood){
                $newHash = password_hash($newPassword, PASSWORD_BCRYPT, $options);
                $stmt = $db->prepare("UPDATE accounts SET password='$newHash' WHERE id='$userId'");
                $stmt->bind_param('ss', $newHash, $userId); // 's' specifies the variable type => 'string'
                $stmt->execute();

            } else {
                echo "Incorrect password";
            }
        }
    } else {
        echo "Couldn't find user";
    }






} else {
    echo "No data sent";
}
?>