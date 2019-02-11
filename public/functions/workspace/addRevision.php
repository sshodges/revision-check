<?php
include_once("../db.php");
include_once("../functions.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['parent'])) {
    $name = addslashes($_POST['name']);
    $userId = $_POST['hash'];
    $documentId = $_POST['parent'];

    $first_name = $name;
    $i = 0;
    do {
        //Check in the database here
        $stmt = $db->prepare("SELECT * FROM revisions WHERE revision='$name' AND userId='$userId' AND documentId='$documentId'");
        $stmt->bind_param('sss', $name, $userId, $documentId); // 's' specifies the variable type => 'string'
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $exists = true;
        } else {
            $exists = false;
        }

        if($exists == true) {
            $i++;
            $name = $first_name . ' (' . $i . ')';
        }
    }while($exists);
    $stmt = $db->prepare("UPDATE revisions SET status='old' WHERE userId=? AND documentId=?");
    $stmt->bind_param('ss', $userId, $documentId); // 's' specifies the variable type => 'string'
    $stmt->execute();

    $revCode = generateRevCode();

    $stmt = $db->prepare("INSERT INTO revisions (revision, userId, documentId, revCode, status) VALUES (?, ?, ?, ?, 'latest')");
    $stmt->bind_param('ssss', $name, $userId, $documentId, $revCode); // 's' specifies the variable type => 'string'
    $stmt->execute();

} else {
    echo 'asdasd';
}
?>