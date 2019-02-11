<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['hash'])) {
    $userId = $_POST['hash'];
    $id = $_POST['id'];
    $stmt = $db->prepare("UPDATE documents SET status='active', parent=0 WHERE id='$id' AND userId='$userId'");
    $stmt->bind_param('ss', $id, $userId); // 's' specifies the variable type => 'string'
    $stmt->execute();
} else {
    echo 'error';
}

?>