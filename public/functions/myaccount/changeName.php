<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['first'])) {
    $first = $_POST['first'];
    $last = $_POST['last'];
    $userId = $_POST['userId'];

    $stmt = $db->prepare("UPDATE accounts SET first_name='$first', last_name='$last' WHERE id='$userId'");
    $stmt->bind_param('sss', $first, $last, $userId); // 's' specifies the variable type => 'string'
    $stmt->execute();


} else {
    echo 'asdasd';
}
?>