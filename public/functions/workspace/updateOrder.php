<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['order'])) {
    $order = $_POST['order'];

    foreach ($order as $value) {
        $id =  $value["id"];
        $orderNo =  $value["order"];
        $sql =  "UPDATE documents SET orderNumber='$orderNo' WHERE id='$id'";
        $db->query($sql);
    }

} else {
    echo 'asdasd';
}
?>