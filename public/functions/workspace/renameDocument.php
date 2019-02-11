<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['hash'])) {
    $userId = $_POST['hash'];
    $name = $_POST['name'];
    $parent = $_POST['parent'];
    $id = $_POST['id'];
    $type = $_POST['type'];
    $first_name = $name;
    $i = 0;

    $stmt = $db->prepare("SELECT * FROM documents WHERE docName=? AND userId=? AND id <> ?");
    $stmt->bind_param('sss', $name, $userId, $id); // 's' specifies the variable type => 'string'
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        echo 'name already exists';
    } else {
        $stmt = $db->prepare("UPDATE documents SET docName=? WHERE id=? AND userId=?");
        $stmt->bind_param('sss', $name, $id, $userId); // 's' specifies the variable type => 'string'
        $stmt->execute();
    }




} else {
    echo 'error';
}
?>