<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['name'])) {
    $name = addslashes($_POST['name']);
    $type = $_POST['type'];
    $userId = $_POST['hash'];
    $parent = $_POST['parent'];

    $first_name = $name;
    $i = 0;
    do {
        //Check in the database here
        $stmt = $db->prepare("SELECT * FROM documents WHERE docName=? AND userId=? AND parent=?");
        $stmt->bind_param('sss', $name, $userId, $parent); // 's' specifies the variable type => 'string'
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

    $stmt = $db->prepare("INSERT INTO documents (docName, docType, userId, parent, orderNumber) VALUES ('$name', '$type', '$userId', $parent, -1)");
    $stmt->bind_param('ssss', $name, $type,$userId, $parent); // 's' specifies the variable type => 'string'
    $stmt->execute();


} else {
    echo 'asdasd';
}
?>