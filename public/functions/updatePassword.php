<?php
include_once("db.php");
include_once("functions.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['password'])) {
    $password = $_POST['password'];
    $userId = $_POST['userId'];
    $options = [
        'cost' => 11
    ];
    $newHash = password_hash($password, PASSWORD_BCRYPT, $options);
    $stmt = $db->prepare("UPDATE accounts SET password=?, reset_code='' WHERE id=?");
    $stmt->bind_param('ss', $newHash, $userId); // 's' specifies the variable type => 'string'
    $stmt->execute();

} else {
    echo 'Error with server';
}




?>