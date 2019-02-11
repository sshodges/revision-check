<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['company'])) {
    $company = $_POST['company'];
    $userId = $_POST['userId'];

    $stmt = $db->prepare("UPDATE accounts SET company=? WHERE id=?");
    $stmt->bind_param('ss', $company, $userId); // 's' specifies the variable type => 'string'
    $stmt->execute();

} else {
    echo 'asdasd';
}
?>